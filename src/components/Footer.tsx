import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 bg-hero-gradient text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold">KENZYA</p>
          <p className="mt-3 max-w-sm text-sm opacity-80">
            L'agrégateur d'offres d'emploi de Côte d'Ivoire. Toutes les offres du pays au même
            endroit, plus une aide à l'orientation pour les nouveaux bacheliers.
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide opacity-70">
            Candidats
          </p>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li>
              <Link to="/offres">Chercher une offre</Link>
            </li>
            <li>
              <Link to="/orientation">Test d'orientation</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide opacity-70">
            Recruteurs
          </p>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li>
              <Link to="/recruteurs">Publier une offre</Link>
            </li>
            <li>
              <Link to="/recruteurs">Nos formules</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} KENZYA — Abidjan, Côte d'Ivoire
      </div>
    </footer>
  );
}
