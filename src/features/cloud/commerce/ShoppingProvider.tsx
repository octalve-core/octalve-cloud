"use client";
import {createContext,useCallback,useContext,useEffect,useRef,useState,type ReactNode} from "react";
import {CartDrawer,CartReview,CartTrigger} from "./CommerceUI";
import type {CartActions,CartLine,CartView} from "./types";

type Selection={kind:"domain";domain:string}|{kind:"service";plan:string;cycle:string;revision:number;domain?:string};
type Line={id:string;selection:Selection;ready:boolean;kind?:CartLine["kind"];name?:string;currency?:string;amount?:string;renewal?:string;period?:string};
type Shopping={available:boolean;add:(item:Selection)=>void;addBundle:(names:string[])=>void;open:()=>void;count:number|null;view:CartView;actions:CartActions};
const Context=createContext<Shopping|null>(null);
const endpoint="https://api.cloud.octalve.com/api/orders/shopping/guest/";
const consoleCart="https://console.cloud.octalve.com/client/order/checkout?view=cart";

function display(amount:string,currency:string){
  return new Intl.NumberFormat("en-NG",{style:"currency",currency}).format(Number(amount));
}

export function useShopping(){return useContext(Context);}

export function ShoppingProvider({children}:{children:ReactNode}){
  const [available,setAvailable]=useState(false);
  const [lines,setLines]=useState<Line[]>([]);
  const [quote,setQuote]=useState<{subtotal:string|null;currency:string|null}>({subtotal:null,currency:null});
  const [open,setOpen]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const mutating=useRef(false);
  const readEpoch=useRef(0);
  const opener=useRef<HTMLElement|null>(null);
  const broadcast=useRef<BroadcastChannel|null>(null);

  const clearSnapshot=useCallback(()=>{
    setAvailable(false);
    setLines([]);
    setQuote({subtotal:null,currency:null});
    setOpen(false);
    setError("");
  },[]);

  const load=useCallback(async()=>{
    if(mutating.current)return;
    const epoch=++readEpoch.current;
    try{
      const result=await fetch(endpoint,{credentials:"include",cache:"no-store",signal:AbortSignal.timeout(6000)});
      if(!result.ok){
        if(!mutating.current&&epoch===readEpoch.current)clearSnapshot();
        return;
      }
      const body=await result.json();
      if(!mutating.current&&epoch===readEpoch.current&&Array.isArray(body.lines)){
        setLines(body.lines);
        setQuote({subtotal:body.subtotal,currency:body.currency});
        setAvailable(true);
      }else if(!mutating.current&&epoch===readEpoch.current)clearSnapshot();
    }catch{if(!mutating.current&&epoch===readEpoch.current)clearSnapshot();}
  },[clearSnapshot]);

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
    return ()=>{
      readEpoch.current++;
      window.removeEventListener("focus",refresh);
      window.removeEventListener("pageshow",refresh);
      document.removeEventListener("visibilitychange",refresh);
      broadcast.current?.close();
      broadcast.current=null;
    };
  },[load]);

  function show(){
    if(document.activeElement instanceof HTMLElement)opener.current=document.activeElement;
    setOpen(true);
  }
  function close(){
    setOpen(false);
    if(opener.current?.isConnected)requestAnimationFrame(()=>opener.current?.focus());
  }

  async function mutate(method:"POST"|"DELETE",payload:Selection|{id:string}|{bundle:string[]}){
    if(!available||mutating.current)return;
    if(method==="POST"&&document.activeElement instanceof HTMLElement)opener.current=document.activeElement;
    mutating.current=true;
    readEpoch.current++;
    setBusy(true);
    setError("");
    try{
      const result=await fetch(endpoint,{method,credentials:"include",cache:"no-store",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
      if([401,403,404].includes(result.status)){clearSnapshot();return;}
      if(!result.ok)throw Error("Shopping update unavailable");
      const body=await result.json();
      if(!Array.isArray(body.lines))throw Error("Invalid shopping response");
      setLines(body.lines);
      setQuote({subtotal:body.subtotal,currency:body.currency});
      broadcast.current?.postMessage("changed");
      if(method==="POST")setOpen(true);
    }catch{
      setError("The cart could not be updated. Check the selection and try again.");
      setOpen(true);
    }finally{
      mutating.current=false;
      setBusy(false);
    }
  }

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
    })),
    subtotal,tax:"Calculated at review",total:"Confirmed at review",checkoutAllowed:amounts,busy,error,
  };
  const actions:CartActions={
    remove:id=>{void mutate("DELETE",{id});},configure:()=>{},
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
