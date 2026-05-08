import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-line", {
        scrollTrigger: { trigger: root.current, start: "top 80%" },
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="contact" className="border-t border-white/10 px-6 md:px-10 py-20 md:py-32">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-10">Get in touch — 04</p>
      <div className="overflow-hidden">
        <h2 className="ft-line font-display text-[14vw] md:text-[11vw] leading-[0.9] font-bold tracking-tight">
          Let's build
        </h2>
      </div>
      <div className="overflow-hidden">
        <h2 className="ft-line font-display text-[14vw] md:text-[11vw] leading-[0.9] font-bold tracking-tight italic font-light">
          something real.
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Email</p>
          <a href="mailto:hello@kushagra.design" className="hover:text-[color:var(--accent-red)] transition">hello@kushagra.design</a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Instagram</p>
          <a href="#" className="hover:text-[color:var(--accent-red)] transition">@kshgr.studio</a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Behance</p>
          <a href="#" className="hover:text-[color:var(--accent-red)] transition">/kushagra</a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Location</p>
          <p>Mumbai, IN</p>
        </div>
      </div>

      <div className="mt-20 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>© 2026 Kushagra</span>
        <span>Designed & built with care</span>
      </div>
    </footer>
  );
}
