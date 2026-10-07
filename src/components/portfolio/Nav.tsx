import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={`theme-blend fixed top-0 left-0 right-0 z-50 ${
          open ? "" : "mix-blend-difference"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-6">
          <a
            href="#"
            className="font-display font-bold tracking-tight text-lg"
            onClick={() => setOpen(false)}
          >
            A R I F <span className="text-[color:var(--accent-red)]">.</span>
          </a>
          <div className="flex items-center gap-3 md:gap-4">
            <nav className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium mr-4">
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
              onClick={() => setOpen(false)}
              className="hidden sm:block text-xs uppercase tracking-[0.2em] font-medium border border-white/40 rounded-full px-4 py-2 hover:bg-white hover:text-black transition"
            >
              Let's talk
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden p-1.5 -mr-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-black text-white md:hidden"
        >
          <nav className="flex h-full flex-col justify-center gap-7 px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-bold tracking-tight active:opacity-60 transition"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-fit items-center border border-white/40 rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em]"
            >
              Let's talk
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
