"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Magnetic } from "@/components/motion/magnetic";
import { nav, site, waLink } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[84rem] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" aria-label={`${site.name} — beranda`}>
          <Logo />
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm tracking-wide transition-colors ${
                  active
                    ? "text-brand"
                    : "text-ink-soft hover:text-brand"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:block" strength={0.25}>
            <a
              href={waLink("Halo Arflora, saya ingin bertanya tentang bunga.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-cream shadow-xs transition-all hover:bg-brand-dark hover:shadow-md"
            >
              Pesan Bunga
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Buka menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand hover:bg-sprout-soft md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigasi seluler"
          className="border-t border-brand/10 bg-cream px-6 py-5 sm:px-8 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-display text-lg text-ink hover:bg-brand/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={waLink("Halo Arflora, saya ingin bertanya tentang bunga.")}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-brand px-4 py-3 text-center text-sm font-medium text-cream"
              >
                Pesan Bunga
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
