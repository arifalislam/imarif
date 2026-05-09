import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { ProjectBlock } from "@/components/portfolio/ProjectBlock";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { ProjectModal, type ProjectData } from "@/components/portfolio/ProjectModal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import p1 from "@/assets/beaver-ai.png";
import p2 from "@/assets/jerp.png";
import p3 from "@/assets/study-planner.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A R I F — Seasoned Digital Product Designer" },
      { name: "description", content: "Selected work in digital and product design — concepts, form studies and prototypes by A R I F." },
      { property: "og:title", content: "Kushagra — Industrial Designer Portfolio" },
      { property: "og:description", content: "Selected work in industrial and product design." },
    ],
  }),
  component: Index,
});

const projects: ProjectData[] = [
  {
    index: "01",
    title: "BEAVER - Social Co-Pilot",
    description: "This project explores a modern SaaS landing page experience for an AI-powered social media assistant platform called BEAVER. The goal was to create a visually immersive, conversion-focused interface that communicates intelligence, automation, and real-time engagement while maintaining clarity and usability.",
    meta: "Interview Project · Problem Framing, UX Research, Jouerney Mapping,",
    image: p1,
    year: "2026",
    client: "Chromatics — AI",
    role: "Concept, storyboarding, prototyping",
    gallery: [p1, p2, p3, p1],
  },
  {
    index: "02",
    title: "JMI ERP - Enterprise software",
    description: "JMI ERP collects, stores, manages, and interprets data from your core business activities within no time to give you all of this information in real-time! This error-free ERP system keeps all your actions organized and efficient. It is a one-stop solution for all your business needs, from inventory management to customer relationship management, financial accounting, and human resources management.",
    meta: "Large Scale  Project - Understanding Business, I/A , Wireframing, Prototyping, Development Handoff",
    image: p2,
    year: "2024",
    client: "Self-initiated",
    role: "Analysis, Ideation, UX Solution, Prototyping",
    gallery: [p2, p3, p1, p2],
  },
  {
    index: "03",
    title: "Study Planner - Product Breakdown & Form Ideation",
    description: "This dashboard has a sleek, high-end <strong>Light and Dark Mode</strong> aesthetic that fits the modern EdTech space well. However, there are some significant functional contradictions and UX hurdles that need to be addressed to make it truly user-friendly.",
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
      { label: "Brand DNA", icon: "◎" },
      { label: "Ideation", icon: "✦" },
      { label: "Design", icon: "△" },
      { label: "Build", icon: "▦" },
    ],
    [
      { label: "Analyst", icon: "◷" },
      { label: "Design UX", icon: "✦" },
      { label: "Usability", icon: "◐" },
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
      <Experience />
      <Footer />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </main>
  );
}
