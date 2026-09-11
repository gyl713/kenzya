import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Search, ShieldCheck, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoDataNotice } from "@/components/DemoDataNotice";
import { JOBS } from "@/data/kenzya";
import { CANDIDATES, SKILL_LEVEL_LABEL, computeMatch } from "@/data/matching";

export const Route = createFileRoute("/talents")({
  head: () => ({
    meta: [
      { title: "Rechercher des talents par compétences | KENZYA" },
      {
        name: "description",
        content:
          "Recherchez des profils par compétence vérifiée, comparez-les sur les mêmes critères et voyez sur quelles preuves repose chaque correspondance.",
      },
      { property: "og:title", content: "Rechercher des talents par compétences | KENZYA" },
      {
        property: "og:description",
        content: "Comparer des profils sur des éléments vérifiables plutôt que sur une seule recommandation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TalentsPage,
});

function TalentsPage() {
  const [query, setQuery] = useState("");
  const [onlyProven, setOnlyProven] = useState(false);
  const [jobId, setJobId] = useState(JOBS[0]!.id);
  const job = JOBS.find((j) => j.id === jobId) ?? JOBS[0]!;

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return CANDIDATES.filter((c) =>
      c.skills.some(
        (s) =>
          (!needle || s.name.toLowerCase().includes(needle)) &&
          (!onlyProven || s.level !== "declaree"),
      ),
    )
      .map((c) => ({ candidate: c, match: computeMatch(c, job) }))
      .sort((a, b) => b.match.score - a.match.score);
  }, [query, onlyProven, job]);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
            Espace recruteur
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Pourquoi chercher ici plutôt que dans votre réseau ?
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Votre réseau reste utile. KENZYA l'élargit : vous voyez plus de profils, structurés de
            la même façon, comparables sur les mêmes critères, avec la preuve derrière chaque
            compétence affichée.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Value icon={<Users className="h-4 w-4" />} title="Plus de profils">
              Au-delà des personnes que vous connaissez déjà.
            </Value>
            <Value icon={<ShieldCheck className="h-4 w-4" />} title="Preuves affichées">
              Test, projet ou certification derrière chaque compétence.
            </Value>
            <Value icon={<Clock className="h-4 w-4" />} title="Comparaison rapide">
              Les mêmes critères pour tous les candidats d'une offre.
            </Value>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <DemoDataNotice>
          {CANDIDATES.length} profils de démonstration. Les tests de compétences ne sont pas encore
          réellement administrés par KENZYA.
        </DemoDataNotice>

        <section className="rounded-2xl bg-card p-6 shadow-soft">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Compétence recherchée (React, SQL, HACCP…)"
                className="w-full bg-transparent py-2.5 text-sm outline-none"
              />
            </div>
            <select
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
            >
              {JOBS.map((j) => (
                <option key={j.id} value={j.id}>
                  Comparer pour : {j.title}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm">
              <input
                type="checkbox"
                checked={onlyProven}
                onChange={(e) => setOnlyProven(e.target.checked)}
              />
              Compétences prouvées uniquement
            </label>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Les profils sont classés par correspondance avec l'offre sélectionnée. Ce classement est
            une aide au tri : c'est vous qui décidez qui rencontrer.
          </p>
        </section>

        <section className="space-y-4">
          {results.map(({ candidate, match }) => (
            <article key={candidate.id} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-primary">{candidate.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {candidate.headline} · {candidate.location} · {candidate.availability}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-secondary">{match.score} %</p>
                  <p className="text-xs text-muted-foreground">correspondance avec l'offre</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      s.level === "declaree"
                        ? "border border-dashed border-border text-muted-foreground"
                        : "bg-success/10 text-success"
                    }`}
                    title={s.evidence ?? "Compétence déclarée, non vérifiée"}
                  >
                    {s.name} · {SKILL_LEVEL_LABEL[s.level]}
                  </span>
                ))}
              </div>

              <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                {match.criteria.map((c) => (
                  <div key={c.key} className="rounded-xl border border-border p-3">
                    <dt className="flex justify-between font-medium text-foreground">
                      <span>{c.label}</span>
                      <span>
                        {c.points}/{c.weight}
                      </span>
                    </dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{c.detail}</dd>
                  </div>
                ))}
              </dl>

              {match.gapSkills.length > 0 && (
                <p className="mt-4 rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
                  Éléments demandés par l'offre que ce profil ne permet pas encore de démontrer :{" "}
                  {match.gapSkills.join(", ")}.
                </p>
              )}

              {candidate.referrals.length > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Recommandé par {candidate.referrals.map((r) => r.from).join(", ")} — signal
                  complémentaire, pris en compte de façon limitée dans le score.
                </p>
              )}

              <Link
                to="/profil"
                className="mt-4 inline-block rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary transition-smooth hover:bg-muted"
              >
                Voir le profil détaillé
              </Link>
            </article>
          ))}
          {!results.length && (
            <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              Aucun profil ne correspond à cette compétence dans le jeu de démonstration.
            </p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}

function Value({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-primary-foreground/10 p-4 text-primary-foreground">
      <p className="flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </p>
      <p className="mt-1 text-xs opacity-80">{children}</p>
    </div>
  );
}
