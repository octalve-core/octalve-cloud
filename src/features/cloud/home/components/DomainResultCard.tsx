import type {DomainSuggestion} from "@/lib/domain-pricing-adapter";
import {CompactDomainResult} from "@/features/cloud/components/CompactDomainResult";
export function DomainResultCard({item}:{item:DomainSuggestion}){return <CompactDomainResult item={item}/>}
