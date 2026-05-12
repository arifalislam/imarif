import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { ProjectBlock } from "@/components/portfolio/ProjectBlock";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Process } from "@/components/portfolio/Process";
import { Footer } from "@/components/portfolio/Footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A R I F — Seasoned Digital Product Designer" },
      {
        name: "description",
        content:
          "Selected work in digital and product design — concepts, form studies and prototypes by A R I F.",
      },
      { property: "og:title", content: "Kushagra — Industrial Designer Portfolio" },
      { property: "og:description", content: "Selected work in industrial and product design." },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <main className="noise bg-black text-white selection:bg-white selection:text-black">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <section id="work">
        {projects.map((p, i) => (
          <ProjectBlock
            key={p.slug}
            slug={p.slug}
            index={p.index}
            title={p.title}
            description={p.description}
            meta={p.meta}
            tags={p.tags}
            image={p.image}
            reverse={i % 2 === 1}
            credit={p.credit}
          />
        ))}
      </section>
      <Experience />
      <Process />
      <Footer />
    </main>
  );
}
