"use client";
import {useRouter} from "next/navigation";
import {createContext,useCallback,useContext,useEffect,useRef,useState,type ReactNode} from "react";
import {CartDrawer,CartReview,CartTrigger,CommerceCheckoutFrame,CommercePanel,CommerceNotice,secondary} from "./CommerceUI";
import {getDomainSuggestions} from "@/lib/domain-pricing-adapter";
import {pickerExtensions} from "./domain-picker-model";
import type {CartActions,CartLine,CartView} from "./types";
import {SHOPPING_BRIDGE,GUEST_SHOPPING,chooseShoppingScope,scopeIsCurrent,requestForScope,type ShoppingScope} from "./shopping-session";

type Selection={kind:"domain";domain:string}|{kind:"service";plan:string;cycle:string;revision:number;domain?:string};
type Line={id:string;selection:Selection;ready:boolean;issue?:string;kind?:CartLine["kind"];name?:string;currency?:string;amount?:string;renewal?:string;period?:string};
type Shopping={available:boolean;loading:boolean;retry:()=>void;add:(item:Selection)=>void;addBundle:(names:string[])=>void;open:()=>void;count:number|null;view:CartView;actions:CartActions};
const Context=createContext<Shopping|null>(null);
const endpoint=GUEST_SHOPPING;
const consoleCart="https://console.cloud.octalve.com/client/order/checkout?view=cart";

function display(amount:string,currency:string){
  if(!/^[A-Z]{3}$/.test(currency)||!/^\d+(?:\.\d{1,2})?$/.test(amount)||!Number.isFinite(Number(amount)))return "Price unavailable";
  return new Intl.NumberFormat("en-NG",{style:"currency",currency}).format(Number(amount));
}

export function useShopping(){return useContext(Context);}

