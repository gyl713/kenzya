import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/espace")({
  head: () => ({
    meta: [
      { title: "Mon espace KENZYA" },
      {
        name: "description",
        content: "Votre espace personnel KENZYA : profil candidat ou outils de recrutement.",
      },
      { property: "og:title", content: "Mon espace KENZYA" },
      { property: "og:description", content: "Espace candidat et espace recruteur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EspacePage,
});

function EspacePage() {
  const { user, role, fullName, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  const recruteur = role === "recruteur";

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
            {recruteur ? "Espace recruteur" : "Espace candidat"}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Bonjour {fullName ?? user?.email ?? ""}
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            {recruteur
              ? "Publiez vos offres et recherchez des profils par compétence, avec la preuve derrière chaque compétence affichée."
              : "Construisez un profil appuyé sur des preuves : plus votre profil est démontré, mieux KENZYA peut expliquer pourquoi une offre vous correspond."}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {loading && <p className="text-muted-foreground">Chargement de votre espace…</p>}

        <div className="grid gap-4 md:grid-cols-2">
          {recruteur ? (
            <>
              <Card
                to="/talents"
                title="Rechercher des talents"
                body="Filtrez par compétence, comparez les profils sur les mêmes critères et voyez les preuves."
              />
              <Card
                to="/recruteurs"
                title="Publier une offre"
                body="Décrivez le poste et les compétences attendues pour obtenir des correspondances expliquées."
              />
              <Card
                to="/marche"
                title="Données du marché"
                body="Les compétences les plus demandées, calculées sur les offres présentes sur KENZYA."
              />
              <Card
                to="/methode"
                title="Méthode et sources"
                body="Comment le score est calculé, ce que l'IA fait et ce qu'elle ne fait pas."
              />
            </>
          ) : (
            <>
              <Card
                to="/profil"
                title="Mon profil et mes preuves"
                body="Compétences déclarées, compétences démontrées, projets, certifications."
              />
              <Card
                to="/offres"
                title="Voir les offres"
                body="Chaque offre affiche votre correspondance et ce qu'il reste à démontrer."
              />
              <Card
                to="/orientation"
                title="Orientation"
                body="Pour les bacheliers : des secteurs suggérés avec les formations correspondantes."
              />
              <Card
                to="/methode"
                title="Sur quoi KENZYA se base"
                body="Sources des données, pondérations du score et limites assumées."
              />
            </>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-card p-6 shadow-soft">
          <p className="text-sm text-muted-foreground">
            Compte : {user?.email} · Type de compte : {role ?? "candidat"}
          </p>
          <button
            onClick={signOut}
            className="mt-3 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary transition-smooth hover:bg-muted"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Card({
  to,
  title,
  body,
}: {
  to: "/talents" | "/recruteurs" | "/marche" | "/methode" | "/profil" | "/offres" | "/orientation";
  title: string;
  body: string;
}) {
  return (
    <Link to={to} className="rounded-2xl bg-card p-6 shadow-soft transition-smooth hover:opacity-90">
      <p className="font-display text-lg font-semibold text-primary">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
