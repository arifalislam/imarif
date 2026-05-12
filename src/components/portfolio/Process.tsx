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

      <ol className="proc-grid relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 list-none p-0 m-0">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.step}
              className="proc-card group relative border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.015] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/25 hover:bg-white/[0.03] hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 30px 80px -30px var(--accent-glow)",
                }}
              />

              <div className="relative flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full border border-white/15 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] transition-all duration-500 group-hover:border-white/30">
                    <Icon
                      className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-[color:var(--accent-red)]"
                    />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-white/40">
                    STEP / {s.step}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="font-display text-5xl md:text-6xl text-white/[0.06] leading-none transition-colors duration-500 group-hover:text-white/[0.12]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative">
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--accent-red)] uppercase tracking-[0.2em]">
                  {s.subtitle}
                </p>
                <p className="mt-5 text-white/65 leading-relaxed text-base max-w-xl">
                  {s.description}
                </p>

                <ul className="flex flex-wrap gap-2 mt-6 list-none p-0">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-[10px] uppercase tracking-[0.2em] text-white/70 border border-white/15 rounded-full px-3 py-1.5 bg-white/[0.02] transition-all duration-300 group-hover:border-white/25"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
