import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { getProjectBySlug, projects, type ProjectData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) return { meta: [{ title: "Project not found" }] };
    return {
      meta: [
        { title: `${project.title} — Case Study` },
        { name: "description", content: project.meta },
        { property: "og:title", content: `${project.title} — Case Study` },
        { property: "og:description", content: project.meta },
        { property: "og:image", content: project.image },
        { name: "twitter:image", content: project.image },
      ],
    };
  },
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl mb-3">Something went wrong</h1>
          <p className="text-white/60 mb-6">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="text-xs uppercase tracking-[0.3em] border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition"
          >
            Try again
          </button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">404</p>
        <h1 className="font-display text-4xl md:text-6xl mb-6">Project not found</h1>
        <Link
          to="/"
          className="text-xs uppercase tracking-[0.3em] border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition"
        >
          Back to work
        </Link>
      </div>
    </div>
  ),
  component: ProjectCaseStudy,
});

const FALLBACK_SECTION: CaseStudySection = {
  body: "Details for this section are being prepared and will be published soon.",
  bullets: [],
};

const FALLBACK_RESULTS = {
  summary: "Outcome metrics for this case study will be shared shortly.",
  metrics: [] as CaseStudyMetric[],
};

function sanitizeProject(p: ProjectData): ProjectData {
  return {
    ...p,
    description: p.description?.trim() || "Case study overview coming soon.",
    meta: p.meta?.trim() || "Case study",
    year: p.year || "—",
    client: p.client || "—",
    role: p.role || "—",
    tags: Array.isArray(p.tags) ? p.tags : [],
    gallery: Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [],
    problem: p.problem ?? FALLBACK_SECTION,
    research: p.research ?? FALLBACK_SECTION,
    solution: p.solution ?? FALLBACK_SECTION,
    results: p.results
      ? {
          summary: p.results.summary?.trim() || FALLBACK_RESULTS.summary,
          metrics: Array.isArray(p.results.metrics) ? p.results.metrics : [],
        }
      : FALLBACK_RESULTS,
  };
}

function ProjectCaseStudy() {
  useSmoothScroll();
  const raw = Route.useLoaderData() as ProjectData;
  const project = sanitizeProject(raw);
  const root = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length] ?? project;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(".cs-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
      });
      if (heroImg.current) {
        gsap.fromTo(
          heroImg.current,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroImg.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
        });
      });
    }, root);
    return () => ctx.revert();
  }, [project.slug]);

  return (
    <main
      ref={root}
      className="noise bg-black text-white selection:bg-white selection:text-black"
    >
      <Nav />

      <article className="pt-24">
        <header className="px-6 md:px-16 pb-10 max-w-[1600px] mx-auto">
          <Link
            to="/"
            hash="work"
            className="cs-anim inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white transition mb-12"
          >
            ← All work
          </Link>
          <p className="cs-anim text-xs uppercase tracking-[0.3em] text-[color:var(--accent-red,#e85d3a)] mb-6">
            Case Study · {project.index}
          </p>
          <h1 className="cs-anim font-display text-5xl md:text-8xl font-medium tracking-tight max-w-5xl text-balance">
            {project.title}
          </h1>
          <p className="cs-anim mt-8 text-xs uppercase tracking-[0.25em] text-white/40">
            {project.meta}
          </p>
        </header>

        <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
          <img
            ref={heroImg}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <section className="px-6 md:px-16 py-20 md:py-28 max-w-[1600px] mx-auto grid grid-cols-12 gap-6 md:gap-10">
          <aside className="col-span-12 md:col-span-4 space-y-8">
            {[
              { k: "Year", v: project.year },
              { k: "Client", v: project.client },
              { k: "Role", v: project.role },
            ].map((m) => (
              <div key={m.k} className="cs-reveal border-t border-white/10 pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">{m.k}</p>
                <p className="text-base">{m.v}</p>
              </div>
            ))}

            <div className="cs-reveal border-t border-white/10 pt-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t.label}
                    className="text-[10px] uppercase tracking-[0.15em] text-white/70 border border-white/20 rounded-full px-3 py-1.5"
                  >
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="col-span-12 md:col-span-8 space-y-12">
            <div className="cs-reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Overview</p>
              <p
                className="text-2xl md:text-3xl leading-relaxed font-light text-balance"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>

            <div className="cs-reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Approach</p>
              <p className="text-white/70 leading-relaxed text-lg">
                The process began with extensive research, sketch exploration and rapid prototypes
                before moving into high-fidelity design and final delivery. Every detail — from
                spacing and typography to interaction feedback — was tuned to feel inevitable and
                serve the end user with clarity.
              </p>
            </div>
          </div>
        </section>

        {(project.problem || project.research || project.solution) && (
          <section className="px-6 md:px-16 py-20 md:py-28 max-w-[1600px] mx-auto space-y-24 border-t border-white/10">
            {[
              { key: "01", label: "Problem", data: project.problem },
              { key: "02", label: "Research", data: project.research },
              { key: "03", label: "Solution", data: project.solution },
            ]
              .filter((s) => s.data)
              .map((s) => (
                <div
                  key={s.label}
                  className="cs-reveal grid grid-cols-12 gap-6 md:gap-10 items-start"
                >
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                      {s.key}
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight">
                      {s.label}
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 space-y-6">
                    <p
                      className="text-white/75 leading-relaxed text-lg md:text-xl text-balance"
                      dangerouslySetInnerHTML={{ __html: s.data!.body }}
                    />
                    {s.data!.bullets && (
                      <ul className="space-y-3 pt-2">
                        {s.data!.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-4 text-white/65 leading-relaxed border-t border-white/10 pt-3"
                          >
                            <span className="text-[color:var(--accent-red,#e85d3a)] mt-1">→</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          </section>
        )}

        {project.results && (
          <section className="px-6 md:px-16 py-20 md:py-28 max-w-[1600px] mx-auto border-t border-white/10">
            <div className="cs-reveal grid grid-cols-12 gap-6 md:gap-10 mb-16">
              <div className="col-span-12 md:col-span-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">04</p>
                <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight">
                  Results
                </h2>
              </div>
              <div className="col-span-12 md:col-span-8">
                <p className="text-white/75 leading-relaxed text-lg md:text-xl text-balance">
                  {project.results.summary}
                </p>
              </div>
            </div>
            <div className="cs-reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {project.results.metrics.map((m) => (
                <div key={m.label} className="bg-black p-6 md:p-10">
                  <p className="font-display text-4xl md:text-6xl font-medium tracking-tight text-[color:var(--accent-red,#e85d3a)]">
                    {m.value}
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/50">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 pb-20">
          {project.gallery.map((src, i) => (
            <div key={i} className="cs-reveal aspect-[4/3] overflow-hidden bg-white/5">
              <img
                src={src}
                alt={`${project.title} — visual ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
          ))}
        </section>

        <section className="border-t border-white/10 px-6 md:px-16 py-20 max-w-[1600px] mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Next case</p>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group flex items-end justify-between gap-6 border-t border-white/10 pt-10"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">{next.index}</p>
              <h3 className="font-display text-3xl md:text-6xl font-medium tracking-tight group-hover:text-[color:var(--accent-red,#e85d3a)] transition">
                {next.title}
              </h3>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] whitespace-nowrap pb-2">
              View →
            </span>
          </Link>
        </section>
      </article>

      <Footer />
    </main>
  );
}
