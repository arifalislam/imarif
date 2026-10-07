import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";

type Step = {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  deliverables: string[];
};

const steps: Step[] = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Listen, research, frame the problem.",
    description:
      "Interviews, market scans and user research to surface the real problem worth solving.",
    details:
      "Workshops, competitive teardowns and a written problem statement everyone signs off on before a single pixel is drawn.",
    deliverables: ["Research synthesis", "User interviews", "Problem framing"],
  },
  {
    step: "02",
    title: "Strategy",
    subtitle: "Shape the bet, align on direction.",
    description:
      "Product principles, structure and one sharp vision everyone can build against.",
    details:
      "Research becomes a focused roadmap — what to build first, what to cut, and how success is measured.",
    deliverables: ["Product principles", "IA & flows", "North-star vision"],
  },
  {
    step: "03",
    title: "Design & Build",
    subtitle: "Craft pixels, motion and code.",
    description:
      "High-fidelity design systems, prototypes and production-ready interfaces.",
    details:
      "Weekly demos, shared Figma + repo, and a design system that ships with the product instead of living as a separate artifact.",
    deliverables: ["Design system", "Prototypes", "Production UI"],
  },
  {
    step: "04",
    title: "Ship & Evolve",
    subtitle: "Launch, learn, iterate.",
    description:
      "Release, measure and iterate — design doesn't end at handoff.",
    details:
      "Post-launch we instrument the product, review analytics together, and iterate against the metrics that matter.",
    deliverables: ["QA & launch", "Analytics review", "Iteration loops"],
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(".proc-box", {
        scrollTrigger: { trigger: root.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      aria-labelledby="process-heading"
      className="relative px-6 md:px-10 py-24 md:py-32 border-t border-white/10"
    >
      <div className="flex items-center gap-4 mb-10 text-xs uppercase tracking-[0.3em] text-white/60 font-semibold">
        <span className="inline-block h-px w-8 bg-white/70" />
        Process — 04
      </div>

      <h2
        id="process-heading"
        className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] mb-16 max-w-4xl"
      >
        From discovery to ship —{" "}
        <span className="font-light text-white/40">a deliberate way of working.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
        {steps.map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={s.step}
              className="proc-box border-b border-r border-white/10 p-6 md:p-8 flex flex-col"
            >
              <span className="font-display text-5xl font-black tracking-tight leading-none">
                {s.step}
              </span>
              <h3 className="mt-8 font-display text-xl md:text-2xl font-bold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] font-bold text-white/50">
                {s.subtitle}
              </p>
              <p className="mt-4 text-sm md:text-[15px] text-white/75 leading-relaxed">
                {s.description}
              </p>

              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`proc-details-${i}`}
                className="mt-6 inline-flex items-center gap-2 self-start text-[10px] uppercase tracking-[0.25em] font-bold text-white/70 hover:text-white transition-colors focus:outline-none"
              >
                <Plus
                  className={`h-3.5 w-3.5 transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
                {isOpen ? "Close" : "Read more"}
              </button>

              <div
                id={`proc-details-${i}`}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-5 mt-5 border-t border-white/10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-3">
                      / What it looks like
                    </p>
                    <p className="text-white/75 text-sm leading-relaxed">{s.details}</p>
                    <ul className="mt-5 space-y-2 list-none p-0 m-0">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-white/60"
                        >
                          <span className="h-1 w-1 bg-white rounded-full" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
