"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Headset, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { NavigationList } from "./NavigationList";
import { HeaderSearch } from "./HeaderSearch";
import { AnnouncementStripe } from "./AnnouncementStripe";

const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-blue focus-visible:ring-offset-2";
const signInStyle = "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-2 text-sm font-normal text-cloud-navy hover:text-cloud-blue " + focusStyle;
const startStyle = "inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-lg bg-cloud-blue px-4 text-sm font-medium text-white hover:bg-cloud-blueDark " + focusStyle;

import {ShoppingTrigger} from "@/features/cloud/commerce/ShoppingProvider";

function AccountActions({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <a href={cloudLinks.console} onClick={onNavigate} className={signInStyle}>Sign In</a>
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
  const [searchOpen, setSearchOpen] = useState(false);

  function closeAll() {
    setActive(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  function toggleGroup(id: string | null) {
    setSearchOpen(false);
    setActive(id);
  }

  function toggleSearch(open: boolean) {
    if (open) setActive(null);
    setSearchOpen(open);
  }

  useEffect(() => {
    function close() {
      setActive(null);
      setMobileOpen(false);
      setSearchOpen(false);
    }
    function outside(event: PointerEvent) {
      if (!(event.target instanceof Node) || !headerRef.current?.contains(event.target)) close();
    }
    const media = window.matchMedia("(min-width: 1024px)");
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", close);
    return () => {
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", close);
    };
  }, []);

  const navProps = { pathname, active, onToggle: toggleGroup, onNavigate: closeAll };

  return (
    <header ref={headerRef}
      className="sticky top-0 z-50 rounded-b-2xl bg-white shadow-[0_1px_0_rgba(0,10,22,0.08)]"
      onBlurCapture={(event) => {
        if (event.relatedTarget && (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget))) closeAll();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || event.defaultPrevented) return;
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
      <AnnouncementStripe />
      <div className="mx-auto flex h-[70px] max-w-[1540px] items-center justify-between gap-1 px-3 sm:gap-3 sm:px-6 lg:px-8 xl:gap-6 xl:px-12">
        <div className="shrink-0 [&_img]:!h-7 sm:[&_img]:!h-8" onClick={closeAll}><CloudLogo /></div>
        <nav aria-label="Primary services" className="hidden shrink-0 lg:block">
          <NavigationList mode="desktop" section="primary" {...navProps} />
        </nav>
        <div className="hidden min-w-[120px] max-w-[300px] flex-1 lg:block">
          <HeaderSearch mode="desktop" open={searchOpen && !mobileOpen} onOpenChange={toggleSearch} onNavigate={closeAll} />
        </div>
        <nav aria-label="Additional services" className="hidden shrink-0 lg:block">
          <NavigationList mode="desktop" section="secondary" {...navProps} />
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:gap-4">
          <Link href="/support" aria-label="Customer support" title="Customer support" onClick={closeAll}
            className={`hidden min-[360px]:inline-flex h-11 w-11 items-center justify-center rounded-lg text-cloud-navy hover:bg-cloud-mist ${focusStyle}`}>
            <Headset size={20} strokeWidth={1.6} aria-hidden="true" />
          </Link>
          <ShoppingTrigger/>
          <div className="hidden items-center gap-2 lg:flex"><AccountActions onNavigate={closeAll} /></div>
          <button ref={mobileTrigger} type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen} aria-controls="cloud-mobile-navigation"
            onClick={() => { setActive(null); setSearchOpen(false); setMobileOpen(!mobileOpen); }}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-cloud-navy hover:bg-cloud-mist lg:hidden ${focusStyle}`}>
            {mobileOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </div>
      <nav id="cloud-mobile-navigation" aria-label="Mobile navigation" hidden={!mobileOpen}
        className="max-h-[calc(100dvh-102px)] overflow-y-auto overscroll-contain rounded-b-2xl border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
        {mobileOpen && <>
          <div className="mb-3"><HeaderSearch mode="mobile" open={searchOpen} onOpenChange={toggleSearch} onNavigate={closeAll} /></div>
          <NavigationList mode="mobile" {...navProps} />
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
