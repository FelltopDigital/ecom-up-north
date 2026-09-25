import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Topics } from "@/components/topics";
import { WhyAttend } from "@/components/why-attend";
import { Speakers } from "@/components/speakers";
import { Agenda } from "@/components/agenda";
import { Tickets } from "@/components/tickets";
import { Faq } from "@/components/faq";
import { Register } from "@/components/register";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Topics />
        <WhyAttend />
        <Speakers />
        <Agenda />
        <Tickets />
        <section className="px-3">
          <div data-nav-light className="relative overflow-hidden rounded-[2rem] bg-paper px-4 py-24 text-ink md:py-32">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[-20rem] left-1/2 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,var(--color-lime),var(--color-aurora-teal),var(--color-aurora-violet),var(--color-lime))] opacity-20 blur-[140px]"
            />
            <div className="relative">
              <Faq />
              <Register />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
