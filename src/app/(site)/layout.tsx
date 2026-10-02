import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
