/** Presentation contract only. Backend adapters must supply authoritative snapshots. */
export type ProductKind="domain"|"hosting"|"vps"|"email"|"ssl";
export type CartLine={id:string;kind:ProductKind;name:string;description:string;period:string;priceLabel:string;renewalLabel?:string;domain?:string;domainOptions?:readonly string[]};
export type CartView={lines:readonly CartLine[];subtotal:string;tax:string;total:string;busy?:boolean;error?:string;notice?:string;checkoutAllowed:boolean};
export type CartActions={remove:(id:string)=>void;configure:(id:string,domain:string)=>void;review:()=>void;checkout:()=>void;continueShopping:()=>void};
export const steps=["Cart","Configuration","Account","Review","Payment","Confirmation"] as const;
