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
  const nextIndex = (activeIndex + 1) % steps.length;
  const next = steps[nextIndex];

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

      <div className="proc-shell relative grid grid-cols-12 gap-0 border-l border-white/10">
        {/* Left: sticky context column */}
        <aside className="proc-rail col-span-12 lg:col-span-5 flex flex-col justify-between gap-16 py-12 px-6 md:px-10 lg:sticky lg:top-24 lg:h-[80vh]">
          <div className="space-y-10">
            <p className="proc-head flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/60 font-semibold">
              <span className="inline-block h-px w-8 bg-white/70" />
              Process — 04
            </p>
            <h2
              id="process-heading"
              className="proc-head font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight font-bold text-balance"
            >
              From discovery to ship —
              <br />
              <span className="font-light text-white/40">
                a deliberate way of working.
              </span>
            </h2>
          </div>

          <nav aria-label="Process steps" className="hidden lg:block">
            <ul className="flex flex-col gap-6 list-none p-0 m-0">
              {steps.map((s, i) => {
                const isActive = activeIndex === i;
                return (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`group flex items-end gap-4 transition-opacity duration-300 focus:outline-none ${
                        isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
                      }`}
                    >
                      <span className="font-display text-3xl font-black text-white leading-none tracking-tight">
                        {s.step}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-1 border-b transition-colors duration-300 ${
                          isActive ? "border-white text-white" : "border-transparent text-white/80"
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

          {/* Mobile/tablet horizontal step nav */}
          <nav aria-label="Process steps" className="lg:hidden -mx-6 md:-mx-10 px-6 md:px-10">
            <ul className="flex gap-4 list-none p-0 m-0 overflow-x-auto pb-2">
              {steps.map((s, i) => {
                const isActive = activeIndex === i;
                return (
                  <li key={s.step} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex items-end gap-2 py-2 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <span className="font-display text-2xl font-black leading-none tracking-tight">
                        {s.step}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-1 border-b ${
                          isActive ? "border-white text-white" : "border-transparent text-white/70"
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
        </aside>

        {/* Right: detail panel */}
        <div className="proc-panel col-span-12 lg:col-span-7 border-l border-white/10 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-8 md:-right-12 font-display font-black text-white/[0.04] leading-none select-none text-[14rem] md:text-[20rem] lg:text-[22rem] tracking-tighter"
          >
            {active.step}
          </span>

          <div ref={panelRef} className="relative z-10 p-8 md:p-16 lg:p-20 flex flex-col min-h-[70vh]">
            <header className="mb-12">
              <div className="inline-flex items-center gap-3 py-2 px-4 border border-white/20 rounded-full mb-8">
                <span className="h-2 w-2 rounded-full bg-white" />
                <ActiveIcon className="h-3.5 w-3.5 text-white" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold text-white">
                  Phase {active.step} / {active.title}
                </span>
              </div>
              <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-white mb-6">
                {active.title}
              </h3>
              <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] font-bold text-white/60 uppercase">
                {active.subtitle}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mt-auto">
              <div>
                <p className="text-lg md:text-xl font-light leading-relaxed text-white/80">
                  {active.description}
                </p>

                <div
                  id={`process-panel-details-${activeIndex}`}
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    detailsOpen
                      ? "grid-rows-[1fr] opacity-100 mt-8"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-6 border-t border-white/10">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-3">
                        / What it looks like
                      </p>
                      <p className="text-white/75 font-light leading-relaxed text-sm md:text-base">
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

              <div className="flex flex-col justify-end">
                <ul className="space-y-4 border-t border-white/10 pt-8 list-none p-0 m-0">
                  {active.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-white/70"
                    >
                      <span className="h-1 w-1 bg-white rounded-full" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next step navigator */}
            <div className="mt-16 md:mt-20 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveIndex(nextIndex)}
                className="flex items-center gap-4 group focus:outline-none"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-white transition-colors duration-300">
                  Next step
                </span>
                <span className="h-px w-12 bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                <span className="font-display text-sm font-black tracking-tight text-white">
                  {next.step} · {next.title}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
