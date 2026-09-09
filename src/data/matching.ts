import { JOBS, type Job } from "./kenzya";

/**
 * KENZYA MATCH — moteur de correspondance explicable.
 *
 * Principes :
 * - le score est une AIDE À LA DÉCISION, jamais une décision de recrutement ;
 * - chaque point de score est rattaché à une preuve consultable ;
 * - les pondérations sont configurables et non validées scientifiquement.
 */

export type SkillLevel = "declaree" | "evaluee" | "certifiee";

export type Skill = {
  name: string;
  level: SkillLevel;
  /** Preuve rattachée : test, projet, certification, expérience. */
  evidence?: string;
  /** Score de test sur 100, uniquement si la compétence a été évaluée. */
  testScore?: number;
};

export type Experience = {
  role: string;
  company: string;
  years: number;
  sector: string;
  summary: string;
};

export type Project = {
  name: string;
  summary: string;
  skills: string[];
  link?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: number;
  verified: boolean;
};

export type Referral = {
  from: string;
  role: string;
  relation: string;
  comment: string;
  /** Une recommandation est un signal, pas une preuve de compétence. */
  weightNote: string;
};

export type CandidateProfile = {
  id: string;
  name: string;
  headline: string;
  location: string;
  targetRole: string;
  availability: string;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  referrals: Referral[];
};

export const SKILL_LEVEL_LABEL: Record<SkillLevel, string> = {
  declaree: "Déclarée",
  evaluee: "Évaluée",
  certifiee: "Certifiée",
};

export const SKILL_LEVEL_HELP: Record<SkillLevel, string> = {
  declaree: "Indiquée par la personne, pas encore vérifiée par KENZYA.",
  evaluee: "Mesurée par un test KENZYA ou démontrée par un projet consultable.",
  certifiee: "Attestée par un organisme extérieur vérifiable.",
};

/** Poids par défaut du score. Configurables, non validés par des données réelles. */
export type MatchWeights = {
  skills: number;
  experience: number;
  projects: number;
  education: number;
  other: number;
};

export const DEFAULT_WEIGHTS: MatchWeights = {
  skills: 40,
  experience: 25,
  projects: 15,
  education: 10,
  other: 10,
};

export const WEIGHT_LABELS: Record<keyof MatchWeights, string> = {
  skills: "Compétences",
  experience: "Expérience",
  projects: "Projets",
  education: "Formation & certifications",
  other: "Autres critères (lieu, contrat, disponibilité)",
};

export type MatchCriterion = {
  key: keyof MatchWeights;
  label: string;
  weight: number;
  /** Part obtenue, entre 0 et 1. */
  ratio: number;
  points: number;
  detail: string;
};

export type MatchResult = {
  score: number;
  criteria: MatchCriterion[];
  matchedSkills: Skill[];
  /** Compétences demandées que le profil ne permet pas encore de démontrer. */
  gapSkills: string[];
  /** Compétences déclarées mais pas encore prouvées, sur les compétences demandées. */
  declaredOnly: Skill[];
  relevantExperiences: Experience[];
  relevantProjects: Project[];
  relevantCertifications: Certification[];
};

const norm = (s: string) => s.toLowerCase().trim();

function skillFor(profile: CandidateProfile, wanted: string) {
  return profile.skills.find(
    (s) => norm(s.name) === norm(wanted) || norm(s.name).includes(norm(wanted)) || norm(wanted).includes(norm(s.name)),
  );
}

const LEVEL_VALUE: Record<SkillLevel, number> = {
  declaree: 0.55,
  evaluee: 1,
  certifiee: 1,
};

