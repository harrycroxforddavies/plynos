import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { HeroBridge } from "@/components/site/HeroBridge";
import { Blogs } from "@/components/site/Blogs";
import { FinalCta } from "@/components/site/FinalCta";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HeroBridge />
        <Blogs />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
