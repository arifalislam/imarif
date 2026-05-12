import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Lightbulb, Hammer, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  step: string;
  title: string;
  subtitle: string;
  description: string;
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
    deliverables: ["Research synthesis", "User interviews", "Problem framing"],
    icon: Compass,
  },
  {
    step: "02",
    title: "Strategy",
    subtitle: "Shape the bet, align on direction.",
    description:
      "Product principles, information architecture and a north-star vision. We commit to one sharp narrative everyone can build against.",
    deliverables: ["Product principles", "IA & flows", "North-star vision"],
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Design & Build",
    subtitle: "Craft pixels, motion and code.",
    description:
      "High-fidelity design systems, prototypes and production-ready interfaces — designed in tight loops with engineering.",
    deliverables: ["Design system", "Prototypes", "Production UI"],
    icon: Hammer,
  },
  {
    step: "04",
    title: "Ship & Evolve",
    subtitle: "Launch, learn, iterate.",
    description:
      "Release, measure and iterate. Design isn't done at handoff — we tune the experience based on what users actually do.",
    deliverables: ["QA & launch", "Analytics review", "Iteration loops"],
    icon: Rocket,
  },
];

export function Process() {
  const root = useRef<HTMLDivElement>(null);

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
          return (
            <li
              key={s.step}
              className="proc-card group relative flex flex-col p-6 md:p-8 border-white/10 md:border-l first:md:border-l-0 border-t md:border-t-0 transition-colors duration-500 hover:bg-white/[0.025]"
            >
              {/* Top: step number + icon */}
              <div className="flex items-center justify-between mb-10 md:mb-14">
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40">
                  / {s.step}
                </span>
                <div className="relative h-10 w-10 rounded-full border border-white/15 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] transition-all duration-500 group-hover:border-[color:var(--accent-red)]/60">
                  <Icon className="h-4 w-4 text-white/70 transition-colors duration-300 group-hover:text-[color:var(--accent-red)]" />
                </div>
              </div>

              {/* Big numeral */}
              <span
                aria-hidden="true"
                className="font-display text-6xl md:text-7xl text-white/[0.08] leading-none mb-6 transition-colors duration-500 group-hover:text-white/[0.18]"
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

              {/* Bottom accent line */}
              <span
                aria-hidden="true"
                className="absolute left-0 bottom-0 h-px w-0 bg-[color:var(--accent-red)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                style={{ boxShadow: "0 0 16px var(--accent-glow)" }}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
