export function Marquee() {
  const items = ["Industrial Design", "★", "Concept Ideation", "★", "Brand Study", "★", "Form Exploration", "★", "Prototyping", "★", "3D Modeling", "★"];
  const loop = [...items, ...items];
  return (
    <div className="border-y border-white/10 py-6 overflow-hidden">
      <div className="marquee-track font-display font-medium text-2xl md:text-4xl tracking-tight">
        {loop.map((t, i) => (
          <span key={i} className={t === "★" ? "text-[color:var(--accent-red)]" : ""}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
