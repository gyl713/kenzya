import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { JOBS, SECTORS } from "@/data/kenzya";

type JobSearch = { q?: string };

export const Route = createFileRoute("/offres/")({
  validateSearch: (search: Record<string, unknown>): JobSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Offres d'emploi en Côte d'Ivoire | KENZYA" },
      {
        name: "description",
        content:
          "Parcourez les offres d'emploi, stages et alternances en Côte d'Ivoire, filtrées par ville, secteur et type de contrat.",
      },
      { property: "og:title", content: "Offres d'emploi en Côte d'Ivoire | KENZYA" },
      {
        property: "og:description",
        content: "Toutes les offres ivoiriennes agrégées et filtrables en un seul endroit.",
      },
    ],
  }),
  component: JobsPage,
});

const CONTRACTS = ["CDI", "CDD", "Stage", "Freelance", "Alternance"] as const;

function JobsPage() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [contract, setContract] = useState<string>("");
  const [sector, setSector] = useState<string>("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      const matchText =
        !needle ||
        [job.title, job.company, job.location, job.sector, ...job.skills]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchContract = !contract || job.contract === contract;
      const matchSector = !sector || job.sector === sector;
      return matchText && matchContract && matchSector;
    });
  }, [query, contract, sector]);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
            Offres d'emploi en Côte d'Ivoire
          </h1>
          <p className="mt-2 text-muted-foreground">
            Annonces collectées sur les principaux sites ivoiriens et publiées par les recruteurs
            KENZYA.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Métier, entreprise, ville…"
                className="w-full bg-transparent py-2.5 text-sm outline-none"
              />
            </div>
            <select
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
            >
              <option value="">Tous les contrats</option>
              {CONTRACTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
            >
              <option value="">Tous les secteurs</option>
              {[...new Set(JOBS.map((j) => j.sector))].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-muted-foreground">
          {results.length} offre{results.length > 1 ? "s" : ""} trouvée
          {results.length > 1 ? "s" : ""}
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Aucune offre ne correspond à cette recherche. Essayez un autre mot-clé.
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold text-primary">Secteurs qui recrutent</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <span
                key={s.id}
                className="rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground"
              >
                {s.emoji} {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
