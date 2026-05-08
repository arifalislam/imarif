import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { ProjectBlock } from "@/components/portfolio/ProjectBlock";
import { Footer } from "@/components/portfolio/Footer";
import p1 from "@/assets/project-01.jpg";
import p2 from "@/assets/project-02.jpg";
import p3 from "@/assets/project-03.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kushagra — Industrial Designer Portfolio" },
      { name: "description", content: "Selected work in industrial and product design — concepts, form studies and prototypes by Kushagra." },
      { property: "og:title", content: "Kushagra — Industrial Designer Portfolio" },
      { property: "og:description", content: "Selected work in industrial and product design." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="noise bg-black text-white selection:bg-white selection:text-black">
      <Nav />
      <Hero />
      <Marquee />
      <section id="work">
        <ProjectBlock
          index="01"
          title="NOTHING Modular Speaker"
          description="The NOTHING Speaker (1) embodies a conceptual modular speaker design, delivering a 50-watt output while adhering to the distinctive design ethos of the NOTHING brand."
          meta="Group Project · Aparna, Shivaranjan, Samar, Kushagra"
          tags={[
            { label: "Brand Study", icon: "◎" },
            { label: "Concept Ideation", icon: "✦" },
            { label: "Form Ideation", icon: "△" },
            { label: "Tech Pack", icon: "▦" },
          ]}
          image={p1}
          credit="3D Model Credits — Shivaranjan"
        />
        <ProjectBlock
          index="02"
          title="Connectivity through emotions"
          description="A timer for people who have trouble controlling their productive and free time because of poor time management and a lack of self-control."
          meta="Individual Project"
          tags={[
            { label: "Story Boarding", icon: "◷" },
            { label: "Concept Ideation", icon: "✦" },
            { label: "Prototyping", icon: "◐" },
          ]}
          image={p2}
          reverse
        />
        <ProjectBlock
          index="03"
          title="Flashlight Design"
          description="Introducing a fresh form factor aspect to the conventional and mundane flashlight in the Indian market industry."
          meta="Individual Project"
          tags={[
            { label: "Product Breakdown", icon: "◎" },
            { label: "Concept Ideation", icon: "✦" },
            { label: "Form Ideation", icon: "△" },
            { label: "3D Model", icon: "◈" },
          ]}
          image={p3}
        />
      </section>
      <Footer />
    </main>
  );
}