export function computeMatch(
  profile: CandidateProfile,
  job: Job,
  weights: MatchWeights = DEFAULT_WEIGHTS,
): MatchResult {
  const matchedSkills: Skill[] = [];
  const gapSkills: string[] = [];
  let skillPoints = 0;

  for (const wanted of job.skills) {
    const found = skillFor(profile, wanted);
    if (found) {
      matchedSkills.push(found);
      skillPoints += LEVEL_VALUE[found.level];
    } else {
      gapSkills.push(wanted);
    }
  }
  const skillRatio = job.skills.length ? skillPoints / job.skills.length : 0;

  const relevantExperiences = profile.experiences.filter(
    (e) => norm(e.sector) === norm(job.sector) || norm(job.title).includes(norm(e.role.split(" ")[0] ?? "")),
  );
  const years = relevantExperiences.reduce((sum, e) => sum + e.years, 0);
  const experienceRatio = Math.min(years / 3, 1);

  const relevantProjects = profile.projects.filter((p) =>
    p.skills.some((s) => job.skills.some((j) => norm(j) === norm(s))),
  );
  const projectRatio = Math.min(relevantProjects.length / 2, 1);

  const relevantCertifications = profile.certifications.filter(
    (c) => c.verified || job.skills.some((s) => norm(c.name).includes(norm(s))),
  );
  const educationRatio = Math.min(relevantCertifications.length / 2, 1);

  let otherScore = 0;
  const otherDetails: string[] = [];
  if (job.remote || norm(job.location).includes(norm(profile.location.split(",")[0] ?? ""))) {
    otherScore += 0.6;
    otherDetails.push(job.remote ? "poste ouvert au télétravail" : "même ville que le candidat");
  } else {
    otherDetails.push("localisation différente du profil");
  }
  if (profile.referrals.length > 0) {
    otherScore += 0.4;
    otherDetails.push(`${profile.referrals.length} recommandation(s) reçue(s) — signal, pas preuve`);
  }
  const otherRatio = Math.min(otherScore, 1);

  const criteria: MatchCriterion[] = [
    {
      key: "skills",
      label: WEIGHT_LABELS.skills,
      weight: weights.skills,
      ratio: skillRatio,
      points: Math.round(skillRatio * weights.skills),
      detail: `${matchedSkills.length}/${job.skills.length} compétences demandées retrouvées dans le profil. Une compétence seulement déclarée compte pour moitié.`,
    },
    {
      key: "experience",
      label: WEIGHT_LABELS.experience,
      weight: weights.experience,
      ratio: experienceRatio,
      points: Math.round(experienceRatio * weights.experience),
      detail: years
        ? `${years} an(s) d'expérience dans le secteur ${job.sector} (référence utilisée : 3 ans).`
        : `Aucune expérience déclarée dans le secteur ${job.sector}.`,
    },
    {
      key: "projects",
      label: WEIGHT_LABELS.projects,
      weight: weights.projects,
      ratio: projectRatio,
      points: Math.round(projectRatio * weights.projects),
      detail: relevantProjects.length
        ? `${relevantProjects.length} projet(s) consultable(s) mobilisant les compétences demandées.`
        : "Aucun projet rattaché aux compétences demandées.",
    },
    {
      key: "education",
      label: WEIGHT_LABELS.education,
      weight: weights.education,
      ratio: educationRatio,
      points: Math.round(educationRatio * weights.education),
      detail: relevantCertifications.length
        ? `${relevantCertifications.length} certification(s) prise(s) en compte.`
        : "Aucune certification rattachée à cette offre.",
    },
    {
      key: "other",
      label: WEIGHT_LABELS.other,
      weight: weights.other,
      ratio: otherRatio,
      points: Math.round(otherRatio * weights.other),
      detail: otherDetails.join(" · "),
    },
  ];

  return {
    score: criteria.reduce((sum, c) => sum + c.points, 0),
    criteria,
    matchedSkills,
    gapSkills,
    declaredOnly: matchedSkills.filter((s) => s.level === "declaree"),
    relevantExperiences,
    relevantProjects,
    relevantCertifications,
  };
}

