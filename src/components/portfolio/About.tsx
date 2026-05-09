import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLSpanElement>(".about-word");
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      gsap.from(".about-meta", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
      });

      gsap.from(".about-stat", {
        scrollTrigger: { trigger: ".about-stats", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const text =
    "I'm an enthusiasstis digital product designer obsessed with the quiet decisions — the radius of an edge, the click of a button, the weight of a thing in your hand. My work lives where form, function and feeling collide.";

  return (
    <section
      ref={root}
      id="about"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-white/10"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-3">
          <p className="about-meta text-xs uppercase tracking-[0.3em] text-white/40">About — 02</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight font-medium text-balance">
            {text.split(" ").map((w, i) => (
              <span key={i} className="about-word inline-block mr-[0.25em]">
                {w}
              </span>
            ))}
          </h2>

          <div className="about-stats mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
            {[
              { k: "05+", v: "Years Designing" },
              { k: "25", v: "Shipped products" },
              { k: "10", v: "Recognitions" },
              { k: "99%", v: "Satisfaction" },
            ].map((s) => (
              <div key={s.v} className="about-stat">
                <div className="font-display text-5xl md:text-6xl font-bold tracking-tight">
                  {s.k}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
