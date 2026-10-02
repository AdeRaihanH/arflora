import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, site, waLink } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-brand-deep text-cream">
      <div className="mx-auto grid w-full max-w-[84rem] gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div className="space-y-4">
          <Logo tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            {site.description}
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg text-cream">Jelajahi</h2>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream/75 transition-colors hover:text-sprout"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-cream">Hubungi</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li>
              <a
                href={waLink("Halo Arflora, saya ingin bertanya tentang bunga.")}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-sprout"
              >
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-sprout"
              >
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <p className="mx-auto w-full max-w-[84rem] px-6 py-7 text-xs text-cream/50 sm:px-8 lg:px-12">
          &copy; {year} {site.name}. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
