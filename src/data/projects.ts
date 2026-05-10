import p1 from "@/assets/beaver-ai.png";
import p2 from "@/assets/jerp.png";
import p3 from "@/assets/study-planner.png";

export interface CaseStudySection {
  body: string;
  bullets?: string[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

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
  problem?: CaseStudySection;
  research?: CaseStudySection;
  solution?: CaseStudySection;
  results?: { summary: string; metrics: CaseStudyMetric[] };
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
    problem: {
      body: "Social teams juggle dozens of accounts, content calendars and analytics dashboards every day. Existing tools optimize for scheduling but rarely help with the actual decision: <em>what to post next, and why</em>. The challenge was to design a co-pilot that turns scattered data into confident, on-brand action — without feeling like another inbox to manage.",
      bullets: [
        "Fragmented workflow across 4–6 disconnected tools",
        "Generic AI suggestions that ignore brand voice",
        "Slow loop between insight and publishing",
      ],
    },
    research: {
      body: "I interviewed 8 social media managers across SaaS, DTC and creator-led brands, then mapped a typical week into a journey diagram. Patterns surfaced quickly: most time was lost to context-switching and second-guessing copy, not the act of posting itself.",
      bullets: [
        "8 in-depth interviews · 3 industries",
        "Competitive teardown of 5 leading tools",
        "Synthesis into 3 archetypes and a job-to-be-done map",
      ],
    },
    solution: {
      body: "BEAVER is built around a single conversational surface. The AI proposes posts grounded in real-time performance, brand voice and trending signals — and every suggestion is editable inline. A live preview pane mirrors each network so the team can ship without leaving the canvas.",
      bullets: [
        "Conversational composer with brand-trained suggestions",
        "Real-time multi-network preview",
        "Performance feedback loop that retrains tone weekly",
      ],
    },
    results: {
      summary:
        "The prototype tested with 12 users in moderated sessions. Task success rose sharply and qualitative feedback consistently called the experience “the first AI tool that feels like a teammate.”",
      metrics: [
        { value: "3.2×", label: "Faster post creation" },
        { value: "92%", label: "Task success rate" },
        { value: "+47", label: "NPS in usability test" },
        { value: "4 wks", label: "End-to-end timeline" },
      ],
    },
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
    problem: {
      body: "JMI's operations ran on a patchwork of spreadsheets, legacy software and email threads. Stock counts drifted, finance closed the month late, and HR records lived in three different places. Leadership needed a single source of truth without forcing teams to abandon the workflows they trusted.",
      bullets: [
        "12+ disconnected systems across 4 departments",
        "Manual reconciliation eating 30+ hours per week",
        "No real-time visibility for leadership decisions",
      ],
    },
    research: {
      body: "I shadowed staff across inventory, finance, sales and HR for two weeks, building a service blueprint of every hand-off and bottleneck. Stakeholder workshops translated business rules into a shared information architecture before a single screen was drawn.",
      bullets: [
        "Field study with 14 staff across 4 departments",
        "Service blueprint covering 38 critical workflows",
        "Information architecture validated through tree testing",
      ],
    },
    solution: {
      body: "A modular ERP with a unified shell, role-aware dashboards and a configurable record system. Heavy data tables were redesigned around progressive disclosure, while keyboard-first interactions kept power users fast. A clean handoff system shipped tokens, components and specs straight to the engineering team.",
      bullets: [
        "Unified shell with role-based navigation",
        "Configurable tables with bulk actions and saved views",
        "Design system documented for ongoing development",
      ],
    },
    results: {
      summary:
        "Post-launch, leadership gained near real-time visibility and operational teams reclaimed days each month previously lost to reconciliation.",
      metrics: [
        { value: "−68%", label: "Manual data entry" },
        { value: "4×", label: "Faster month-end close" },
        { value: "38", label: "Workflows unified" },
        { value: "6 mo", label: "From discovery to v1" },
      ],
    },
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
    problem: {
      body: "Students juggle multiple subjects, deadlines and energy levels but most planners treat every task the same. The existing dashboard looked beautiful yet failed at its core job: helping a learner decide what to study <em>now</em>.",
      bullets: [
        "Visual polish without behavioural support",
        "No prioritisation between subjects or deadlines",
        "Dark/light parity broken in critical states",
      ],
    },
    research: {
      body: "I deconstructed the existing product screen by screen, noted every UX contradiction, and benchmarked patterns from leading study and habit apps. A short diary study with 5 students grounded the redesign in real friction.",
      bullets: [
        "Audit of 22 screens with severity scoring",
        "Benchmarks across 6 EdTech and habit apps",
        "5-student diary study over one exam week",
      ],
    },
    solution: {
      body: "A focused planner that opens on a single recommended block, surfaces upcoming priorities second, and tucks analytics behind a deliberate tap. Form ideation explored softer, tactile shapes for the companion device, with a 3D model used to validate ergonomics.",
      bullets: [
        "“Now / Next / Later” information hierarchy",
        "Refined form language with 3D form study",
        "Audited dark and light parity for every state",
      ],
    },
    results: {
      summary:
        "The redesigned concept tested better on clarity and motivation, and the form study produced a tangible direction for the companion device.",
      metrics: [
        { value: "+38%", label: "Clarity of next action" },
        { value: "5/5", label: "Diary study participants" },
        { value: "3", label: "Form directions explored" },
        { value: "1 wk", label: "Concept sprint" },
      ],
    },
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
