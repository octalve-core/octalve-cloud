"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { NavigationList } from "./NavigationList";

const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-blue focus-visible:ring-offset-2";
const signInStyle = "inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-sm font-medium text-cloud-navy hover:text-cloud-blue " + focusStyle;
const startStyle = "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-cloud-blue px-4 text-sm font-medium text-white hover:bg-cloud-blueDark " + focusStyle;

function AccountActions({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <a href={cloudLinks.console} onClick={onNavigate} className={signInStyle}>Sign in</a>
      <a href={cloudLinks.console} onClick={onNavigate} className={startStyle}>Get Started</a>
    </>
  );
}

export function CloudHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  function closeAll() {
    setActive(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActive(null);
        setMobileOpen(false);
      }
    }
    const media = window.matchMedia("(min-width: 1024px)");
    function breakpoint() {
      setActive(null);
      setMobileOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", breakpoint);
    return () => {
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", breakpoint);
    };
  }, []);

  return (
    <header ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white"
      onBlurCapture={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) closeAll();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (active) {
          event.preventDefault();
          document.getElementById(`cloud-${mobileOpen ? "mobile" : "desktop"}-${active}-trigger`)?.focus();
          setActive(null);
        } else if (mobileOpen) {
          event.preventDefault();
          mobileTrigger.current?.focus();
          closeAll();
        }
      }}
    >
      <div className="hidden bg-cloud-navy text-white lg:block">
        <div className="mx-auto flex h-9 max-w-[1540px] items-center justify-between px-6 text-xs font-medium">
          <div className="flex items-center gap-5">
            <Link href="/contact" onClick={closeAll} className="hover:underline focus-visible:underline">Contact Sales</Link>
            <Link href="/support" onClick={closeAll} className="hover:underline focus-visible:underline">Support</Link>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${cloudLinks.supportPhone.replace(/\s+/g, "")}`} className="hover:underline focus-visible:underline">{cloudLinks.supportPhone}</a>
            <span>₦ NGN</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-[72px] max-w-[1540px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="shrink-0" onClick={closeAll}><CloudLogo /></div>
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <NavigationList mode="desktop" pathname={pathname} active={active} onToggle={setActive} onNavigate={closeAll} />
        </nav>
        <div className="hidden shrink-0 items-center gap-1 lg:flex"><AccountActions onNavigate={closeAll} /></div>
        <button ref={mobileTrigger} type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen} aria-controls="cloud-mobile-navigation"
          onClick={() => { setActive(null); setMobileOpen(!mobileOpen); }}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-cloud-navy hover:bg-cloud-mist lg:hidden ${focusStyle}`}>
          {mobileOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </div>
      <nav id="cloud-mobile-navigation" aria-label="Mobile navigation" hidden={!mobileOpen}
        className="max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
        {mobileOpen && <>
          <NavigationList mode="mobile" pathname={pathname} active={active} onToggle={setActive} onNavigate={closeAll} />
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4"><AccountActions onNavigate={closeAll} /></div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <Link href="/contact" onClick={closeAll} className={focusStyle}>Contact Sales</Link>
            <a href={`tel:${cloudLinks.supportPhone.replace(/\s+/g, "")}`} className={focusStyle}>{cloudLinks.supportPhone}</a>
            <span>₦ NGN</span>
          </div>
        </>}
      </nav>
    </header>
  );
}
