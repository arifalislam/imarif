export function Marquee() {
  const items = [
    "UX Research",
    "★",
    "Journey Mapping",
    "★",
    "Wireframe Design",
    "★",
    "Data Visualization Exploration",
    "★",
    "Usability Testing",
    "★",
    "Responsive Design",
    "★",
    "Interaction Design",
    "★",
    "Information Architecture",
    "★",
    "Accessibility Audits",
    "★",
    "User Flows",
    "★",
    "Prototyping",
  ];
  const loop = [...items, ...items];
  return (
    <div className="border-y border-white/10 py-6 overflow-hidden">
      <div className="marquee-track font-display font-medium text-2xl md:text-4xl tracking-tight">
        {loop.map((t, i) =>
          t === "★" ? (
            <span key={i} className="marquee-bullet" aria-hidden="true" />
          ) : (
            <span key={i}>{t}</span>
          ),
        )}
      </div>
    </div>
  );
}
