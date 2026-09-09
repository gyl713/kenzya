export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  contract: "CDI" | "CDD" | "Stage" | "Freelance" | "Alternance";
  sector: string;
  salaryMin?: number;
  salaryMax?: number;
  remote: boolean;
  source: string;
  postedAt: string;
  deadline?: string;
  description: string;
  skills: string[];
};

export const SOURCES = ["Emploi.ci", "Educarrière", "JobIvoire", "GoAfrica", "NovoJob", "KENZYA"];

export const JOBS: Job[] = [
  {
    id: "dev-fullstack-abidjan",
    title: "Développeur Full Stack (React / Node.js)",
    company: "Orange Digital Center",
    location: "Abidjan, Cocody",
    contract: "CDI",
    sector: "Technologie",
    salaryMin: 600000,
    salaryMax: 950000,
    remote: true,
    source: "Emploi.ci",
    postedAt: "2026-09-05",
    deadline: "2026-09-30",
    description:
      "Vous rejoignez une équipe produit de 8 personnes pour concevoir et maintenir des applications web à fort trafic destinées au marché ivoirien. Vous participez aux choix techniques, au code review et à la mise en production continue.",
    skills: ["React", "Node.js", "PostgreSQL", "Git", "REST API"],
  },
  {
    id: "comptable-senior",
    title: "Comptable Senior",
    company: "Groupe SIFCA",
    location: "Abidjan, Plateau",
    contract: "CDI",
    sector: "Finance",
    salaryMin: 450000,
    salaryMax: 700000,
    remote: false,
    source: "Educarrière",
    postedAt: "2026-09-04",
    deadline: "2026-09-25",
    description:
      "Rattaché au Directeur Financier, vous assurez la tenue de la comptabilité générale et analytique, les déclarations fiscales et la préparation des états financiers selon le référentiel SYSCOHADA révisé.",
    skills: ["SYSCOHADA", "Sage", "Fiscalité", "Excel avancé"],
  },
  {
    id: "technicien-agro",
    title: "Technicien Agroalimentaire",
    company: "Cargill Côte d'Ivoire",
    location: "San-Pédro",
    contract: "CDD",
    sector: "Agroalimentaire",
    salaryMin: 300000,
    salaryMax: 450000,
    remote: false,
    source: "JobIvoire",
    postedAt: "2026-09-03",
    description:
      "Vous contrôlez la qualité des fèves de cacao à chaque étape de la transformation, appliquez les procédures HACCP et rédigez les rapports de conformité.",
    skills: ["HACCP", "Contrôle qualité", "Agronomie"],
  },
  {
    id: "infirmier-diplome",
    title: "Infirmier Diplômé d'État",
    company: "Polyclinique Sainte Anne-Marie",
    location: "Abidjan, Marcory",
    contract: "CDI",
    sector: "Santé",
    salaryMin: 250000,
    salaryMax: 400000,
    remote: false,
    source: "GoAfrica",
    postedAt: "2026-09-02",
    description:
      "Prise en charge des patients hospitalisés, administration des soins prescrits, suivi des dossiers et accompagnement des familles au sein d'un service de médecine générale.",
    skills: ["Soins infirmiers", "Urgences", "Dossier patient"],
  },
  {
    id: "chef-chantier-btp",
    title: "Chef de Chantier BTP",
    company: "PFO Africa",
    location: "Yamoussoukro",
    contract: "CDI",
    sector: "BTP",
    salaryMin: 700000,
    salaryMax: 1100000,
    remote: false,
    source: "NovoJob",
    postedAt: "2026-09-01",
    description:
      "Vous pilotez l'exécution des travaux de génie civil sur un chantier routier : planning, sécurité, coordination des sous-traitants et reporting hebdomadaire au conducteur de travaux.",
    skills: ["Génie civil", "AutoCAD", "HSE", "Planification"],
  },
  {
    id: "stage-marketing-digital",
    title: "Stagiaire Marketing Digital",
    company: "KENZYA",
    location: "Abidjan, Riviera",
    contract: "Stage",
    sector: "Marketing",
    salaryMin: 100000,
    salaryMax: 150000,
    remote: true,
    source: "KENZYA",
    postedAt: "2026-09-06",
    deadline: "2026-09-20",
    description:
      "Stage de 6 mois pour animer nos réseaux sociaux, produire du contenu utile aux chercheurs d'emploi ivoiriens et suivre les performances de nos campagnes.",
    skills: ["Réseaux sociaux", "Canva", "Rédaction", "Analytics"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    company: "Ecobank CI",
    location: "Abidjan, Plateau",
    contract: "CDI",
    sector: "Technologie",
    salaryMin: 800000,
    salaryMax: 1300000,
    remote: false,
    source: "Emploi.ci",
    postedAt: "2026-08-31",
    description:
      "Vous transformez les données transactionnelles en tableaux de bord décisionnels pour les directions métiers et contribuez aux modèles de scoring de risque.",
    skills: ["SQL", "Python", "Power BI", "Statistiques"],
  },
  {
    id: "technicien-solaire",
    title: "Technicien Installation Solaire",
    company: "Bboxx Côte d'Ivoire",
    location: "Bouaké",
    contract: "CDD",
    sector: "Énergie",
    salaryMin: 220000,
    salaryMax: 350000,
    remote: false,
    source: "JobIvoire",
    postedAt: "2026-08-30",
    description:
      "Installation et maintenance de kits solaires domestiques en zone rurale, formation des clients à l'usage des équipements et remontée des incidents terrain.",
    skills: ["Électricité", "Photovoltaïque", "Maintenance", "Permis A"],
  },
];

export type Sector = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  trending: number;
  growth: number;
  avgSalary: number;
  skills: string[];
  studies: string[];
  bacs: string[];
};

