import {getDomainSuggestions} from "@/lib/domain-pricing-adapter";
import {prepareHeroDomainQuery} from "@/lib/hero-domain-query";
import {pickerExtensions} from "./domain-picker-model";
import type {DomainPickerActions} from "./types";
/** Read-only lookup; preview selection never mutates real commerce state. */
export const searchPreviewDomains:DomainPickerActions["search"]=async(query,extension,signal)=>{
 const request=prepareHeroDomainQuery(query,extension?[extension]:[...pickerExtensions]);
 if(!request)throw Error("Enter a valid domain or business name.");
 const results=await getDomainSuggestions({...request,signal});
 return results.map(o=>({domain:o.domain,available:o.available,priceLabel:o.priceLabel,renewalLabel:o.renewalLabel,checkoutEnabled:o.checkoutEnabled,selectable:o.available===true&&!!o.registrationAmount&&!!o.currency}));
};
