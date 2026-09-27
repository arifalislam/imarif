import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-meta", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
      });

      gsap.from(".about-copy", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative px-6 md:px-10 py-16 md:py-24 border-t border-white/10"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-3">
          <p className="about-meta text-xs uppercase tracking-[0.3em] text-white/40">About</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="about-copy font-display text-2xl md:text-4xl leading-[1.2] font-medium text-balance">
            I’m a digital product designer drawn to the details where form, function and feeling meet.
          </h2>
        </div>
      </div>
    </section>
  );
}
