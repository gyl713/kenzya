import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, Inbox, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/recruteurs")({
  head: () => ({
    meta: [
      { title: "Espace recruteurs — publiez vos offres | KENZYA" },
      {
        name: "description",
        content:
          "Publiez vos offres d'emploi en Côte d'Ivoire, suivez les vues et gérez les candidatures depuis un tableau de bord KENZYA. Trois premières offres gratuites.",
      },
      { property: "og:title", content: "Recrutez en Côte d'Ivoire avec KENZYA" },
      {
        property: "og:description",
        content:
          "Diffusion des offres, statistiques de vues et gestion des candidatures pour les entreprises ivoiriennes.",
      },
    ],
  }),
  component: RecruitersPage,
});

const PLANS = [
  {
    name: "Découverte",
    price: "Gratuit",
    detail: "3 premières offres",
    features: ["Publication d'offres", "Tableau de bord", "Candidatures en ligne"],
    highlight: false,
  },
  {
    name: "Premium",
    price: "45 000 FCFA",
    detail: "par mois",
    features: [
      "Offres illimitées",
      "Offres mises en avant",
      "Statistiques détaillées",
      "Export des candidatures",
    ],
    highlight: true,
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    detail: "grands comptes",
    features: ["Multi-utilisateurs", "Page entreprise dédiée", "Accompagnement personnalisé"],
    highlight: false,
  },
];

function RecruitersPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="max-w-2xl font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Recrutez les meilleurs profils ivoiriens
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/80">
            Publiez vos offres sur KENZYA et touchez des milliers de candidats qui consultent la
            plateforme chaque semaine. Les trois premières offres sont gratuites.
          </p>
          <a
            href="#formulaire"
            className="mt-7 inline-block rounded-xl bg-accent-gradient px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-smooth hover:opacity-90"
          >
            Publier une offre
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-4">
          <Card icon={<Inbox className="h-5 w-5" />} title="Candidatures centralisées" text="Recevez, filtrez et suivez toutes les candidatures au même endroit." />
          <Card icon={<BarChart3 className="h-5 w-5" />} title="Statistiques par offre" text="Vues, clics et nombre de candidatures, mis à jour en continu." />
          <Card icon={<ShieldCheck className="h-5 w-5" />} title="Entreprises vérifiées" text="Un badge de confiance après validation de vos documents." />
          <Card icon={<CheckCircle2 className="h-5 w-5" />} title="Modération rapide" text="Chaque offre est relue avant publication, sous 24 heures ouvrées." />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <h2 className="font-display text-2xl font-bold text-primary">Nos formules</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.highlight
                  ? "border-secondary bg-card shadow-elevated"
                  : "border-border bg-card shadow-soft"
              }`}
            >
              {p.highlight && (
                <span className="rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                  Le plus choisi
                </span>
              )}
              <p className="mt-3 font-display text-lg font-semibold text-primary">{p.name}</p>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">{p.price}</p>
              <p className="text-sm text-muted-foreground">{p.detail}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="formulaire" className="mx-auto max-w-3xl px-4 pb-6">
        <div className="rounded-2xl bg-card p-6 shadow-medium md:p-8">
          <h2 className="font-display text-2xl font-bold text-primary">Déposer une offre</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Remplissez ce formulaire, notre équipe valide l'offre puis la met en ligne.
          </p>
          <form
            className="mt-6 grid gap-4 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Merci ! Votre offre sera vérifiée puis publiée sous 24h.");
            }}
          >
            <Field label="Nom de l'entreprise" placeholder="Ex : Groupe SIFCA" />
            <Field label="Adresse e-mail" placeholder="recrutement@entreprise.ci" type="email" />
            <Field label="Intitulé du poste" placeholder="Ex : Comptable senior" />
            <Field label="Ville" placeholder="Ex : Abidjan, Plateau" />
            <div>
              <label className="text-sm font-semibold text-foreground">Type de contrat</label>
              <select className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">
                {["CDI", "CDD", "Stage", "Freelance", "Alternance"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Field label="Salaire proposé (FCFA)" placeholder="Ex : 400 000 – 600 000" />
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-foreground">Description du poste</label>
              <textarea
                rows={5}
                placeholder="Missions, profil recherché, avantages…"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-smooth hover:opacity-90 md:col-span-2"
            >
              Envoyer l'offre pour validation
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        {icon}
      </span>
      <p className="mt-3 font-display text-sm font-semibold text-primary">{title}</p>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none"
      />
    </div>
  );
}
