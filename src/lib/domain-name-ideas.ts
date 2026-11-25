export const extensions=[".com",".com.ng",".ng",".net",".org",".ai",".cloud",".shop"];
const words=["get","try","my","go","hello","join","use","the","we","meet","discover","choose","build","launch","grow","start","find","shop","visit","your","prime","nova","spark","flow","studio","works","hub","base","labs","group","collective","craft","edge","rise","point","world","space","connect","digital","online","plus","pro","core","link","team","house","market","zone","wave","path","bridge","quest","nest","forge","bloom","peak","crest","shift","loop","grid"];
export function validateIdeas(values:unknown,tld:string):string[]{
 if(!extensions.includes(tld)||!Array.isArray(values))return [];
 return [...new Set(values.flatMap(v=>{const raw=typeof v==="string"?v:v&&typeof v==="object"&&"name" in v?v.name:null;if(typeof raw!=="string")return [];const name=raw.trim().toLowerCase();if(!name.endsWith(tld))return [];const label=name.slice(0,-tld.length);return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)?[name]:[]}))].slice(0,100);
}
export function localIdeas(input:string,tld:string):string[]{
 const parts=input.toLowerCase().match(/[a-z0-9]+/g)??[];const base=parts.join("").slice(0,32);if(!base)return [];
 return validateIdeas([base+tld,...words.flatMap(w=>[base+w+tld,w+base+tld]),...parts.flatMap(p=>words.map(w=>p+w+tld))],tld);
}