export const SECTORS: Sector[] = [
  {
    id: "technologie",
    name: "Technologie & Numérique",
    emoji: "💻",
    description:
      "Développement logiciel, data, cybersécurité et fintech. Le secteur qui recrute le plus vite à Abidjan, y compris sans diplôme long si les compétences sont prouvées.",
    trending: 96,
    growth: 18,
    avgSalary: 750000,
    skills: ["Programmation", "Bases de données", "Logique", "Anglais technique"],
    studies: ["ESATIC", "INP-HB", "Université Félix Houphouët-Boigny", "Bootcamps (Simplon, ODC)"],
    bacs: ["Scientifique", "Technique"],
  },
  {
    id: "sante",
    name: "Santé",
    emoji: "🩺",
    description:
      "Soins infirmiers, biologie médicale, pharmacie et santé publique. Besoins structurels forts dans tout le pays, en particulier hors d'Abidjan.",
    trending: 88,
    growth: 12,
    avgSalary: 420000,
    skills: ["Rigueur", "Empathie", "Biologie", "Résistance au stress"],
    studies: ["INFAS", "UFR Sciences Médicales", "Écoles privées agréées"],
    bacs: ["Scientifique"],
  },
  {
    id: "agroalimentaire",
    name: "Agro-industrie",
    emoji: "🌱",
    description:
      "Cacao, hévéa, anacarde, transformation locale. La transformation sur place crée de nouveaux métiers techniques et qualité.",
    trending: 84,
    growth: 14,
    avgSalary: 380000,
    skills: ["Agronomie", "Qualité HACCP", "Logistique", "Terrain"],
    studies: ["INP-HB Yamoussoukro", "ESA", "BTS Agroalimentaire"],
    bacs: ["Scientifique", "Technique"],
  },
  {
    id: "btp",
    name: "BTP & Infrastructures",
    emoji: "🏗️",
    description:
      "Routes, logements, ponts et grands travaux. Un secteur porté par la commande publique et l'urbanisation rapide.",
    trending: 79,
    growth: 10,
    avgSalary: 550000,
    skills: ["Génie civil", "Lecture de plans", "Encadrement", "Sécurité"],
    studies: ["INP-HB", "ESTP", "BTS Génie Civil"],
    bacs: ["Scientifique", "Technique"],
  },
  {
    id: "finance",
    name: "Banque, Finance & Assurance",
    emoji: "📊",
    description:
      "Banque de détail, mobile money, microfinance et assurance. Abidjan est le hub financier de l'UEMOA.",
    trending: 82,
    growth: 9,
    avgSalary: 620000,
    skills: ["Comptabilité", "Analyse", "Relation client", "Excel"],
    studies: ["CESAG", "INP-HB", "Universités privées (HEC CI, ESCA)"],
    bacs: ["Économique", "Scientifique"],
  },
  {
    id: "energie",
    name: "Énergie & Environnement",
    emoji: "⚡",
    description:
      "Électrification rurale, solaire, efficacité énergétique. Beaucoup de projets financés sur les 10 prochaines années.",
    trending: 76,
    growth: 16,
    avgSalary: 500000,
    skills: ["Électrotechnique", "Photovoltaïque", "Gestion de projet"],
    studies: ["INP-HB", "IST", "BTS Électrotechnique"],
    bacs: ["Scientifique", "Technique"],
  },
  {
    id: "communication",
    name: "Communication & Création",
    emoji: "🎨",
    description:
      "Marketing digital, design, audiovisuel et création de contenu. Très accessible aux profils littéraires motivés.",
    trending: 71,
    growth: 13,
    avgSalary: 340000,
    skills: ["Rédaction", "Créativité", "Réseaux sociaux", "Outils design"],
    studies: ["ISTC Polytechnique", "Universités privées", "Formations en ligne"],
    bacs: ["Littéraire", "Économique"],
  },
  {
    id: "logistique",
    name: "Transport & Logistique",
    emoji: "🚢",
    description:
      "Ports d'Abidjan et San-Pédro, transit, supply chain. Un pilier de l'économie ivoirienne qui recrute en continu.",
    trending: 74,
    growth: 8,
    avgSalary: 430000,
    skills: ["Organisation", "Douane", "Anglais", "ERP"],
    studies: ["ESCAE", "IUA", "BTS Transport-Logistique"],
    bacs: ["Économique", "Technique"],
  },
];

