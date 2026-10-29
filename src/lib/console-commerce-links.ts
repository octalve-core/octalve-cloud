/** Public-to-Console navigation: identifiers only, never prices or authorization. */
const CONSOLE="https://console.cloud.octalve.com";
const slug=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const domainPattern=/^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{1,62}$/;
export type PublishedHostingIntent={
 productSlug:string;planSlug:string;cycle:string;revision:number;
};
export function buildHostingCheckoutHref(intent:PublishedHostingIntent):string|null{
 const {productSlug,planSlug,cycle,revision}=intent;
 if(!slug.test(productSlug)||!slug.test(planSlug)||
   !new Set(["1mo","3mo","6mo","12mo","24mo","36mo"]).has(cycle)||
   !Number.isSafeInteger(revision)||revision<1)return null;
 const query=new URLSearchParams({product:productSlug,plan:planSlug,cycle,revision:String(revision)});
 return CONSOLE+"/client/order?"+query.toString();
}
export function buildDomainRegistrationHref(domain:string):string|null{
 const clean=domain.trim().toLowerCase().replace(/\.$/,"");
 if(!domainPattern.test(clean))return null;
 return CONSOLE+"/client/domains/register?domain="+encodeURIComponent(clean);
}