export function ShoppingProvider({children}:{children:ReactNode}){
  const router=useRouter();
  const [feedback,setFeedback]=useState<{message:string;error?:boolean}|null>(null);
  const [available,setAvailable]=useState(false);
  const [loading,setLoading]=useState(true);
  const [lines,setLines]=useState<Line[]>([]);
  const [ownedDomains,setOwnedDomains]=useState<string[]>([]);
  const [quote,setQuote]=useState<{subtotal:string|null;currency:string|null}>({subtotal:null,currency:null});
  const [open,setOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [pendingClaim,setPendingClaim]=useState(false);
  const [checkoutIssue,setCheckoutIssue]=useState("");
  const [sessionChecked,setSessionChecked]=useState(false);
  const currentScope=useRef<ShoppingScope|null>(null);
  const mutating=useRef(false);
  const refreshRequested=useRef(false);
  const readEpoch=useRef(0);
  const reading=useRef<Promise<Awaited<ReturnType<typeof readSnapshot>>>|null>(null);
  const opener=useRef<HTMLElement|null>(null);
  const broadcast=useRef<BroadcastChannel|null>(null);

  const clearSnapshot=useCallback(()=>{
    currentScope.current=null;
    setSessionChecked(false);
    setFeedback(null);
    setPendingClaim(false);
    setCheckoutIssue("");
    setAvailable(false);
    setLines([]);
    setOwnedDomains([]);
    setQuote({subtotal:null,currency:null});
    setOpen(false);
    setError("");
  },[]);

  async function readSnapshot(){
    const started=performance.now();
    const [result,bridge]=await Promise.all([
      fetch(endpoint,{credentials:"include",cache:"no-store",signal:AbortSignal.timeout(18000)}),
      fetch(SHOPPING_BRIDGE,{credentials:"include",cache:"no-store",signal:AbortSignal.timeout(20000)}),
    ]);
    if(!result.ok)throw Error("Shopping unavailable.");
    const guest=await result.json();
    if(!Array.isArray(guest.lines))throw Error("Invalid guest cart.");
    const account=bridge.status===200?await bridge.json():null;
    const scope=chooseShoppingScope(guest.lines.length,bridge.status,account?.scope);
    const body=scope.kind==="account"?account:guest;
    if(!body||!Array.isArray(body.lines))throw Error("Invalid cart response.");
    performance.measure("octalve:cart-read",{start:started,end:performance.now()});
    return {scope,body};
  }
  const applySnapshot=useCallback((snapshot:{scope:ShoppingScope;body:{lines:Line[];domains?:string[];subtotal:string|null;currency:string|null;checkout_issue?:string|null}})=>{
    currentScope.current=snapshot.scope;
    setPendingClaim(snapshot.scope.kind==="pending-claim");
    setLines(snapshot.body.lines);
    setOwnedDomains(Array.isArray(snapshot.body.domains)?snapshot.body.domains:[]);
    setQuote({subtotal:snapshot.body.subtotal,currency:snapshot.body.currency});
    setCheckoutIssue(typeof snapshot.body.checkout_issue==="string"?snapshot.body.checkout_issue:"");
    setAvailable(true);
    setSessionChecked(true);
    setError("");
  },[]);
  const load=useCallback(async()=>{
    if(mutating.current){refreshRequested.current=true;return;}
    const epoch=++readEpoch.current;
    try{
      const request=reading.current??readSnapshot();
      reading.current=request;
      const snapshot=await request;
      if(!mutating.current&&epoch===readEpoch.current){
        if(currentScope.current&&!scopeIsCurrent(currentScope.current,snapshot.scope)){clearSnapshot();}
        applySnapshot(snapshot);
      }
    }catch{if(!mutating.current&&epoch===readEpoch.current){
      // Never expose an unverified account snapshot. Anonymous selections may remain visible, but writes pause.
      if(currentScope.current?.kind==="guest"){setSessionChecked(false);setError("Shopping connection interrupted. Retry to confirm your cart.");}
      else clearSnapshot();
    }}
    finally{if(epoch===readEpoch.current){reading.current=null;setLoading(false);}}
  },[clearSnapshot,applySnapshot]);

  useEffect(()=>{
    void load();
    if(typeof BroadcastChannel!=="undefined"){
      broadcast.current=new BroadcastChannel("octalve-shopping");
      broadcast.current.onmessage=()=>{void load();};
    }
    function refresh(){if(document.visibilityState==="visible")void load();}
    window.addEventListener("focus",refresh);
    window.addEventListener("pageshow",refresh);
    document.addEventListener("visibilitychange",refresh);
    function hide(){if(document.visibilityState==="hidden"){readEpoch.current++;reading.current=null;if(currentScope.current?.kind!=="guest")clearSnapshot();else setSessionChecked(false);}}
    document.addEventListener("visibilitychange",hide);
    const timer=window.setInterval(refresh,60000);
    return ()=>{
      readEpoch.current++;
      reading.current=null;
      window.removeEventListener("focus",refresh);
      window.removeEventListener("pageshow",refresh);
      document.removeEventListener("visibilitychange",refresh);
      document.removeEventListener("visibilitychange",hide);
      window.clearInterval(timer);
      broadcast.current?.close();
      broadcast.current=null;
    };
  },[load,clearSnapshot]);

  // Next static-export navigation already prefetches linked pages. Avoid speculative imperative prefetch here.
  useEffect(()=>{if(!feedback||feedback.error)return;const timer=window.setTimeout(()=>setFeedback(null),5000);return()=>window.clearTimeout(timer)},[feedback]);
  function show(){
    if(document.activeElement instanceof HTMLElement)opener.current=document.activeElement;
    setOpen(true);
    if(!sessionChecked)void load();
  }
  function close(){
    setOpen(false);
    if(opener.current?.isConnected)requestAnimationFrame(()=>opener.current?.focus());
  }

  async function mutate(method:"POST"|"DELETE"|"PATCH",payload:Selection|{id:string}|{bundle:string[]}|{id:string;domain:string;register:boolean}){
    if(!available||!sessionChecked||mutating.current||!currentScope.current)return false;
    if(method==="POST"&&"kind" in payload&&payload.kind==="domain"&&lines.some(line=>line.selection.kind==="domain"&&line.selection.domain===payload.domain)){setFeedback({message:"This domain is already in your cart"});return true;}
    const scope=currentScope.current;
    const started=performance.now();
    if(method==="POST"&&document.activeElement instanceof HTMLElement)opener.current=document.activeElement;
    mutating.current=true;
    const epoch=++readEpoch.current;
    setBusy(true);
    setError("");
    setFeedback(null);
    reading.current=null;
    try{
      // Account mutations carry the refresh-bound scope checked by the BFF. Guest writes still recheck identity.
      if(scope.kind!=="account"){
        const before=await readSnapshot();
        if(epoch!==readEpoch.current||!scopeIsCurrent(scope,before.scope)){clearSnapshot();return false;}
      }
      const target=requestForScope(scope,method,payload);
      const result=await fetch(target.url,{method,credentials:"include",cache:"no-store",headers:target.headers,
        body:JSON.stringify(target.payload),signal:AbortSignal.timeout(22000)});
      if([401,403,404,409].includes(result.status)){clearSnapshot();return false;}
      if(!result.ok){
        const failure=await result.json().catch(()=>null);
        const name=typeof failure?.domain==="string"&&/^[a-z0-9.-]{4,253}$/.test(failure.domain)?failure.domain:"This domain";
        if(failure?.code==="domain_unavailable")throw Error(name+" is already registered or otherwise unavailable. Choose another name.");
        if(failure?.code==="domain_lookup_unconfirmed")throw Error("Availability for "+name+" could not be confirmed. Please retry.");
        if(failure?.code==="domain_price_unavailable")throw Error("Published pricing for "+name+" is unavailable.");
        throw Error("The cart could not be updated. Check the selection and try again.");
      }
      const body=await result.json();
      if(!Array.isArray(body.lines))throw Error("Invalid shopping response");
      if(epoch!==readEpoch.current)return false;
      // Fresh scope and authoritative snapshot after mutation; discard stale responses.
      if(scope.kind==="account"){
        // The BFF validates the same refresh-bound scope on every mutation and returns it with the authoritative snapshot.
        if(body.scope!==scope.scope||epoch!==readEpoch.current){clearSnapshot();return false;}
        applySnapshot({scope,body});
      }else{
        const after=await readSnapshot();
        if(epoch!==readEpoch.current||!scopeIsCurrent(scope,after.scope)){clearSnapshot();return false;}
        applySnapshot(after);
      }
      broadcast.current?.postMessage("changed");
      if(method==="POST")setFeedback({message:"Added to your cart"});
      return true;
    }catch(reason){
      if(epoch===readEpoch.current){setError(reason instanceof Error?reason.message:"The cart could not be updated. Try again.");if(method!=="PATCH"&&!open)setFeedback({message:reason instanceof Error?reason.message:"The cart could not be updated. Try again.",error:true});}
      return false;
    }finally{
      performance.measure("octalve:cart-mutation",{start:started,end:performance.now()});
      mutating.current=false;
      setBusy(false);
      if(epoch!==readEpoch.current||refreshRequested.current){refreshRequested.current=false;void load();}
    }
  }

  async function configure(id:string,domain:string,register:boolean){
    if(!await mutate("PATCH",{id,domain,register})){
      throw new Error("Could not connect this domain. Your cart has not been confirmed. Please retry.");
    }
  }

  const domainOptions=[...new Set([...ownedDomains,...lines.flatMap(line=>
    line.ready&&line.selection.kind==="domain"?[line.selection.domain]:[]
  )])];
  const currency=quote.currency;
  const amounts=lines.length>0&&!!currency&&typeof quote.subtotal==="string"&&/^\d+(?:\.\d{1,2})?$/.test(quote.subtotal);
  const subtotal=amounts?display(quote.subtotal!,currency!):"Review required";
  const view:CartView={
    lines:lines.map(line=>({
      id:line.id,kind:line.kind&&["domain","hosting","vps","email","ssl"].includes(line.kind)?line.kind:(line.selection.kind==="domain"?"domain":"hosting"),
      name:line.name??line.selection.domain??"Service selection",description:"",
      period:!line.ready?(line.issue??"Review this selection"):line.period??"Check availability",priceLabel:line.amount&&line.currency?display(line.amount,line.currency):"Price unavailable",
      renewalLabel:line.renewal&&line.currency?display(line.renewal,line.currency)+" renewal":undefined,
      domain:line.selection.domain,
      domainOptions:line.ready&&line.selection.kind==="service"?domainOptions:undefined,
    })),
    subtotal,tax:"Calculated at review",total:"Confirmed at review",checkoutAllowed:amounts&&!checkoutIssue&&sessionChecked&&lines.every(line=>line.ready),busy,error:error||checkoutIssue,notice:pendingClaim?"Your guest selections are preserved. Continue to the Console to merge them with your account cart.":undefined,
  };
  const actions:CartActions={
    remove:id=>{void mutate("DELETE",{id});},configure:(id,domain)=>configure(id,domain,false),
    domainPicker:{
      async search(query,extension,signal){
        const name=query.trim().toLowerCase();
        const separator=name.indexOf(".");
        const tlds=separator>=0?[name.slice(separator)]:extension?[extension]:[...pickerExtensions];
        const offers=await getDomainSuggestions({query:name,tlds,signal});
        return offers.map(offer=>({...offer,selectable:offer.available===true&&!!offer.registrationAmount&&!!offer.currency}));
      },
      addAndConfigure:(id,domain)=>configure(id,domain,true),
    },
    review:()=>{close();router.push("/cart/")},checkout:()=>window.location.assign(consoleCart),
    continueShopping:()=>router.push("/"),
  };
  return <Context.Provider value={{available:available&&sessionChecked,loading,retry:()=>{setLoading(true);void load()},add:item=>{void mutate("POST",item);},addBundle:bundle=>{void mutate("POST",{bundle});},open:show,count:available?lines.length:null,view,actions}}>
    {children}
    {feedback&&!open&&<CommerceNotice message={feedback.message} error={feedback.error} onDismiss={()=>setFeedback(null)} onView={()=>{setFeedback(null);show()}}/>}
    <CartDrawer open={open} close={close} cart={{...view,busy:busy||(!sessionChecked&&loading),error:view.error||(!sessionChecked&&!loading?"Shopping connection unavailable. Close and reopen the cart to retry.":"")}} actions={actions}/>
  </Context.Provider>;
}

export function ShoppingTrigger(){
  const shopping=useShopping();
  return <CartTrigger count={shopping?.count??null} onOpen={()=>shopping?shopping.open():window.location.assign("/cart/")}/>;
}

export function ShoppingReview(){
  const shopping=useShopping();
  if(!shopping?.available)return <CommerceCheckoutFrame stage={0} title="Review your shopping cart" back={()=>window.location.assign("/")} backLabel="Continue shopping"><CommercePanel><p role="status" className="text-sm text-slate-600">{shopping?.loading?"Connecting to your shopping cart…":"We could not connect to the shopping service. Your selections have not been replaced."}</p>{!shopping?.loading&&<button type="button" className={secondary+" mt-4"} onClick={()=>shopping?.retry()}>Retry connection</button>}</CommercePanel></CommerceCheckoutFrame>;
  return <CartReview cart={shopping.view} actions={shopping.actions}/>;
}