/** Formulation positive et factuelle du niveau de correspondance. */
export function matchWording(score: number) {
  if (score >= 75)
    return {
      title: "Profil très proche des attentes de l'offre",
      body: "La majorité des éléments demandés sont déjà démontrables dans le profil.",
    };
  if (score >= 50)
    return {
      title: "Profil partiellement aligné",
      body: "Une partie des attentes est couverte ; d'autres éléments restent à démontrer.",
    };
  return {
    title: "Cette opportunité demande des éléments que le profil ne permet pas encore de démontrer",
    body: "Ce n'est pas un jugement sur la personne : c'est un écart mesuré entre le profil actuel et le contenu de cette offre.",
  };
}

/* ------------------------------------------------------------------ */
/* Données du marché — calculées sur le jeu d'offres disponible        */
/* ------------------------------------------------------------------ */

export type SkillDemand = { skill: string; count: number; share: number; sectors: string[] };

export function skillDemand(jobs: Job[] = JOBS): SkillDemand[] {
  const map = new Map<string, { count: number; sectors: Set<string> }>();
  for (const job of jobs) {
    for (const s of job.skills) {
      const entry = map.get(s) ?? { count: 0, sectors: new Set<string>() };
      entry.count += 1;
      entry.sectors.add(job.sector);
      map.set(s, entry);
    }
  }
  return [...map.entries()]
    .map(([skill, v]) => ({
      skill,
      count: v.count,
      share: Math.round((v.count / jobs.length) * 100),
      sectors: [...v.sectors],
    }))
    .sort((a, b) => b.count - a.count);
}

export function sectorDemand(jobs: Job[] = JOBS) {
  const map = new Map<string, number>();
  for (const job of jobs) map.set(job.sector, (map.get(job.sector) ?? 0) + 1);
  return [...map.entries()]
    .map(([sector, count]) => ({ sector, count, share: Math.round((count / jobs.length) * 100) }))
    .sort((a, b) => b.count - a.count);
}

export function contractDemand(jobs: Job[] = JOBS) {
  const map = new Map<string, number>();
  for (const job of jobs) map.set(job.contract, (map.get(job.contract) ?? 0) + 1);
  return [...map.entries()]
    .map(([contract, count]) => ({ contract, count, share: Math.round((count / jobs.length) * 100) }))
    .sort((a, b) => b.count - a.count);
}

/** Compétences à développer, avec la raison chiffrée de la recommandation. */
export function skillRecommendations(profile: CandidateProfile, jobs: Job[] = JOBS) {
  const owned = new Set(profile.skills.map((s) => norm(s.name)));
  const target = jobs.filter(
    (j) => norm(j.sector) === norm(profile.targetRole.split("—")[1] ?? "") || j.skills.length > 0,
  );
  return skillDemand(target)
    .filter((d) => ![...owned].some((o) => norm(d.skill).includes(o) || o.includes(norm(d.skill))))
    .slice(0, 5)
    .map((d) => ({
      ...d,
      reason: `Cette compétence apparaît dans ${d.count} des ${target.length} offres du jeu de données KENZYA (${d.share} %), notamment en ${d.sectors.join(", ")}.`,
    }));
}

/* ------------------------------------------------------------------ */
/* Profils de démonstration                                            */
/* ------------------------------------------------------------------ */

