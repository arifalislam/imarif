import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, readStoredTheme, storeTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    storeTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={mounted && theme === "light"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
    >
      {mounted && theme === "light" ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      ) : mounted ? (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      ) : null}
    </button>
  );
}
