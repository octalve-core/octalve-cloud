"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import type { FocusEvent } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { megaMenus } from "@/features/cloud/data/cloud-navigation";
import { AccountAccessMenu } from "./AccountAccessMenu";
import { DesktopNavigation } from "./DesktopNavigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { SmartLink } from "./SmartLink";
import { cn } from "./cn";
import { useMegaMenuController } from "./useMegaMenuController";

export function CloudHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    activeMenu,
    openNow,
    closeNow,
    scheduleOpen,
    scheduleClose,
    cancelClose,
    toggleMenu,
  } = useMegaMenuController();

  const activeDefinition = useMemo(
    () => (activeMenu ? megaMenus[activeMenu] : null),
    [activeMenu],
  );

  const closeAll = useCallback(() => {
    closeNow();
    setAccountOpen(false);
    setMobileOpen(false);
  }, [closeNow]);

  const openDesktopMenu = useCallback(
    (menuId: Parameters<typeof openNow>[0]) => {
      setAccountOpen(false);
      openNow(menuId);
    },
    [openNow],
  );

  const scheduleDesktopMenu = useCallback(
    (menuId: Parameters<typeof scheduleOpen>[0]) => {
      setAccountOpen(false);
      scheduleOpen(menuId);
    },
    [scheduleOpen],
  );

  const toggleDesktopMenu = useCallback(
    (menuId: Parameters<typeof toggleMenu>[0]) => {
      setAccountOpen(false);
      toggleMenu(menuId);
    },
    [toggleMenu],
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeAll();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      const menuToRestore = activeMenu;
      const restoreAccountTrigger = accountOpen;

      closeAll();

      window.requestAnimationFrame(() => {
        if (menuToRestore) {
          document
            .getElementById(`cloud-menu-trigger-${menuToRestore}`)
            ?.focus();
          return;
        }

        if (restoreAccountTrigger) {
          document.getElementById("cloud-account-trigger")?.focus();
        }
      });
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountOpen, activeMenu, closeAll]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setMobileOpen(false);
      }
    }

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200 bg-white transition-shadow duration-200 motion-reduce:transition-none",
        scrolled && "shadow-[0_10px_36px_rgba(15,23,42,0.10)]",
      )}
      onBlurCapture={(event: FocusEvent<HTMLElement>) => {
        const nextTarget = event.relatedTarget as Node | null;

        if (nextTarget && !headerRef.current?.contains(nextTarget)) {
          closeNow();
          setAccountOpen(false);
        }
      }}
    >
      <div className="hidden bg-cloud-navy text-slate-300 xl:block">
        <div className="mx-auto flex h-9 w-full max-w-[1540px] items-center justify-between gap-6 px-6 text-[12px] font-medium lg:px-8">
          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              onClick={closeAll}
              className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              Contact Sales
            </Link>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <Link
              href="/support"
              onClick={closeAll}
              className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              Guided Cloud Support
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${cloudLinks.supportPhone.replace(/\s+/g, "")}`}
              className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {cloudLinks.supportPhone}
            </a>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <span className="font-semibold text-white">₦ NGN</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {activeDefinition ? (
          <button
            type="button"
            className="fixed inset-0 top-[113px] z-30 hidden cursor-default bg-[#000A16]/38 backdrop-blur-[1px] xl:block"
            onClick={closeAll}
            aria-label="Close open navigation menu"
            tabIndex={-1}
          />
        ) : null}

        <div className="relative z-50 bg-white">
          <div className="mx-auto flex h-[76px] w-full max-w-[1540px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
            <div className="shrink-0" onClick={closeAll}>
              <CloudLogo />
            </div>

            <DesktopNavigation
              pathname={pathname}
              activeMenu={activeMenu}
              onScheduleOpen={scheduleDesktopMenu}
              onScheduleClose={scheduleClose}
              onOpenNow={openDesktopMenu}
              onToggleMenu={toggleDesktopMenu}
              onNavigate={closeAll}
            />

            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <Link
                href="/tools/domain-name-search"
                onClick={closeAll}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-cloud-navy transition hover:bg-cloud-mist hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                aria-label="Search domains and cloud tools"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Link>

              <AccountAccessMenu
                open={accountOpen}
                onToggle={() => {
                  closeNow();
                  setAccountOpen((current) => !current);
                }}
                onNavigate={closeAll}
              />

              <SmartLink
                href={cloudLinks.console}
                external
                newTab={false}
                onNavigate={closeAll}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-cloud-blue px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-cloud-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                Get Started
              </SmartLink>
            </div>

            <button
              type="button"
              onClick={() => {
                closeNow();
                setAccountOpen(false);
                setMobileOpen((current) => !current);
              }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-cloud-navy shadow-sm transition hover:border-cloud-blue hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 xl:hidden"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="cloud-mobile-navigation"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {activeDefinition ? (
          <MegaMenu
            key={activeDefinition.id}
            definition={activeDefinition}
            onNavigate={closeAll}
            onRequestClose={closeNow}
            onCancelClose={cancelClose}
            onScheduleClose={scheduleClose}
          />
        ) : null}

        <MobileNavigation open={mobileOpen} onNavigate={closeAll} />
      </div>
    </header>
  );
}
