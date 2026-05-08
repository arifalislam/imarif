import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { ProjectBlock } from "@/components/portfolio/ProjectBlock";
import { About } from "@/components/portfolio/About";
import { Footer } from "@/components/portfolio/Footer";
import { ProjectModal, type ProjectData } from "@/components/portfolio/ProjectModal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
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

const projects: ProjectData[] = [
  {
    index: "01",
    title: "NOTHING Modular Speaker",
    description: "The NOTHING Speaker (1) embodies a conceptual modular speaker design, delivering a 50-watt output while adhering to the distinctive design ethos of the NOTHING brand.",
    meta: "Group Project · Aparna, Shivaranjan, Samar, Kushagra",
    image: p1,
    year: "2025",
    client: "Academic — NID",
    role: "Brand study, form ideation, tech pack",
    gallery: [p1, p2, p3, p1],
  },
  {
    index: "02",
    title: "Connectivity through emotions",
    description: "A timer for people who have trouble controlling their productive and free time because of poor time management and a lack of self-control.",
    meta: "Individual Project",
    image: p2,
    year: "2024",
    client: "Self-initiated",
    role: "Concept, storyboarding, prototyping",
    gallery: [p2, p3, p1, p2],
  },
  {
    index: "03",
    title: "Flashlight Design",
    description: "Introducing a fresh form factor aspect to the conventional and mundane flashlight in the Indian market industry.",
    meta: "Individual Project",
    image: p3,
    year: "2024",
    client: "Self-initiated",
    role: "Product breakdown, form ideation, 3D model",
    gallery: [p3, p1, p2, p3],
  },
];

function Index() {
  useSmoothScroll();
  const [active, setActive] = useState<ProjectData | null>(null);

  const tags = [
    [
      { label: "Brand Study", icon: "◎" },
      { label: "Concept Ideation", icon: "✦" },
      { label: "Form Ideation", icon: "△" },
      { label: "Tech Pack", icon: "▦" },
    ],
    [
      { label: "Story Boarding", icon: "◷" },
      { label: "Concept Ideation", icon: "✦" },
      { label: "Prototyping", icon: "◐" },
    ],
    [
      { label: "Product Breakdown", icon: "◎" },
      { label: "Concept Ideation", icon: "✦" },
      { label: "Form Ideation", icon: "△" },
      { label: "3D Model", icon: "◈" },
    ],
  ];

  return (
    <main className="noise bg-black text-white selection:bg-white selection:text-black">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <section id="work">
        {projects.map((p, i) => (
          <ProjectBlock
            key={p.index}
            index={p.index}
            title={p.title}
            description={p.description}
            meta={p.meta}
            tags={tags[i]}
            image={p.image}
            reverse={i % 2 === 1}
            credit={i === 0 ? "3D Model Credits — Shivaranjan" : undefined}
            onOpen={() => setActive(p)}
          />
        ))}
      </section>
      <Footer />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </main>
  );
}
