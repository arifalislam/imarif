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
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
        stagger: 0.08,
        ease: "power3.out",
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
    <section ref={root} className="relative py-20 md:py-32 border-t border-white/10">
      <div
        className={`grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-10 ${reverse ? "md:[direction:rtl]" : ""}`}
      >
        <div className="col-span-12 md:col-span-6 md:[direction:ltr] relative">
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
            className="pb-text text-white/65 leading-relaxed text-justify my-6"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className="pb-text text-xs uppercase tracking-[0.25em] text-white/40 mb-10">{meta}</p>

          <div className="flex flex-wrap gap-3 items-start">
            {tags.map((t) => (
              <div
                key={t.label}
                className="pb-tag flex flex-col items-center gap-2 text-center w-20"
              >
                <div className="w-12 h-12 rounded-full border-2 border-white/80 bg-gradient-to-br from-white via-neutral-400 to-neutral-900 flex items-center justify-center text-base text-black shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {t.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 leading-tight">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:[direction:ltr] relative">
          <Link
            to="/projects/$slug"
            params={{ slug }}
            className="group relative overflow-hidden bg-black w-full block cursor-pointer"
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