export const CANDIDATES: CandidateProfile[] = [
  {
    id: "aya-koffi",
    name: "Aya Koffi",
    headline: "Développeuse web — 2 ans d'expérience",
    location: "Abidjan, Yopougon",
    targetRole: "Développeuse Full Stack — Technologie",
    availability: "Disponible sous 1 mois",
    skills: [
      { name: "React", level: "evaluee", evidence: "Test technique KENZYA (front-end)", testScore: 82 },
      { name: "Node.js", level: "evaluee", evidence: "Projet « Suivi de livraisons »", testScore: 74 },
      { name: "PostgreSQL", level: "declaree" },
      { name: "Git", level: "evaluee", evidence: "Dépôt public avec 140 commits" },
      { name: "REST API", level: "declaree" },
      { name: "Rédaction", level: "declaree" },
    ],
    experiences: [
      {
        role: "Développeuse front-end",
        company: "Agence Wôrô Digital",
        years: 2,
        sector: "Technologie",
        summary: "Intégration et maintenance de sites clients (React, Tailwind), en équipe de 4.",
      },
    ],
    projects: [
      {
        name: "Suivi de livraisons Abidjan",
        summary: "Application de suivi de colis pour un livreur indépendant : 60 utilisateurs actifs.",
        skills: ["React", "Node.js", "PostgreSQL"],
      },
      {
        name: "Site vitrine coopérative cacao",
        summary: "Site bilingue pour une coopérative de Divo, mis en ligne et maintenu 8 mois.",
        skills: ["React", "Git"],
      },
    ],
    certifications: [
      { name: "Certificat Développement Web — Orange Digital Center", issuer: "ODC Abidjan", year: 2024, verified: true },
    ],
    referrals: [
      {
        from: "Serge N'Guessan",
        role: "Lead développeur, Wôrô Digital",
        relation: "Ancien responsable direct",
        comment: "Autonome sur le front-end, livre dans les délais.",
        weightNote: "Signal complémentaire — ne remplace pas une compétence évaluée.",
      },
    ],
  },
  {
    id: "moussa-traore",
    name: "Moussa Traoré",
    headline: "Analyste de données junior",
    location: "Abidjan, Plateau",
    targetRole: "Data Analyst — Technologie",
    availability: "Disponible immédiatement",
    skills: [
      { name: "SQL", level: "evaluee", evidence: "Test KENZYA requêtes SQL", testScore: 88 },
      { name: "Python", level: "declaree" },
      { name: "Excel avancé", level: "certifiee", evidence: "Certification Microsoft" },
      { name: "Statistiques", level: "declaree" },
    ],
    experiences: [
      {
        role: "Assistant analyste",
        company: "Microfinance Ivoire",
        years: 1,
        sector: "Finance",
        summary: "Reporting mensuel du portefeuille de crédits et fiabilisation des données clients.",
      },
    ],
    projects: [
      {
        name: "Tableau de bord des impayés",
        summary: "Suivi hebdomadaire des impayés pour 3 agences, utilisé par la direction.",
        skills: ["SQL", "Excel avancé"],
      },
    ],
    certifications: [
      { name: "Microsoft Excel Expert", issuer: "Microsoft", year: 2025, verified: true },
    ],
    referrals: [],
  },
  {
    id: "fatou-diomande",
    name: "Fatou Diomandé",
    headline: "Technicienne qualité agroalimentaire",
    location: "San-Pédro",
    targetRole: "Technicienne qualité — Agroalimentaire",
    availability: "Préavis de 2 mois",
    skills: [
      { name: "HACCP", level: "certifiee", evidence: "Formation HACCP niveau 2" },
      { name: "Contrôle qualité", level: "evaluee", evidence: "3 ans en usine de transformation", testScore: 79 },
      { name: "Agronomie", level: "declaree" },
    ],
    experiences: [
      {
        role: "Technicienne qualité",
        company: "Coopérative CAYAT",
        years: 3,
        sector: "Agroalimentaire",
        summary: "Contrôle des lots de cacao, rédaction des rapports de conformité, formation des équipes.",
      },
    ],
    projects: [
      {
        name: "Mise en conformité HACCP d'un atelier",
        summary: "Procédures rédigées et déployées sur un atelier de 25 personnes.",
        skills: ["HACCP", "Contrôle qualité"],
      },
    ],
    certifications: [{ name: "HACCP niveau 2", issuer: "Bureau Veritas", year: 2023, verified: true }],
    referrals: [
      {
        from: "Coopérative CAYAT",
        role: "Direction production",
        relation: "Employeur actuel",
        comment: "Sérieuse et rigoureuse sur le suivi des lots.",
        weightNote: "Signal complémentaire — ne remplace pas une compétence évaluée.",
      },
    ],
  },
];

export const DEMO_PROFILE = CANDIDATES[0]!;
