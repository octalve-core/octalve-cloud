import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cloud-radial px-6 text-center">
      <div className="max-w-xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-cloud-blue">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-cloud-navy">Page not found</h1>
        <p className="mt-4 text-base font-medium leading-8 text-cloud-ash">The page you are looking for is not available yet.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-cloud-blue px-6 py-3 text-sm font-black text-white">
          Back to Octalve Cloud
        </Link>
      </div>
    </main>
  );
}
