import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, CalendarClock, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { JOBS, formatSalary } from "@/data/kenzya";

export const Route = createFileRoute("/offres/$jobId")({
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.id === params.jobId);
    if (!job) throw notFound();
    return job;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — ${loaderData.company} | KENZYA` },
          {
            name: "description",
            content: `${loaderData.contract} à ${loaderData.location} chez ${loaderData.company}. ${loaderData.description.slice(0, 110)}…`,
          },
          { property: "og:title", content: `${loaderData.title} — ${loaderData.company}` },
          {
            property: "og:description",
            content: `Offre ${loaderData.contract} à ${loaderData.location}, publiée sur KENZYA.`,
          },
        ]
      : [],
  }),
  component: JobDetail,
});

function JobDetail() {
  const job = Route.useLoaderData();
  const similar = JOBS.filter((j) => j.sector === job.sector && j.id !== job.id).slice(0, 2);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link
            to="/offres"
            className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux offres
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            {job.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-4 w-4" /> {job.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            {job.deadline && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4" /> Clôture le{" "}
                {new Date(job.deadline).toLocaleDateString("fr-FR")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-10 md:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold text-primary">Description du poste</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{job.description}</p>

          <h2 className="mt-8 font-display text-lg font-semibold text-primary">
            Compétences attendues
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <span
                key={s}
                className="rounded-lg bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Rémunération
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-primary">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </p>

          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Contrat" value={job.contract} />
            <Row label="Secteur" value={job.sector} />
            <Row label="Télétravail" value={job.remote ? "Possible" : "Non"} />
            <Row label="Source" value={job.source} />
          </dl>

          <button className="mt-6 w-full rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:opacity-90">
            Postuler à cette offre
          </button>
          <button className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold text-primary transition-smooth hover:bg-muted">
            Enregistrer en favori
          </button>
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-xl font-bold text-primary">Offres similaires</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {similar.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
