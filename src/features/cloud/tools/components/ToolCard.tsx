import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
const accents={violet:"text-violet-300 bg-violet-400/10",orange:"text-orange-300 bg-orange-400/10",teal:"text-teal-300 bg-teal-400/10",green:"text-green-300 bg-green-400/10",blue:"text-blue-300 bg-blue-400/10",red:"text-red-300 bg-red-400/10"} as const;
type Props={title:string;description:string;href:string;icon:LucideIcon;accent?:keyof typeof accents};
export function ToolCard({title,description,href,icon:Icon,accent="blue"}:Props){
 return <Link href={href} className="group flex min-w-0 flex-col rounded-2xl border border-[#333333] bg-[#141414] p-5 text-white transition-colors hover:border-zinc-500 hover:bg-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:p-6">
 <div className="flex items-start justify-between gap-3"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accents[accent]}`}><Icon size={23} strokeWidth={1.6} aria-hidden="true"/></span><ArrowUpRight size={19} className="text-zinc-400 group-hover:text-white" aria-hidden="true"/></div>
 <h3 className="mt-5 text-lg font-medium leading-snug tracking-tight">{title}</h3>
 <p className="mt-2 text-sm leading-6 text-zinc-300">{description}</p>
 <span className="mt-auto pt-5 text-sm text-zinc-300 group-hover:text-white">Open tool <span className="sr-only">: {title}</span></span>
 </Link>
}
