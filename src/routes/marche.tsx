import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoDataNotice } from "@/components/DemoDataNotice";
import { JOBS, SOURCES } from "@/data/kenzya";
import { contractDemand, sectorDemand, skillDemand } from "@/data/matching";

export const Route = createFileRoute("/marche")({
  head: () => ({
    meta: [
      { title: "Données du marché de l'emploi ivoirien | KENZYA" },
      {
        name: "description",
        content:
          "Compétences, secteurs et types de contrat les plus demandés, calculés directement sur les offres collectées par KENZYA.",
      },
      { property: "og:title", content: "Données du marché de l'emploi | KENZYA" },
      {
        property: "og:description",
        content: "Ce que les offres demandent réellement : compétences, secteurs, contrats.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarchePage,
});

function MarchePage() {
  const skills = skillDemand();
  const sectors = sectorDemand();
  const contracts = contractDemand();

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
            Observatoire KENZYA
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Ce que les offres demandent réellement
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Chaque chiffre de cette page est recalculé à partir des offres présentes dans KENZYA.
            Aucun pourcentage n'est inventé : quand la donnée n'existe pas encore, nous le disons.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
        <DemoDataNotice>
          Base de calcul actuelle : {JOBS.length} offres de démonstration issues de{" "}
          {SOURCES.length} sources. C'est un échantillon de test, pas une mesure du marché ivoirien.
          Les mêmes calculs tourneront sur les offres réelles dès la collecte automatisée.
        </DemoDataNotice>

        <section className="rounded-2xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-bold text-primary">
            Compétences les plus demandées
          </h2>
          <ul className="mt-4 space-y-3">
            {skills.slice(0, 12).map((s) => (
              <li key={s.skill}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium text-foreground">{s.skill}</span>
                  <span className="text-muted-foreground">
                    {s.count} offre{s.count > 1 ? "s" : ""} · {s.share} %
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-secondary" style={{ width: `${s.share}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Secteurs : {s.sectors.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-primary">Secteurs qui recrutent</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {sectors.map((s) => (
                <li key={s.sector} className="flex justify-between">
                  <span className="text-foreground">{s.sector}</span>
                  <span className="text-muted-foreground">
                    {s.count} offre{s.count > 1 ? "s" : ""} · {s.share} %
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-primary">Types de contrat</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {contracts.map((c) => (
                <li key={c.contract} className="flex justify-between">
                  <span className="text-foreground">{c.contract}</span>
                  <span className="text-muted-foreground">
                    {c.count} offre{c.count > 1 ? "s" : ""} · {c.share} %
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-2xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold text-primary">
            Indicateurs pas encore disponibles
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Nous préférons afficher un manque plutôt qu'un chiffre inventé. Ces mesures arriveront
            avec l'historique de collecte :
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>évolution des compétences demandées dans le temps (besoin de plusieurs mois de collecte) ;</li>
            <li>niveaux d'expérience demandés (à extraire du texte des offres) ;</li>
            <li>salaires médians par métier (trop peu d'offres affichent une rémunération) ;</li>
            <li>délai moyen de recrutement (nécessite le suivi des candidatures réelles).</li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
}
