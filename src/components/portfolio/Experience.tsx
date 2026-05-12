import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
};

const items: Item[] = [
  {
    year: "2024 — Present",
    role: "Sr. UI/UX Designer",
    company: "JMI Group",
    location: "Remote",
    description:
      "Leading end-to-end design for AI-native social products. Shaping design systems, motion language and 0→1 product bets.",
    highlights: ["Design Systems", "AI/UX", "0→1 Product"],
  },
  {
    year: "2022 — 2024",
    role: "UXUI Designer",
    company: "Notionhive",
    location: "New Delhi",
    description:
      "Owned the ERP redesign across inventory, finance and CRM modules. Partnered with engineering on a unified component library.",
    highlights: ["Enterprise UX", "Component Library", "Research"],
  },
  {
    year: "2020 — 2022",
    role: "UI / UX Designer",
    company: "Freelance & Studios",
    location: "India",
    description:
      "Designed mobile apps, dashboards and brand systems for early-stage startups across EdTech, fintech and lifestyle verticals.",
    highlights: ["Mobile", "Dashboards", "Brand"],
  },
  {
    year: "2018 — 2020",
    role: "Visual Designer",
    company: "Independent Practice",
    location: "India",
    description:
      "Built foundations in typography, layout and visual storytelling. Shipped marketing sites and brand identities.",
    highlights: ["Typography", "Identity", "Web"],
  },
];

export function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".exp-head", ".exp-row", ".exp-rule"], {
          opacity: 1,
          y: 0,
          scaleX: 1,
          clearProps: "transform",
        });
        return;
      }

      gsap.from(".exp-head", {
        scrollTrigger: { trigger: root.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
      });

      gsap.from(".exp-row", {
        scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
      });

      gsap.fromTo(
        ".exp-rule",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-list",
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % items.length;
      setActive(next);
      rowRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + items.length) % items.length;
      setActive(prev);
      rowRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
      rowRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = items.length - 1;
      setActive(last);
      rowRefs.current[last]?.focus();
    }
  };

  return (
    <section
      ref={root}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-white/10 overflow-hidden"
    >
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, var(--accent-red) 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 35%)",
        }}
      />

      <div className="relative grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <p className="exp-head text-xs uppercase tracking-[0.3em] text-white/40">
            <span className="inline-block w-8 h-px bg-[color:var(--accent-red)] align-middle mr-3" />
            Experience — 03
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2
            id="experience-heading"
            className="exp-head font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-medium text-balance"
          >
            A decade of designing
            <br />
            <span className="italic text-white/50">products that matter.</span>
          </h2>
        </div>
      </div>

      <div
        className="exp-list relative grid grid-cols-12 gap-6 md:gap-10"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Career timeline"
      >
        {/* Timeline rail */}
        <div className="hidden md:block col-span-1 relative" aria-hidden="true">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <div className="exp-rule absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--accent-red)] via-white/60 to-transparent -translate-x-1/2 origin-top" />
        </div>

        <ol className="col-span-12 md:col-span-11 list-none p-0 m-0">
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <li key={i} className="exp-row relative">
                <button
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-expanded={isActive}
                  aria-controls={`exp-panel-${i}`}
                  id={`exp-tab-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group relative w-full text-left grid grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 px-4 md:px-6 border-t border-white/10 transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive ? "" : "hover:bg-white/[0.02] hover:translate-x-1"
                  }`}
                >
                  {/* Year + dot + index */}
                  <div className="col-span-12 md:col-span-3 flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-2 w-2 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-[color:var(--accent-red)] shadow-[0_0_0_4px_var(--accent-glow-soft)]"
                          : "bg-white/30 group-hover:bg-white/60"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
                        {item.year}
                      </p>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-12 md:col-span-5">
                    <h3
                      className={`font-display text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/85 group-hover:text-white"
                      }`}
                    >
                      {item.role}
                    </h3>
                    <p className="mt-2 text-[11px] md:text-xs text-[color:var(--accent-red)] uppercase tracking-[0.25em]">
                      {item.company} <span className="text-white/30">·</span>{" "}
                      <span className="text-white/50">{item.location}</span>
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="col-span-12 md:col-span-4 flex md:justify-end items-start">
                    <span
                      aria-hidden="true"
                      className={`font-display text-2xl transition-all duration-500 ${
                        isActive
                          ? "rotate-90 text-[color:var(--accent-red)] drop-shadow-[0_0_12px_var(--accent-glow)]"
                          : "text-white/30 group-hover:translate-x-1 group-hover:text-white/70"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>

                {/* Expandable panel */}
                <div
                  id={`exp-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`exp-tab-${i}`}
                  hidden={!isActive}
                  className="grid grid-cols-12 gap-6 md:gap-10 pb-10 md:pb-12 px-4 md:px-6"
                >
                  <div className="col-span-12 md:col-start-4 md:col-span-9">
                    <p className="text-white/70 leading-relaxed text-base md:text-lg max-w-2xl">
                      {item.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mt-6 list-none p-0">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-[10px] uppercase tracking-[0.2em] text-white/70 border border-white/15 rounded-full px-3 py-1.5 bg-white/[0.02] transition-all duration-300 hover:text-white hover:border-[color:var(--accent-red)] hover:bg-[color:var(--accent-red)]/10 hover:-translate-y-0.5"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="sr-only">
        Use arrow keys to navigate between roles. Press Home or End to jump to
        the first or last role.
      </p>
    </section>
  );
}
