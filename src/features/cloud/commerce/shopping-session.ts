export const SHOPPING_BRIDGE="https://console.cloud.octalve.com/api/shopping/session";
export const GUEST_SHOPPING="https://api.cloud.octalve.com/api/orders/shopping/guest/";
export type ShoppingScope={kind:"guest"}|{kind:"pending-claim";scope:string}|{kind:"account";scope:string};
export function scopeIsCurrent(a:ShoppingScope|null,b:ShoppingScope|null){return !!a&&!!b&&a.kind===b.kind&&(a.kind==="guest"||("scope" in b&&a.scope===b.scope))}
export function chooseShoppingScope(guestCount:number,bridgeStatus:number,scope:unknown):ShoppingScope{
 if(bridgeStatus===204)return {kind:"guest"};
 if(bridgeStatus!==200||typeof scope!=="string"||!(/^[a-f0-9]{64}$/.test(scope)))throw Error("Shopping session unavailable.");
 return guestCount>0?{kind:"pending-claim",scope}:{kind:"account",scope};
}
export function requestForScope(scope:ShoppingScope,method:"GET"|"POST"|"PATCH"|"DELETE",payload?:unknown):{url:string;headers:Record<string,string>;payload:unknown}{
 if(scope.kind!=="account")return {url:GUEST_SHOPPING,headers:{"Content-Type":"application/json"},payload};
 let data=payload;
 if(method==="POST"&&payload&&typeof payload==="object"){
  const value=payload as Record<string,unknown>;
  data={selections:Array.isArray(value.bundle)?value.bundle.map(domain=>({kind:"domain",domain})):[payload]};
 }
 return {url:SHOPPING_BRIDGE,headers:{"Content-Type":"application/json","X-Shopping-Scope":scope.scope},payload:data};
}
