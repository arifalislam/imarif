import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImg from "@/assets/hero.png";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.2,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
      gsap.from(".hero-img", {
        scale: 1.2,
        opacity: 0,
        duration: 1.6,
        delay: 0.3,
        ease: "expo.out",
      });
      gsap.from(".hero-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        delay: 0.6,
        ease: "expo.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="img-layer relative min-h-[72svh] md:min-h-[76svh] overflow-hidden flex flex-col justify-end pb-8 md:pb-10 px-6 md:px-10"
    >
      <img
        src={heroImg}
        alt="Portrait"
        className="hero-img absolute inset-0 w-full h-full object-cover opacity-90"
        width={1280}
        height={1600}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />

      <div className="relative grid grid-cols-12 gap-4 items-end">
        <div className="col-span-12 md:col-span-9">
          <div className="overflow-hidden">
            <h1 className="hero-line font-display font-bold leading-[0.9] tracking-tight text-[15vw] md:text-[11vw]">
              Designing
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line font-display font-bold leading-[0.9] tracking-tight text-[15vw] md:text-[11vw]">
              the <span className="italic font-light">unseen</span>.
            </h1>
          </div>
        </div>
        <div className="hidden md:flex col-span-3 flex-col items-end gap-3 text-right text-xs uppercase tracking-[0.25em] text-white/60">
          <span className="hero-meta">Digital Product Designer</span>
          <span className="hero-meta">Based in Mymensingh · BD</span>
        </div>
      </div>

      <div className="hero-rule mt-6 h-px bg-white/20 w-full" />
      <div className="relative flex justify-between items-center mt-6 text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span className="hero-meta">Portfolio / 2026</span>
        <span className="hero-meta hidden md:block">Selected work ↓</span>
        <span className="hero-meta">© A R I F</span>
      </div>
    </section>
  );
}
