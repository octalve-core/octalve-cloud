export type RegistryRecord = {domain:string; registrar:string|null; created:string|null; expires:string|null; updated:string|null; nameservers:string[]; statuses:string[]; dnssec:boolean|null; source:string; checkedAt:string};
export type RegistryResult = {state:"registered";record:RegistryRecord}|{state:"not-found"|"unsupported"|"error";message:string};
const BOOTSTRAP="https://data.iana.org/rdap/dns.json";
type Bootstrap={services:[string[],string[]][]};
type Entity={roles?:string[];vcardArray?:[string,unknown[][]]};
type Rdap={objectClassName?:string;ldhName?:string;events?:{eventAction:string;eventDate:string}[];entities?:Entity[];nameservers?:{ldhName?:string}[];status?:string[];secureDNS?:{delegationSigned?:boolean}};
let cached: {data:Bootstrap;until:number}|undefined;
export function normalizeLookup(value:string):string|null {
 const domain=value.trim().toLowerCase().replace(/^https?:\/\//,"").replace(/\/$/,"").replace(/\.$/,"");
 return /^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{1,62}$/.test(domain)?domain:null;
}
export function registryEndpoints(data:Bootstrap,domain:string):string[]{
 const labels=domain.split(".");
 for(let i=0;i<labels.length;i++){
  const suffix=labels.slice(i).join(".");
  const match=data.services.find(([names])=>names.includes(suffix));
  if(match)return match[1].filter(url=>{try{const u=new URL(url);return u.protocol==="https:"&&!u.username&&!u.password&&!u.search&&!u.hash}catch{return false}}).map(url=>url.replace(/\/$/,"")+"/domain/"+encodeURIComponent(domain));
 }
 return [];
}
export function summarizeRegistry(data:Rdap,domain:string,source:string):RegistryRecord|null{
 if(data.objectClassName!=="domain"||data.ldhName?.toLowerCase().replace(/\.$/,"")!==domain)return null;
 const date=(action:string)=>{const value=data.events?.find(e=>e.eventAction===action)?.eventDate;return typeof value==="string"&&Number.isFinite(Date.parse(value))?value:null};
 const registrar=data.entities?.find(e=>e.roles?.includes("registrar"))?.vcardArray?.[1]?.find(v=>v[0]==="fn")?.[3];
 return {domain,registrar:typeof registrar==="string"?registrar:null,created:date("registration"),expires:date("expiration"),updated:date("last changed"),nameservers:(data.nameservers??[]).map(n=>n.ldhName).filter((v):v is string=>typeof v==="string"),statuses:(data.status??[]).filter(v=>typeof v==="string"),dnssec:typeof data.secureDNS?.delegationSigned==="boolean"?data.secureDNS.delegationSigned:null,source,checkedAt:new Date().toISOString()};
}
async function request(url:string,signal:AbortSignal){
 const timeout=AbortSignal.timeout(6500);
 return fetch(url,{signal:AbortSignal.any([signal,timeout]),credentials:"omit",referrerPolicy:"no-referrer",headers:{Accept:"application/rdap+json, application/json"}});
}
export async function lookupRegistry(domain:string,signal:AbortSignal):Promise<RegistryResult>{
 if(normalizeLookup(domain)!==domain)return {state:"error",message:"Enter a valid full domain name."};
 let endpoints:string[]=[];
 try{
  if(!cached||cached.until<Date.now()){
   const response=await request(BOOTSTRAP,signal);
   if(!response.ok)throw new Error("bootstrap");
   const data=await response.json() as Bootstrap;
   if(!Array.isArray(data.services))throw new Error("bootstrap");
   cached={data,until:Date.now()+3600000};
  }
  endpoints=registryEndpoints(cached.data,domain);
  if(!endpoints.length)return {state:"unsupported",message:"No HTTPS RDAP service is listed for this extension. Registrar verification may still be possible."};
 }catch{return {state:"error",message:"Registry discovery is temporarily unavailable. Try again or use ICANN Lookup."}}
 for(const url of endpoints.slice(0,2)){
  if(signal.aborted)break;
  try{
   const response=await request(url,signal);
   if(response.status===404)return {state:"not-found",message:"No registration record returned by the registry. This does not establish purchase availability."};
   if(!response.ok)continue;
   const data=await response.json() as Rdap;
   const record=summarizeRegistry(data,domain,new URL(response.url||url).hostname);
   if(record)return {state:"registered",record};
  }catch{continue}
 }
 return {state:"error",message:"Registry lookup failed or was rate limited. Try again or use ICANN Lookup."};
}
