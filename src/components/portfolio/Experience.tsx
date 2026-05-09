import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    year: "2024 — Present",
    role: "Senior Product Designer",
    company: "Chromatics AI",
    location: "Remote",
    description:
      "Leading end-to-end design for AI-native social products. Shaping design systems, motion language and 0→1 product bets.",
  },
  {
    year: "2022 — 2024",
    role: "Product Designer",
    company: "JMI Enterprise",
    location: "New Delhi",
    description:
      "Owned the ERP redesign across inventory, finance and CRM modules. Partnered with engineering on a unified component library.",
  },
  {
    year: "2020 — 2022",
    role: "UI / UX Designer",
    company: "Freelance & Studios",
    location: "India",
    description:
      "Designed mobile apps, dashboards and brand systems for early-stage startups across EdTech, fintech and lifestyle verticals.",
  },
  {
    year: "2018 — 2020",
    role: "Visual Designer",
    company: "Independent Practice",
    location: "India",
    description:
      "Built foundations in typography, layout and visual storytelling. Shipped marketing sites and brand identities.",
  },
];

export function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-list",
            start: "top 85%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="experience"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-white/10"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-20">
        <div className="col-span-12 md:col-span-3">
          <p className="exp-head text-xs uppercase tracking-[0.3em] text-white/40">
            Experience — 03
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="exp-head font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-medium text-balance">
            A decade of designing
            <br />
            <span className="text-white/50">products that matter.</span>
          </h2>
        </div>
      </div>

      <div className="exp-list relative">
        {items.map((item, i) => (
          <div
            key={i}
            className="exp-row group grid grid-cols-12 gap-6 md:gap-10 py-10 md:py-12 border-t border-white/10 hover:bg-white/[0.02] transition-colors duration-500"
          >
            <div className="col-span-12 md:col-span-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                {item.year}
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <h3 className="font-display text-2xl md:text-4xl font-medium tracking-tight">
                {item.role}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--accent-red)] uppercase tracking-[0.2em]">
                {item.company} · {item.location}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="text-white/65 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <div className="exp-rule h-px bg-white/30 origin-left" />
      </div>
    </section>
  );
}
