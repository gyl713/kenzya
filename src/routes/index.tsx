import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Bell, Building2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { JOBS, SECTORS, SOURCES } from "@/data/kenzya";
import heroImage from "@/assets/hero-kenzya.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KENZYA — Toutes les offres d'emploi de Côte d'Ivoire" },
      {
        name: "description",
        content:
          "KENZYA regroupe les offres d'emploi des principaux sites ivoiriens, alerte les candidats et oriente les bacheliers vers les secteurs qui recrutent.",
      },
      { property: "og:title", content: "KENZYA — L'emploi en Côte d'Ivoire, au même endroit" },
      {
        property: "og:description",
        content:
          "Offres agrégées d'Emploi.ci, Educarrière, JobIvoire et plus, alertes personnalisées et orientation des bacheliers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-hero-gradient">
        <img
          src={heroImage}
          alt="Jeunes professionnels ivoiriens en réunion dans un bureau à Abidjan"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Nouveau : orientation des bacheliers
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
            Toutes les offres d'emploi de Côte d'Ivoire, au même endroit.
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/80 md:text-lg">
            KENZYA rassemble chaque jour les annonces des grands sites ivoiriens, vous alerte dès
            qu'une offre correspond à votre profil, et aide les bacheliers à choisir leur voie.
          </p>

          <form
            className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-card p-3 shadow-elevated sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/offres", search: query ? { q: query } : {} });
            }}
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Métier, entreprise, ville…"
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground transition-smooth hover:opacity-90"
            >
              Rechercher
            </button>
          </form>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-primary-foreground/80">
            <Stat value={`${JOBS.length * 187}`} label="offres collectées" />
            <Stat value={`${SOURCES.length}`} label="sources agrégées" />
            <Stat value={`${SECTORS.length}`} label="secteurs analysés" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Feature
            icon={<Search className="h-5 w-5" />}
            title="Une seule recherche"
            text="Emploi.ci, Educarrière, JobIvoire, GoAfrica, NovoJob : plus besoin d'ouvrir cinq sites chaque matin."
          />
          <Feature
            icon={<Bell className="h-5 w-5" />}
            title="Alertes personnalisées"
            text="Choisissez un métier, une ville, un type de contrat, et recevez les nouvelles offres par e-mail ou Telegram."
          />
          <Feature
            icon={<Building2 className="h-5 w-5" />}
            title="Espace recruteurs"
            text="Publiez vos offres, suivez les vues et gérez les candidatures reçues depuis un tableau de bord."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
            Offres récentes
          </h2>
          <Link to="/offres" className="text-sm font-semibold text-secondary hover:underline">
            Voir toutes les offres →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {JOBS.slice(0, 4).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="overflow-hidden rounded-3xl bg-card p-8 shadow-medium md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
                Nouveaux bacheliers
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-primary">
                Tu ne sais pas quoi faire après le bac ?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Réponds à 5 questions. KENZYA croise tes réponses avec les secteurs qui recrutent
                vraiment en Côte d'Ivoire et te propose trois voies concrètes, avec les écoles et
                les salaires moyens.
              </p>
              <Link
                to="/orientation"
                className="mt-6 inline-block rounded-xl bg-accent-gradient px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
              >
                Faire le test gratuitement
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SECTORS.slice(0, 4).map((s) => (
                <div key={s.id} className="rounded-2xl border border-border p-4">
                  <span className="text-2xl">{s.emoji}</span>
                  <p className="mt-2 font-display text-sm font-semibold text-primary">{s.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">+{s.growth}% de recrutements</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
