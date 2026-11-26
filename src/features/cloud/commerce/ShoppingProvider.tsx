"use client";
import {createContext,useCallback,useContext,useEffect,useRef,useState,type ReactNode} from "react";
import {CartDrawer,CartReview,CartTrigger} from "./CommerceUI";
import {getDomainSuggestions} from "@/lib/domain-pricing-adapter";
import {pickerExtensions} from "./domain-picker-model";
import type {CartActions,CartLine,CartView} from "./types";
import {SHOPPING_BRIDGE,GUEST_SHOPPING,chooseShoppingScope,scopeIsCurrent,requestForScope,type ShoppingScope} from "./shopping-session";

type Selection={kind:"domain";domain:string}|{kind:"service";plan:string;cycle:string;revision:number;domain?:string};
type Line={id:string;selection:Selection;ready:boolean;kind?:CartLine["kind"];name?:string;currency?:string;amount?:string;renewal?:string;period?:string};
type Shopping={available:boolean;add:(item:Selection)=>void;addBundle:(names:string[])=>void;open:()=>void;count:number|null;view:CartView;actions:CartActions};
const Context=createContext<Shopping|null>(null);
const endpoint=GUEST_SHOPPING;
const consoleCart="https://console.cloud.octalve.com/client/order/checkout?view=cart";

function display(amount:string,currency:string){
  return new Intl.NumberFormat("en-NG",{style:"currency",currency}).format(Number(amount));
}

export function useShopping(){return useContext(Context);}

