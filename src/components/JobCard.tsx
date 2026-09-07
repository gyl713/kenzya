import { Link } from "@tanstack/react-router";
import { MapPin, Building2, Clock } from "lucide-react";
import { formatSalary, type Job } from "@/data/kenzya";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      to="/offres/$jobId"
      params={{ jobId: job.id }}
      className="group block rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-medium"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-primary group-hover:text-secondary">
          {job.title}
        </h3>
        <span className="shrink-0 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          {job.contract}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="h-4 w-4" /> {job.company}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {new Date(job.postedAt).toLocaleDateString("fr-FR")}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold text-foreground">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <div className="flex items-center gap-2">
          {job.remote && (
            <span className="rounded-lg bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              Télétravail
            </span>
          )}
          <span className="rounded-lg bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            {job.source}
          </span>
        </div>
      </div>
    </Link>
  );
}
