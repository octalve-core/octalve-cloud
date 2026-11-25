"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

// Edit campaign copy here. Publish discounts or guarantees only with approved offer terms.
const announcements = [
  { label: "Explore cloud packages", href: "/hosting" },
  { label: "Find your perfect domain", href: "/domains" },
  { label: "Business email made simple", href: "/email" },
  { label: "Move your website with confidence", href: "/migration" },
  { label: "Talk to our support team", href: "/support" },
];

export function AnnouncementStripe() {
  return (
    <aside aria-label="Octalve Cloud announcements" className="relative flex h-8 items-center overflow-hidden bg-[#C51D32] text-white">
      <div className="announcement-window min-w-0 flex-1 overflow-hidden">
        <div className="announcement-track flex w-max items-center">
          {[0, 1].map(copy => (
            <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
              {announcements.map(item => (
                <div key={item.href} className="flex shrink-0 items-center gap-8 px-8 text-xs font-medium sm:text-sm">
                  {copy === 0 ? <Link href={item.href} className="whitespace-nowrap hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{item.label}</Link> : <span className="whitespace-nowrap">{item.label}</span>}
                  <Sparkles size={13} aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .announcement-track { animation: announcement-scroll 38s linear infinite; }
        .announcement-window:hover .announcement-track,
        .announcement-window:focus-within .announcement-track,
        .announcement-window:active .announcement-track { animation-play-state: paused; }
        .announcement-window:focus-within { overflow-x: auto; }
        .announcement-window:focus-within .announcement-track { transform: none; animation: none; }
        @keyframes announcement-scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce), (hover: none) {
          .announcement-track { animation: none; }
          .announcement-window { overflow-x: auto; scrollbar-width: none; }

        }
      `}</style>
    </aside>
  );
}
