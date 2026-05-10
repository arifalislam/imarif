import p1 from "@/assets/beaver-ai.png";
import p2 from "@/assets/jerp.png";
import p3 from "@/assets/study-planner.png";

export interface ProjectData {
  slug: string;
  index: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  year: string;
  client: string;
  role: string;
  gallery: string[];
  tags: { label: string; icon: string }[];
  credit?: string;
}

export const projects: ProjectData[] = [
  {
    slug: "beaver-ai",
    index: "01",
    title: "BEAVER - Social Co-Pilot",
    description:
      "This project explores a modern SaaS landing page experience for an AI-powered social media assistant platform called BEAVER. The goal was to create a visually immersive, conversion-focused interface that communicates intelligence, automation, and real-time engagement while maintaining clarity and usability.",
    meta: "Interview Project · Problem Framing, UX Research, Jouerney Mapping,",
    image: p1,
    year: "2026",
    client: "Chromatics — AI",
    role: "Concept, storyboarding, prototyping",
    gallery: [p1, p2, p3, p1],
    tags: [
      { label: "Brand DNA", icon: "◎" },
      { label: "Ideation", icon: "✦" },
      { label: "Design", icon: "△" },
      { label: "Build", icon: "▦" },
    ],
    credit: "3D Model Credits — Shivaranjan",
  },
  {
    slug: "jmi-erp",
    index: "02",
    title: "JMI ERP - Enterprise software",
    description:
      "JMI ERP collects, stores, manages, and interprets data from your core business activities within no time to give you all of this information in real-time! This error-free ERP system keeps all your actions organized and efficient. It is a one-stop solution for all your business needs, from inventory management to customer relationship management, financial accounting, and human resources management.",
    meta: "Large Scale  Project - Understanding Business, I/A , Wireframing, Prototyping, Development Handoff",
    image: p2,
    year: "2024",
    client: "Self-initiated",
    role: "Analysis, Ideation, UX Solution, Prototyping",
    gallery: [p2, p3, p1, p2],
    tags: [
      { label: "Analyst", icon: "◷" },
      { label: "Design UX", icon: "✦" },
      { label: "Usability", icon: "◐" },
    ],
  },
  {
    slug: "study-planner",
    index: "03",
    title: "Study Planner - Product Breakdown & Form Ideation",
    description:
      "This dashboard has a sleek, high-end <strong>Light and Dark Mode</strong> aesthetic that fits the modern EdTech space well. However, there are some significant functional contradictions and UX hurdles that need to be addressed to make it truly user-friendly.",
    meta: "Individual Project",
    image: p3,
    year: "2024",
    client: "Self-initiated",
    role: "Product breakdown, form ideation, 3D model",
    gallery: [p3, p1, p2, p3],
    tags: [
      { label: "Product Breakdown", icon: "◎" },
      { label: "Concept Ideation", icon: "✦" },
      { label: "Form Ideation", icon: "△" },
      { label: "3D Model", icon: "◈" },
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
