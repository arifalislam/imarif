import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Lightbulb, Hammer, Rocket, Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const steps: Step[] = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Listen, research, frame the problem.",
    description:
      "Stakeholder interviews, market scans and user research to understand the why before the what. We surface the real problem worth solving.",
    details:
      "Expect workshops, competitive teardowns and a written problem statement everyone signs off on before a single pixel is drawn.",
    deliverables: ["Research synthesis", "User interviews", "Problem framing"],
    icon: Compass,
  },
  {
    step: "02",
    title: "Strategy",
    subtitle: "Shape the bet, align on direction.",
    description:
      "Product principles, information architecture and a north-star vision. We commit to one sharp narrative everyone can build against.",
    details:
      "We translate research into a focused roadmap — what to build first, what to cut, and the success metrics that prove it works.",
    deliverables: ["Product principles", "IA & flows", "North-star vision"],
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Design & Build",
    subtitle: "Craft pixels, motion and code.",
    description:
      "High-fidelity design systems, prototypes and production-ready interfaces — designed in tight loops with engineering.",
    details:
      "Weekly demos, shared Figma + repo, and a design system that ships with the product instead of living as a separate artifact.",
    deliverables: ["Design system", "Prototypes", "Production UI"],
    icon: Hammer,
  },
  {
    step: "04",
    title: "Ship & Evolve",
    subtitle: "Launch, learn, iterate.",
    description:
      "Release, measure and iterate. Design isn't done at handoff — we tune the experience based on what users actually do.",
    details:
      "Post-launch we instrument the product, review analytics together, and run focused iteration sprints against the metrics that matter.",
    deliverables: ["QA & launch", "Analytics review", "Iteration loops"],
    icon: Rocket,
  },
];

export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".proc-head", ".proc-card"], { opacity: 1, y: 0 });
        return;
      }

      gsap.from(".proc-head", {
        scrollTrigger: { trigger: root.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
      });

      gsap.from(".proc-card", {
        scrollTrigger: { trigger: ".proc-grid", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      aria-labelledby="process-heading"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-white/10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 10%, var(--accent-red) 0, transparent 40%), radial-gradient(circle at 10% 90%, white 0, transparent 35%)",
        }}
      />

      <div className="relative grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <p className="proc-head text-xs uppercase tracking-[0.3em] text-white/40">
            <span className="inline-block w-8 h-px bg-[color:var(--accent-red)] align-middle mr-3" />
            Process — 04
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2
            id="process-heading"
            className="proc-head font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-medium text-balance"
          >
            From discovery to ship —
            <br />
            <span className="italic text-white/50">a deliberate way of working.</span>
          </h2>
        </div>
      </div>

      <ol className="proc-grid relative grid grid-cols-1 md:grid-cols-4 border-t border-b border-white/10 list-none p-0 m-0">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isOpen = openIndex === i;
          const panelId = `process-panel-${i}`;
          return (
            <li
              key={s.step}
              className="proc-card group relative border-white/10 md:border-l first:md:border-l-0 border-t md:border-t-0"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`relative w-full text-left flex flex-col p-6 md:p-8 transition-colors duration-500 hover:bg-white/[0.025] focus:outline-none focus-visible:bg-white/[0.03] ${
                  isOpen ? "bg-white/[0.03]" : ""
                }`}
              >
                {/* Top: step number + icon */}
                <div className="flex items-center justify-between mb-10 md:mb-14">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-white/40">
                    / {s.step}
                  </span>
                  <div
                    className={`relative h-10 w-10 rounded-full border flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] transition-all duration-500 ${
                      isOpen
                        ? "border-[color:var(--accent-red)]/60"
                        : "border-white/15 group-hover:border-[color:var(--accent-red)]/60"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isOpen
                          ? "text-[color:var(--accent-red)]"
                          : "text-white/70 group-hover:text-[color:var(--accent-red)]"
                      }`}
                    />
                  </div>
                </div>

                {/* Big numeral */}
                <span
                  aria-hidden="true"
                  className={`font-display text-6xl md:text-7xl leading-none mb-6 transition-colors duration-500 ${
                    isOpen ? "text-white/[0.18]" : "text-white/[0.08] group-hover:text-white/[0.18]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Body */}
                <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-[10px] md:text-[11px] text-[color:var(--accent-red)] uppercase tracking-[0.2em]">
                  {s.subtitle}
                </p>
                <p className="mt-4 text-white/60 leading-relaxed text-sm">
                  {s.description}
                </p>

                <ul className="flex flex-wrap gap-1.5 mt-6 list-none p-0">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-[9px] uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full px-2.5 py-1 transition-all duration-300 group-hover:border-white/25 group-hover:text-white/80"
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Expandable details */}
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-6"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`pt-5 border-t border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-2">
                        What it looks like
                      </p>
                      <p className="text-white/70 leading-relaxed text-sm">
                        {s.details}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Toggle indicator */}
                <span
                  aria-hidden="true"
                  className={`mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                    isOpen ? "text-[color:var(--accent-red)]" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  <Plus
                    className={`h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  />
                  {isOpen ? "Close" : "Read more"}
                </span>

                {/* Bottom accent line */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 bottom-0 h-px bg-[color:var(--accent-red)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ boxShadow: "0 0 16px var(--accent-glow)" }}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
