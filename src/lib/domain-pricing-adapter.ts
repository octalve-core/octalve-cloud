import type { DomainPackage } from "@/features/cloud/data/domain-price";
import {buildDomainRegistrationHref} from "@/lib/console-commerce-links";

/** Public static site consumes Octalve's read-only published backend feed.
 * Only a connected and independently verified registrar may ever report
 * `available: true`. Until then lookup status is unknown, not "taken".
 */
export type DomainPricingRequest = { query: string; tlds: string[]; signal?: AbortSignal };
export type DomainSuggestion = {
  domain: string; tld: string; available: boolean | null;
  priceLabel: string; renewalLabel?: string; orderUrl: string; checkoutEnabled?: boolean;
  registrationAmount?: string; currency?: string;
};
const API="https://api.cloud.octalve.com/api/storefront";
const clean=(v:string)=>v.trim().toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/.*$/,"").replace(/[^a-z0-9.-]/g,"");
type Lookup={domain:string;availability:string;registrar_connected:boolean;checkout_enabled:boolean;
  tld:string|null;currency:string|null;registration_price:string|null;renewal_price:string|null};
type Tld={tld:string;registration_price:string;renewal_price:string;transfer_price:string};
const money=(amount:string,currency="NGN")=>new Intl.NumberFormat("en-NG",{style:"currency",currency,maximumFractionDigits:2}).format(Number(amount));

export async function getDomainSuggestions(request:DomainPricingRequest):Promise<DomainSuggestion[]>{
  const keyword=clean(request.query);
  if(keyword!==request.query.trim().toLowerCase())return [];
  if(!keyword) return [];
  const tlds=[...new Set(request.tlds.filter(t=>/^\.[a-z0-9.-]{2,30}$/.test(t)))].slice(0,8);
  const roots=tlds.length?tlds:[".com"];
  const names=roots.map(tld=>keyword.endsWith(tld)?keyword:keyword.replace(/\.[a-z0-9.-]+$/,"")+tld);
  const results=await Promise.all(names.map(async (domain):Promise<DomainSuggestion|null>=>{
    const unknown:DomainSuggestion={domain,tld:roots.find(t=>domain.endsWith(t))||"",available:null,priceLabel:"Pricing unavailable",orderUrl:"",checkoutEnabled:false};
    try{
      const resp=await fetch(`${API}/domains/lookup/?domain=${encodeURIComponent(domain)}`,{credentials:"omit",cache:"no-store",signal:request.signal?AbortSignal.any([request.signal,AbortSignal.timeout(12000)]):AbortSignal.timeout(12000)});
      if(!resp.ok)return unknown;
      const data=await resp.json() as Lookup;
      if(data.domain !== domain) return unknown;
      return {domain:data.domain,tld:data.tld||"",available:data.registrar_connected&&data.availability==="available"?true:
        data.registrar_connected&&["registered", "unavailable"].includes(data.availability)?false:null,
        checkoutEnabled:data.checkout_enabled===true,
        registrationAmount: data.registration_price && /^\d+(?:\.\d{1,2})?$/.test(data.registration_price) && Number(data.registration_price)>0 ? data.registration_price : undefined,
        currency: typeof data.currency==="string"&&/^[A-Z]{3}$/.test(data.currency)?data.currency:undefined,
        priceLabel:data.registration_price&&Number.isFinite(Number(data.registration_price))&&Number(data.registration_price)>0&&/^[A-Z]{3}$/.test(data.currency||"")?`${money(data.registration_price,data.currency||"NGN")}/yr`:"Pricing pending",
        renewalLabel:data.renewal_price&&Number.isFinite(Number(data.renewal_price))&&Number(data.renewal_price)>0&&/^[A-Z]{3}$/.test(data.currency||"")?`Renews at ${money(data.renewal_price,data.currency||"NGN")}/yr`:undefined,
        orderUrl:buildDomainRegistrationHref(data.domain) || "https://console.cloud.octalve.com/client/domains/register",
      } satisfies DomainSuggestion;
    }catch{return unknown;}
  }));
  return results.filter((item):item is DomainSuggestion=>item!==null);
}

export async function getLiveDomainPackages(_oldPackages:DomainPackage[]=[]):Promise<DomainPackage[]>{
  try{
    const resp=await fetch(`${API}/domains/prices/`,{credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(12000)});
    if(!resp.ok)return [];
    const data=await resp.json() as {currency:string;registrar_connected:boolean;tlds:Tld[]};
    if(!Array.isArray(data.tlds)||data.currency!=="NGN")return [];
    return data.tlds.filter(t=>t.tld.startsWith(".")&&Number(t.registration_price)>0)
      .map((t,i)=>({
        id:t.tld,tld:t.tld,title:t.tld,
        description:"Published registration and renewal prices.",
        category:t.tld.endsWith(".ng")?"nigeria" as const:[".online",".rocks",".shop",".cloud",".ai"].includes(t.tld)?"new" as const:i<6?"popular" as const:"business" as const,
        currentPrice:Number(t.registration_price),renewalPrice:Number(t.renewal_price),
        billingLabel:"/year",badge:data.registrar_connected?"Live rate":"Availability check required",
        ctaLabel:"Search this extension",ctaHref:`/tools/domain-name-search/?tld=${encodeURIComponent(t.tld)}`,
        accent:"blue" as const
      }));
  }catch{return [];}
}
