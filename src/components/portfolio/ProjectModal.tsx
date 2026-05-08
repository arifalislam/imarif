import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface ProjectData {
  index: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  year: string;
  client: string;
  role: string;
  gallery: string[];
}

interface Props {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.set(overlayRef.current, { autoAlpha: 1 })
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(
        panelRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.9, ease: "expo.inOut" },
        "<"
      )
      .fromTo(
        contentRef.current?.querySelectorAll(".pm-anim") ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07 },
        "-=0.4"
      );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [project]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { xPercent: 100, duration: 0.7, ease: "expo.inOut" })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.3");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] invisible"
      style={{ visibility: "visible" }}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        ref={panelRef}
        className="absolute top-0 right-0 h-full w-full bg-black border-l border-white/10 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="fixed top-6 right-6 z-10 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition group"
          aria-label="Close"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <div ref={contentRef} className="min-h-screen">
          <div className="relative h-[80vh] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="pm-anim w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
              <div className="pm-anim font-display text-[20vw] md:text-[15vw] leading-none font-bold opacity-30">
                {project.index}
              </div>
              <h2 className="pm-anim font-display text-4xl md:text-7xl font-medium tracking-tight -mt-8 md:-mt-16">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="px-8 md:px-16 py-20 grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4 space-y-8">
              {[
                { k: "Year", v: project.year },
                { k: "Client", v: project.client },
                { k: "Role", v: project.role },
              ].map((m) => (
                <div key={m.k} className="pm-anim border-t border-white/10 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">{m.k}</p>
                  <p className="text-base">{m.v}</p>
                </div>
              ))}
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="pm-anim text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Overview</p>
              <p className="pm-anim text-2xl md:text-3xl leading-relaxed font-light text-balance">
                {project.description}
              </p>
              <p className="pm-anim mt-10 text-white/60 leading-relaxed">
                {project.meta}. The process began with extensive market research, sketch exploration and rapid foam mockups before moving into CAD and final renders. Every detail — from the radius of each edge to the tactile feedback of every interaction — was tuned to feel inevitable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 md:px-2 pb-2">
            {project.gallery.map((src, i) => (
              <div key={i} className="pm-anim aspect-[4/3] overflow-hidden bg-white/5">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
            ))}
          </div>

          <div className="px-8 md:px-16 py-20 border-t border-white/10 flex justify-between items-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">End of project</p>
            <button onClick={handleClose} className="text-xs uppercase tracking-[0.3em] hover:text-[color:var(--accent-red)] transition">
              Close ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
