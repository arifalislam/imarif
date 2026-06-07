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
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".proc-head", ".proc-rail", ".proc-panel"], { opacity: 1, y: 0 });
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

      gsap.from(".proc-rail", {
        scrollTrigger: { trigger: ".proc-shell", start: "top 80%" },
        x: -20,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.from(".proc-panel", {
        scrollTrigger: { trigger: ".proc-shell", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.15,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
    );
  }, [activeIndex]);

  useEffect(() => {
    setDetailsOpen(false);
  }, [activeIndex]);

  const active = steps[activeIndex];
  const ActiveIcon = active.icon;

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
            "radial-gradient(circle at 80% 10%, white 0, transparent 40%), radial-gradient(circle at 10% 90%, white 0, transparent 35%)",
        }}
      />

      <div className="relative grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <p className="proc-head text-xs uppercase tracking-[0.3em] text-white/60 font-semibold">
            <span className="inline-block w-8 h-px bg-white/60 align-middle mr-3" />
            Process — 04
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2
            id="process-heading"
            className="proc-head font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-bold text-balance"
          >
            From discovery to ship —
            <br />
            <span className="italic font-semibold text-white/60">a deliberate way of working.</span>
          </h2>
        </div>
      </div>

      <div className="proc-shell relative grid grid-cols-1 md:grid-cols-12 border-t border-white/10">
        {/* Sticky index rail */}
        <aside className="proc-rail md:col-span-4 lg:col-span-3 border-b md:border-b-0 md:border-r border-white/10">
          <div className="md:sticky md:top-24 p-6 md:p-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 font-bold mb-8">
              / Index
            </p>
            <nav aria-label="Process steps">
              <ul className="relative list-none p-0 m-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
                {steps.map((s, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <li key={s.step} className="shrink-0 md:shrink">
                      <button
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group relative w-full text-left flex items-center gap-4 py-3 md:py-4 pr-4 transition-colors duration-500 focus:outline-none`}
                      >
                        <span
                          aria-hidden="true"
                          className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-6 w-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive
                              ? "bg-white opacity-100"
                              : "bg-white/30 opacity-0 group-hover:opacity-60"
                          }`}
                        />
                        <span
                          className={`pl-4 font-mono text-[11px] tracking-[0.2em] font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-white/50 group-hover:text-white/80"
                          }`}
                        >
                          {s.step}
                        </span>
                        <span
                          className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-white/50 group-hover:text-white/80"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Detail panel */}
        <div className="proc-panel md:col-span-8 lg:col-span-9 relative">
          <div ref={panelRef} className="relative p-6 md:p-12 lg:p-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 right-4 md:right-8 font-display italic font-bold text-white/[0.05] text-[10rem] md:text-[16rem] leading-none select-none"
            >
              {active.step}
            </span>

            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative h-11 w-11 rounded-full border border-white/30 bg-gradient-to-br from-white/10 to-white/[0.02] flex items-center justify-center">
                  <ActiveIcon className="h-4 w-4 text-white" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-white/50">
                  / {active.step}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
                {active.title}
              </h3>
              <p className="text-[10px] md:text-[11px] text-white/80 font-bold uppercase tracking-[0.25em] mb-8">
                {active.subtitle}
              </p>

              <p className="text-white/75 font-medium leading-relaxed text-base md:text-lg max-w-xl mb-10">
                {active.description}
              </p>

              <div className="mb-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-4">
                  Key deliverables
                </p>
                <ul className="flex flex-wrap gap-2 list-none p-0">
                  {active.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/85 border border-white/15 bg-white/[0.04] rounded-full px-3 py-1.5"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                id={`process-panel-details-${activeIndex}`}
                className={`grid transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  detailsOpen
                    ? "grid-rows-[1fr] opacity-100 mt-2"
                    : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`pt-6 border-t border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      detailsOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-1 opacity-0"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2">
                      What it looks like
                    </p>
                    <p className="text-white/80 font-medium leading-relaxed text-sm md:text-base max-w-xl">
                      {active.details}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailsOpen((o) => !o)}
                aria-expanded={detailsOpen}
                aria-controls={`process-panel-details-${activeIndex}`}
                className="mt-6 inline-flex items-center gap-2 group focus:outline-none"
              >
                <span className="h-px w-4 bg-white/70 transition-all duration-500 group-hover:w-8" />
                <Plus
                  className={`h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    detailsOpen ? "rotate-45 text-white" : "rotate-0 text-white/70 group-hover:text-white"
                  }`}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-300 ${
                    detailsOpen ? "text-white" : "text-white/70 group-hover:text-white"
                  }`}
                >
                  {detailsOpen ? "Close" : "Read more"}
                </span>
              </button>
            </div>
          </div>

          <span
            aria-hidden="true"
            className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-white/40 via-white/15 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
