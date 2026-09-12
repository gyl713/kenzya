import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/offres", label: "Offres" },
  { to: "/profil", label: "Mon profil" },
  { to: "/talents", label: "Talents" },
  { to: "/marche", label: "Marché" },
  { to: "/orientation", label: "Orientation" },
  { to: "/methode", label: "Méthode" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-hero-gradient font-display text-lg font-bold text-primary-foreground">
            K
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            KENZYA
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-smooth hover:bg-muted hover:text-primary [&.active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/recruteurs"
            className="ml-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            Recruteurs
          </Link>
        </nav>

        <button
          className="rounded-lg p-2 text-primary lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-card px-4 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-smooth hover:bg-muted hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/recruteurs"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-secondary"
          >
            Recruteurs
          </Link>
        </nav>
      )}
    </header>
  );
}