export type QuizQuestion = {
  id: string;
  question: string;
  options: { label: string; sectors: string[] }[];
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "bac",
    question: "Quel est ton baccalauréat (ou celui que tu prépares) ?",
    options: [
      { label: "Série scientifique (C, D, E)", sectors: ["technologie", "sante", "btp", "energie"] },
      { label: "Série littéraire (A)", sectors: ["communication", "finance"] },
      { label: "Série économique (G, B)", sectors: ["finance", "logistique", "communication"] },
      { label: "Série technique", sectors: ["btp", "energie", "agroalimentaire", "technologie"] },
    ],
  },
  {
    id: "interet",
    question: "Qu'est-ce qui t'intéresse le plus au quotidien ?",
    options: [
      { label: "Résoudre des problèmes logiques", sectors: ["technologie", "finance"] },
      { label: "Aider et soigner les gens", sectors: ["sante"] },
      { label: "Construire et voir un résultat concret", sectors: ["btp", "energie", "agroalimentaire"] },
      { label: "Créer, écrire, convaincre", sectors: ["communication", "finance"] },
    ],
  },
  {
    id: "cadre",
    question: "Dans quel cadre te vois-tu travailler ?",
    options: [
      { label: "Bureau, ordinateur, équipe produit", sectors: ["technologie", "finance", "communication"] },
      { label: "Sur le terrain, en extérieur", sectors: ["btp", "energie", "agroalimentaire", "logistique"] },
      { label: "Au contact du public", sectors: ["sante", "communication", "finance"] },
      { label: "En atelier ou en laboratoire", sectors: ["agroalimentaire", "sante", "energie"] },
    ],
  },
  {
    id: "duree",
    question: "Combien de temps veux-tu étudier après le bac ?",
    options: [
      { label: "2 ans maximum (BTS, formation pro)", sectors: ["logistique", "energie", "agroalimentaire", "communication"] },
      { label: "3 à 5 ans (licence, master)", sectors: ["technologie", "finance", "btp"] },
      { label: "Plus de 5 ans, je vise loin", sectors: ["sante", "btp", "finance"] },
      { label: "Je préfère apprendre en alternance", sectors: ["technologie", "logistique", "communication"] },
    ],
  },
  {
    id: "moteur",
    question: "Qu'est-ce qui compte le plus pour toi dans un métier ?",
    options: [
      { label: "Un bon salaire rapidement", sectors: ["technologie", "finance", "btp"] },
      { label: "Être utile à mon pays", sectors: ["sante", "agroalimentaire", "energie"] },
      { label: "La liberté et la créativité", sectors: ["communication", "technologie"] },
      { label: "La stabilité de l'emploi", sectors: ["finance", "logistique", "sante"] },
    ],
  },
];

export function scoreQuiz(answers: Record<string, number>) {
  const scores: Record<string, number> = {};
  for (const q of QUIZ) {
    const idx = answers[q.id];
    if (idx === undefined) continue;
    for (const sectorId of q.options[idx]?.sectors ?? []) {
      scores[sectorId] = (scores[sectorId] ?? 0) + 1;
    }
  }
  return SECTORS.map((s) => ({
    sector: s,
    score: Math.round(((scores[s.id] ?? 0) / QUIZ.length) * 70 + (s.trending / 100) * 30),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function formatSalary(min?: number, max?: number) {
  if (!min && !max) return "Salaire non communiqué";
  const f = (n: number) => new Intl.NumberFormat("fr-FR").format(n);
  if (min && max) return `${f(min)} – ${f(max)} FCFA / mois`;
  return `${f((min ?? max)!)} FCFA / mois`;
}
