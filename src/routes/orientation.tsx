import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GraduationCap, RotateCcw, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QUIZ, SECTORS, scoreQuiz } from "@/data/kenzya";
import {
  FILIERES,
  FILIERE_DOMAINS,
  SCHOOLS,
  SCHOOL_TYPES,
  type FiliereDomain,
  type SchoolType,
} from "@/data/formations";

export const Route = createFileRoute("/orientation")({
  head: () => ({
    meta: [
      { title: "Orientation après le bac en Côte d'Ivoire | KENZYA" },
      {
        name: "description",
        content:
          "Test d'orientation gratuit pour les bacheliers ivoiriens : 5 questions pour découvrir les secteurs qui recrutent, les formations et les salaires moyens.",
      },
      { property: "og:title", content: "Quel métier après le bac ? | KENZYA" },
      {
        property: "og:description",
        content:
          "Réponds à 5 questions et découvre les trois secteurs ivoiriens les plus adaptés à ton profil.",
      },
    ],
  }),
  component: OrientationPage,
});

function OrientationPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const complete = QUIZ.every((q) => answers[q.id] !== undefined);
  const results = submitted ? scoreQuiz(answers) : [];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
            <GraduationCap className="h-3.5 w-3.5" /> Spécial nouveaux bacheliers
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Quelle voie choisir après le bac ?
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Cinq questions suffisent. KENZYA croise tes réponses avec les secteurs qui recrutent
            réellement en Côte d'Ivoire et te propose trois pistes concrètes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {!submitted && (
          <div className="space-y-5">
            {QUIZ.map((q, i) => (
              <div key={q.id} className="rounded-2xl bg-card p-6 shadow-soft">
                <p className="font-display text-lg font-semibold text-primary">
                  {i + 1}. {q.question}
                </p>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {q.options.map((opt, idx) => {
                    const active = answers[q.id] === idx;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition-smooth ${
                          active
                            ? "border-secondary bg-secondary/10 font-semibold text-secondary"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              disabled={!complete}
              onClick={() => setSubmitted(true)}
              className="w-full rounded-xl bg-accent-gradient px-6 py-4 font-display text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {complete ? "Voir mes résultats" : "Réponds à toutes les questions"}
            </button>
          </div>
        )}

        {submitted && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-primary">
                Tes 3 voies recommandées
              </h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
              >
                <RotateCcw className="h-4 w-4" /> Refaire le test
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {results.map(({ sector, score }, i) => (
                <div key={sector.id} className="rounded-2xl bg-card p-6 shadow-medium">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-xl font-semibold text-primary">
                      {i + 1}. {sector.emoji} {sector.name}
                    </p>
                    <span className="rounded-lg bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                      {score}% de compatibilité
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{sector.description}</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <Info label="Salaire moyen" value={`${sector.avgSalary.toLocaleString("fr-FR")} FCFA`} />
                    <Info label="Croissance" value={`+${sector.growth}% par an`} />
                    <Info label="Bacs adaptés" value={sector.bacs.join(", ")} />
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Où se former
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {sector.studies.map((s) => (
                        <span key={s} className="rounded-lg bg-muted px-3 py-1.5 text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/offres"
                    search={{ q: sector.name.split(" ")[0] }}
                    className="mt-5 inline-block text-sm font-semibold text-secondary hover:underline"
                  >
                    Voir les offres et stages de ce secteur →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <Annuaire />

        <div className="mt-14">
          <h2 className="font-display text-xl font-bold text-primary">
            Tous les secteurs suivis par KENZYA
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((s) => (
              <div key={s.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <span className="text-2xl">{s.emoji}</span>
                <p className="mt-2 font-display text-sm font-semibold text-primary">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tendance {s.trending}/100 · +{s.growth}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
