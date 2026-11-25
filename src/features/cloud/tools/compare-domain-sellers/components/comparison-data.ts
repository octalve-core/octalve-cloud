export const sellers=["Octalve Cloud","Namecheap","Hostinger","GoDaddy"] as const;
export type Status="yes"|"varies"|"unknown"|"not-applicable";
type Row={feature:string;values:readonly [Status,Status,Status,Status]};
export const rows:Row[]=[
{feature:"Domain registration",values:["yes","yes","yes","yes"]},
{feature:"Nigerian SME guidance",values:["yes","unknown","unknown","unknown"]},
{feature:"Local setup support",values:["yes","unknown","unknown","unknown"]},
{feature:"Hosting + email guidance",values:["yes","yes","yes","yes"]},
{feature:"Migration assistance",values:["varies","varies","varies","varies"]},
{feature:"Business-first explanation",values:["yes","unknown","unknown","unknown"]},
{feature:"Octalve Console integration",values:["yes","not-applicable","not-applicable","not-applicable"]},
];
export const labels:Record<Status,string>={yes:"Offered",varies:"Varies by service",unknown:"Not verified","not-applicable":"Not applicable"};
