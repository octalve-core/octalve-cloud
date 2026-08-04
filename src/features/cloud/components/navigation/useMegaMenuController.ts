"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MegaMenuId } from "@/features/cloud/types/navigation";

const OPEN_DELAY_MS = 140;
const CLOSE_DELAY_MS = 260;

export function useMegaMenuController() {
  const [activeMenu, setActiveMenu] = useState<MegaMenuId | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeNow = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();
    setActiveMenu(null);
  }, [clearCloseTimer, clearOpenTimer]);

  const openNow = useCallback(
    (menuId: MegaMenuId) => {
      clearOpenTimer();
      clearCloseTimer();
      setActiveMenu(menuId);
    },
    [clearCloseTimer, clearOpenTimer],
  );

  const scheduleOpen = useCallback(
    (menuId: MegaMenuId) => {
      clearOpenTimer();
      clearCloseTimer();

      openTimerRef.current = setTimeout(() => {
        setActiveMenu(menuId);
        openTimerRef.current = null;
      }, OPEN_DELAY_MS);
    },
    [clearCloseTimer, clearOpenTimer],
  );

  const scheduleClose = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, clearOpenTimer]);

  const cancelClose = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const toggleMenu = useCallback(
    (menuId: MegaMenuId) => {
      clearOpenTimer();
      clearCloseTimer();
      setActiveMenu((current) => (current === menuId ? null : menuId));
    },
    [clearCloseTimer, clearOpenTimer],
  );

  useEffect(() => {
    return () => {
      clearOpenTimer();
      clearCloseTimer();
    };
  }, [clearCloseTimer, clearOpenTimer]);

  return {
    activeMenu,
    openNow,
    closeNow,
    scheduleOpen,
    scheduleClose,
    cancelClose,
    toggleMenu,
  };
}
