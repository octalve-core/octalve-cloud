import { Check, Minus, X } from "lucide-react";

const rows = [
  { feature: "Domain registration", octalve: "yes", namecheap: "yes", hostinger: "yes", godaddy: "yes" },
  { feature: "Nigerian SME guidance", octalve: "yes", namecheap: "no", hostinger: "no", godaddy: "no" },
  { feature: "Local setup support", octalve: "yes", namecheap: "partial", hostinger: "partial", godaddy: "partial" },
  { feature: "Hosting + email guidance", octalve: "yes", namecheap: "yes", hostinger: "yes", godaddy: "yes" },
  { feature: "Migration assistance", octalve: "yes", namecheap: "partial", hostinger: "partial", godaddy: "partial" },
  { feature: "Business-first explanation", octalve: "yes", namecheap: "partial", hostinger: "partial", godaddy: "partial" },
  { feature: "Future Octalve console integration", octalve: "yes", namecheap: "no", hostinger: "no", godaddy: "no" },
];

function Mark({ value }: { value: string }) {
  if (value === "yes") return <Check className="mx-auto h-5 w-5 text-emerald-600" />;
  if (value === "no") return <X className="mx-auto h-5 w-5 text-red-500" />;
  return <Minus className="mx-auto h-5 w-5 text-slate-400" />;
}

export function ToolPanel() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-5 text-sm font-medium text-slate-500">Feature</th>
                <th className="px-6 py-5 text-center"><span className="rounded-full bg-cloud-blue px-4 py-2 text-sm font-semibold text-white">Octalve Cloud</span></th>
                <th className="px-6 py-5 text-center text-sm font-medium text-slate-500">Namecheap</th>
                <th className="px-6 py-5 text-center text-sm font-medium text-slate-500">Hostinger</th>
                <th className="px-6 py-5 text-center text-sm font-medium text-slate-500">GoDaddy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-6 py-5 text-sm font-medium text-slate-950">{row.feature}</td>
                  <td className="border-l border-slate-100 px-6 py-5 text-center"><Mark value={row.octalve} /></td>
                  <td className="border-l border-slate-100 px-6 py-5 text-center"><Mark value={row.namecheap} /></td>
                  <td className="border-l border-slate-100 px-6 py-5 text-center"><Mark value={row.hostinger} /></td>
                  <td className="border-l border-slate-100 px-6 py-5 text-center"><Mark value={row.godaddy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
