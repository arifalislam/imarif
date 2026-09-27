export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 py-6">
        <a href="#" className="font-display font-bold tracking-tight text-lg">
          A R I F <span className="text-[color:var(--accent-red)]">.</span>
        </a>
        <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium">
          <a href="#work" className="hover:opacity-60 transition">
            Work
          </a>
          <a href="#about" className="hover:opacity-60 transition">
            About
          </a>
          <a href="#contact" className="hover:opacity-60 transition">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.2em] font-medium border border-white/40 rounded-full px-4 py-2 hover:bg-white hover:text-black transition"
        >
          Let's talk
        </a>
      </div>
    </header>
  );
}
