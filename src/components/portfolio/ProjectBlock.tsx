import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

type Tag = { label: string; icon: string };

interface Props {
  index: string;
  title: string;
  description: string;
  meta: string;
  tags: Tag[];
  image: string;
  credit?: string;
  reverse?: boolean;
  slug: string;
}

export function ProjectBlock({
  index,
  title,
  description,
  meta,
  tags,
  image,
  credit,
  reverse,
  slug,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pb-num", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
      gsap.from(".pb-title", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "expo.out",
      });
      gsap.from(".pb-line", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        delay: 0.1,
        ease: "expo.out",
      });
      gsap.from(".pb-text", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".pb-tag", {
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        y: 30,
        opacity: 0,
        scale: 0.85,
        duration: 0.9,
        delay: 0.45,
        stagger: 0.1,
        ease: "expo.out",
      });
      gsap.from(".pb-tag-icon", {
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        scale: 0,
        rotate: -90,
        duration: 1,
        delay: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
      });
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.25, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-16 md:py-24 first:pt-8 md:first:pt-10 border-t border-white/10">
      <div
        className={`grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-10 ${reverse ? "md:[direction:rtl]" : ""}`}
      >
        <div className="col-span-12 md:col-span-6 md:[direction:ltr] relative order-2 md:order-none">
          <div className="overflow-hidden">
            <div className="pb-num font-display font-bold leading-none text-[28vw] md:text-[18vw] text-white/95">
              {index}
            </div>
          </div>
          <div className="pb-line h-px bg-white/30 mt-6 mb-8" />
          <h2 className="pb-title font-display text-4xl md:text-6xl font-medium tracking-tight mb-6">
            {title}
          </h2>
          <p
            className="pb-text min-w-0 text-white/65 leading-relaxed text-left md:text-justify my-6"

            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className="pb-text text-xs uppercase tracking-[0.25em] text-white/40 mb-10">{meta}</p>

          <div className="flex flex-wrap gap-3 items-start">
            {tags.map((t) => (
              <div
                key={t.label}
                className="pb-tag group/tag flex flex-col items-center gap-2 text-center w-20 cursor-default"
              >
                <div className="pb-tag-icon w-12 h-12 rounded-full border border-white/90 bg-white/5 backdrop-blur-md flex items-center justify-center text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.45)] ring-1 ring-black/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tag:scale-110 group-hover/tag:border-[color:var(--accent-red)] group-hover/tag:bg-white/10 group-hover/tag:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_var(--accent-glow)] group-hover/tag:-translate-y-0.5">
                  {t.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 leading-tight transition-colors duration-500 group-hover/tag:text-white">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:[direction:ltr] relative order-1 md:order-none">
          <Link
            to="/projects/$slug"
            params={{ slug }}
            className="img-layer group relative overflow-hidden bg-black w-full block cursor-pointer"
          >
            <img
              ref={imgRef}
              src={image}
              alt={title}
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-auto object-cover will-change-transform transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition duration-500 translate-y-2 group-hover:translate-y-0 text-xs uppercase tracking-[0.3em] border border-white rounded-full px-6 py-3">
                View case →
              </span>
            </div>
          </Link>
          {credit && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-4 text-right">
              {credit}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
