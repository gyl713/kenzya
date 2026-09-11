import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, FolderGit2, GraduationCap, Handshake, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhyRecommended } from "@/components/WhyRecommended";
import { DemoDataNotice } from "@/components/DemoDataNotice";
import { JOBS } from "@/data/kenzya";
import {
  CANDIDATES,
  SKILL_LEVEL_HELP,
  SKILL_LEVEL_LABEL,
  computeMatch,
  skillRecommendations,
} from "@/data/matching";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil basé sur des preuves | KENZYA" },
      {
        name: "description",
        content:
          "Un profil KENZYA distingue les compétences déclarées des compétences démontrées : tests, projets, certifications et recommandations.",
      },
      { property: "og:title", content: "Profil basé sur des preuves | KENZYA" },
      {
        property: "og:description",
        content: "Compétences déclarées, évaluées, projets et certifications : la preuve avant le CV.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilPage,
});

function ProfilPage() {
  const [id, setId] = useState(CANDIDATES[0]!.id);
  const profile = CANDIDATES.find((c) => c.id === id) ?? CANDIDATES[0]!;

  const opportunities = JOBS.map((job) => ({ job, match: computeMatch(profile, job) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 3);
  const toDevelop = skillRecommendations(profile);

  const declared = profile.skills.filter((s) => s.level === "declaree");
  const proven = profile.skills.filter((s) => s.level !== "declaree");

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
            Profil candidat
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Un profil qui repose sur des preuves, pas seulement sur un CV
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            KENZYA distingue clairement ce qu'une personne déclare de ce qu'elle peut démontrer.
            C'est ce qui permet à un recruteur de comparer objectivement plusieurs profils.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CANDIDATES.map((c) => (
              <button
                key={c.id}
                onClick={() => setId(c.id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-smooth ${
                  c.id === profile.id
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
        <DemoDataNotice>
          Ces profils sont fictifs et servent à illustrer le fonctionnement de KENZYA. Aucun test de
          compétence réel n'a encore été passé sur la plateforme.
        </DemoDataNotice>

        <section className="rounded-2xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-bold text-primary">{profile.name}</h2>
          <p className="text-muted-foreground">{profile.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.location} · Objectif : {profile.targetRole} · {profile.availability}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
              <ShieldCheck className="h-5 w-5 text-success" /> Compétences démontrées
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {SKILL_LEVEL_HELP.evaluee}
            </p>
            <ul className="mt-4 space-y-3">
              {proven.map((s) => (
                <li key={s.name} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-foreground">{s.name}</span>
                    <span className="rounded-lg bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                      {SKILL_LEVEL_LABEL[s.level]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Preuve : {s.evidence}
                    {s.testScore ? ` — résultat ${s.testScore}/100` : ""}
                  </p>
                </li>
              ))}
              {!proven.length && (
                <li className="text-sm text-muted-foreground">
                  Aucune compétence encore démontrée. Un test ou un projet suffit à en démontrer une.
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <p className="font-display text-lg font-semibold text-primary">Compétences déclarées</p>
            <p className="mt-1 text-xs text-muted-foreground">{SKILL_LEVEL_HELP.declaree}</p>
            <ul className="mt-4 space-y-2">
              {declared.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between rounded-xl border border-dashed border-border p-3 text-sm"
                >
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-xs text-muted-foreground">À confirmer</span>
                </li>
              ))}
              {!declared.length && (
                <li className="text-sm text-muted-foreground">
                  Toutes les compétences du profil sont appuyées par une preuve.
                </li>
              )}
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-soft">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
              <FolderGit2 className="h-5 w-5 text-secondary" /> Projets et portfolio
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {profile.projects.map((p) => (
                <li key={p.name} className="rounded-xl border border-border p-3">
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-muted-foreground">{p.summary}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Compétences mobilisées : {p.skills.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                <GraduationCap className="h-5 w-5 text-secondary" /> Expériences
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {profile.experiences.map((e) => (
                  <li key={e.role + e.company}>
                    <p className="font-semibold text-foreground">
                      {e.role} — {e.company}
                    </p>
                    <p className="text-muted-foreground">
                      {e.years} an{e.years > 1 ? "s" : ""} · {e.sector}. {e.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                <BadgeCheck className="h-5 w-5 text-secondary" /> Certifications
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {profile.certifications.map((c) => (
                  <li key={c.name} className="text-muted-foreground">
                    <span className="font-medium text-foreground">{c.name}</span> — {c.issuer},{" "}
                    {c.year}
                    {c.verified ? " · vérifiée" : " · non vérifiée"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6 shadow-soft">
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
            <Handshake className="h-5 w-5 text-secondary" /> Recommandations du réseau
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Une recommandation est un signal parmi d'autres. Elle n'établit pas à elle seule une
            compétence et pèse peu dans le score.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {profile.referrals.map((r) => (
              <li key={r.from} className="rounded-xl border border-border p-3">
                <p className="font-semibold text-foreground">
                  {r.from} — {r.role}
                </p>
                <p className="text-muted-foreground">« {r.comment} »</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r.relation} · {r.weightNote}
                </p>
              </li>
            ))}
            {!profile.referrals.length && (
              <li className="text-muted-foreground">
                Aucune recommandation reçue pour l'instant.
              </li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-primary">
            Opportunités les plus proches de ce profil
          </h2>
          <div className="mt-4 space-y-4">
            {opportunities.map(({ job, match }) => (
              <div key={job.id} className="rounded-2xl bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Link
                      to="/offres/$jobId"
                      params={{ jobId: job.id }}
                      className="font-display text-lg font-semibold text-primary hover:underline"
                    >
                      {job.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <span className="rounded-xl bg-secondary/10 px-3 py-1.5 text-sm font-bold text-secondary">
                    {match.score} %
                  </span>
                </div>
                <div className="mt-3">
                  <WhyRecommended
                    reasons={[
                      `Compétences : ${match.matchedSkills.length}/${job.skills.length} des compétences demandées sont présentes dans le profil.`,
                      match.gapSkills.length
                        ? `Éléments à démontrer pour cette offre : ${match.gapSkills.join(", ")}.`
                        : "Toutes les compétences demandées sont appuyées par une preuve.",
                      ...match.criteria.map((c) => `${c.label} : ${c.points}/${c.weight} — ${c.detail}`),
                    ]}
                    sources={[
                      "contenu de l'offre publiée sur KENZYA",
                      "éléments prouvés du profil (tests, projets, certifications)",
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-primary">
            Compétences à développer en priorité
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ces pistes viennent de la fréquence réelle des compétences dans les offres disponibles
            sur KENZYA, pas d'une appréciation sur la personne.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {toDevelop.map((s) => (
              <div key={s.skill} className="rounded-2xl bg-card p-5 shadow-soft">
                <p className="font-display text-base font-semibold text-primary">{s.skill}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Présente dans {s.count} offre{s.count > 1 ? "s" : ""} ({s.share} % du jeu de
                  données).
                </p>
                <div className="mt-3">
                  <WhyRecommended
                    reasons={[s.reason, "Cette compétence n'apparaît pas encore dans votre profil."]}
                    sources={["offres actuellement disponibles sur KENZYA"]}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