export function ShoppingProvider({children}:{children:ReactNode}){
  const [available,setAvailable]=useState(false);
  const [lines,setLines]=useState<Line[]>([]);
  const [ownedDomains,setOwnedDomains]=useState<string[]>([]);
  const [quote,setQuote]=useState<{subtotal:string|null;currency:string|null}>({subtotal:null,currency:null});
  const [open,setOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [pendingClaim,setPendingClaim]=useState(false);
  const currentScope=useRef<ShoppingScope|null>(null);
  const mutating=useRef(false);
  const readEpoch=useRef(0);
  const opener=useRef<HTMLElement|null>(null);
  const broadcast=useRef<BroadcastChannel|null>(null);

  const clearSnapshot=useCallback(()=>{
    currentScope.current=null;
    setPendingClaim(false);
    setAvailable(false);
    setLines([]);
    setOwnedDomains([]);
    setQuote({subtotal:null,currency:null});
    setOpen(false);
    setError("");
  },[]);

  async function readSnapshot(){
    const result=await fetch(endpoint,{credentials:"include",cache:"no-store",signal:AbortSignal.timeout(6000)});
    if(!result.ok)throw Error("Shopping unavailable.");
    const guest=await result.json();
    if(!Array.isArray(guest.lines))throw Error("Invalid guest cart.");
    const bridge=await fetch(SHOPPING_BRIDGE,{credentials:"include",cache:"no-store",signal:AbortSignal.timeout(10000)});
    const account=bridge.status===200?await bridge.json():null;
    const scope=chooseShoppingScope(guest.lines.length,bridge.status,account?.scope);
    const body=scope.kind==="account"?account:guest;
    if(!body||!Array.isArray(body.lines))throw Error("Invalid cart response.");
    return {scope,body};
  }
  const applySnapshot=useCallback((snapshot:{scope:ShoppingScope;body:{lines:Line[];domains?:string[];subtotal:string|null;currency:string|null}})=>{
    currentScope.current=snapshot.scope;
    setPendingClaim(snapshot.scope.kind==="pending-claim");
    setLines(snapshot.body.lines);
    setOwnedDomains(Array.isArray(snapshot.body.domains)?snapshot.body.domains:[]);
    setQuote({subtotal:snapshot.body.subtotal,currency:snapshot.body.currency});
    setAvailable(true);
  },[]);
  const load=useCallback(async()=>{
    if(mutating.current)return;
    const epoch=++readEpoch.current;
    try{
      const snapshot=await readSnapshot();
      if(!mutating.current&&epoch===readEpoch.current){
        if(currentScope.current&&!scopeIsCurrent(currentScope.current,snapshot.scope)){clearSnapshot();}
        applySnapshot(snapshot);
      }
    }catch{if(!mutating.current&&epoch===readEpoch.current)clearSnapshot();}
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
    function hide(){if(document.visibilityState==="hidden"){readEpoch.current++;clearSnapshot();}}
    document.addEventListener("visibilitychange",hide);
    const timer=window.setInterval(refresh,20000);
    return ()=>{
      readEpoch.current++;
      window.removeEventListener("focus",refresh);
      window.removeEventListener("pageshow",refresh);
      document.removeEventListener("visibilitychange",refresh);
      document.removeEventListener("visibilitychange",hide);
      window.clearInterval(timer);
      broadcast.current?.close();
      broadcast.current=null;
    };
  },[load,clearSnapshot]);

  function show(){
    if(document.activeElement instanceof HTMLElement)opener.current=document.activeElement;
    setOpen(true);
  }
  function close(){
    setOpen(false);
    if(opener.current?.isConnected)requestAnimationFrame(()=>opener.current?.focus());
  }

  async function mutate(method:"POST"|"DELETE"|"PATCH",payload:Selection|{id:string}|{bundle:string[]}|{id:string;domain:string;register:boolean}){
    if(!available||mutating.current||!currentScope.current)return false;
    const scope=currentScope.current;
    if(method==="POST"&&document.activeElement instanceof HTMLElement)opener.current=document.activeElement;
    mutating.current=true;
    const epoch=++readEpoch.current;
    setBusy(true);
    setError("");
    try{
      // Re-read session before writing so a tab cannot mutate a different account.
      const before=await readSnapshot();
      if(epoch!==readEpoch.current||!scopeIsCurrent(scope,before.scope)){clearSnapshot();return false;}
      const target=requestForScope(scope,method,payload);
      const result=await fetch(target.url,{method,credentials:"include",cache:"no-store",headers:target.headers,
        body:JSON.stringify(target.payload),signal:AbortSignal.timeout(22000)});
      if([401,403,404,409].includes(result.status)){clearSnapshot();return false;}
      if(!result.ok)throw Error("Shopping update unavailable");
      const body=await result.json();
      if(!Array.isArray(body.lines))throw Error("Invalid shopping response");
      if(epoch!==readEpoch.current)return false;
      // Fresh scope and authoritative snapshot after mutation; discard stale responses.
      const after=await readSnapshot();
      if(epoch!==readEpoch.current||!scopeIsCurrent(scope,after.scope)){clearSnapshot();return false;}
      applySnapshot(after);
      broadcast.current?.postMessage("changed");
      if(method==="POST")setOpen(true);
      return true;
    }catch{
      if(epoch===readEpoch.current){setError("The cart could not be updated. Check the selection and try again.");if(method!=="PATCH")setOpen(true);}
      return false;
    }finally{
      mutating.current=false;
      setBusy(false);
      if(epoch!==readEpoch.current)void load();
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
      id:line.id,kind:line.kind??(line.selection.kind==="domain"?"domain":"hosting"),
      name:line.name??line.selection.domain??"Service selection",description:"",
      period:line.period??"Check availability",priceLabel:line.amount&&line.currency?display(line.amount,line.currency):"Price unavailable",
      renewalLabel:line.renewal&&line.currency?display(line.renewal,line.currency)+" renewal":undefined,
      domain:line.selection.domain,
      domainOptions:line.ready&&line.selection.kind==="service"?domainOptions:undefined,
    })),
    subtotal,tax:"Calculated at review",total:"Confirmed at review",checkoutAllowed:amounts,busy,error,notice:pendingClaim?"Your guest selections are preserved. Continue to the Console to merge them with your account cart.":undefined,
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
    review:()=>window.location.assign("/cart/"),checkout:()=>window.location.assign(consoleCart),
    continueShopping:()=>window.location.assign("/"),
  };
  return <Context.Provider value={{available,add:item=>{void mutate("POST",item);},addBundle:bundle=>{void mutate("POST",{bundle});},open:show,count:available?lines.length:null,view,actions}}>
    {children}
    {available&&<CartDrawer open={open} close={close} cart={view} actions={actions}/>}
  </Context.Provider>;
}

export function ShoppingTrigger(){
  const shopping=useShopping();
  return shopping?.available?<CartTrigger count={shopping.count} onOpen={shopping.open}/>:null;
}

export function ShoppingReview(){
  const shopping=useShopping();
  if(!shopping?.available)return <p className="mx-auto max-w-6xl px-6 py-12">The shopping cart is currently unavailable.</p>;
  return <CartReview cart={shopping.view} actions={shopping.actions}/>;
}
