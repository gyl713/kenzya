// Répertoire des filières et établissements d'enseignement supérieur en Côte d'Ivoire.
// Données publiques compilées à titre indicatif (noms d'établissements et filières
// couramment proposées). À vérifier auprès de chaque établissement avant inscription.

export type FiliereDomain =
  | "Sciences & Technologies"
  | "Santé"
  | "Économie, Gestion & Commerce"
  | "Droit, Sciences politiques & Administration"
  | "Lettres, Langues & Sciences humaines"
  | "Agriculture, Environnement & Mines"
  | "Communication, Arts & Design"
  | "Transport, Logistique & Tourisme"
  | "Éducation & Formation"
  | "BTP & Architecture";

export type Filiere = {
  name: string;
  domain: FiliereDomain;
  levels: string[]; // BTS, Licence, Master, Ingénieur, Doctorat...
  bacs: string[]; // séries de bac adaptées
};

export type SchoolType = "Université publique" | "Grande école publique" | "Établissement privé";

export type School = {
  name: string;
  short?: string;
  city: string;
  type: SchoolType;
  domains: FiliereDomain[];
};

export const FILIERE_DOMAINS: FiliereDomain[] = [
  "Sciences & Technologies",
  "Santé",
  "Économie, Gestion & Commerce",
  "Droit, Sciences politiques & Administration",
  "Lettres, Langues & Sciences humaines",
  "Agriculture, Environnement & Mines",
  "Communication, Arts & Design",
  "Transport, Logistique & Tourisme",
  "Éducation & Formation",
  "BTP & Architecture",
];

export const FILIERES: Filiere[] = [
  // Sciences & Technologies
  { name: "Informatique / Génie logiciel", domain: "Sciences & Technologies", levels: ["BTS", "Licence", "Master", "Ingénieur"], bacs: ["C", "D", "E", "F"] },
  { name: "Réseaux et télécommunications", domain: "Sciences & Technologies", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "D", "E", "F"] },
  { name: "Cybersécurité", domain: "Sciences & Technologies", levels: ["Licence", "Master"], bacs: ["C", "D", "E"] },
  { name: "Data science et intelligence artificielle", domain: "Sciences & Technologies", levels: ["Licence", "Master"], bacs: ["C", "D", "E"] },
  { name: "Mathématiques", domain: "Sciences & Technologies", levels: ["Licence", "Master", "Doctorat"], bacs: ["C", "E"] },
  { name: "Physique-Chimie", domain: "Sciences & Technologies", levels: ["Licence", "Master", "Doctorat"], bacs: ["C", "D", "E"] },
  { name: "Génie électrique / Électrotechnique", domain: "Sciences & Technologies", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "E", "F3"] },
  { name: "Génie mécanique / Maintenance industrielle", domain: "Sciences & Technologies", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "E", "F1", "F2"] },
  { name: "Génie industriel et qualité", domain: "Sciences & Technologies", levels: ["Licence", "Ingénieur"], bacs: ["C", "D", "E"] },
  { name: "Énergies renouvelables", domain: "Sciences & Technologies", levels: ["BTS", "Licence", "Master"], bacs: ["C", "D", "E", "F3"] },
  { name: "Pétrole et gaz", domain: "Sciences & Technologies", levels: ["Licence", "Ingénieur", "Master"], bacs: ["C", "D", "E"] },
  { name: "Statistique et économie appliquée", domain: "Sciences & Technologies", levels: ["Licence", "Ingénieur", "Master"], bacs: ["B", "C", "E"] },

  // Santé
  { name: "Médecine générale", domain: "Santé", levels: ["Doctorat"], bacs: ["C", "D"] },
  { name: "Pharmacie", domain: "Santé", levels: ["Doctorat"], bacs: ["C", "D"] },
  { name: "Chirurgie dentaire (odontostomatologie)", domain: "Santé", levels: ["Doctorat"], bacs: ["C", "D"] },
  { name: "Soins infirmiers", domain: "Santé", levels: ["Licence"], bacs: ["C", "D"] },
  { name: "Sage-femme / Maïeutique", domain: "Santé", levels: ["Licence"], bacs: ["C", "D"] },
  { name: "Kinésithérapie", domain: "Santé", levels: ["Licence"], bacs: ["C", "D"] },
  { name: "Analyses biomédicales / Biologie médicale", domain: "Santé", levels: ["BTS", "Licence", "Master"], bacs: ["C", "D"] },
  { name: "Imagerie médicale", domain: "Santé", levels: ["Licence"], bacs: ["C", "D"] },
  { name: "Santé publique et épidémiologie", domain: "Santé", levels: ["Licence", "Master"], bacs: ["C", "D"] },
  { name: "Médecine vétérinaire", domain: "Santé", levels: ["Doctorat"], bacs: ["C", "D"] },

  // Économie, Gestion & Commerce
  { name: "Comptabilité et finance / DCG-DSCG", domain: "Économie, Gestion & Commerce", levels: ["BTS", "Licence", "Master"], bacs: ["A", "B", "C", "G2"] },
  { name: "Banque et assurance", domain: "Économie, Gestion & Commerce", levels: ["BTS", "Licence", "Master"], bacs: ["A", "B", "C", "G2"] },
  { name: "Gestion des ressources humaines", domain: "Économie, Gestion & Commerce", levels: ["Licence", "Master"], bacs: ["A", "B", "G1", "G2"] },
  { name: "Marketing et commerce", domain: "Économie, Gestion & Commerce", levels: ["BTS", "Licence", "Master"], bacs: ["A", "B", "G2"] },
  { name: "Économie et développement", domain: "Économie, Gestion & Commerce", levels: ["Licence", "Master", "Doctorat"], bacs: ["A", "B", "C"] },
  { name: "Audit et contrôle de gestion", domain: "Économie, Gestion & Commerce", levels: ["Licence", "Master"], bacs: ["B", "C", "G2"] },
  { name: "Entrepreneuriat et gestion de PME", domain: "Économie, Gestion & Commerce", levels: ["BTS", "Licence"], bacs: ["A", "B", "G1", "G2"] },
  { name: "Assistanat de direction / Secrétariat", domain: "Économie, Gestion & Commerce", levels: ["BTS"], bacs: ["A", "G1"] },

  // Droit, Sciences politiques & Administration
  { name: "Droit privé", domain: "Droit, Sciences politiques & Administration", levels: ["Licence", "Master", "Doctorat"], bacs: ["A", "B", "D"] },
  { name: "Droit public", domain: "Droit, Sciences politiques & Administration", levels: ["Licence", "Master", "Doctorat"], bacs: ["A", "B", "D"] },
  { name: "Droit des affaires / OHADA", domain: "Droit, Sciences politiques & Administration", levels: ["Master"], bacs: ["A", "B"] },
  { name: "Sciences politiques et relations internationales", domain: "Droit, Sciences politiques & Administration", levels: ["Licence", "Master"], bacs: ["A", "B"] },
  { name: "Administration publique (ENA)", domain: "Droit, Sciences politiques & Administration", levels: ["Cycle moyen", "Cycle supérieur"], bacs: ["A", "B", "C", "D"] },
  { name: "Douanes, impôts et trésor", domain: "Droit, Sciences politiques & Administration", levels: ["Cycle ENA"], bacs: ["A", "B", "C"] },

  // Lettres, Langues & Sciences humaines
  { name: "Lettres modernes", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master", "Doctorat"], bacs: ["A"] },
  { name: "Anglais / Langues étrangères appliquées", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master"], bacs: ["A", "B"] },
  { name: "Histoire et archéologie", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master", "Doctorat"], bacs: ["A"] },
  { name: "Géographie et aménagement du territoire", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master"], bacs: ["A", "D"] },
  { name: "Sociologie", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master"], bacs: ["A", "B"] },
  { name: "Psychologie", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master"], bacs: ["A", "B", "D"] },
  { name: "Philosophie", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master"], bacs: ["A"] },
  { name: "Travail social et action humanitaire", domain: "Lettres, Langues & Sciences humaines", levels: ["Licence", "Master"], bacs: ["A", "B", "D"] },

  // Agriculture, Environnement & Mines
  { name: "Agronomie", domain: "Agriculture, Environnement & Mines", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "D"] },
  { name: "Agroalimentaire et industries de transformation", domain: "Agriculture, Environnement & Mines", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "D"] },
  { name: "Eaux et forêts", domain: "Agriculture, Environnement & Mines", levels: ["Licence", "Ingénieur"], bacs: ["C", "D"] },
  { name: "Élevage et production animale", domain: "Agriculture, Environnement & Mines", levels: ["BTS", "Licence"], bacs: ["C", "D"] },
  { name: "Environnement et développement durable", domain: "Agriculture, Environnement & Mines", levels: ["Licence", "Master"], bacs: ["C", "D"] },
  { name: "Géologie et mines", domain: "Agriculture, Environnement & Mines", levels: ["Licence", "Ingénieur", "Master"], bacs: ["C", "D"] },
  { name: "Hydraulique et assainissement", domain: "Agriculture, Environnement & Mines", levels: ["Licence", "Ingénieur"], bacs: ["C", "D", "E"] },

  // Communication, Arts & Design
  { name: "Journalisme", domain: "Communication, Arts & Design", levels: ["Licence", "Master"], bacs: ["A", "B", "D"] },
  { name: "Communication d'entreprise et publicité", domain: "Communication, Arts & Design", levels: ["BTS", "Licence", "Master"], bacs: ["A", "B", "G2"] },
  { name: "Marketing digital et community management", domain: "Communication, Arts & Design", levels: ["BTS", "Licence"], bacs: ["A", "B", "G2"] },
  { name: "Production audiovisuelle et cinéma", domain: "Communication, Arts & Design", levels: ["BTS", "Licence"], bacs: ["A", "B", "F"] },
  { name: "Design graphique et multimédia", domain: "Communication, Arts & Design", levels: ["BTS", "Licence"], bacs: ["A", "F"] },
  { name: "Arts plastiques, musique et spectacle", domain: "Communication, Arts & Design", levels: ["Licence", "Master"], bacs: ["A"] },

  // Transport, Logistique & Tourisme
  { name: "Transport et logistique", domain: "Transport, Logistique & Tourisme", levels: ["BTS", "Licence", "Master"], bacs: ["A", "B", "G2"] },
  { name: "Commerce international et douane", domain: "Transport, Logistique & Tourisme", levels: ["BTS", "Licence"], bacs: ["A", "B", "G2"] },
  { name: "Transport maritime et portuaire", domain: "Transport, Logistique & Tourisme", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "D", "G2"] },
  { name: "Aéronautique et gestion aéroportuaire", domain: "Transport, Logistique & Tourisme", levels: ["BTS", "Licence"], bacs: ["C", "D", "E"] },
  { name: "Tourisme et hôtellerie", domain: "Transport, Logistique & Tourisme", levels: ["BTS", "Licence"], bacs: ["A", "B", "G2"] },

  // Éducation & Formation
  { name: "Sciences de l'éducation", domain: "Éducation & Formation", levels: ["Licence", "Master"], bacs: ["A", "B", "C", "D"] },
  { name: "Professorat du secondaire (ENS)", domain: "Éducation & Formation", levels: ["Licence", "Master"], bacs: ["A", "B", "C", "D"] },
  { name: "Instituteur / CAFOP", domain: "Éducation & Formation", levels: ["Diplôme professionnel"], bacs: ["A", "B", "C", "D"] },
  { name: "Sciences et techniques des activités physiques et sportives (STAPS)", domain: "Éducation & Formation", levels: ["Licence", "Master"], bacs: ["A", "B", "C", "D"] },

  // BTP & Architecture
  { name: "Génie civil / Bâtiment et travaux publics", domain: "BTP & Architecture", levels: ["BTS", "Licence", "Ingénieur"], bacs: ["C", "E", "F4"] },
  { name: "Architecture", domain: "BTP & Architecture", levels: ["Licence", "Master"], bacs: ["C", "D", "E", "F4"] },
  { name: "Topographie et géomètre", domain: "BTP & Architecture", levels: ["BTS", "Licence"], bacs: ["C", "E", "F4"] },
  { name: "Urbanisme et aménagement", domain: "BTP & Architecture", levels: ["Licence", "Master"], bacs: ["A", "C", "D"] },
  { name: "Conduite de travaux et gestion de chantier", domain: "BTP & Architecture", levels: ["BTS", "Licence"], bacs: ["C", "E", "F4"] },
];

export const SCHOOLS: School[] = [
  // Universités publiques
  { name: "Université Félix Houphouët-Boigny", short: "UFHB", city: "Abidjan (Cocody)", type: "Université publique", domains: ["Sciences & Technologies", "Santé", "Droit, Sciences politiques & Administration", "Lettres, Langues & Sciences humaines", "Économie, Gestion & Commerce"] },
  { name: "Université Nangui Abrogoua", short: "UNA", city: "Abidjan (Abobo-Adjamé)", type: "Université publique", domains: ["Sciences & Technologies", "Agriculture, Environnement & Mines", "Santé"] },
  { name: "Université Alassane Ouattara", short: "UAO", city: "Bouaké", type: "Université publique", domains: ["Lettres, Langues & Sciences humaines", "Droit, Sciences politiques & Administration", "Économie, Gestion & Commerce", "Sciences & Technologies"] },
  { name: "Université Jean Lorougnon Guédé", short: "UJLoG", city: "Daloa", type: "Université publique", domains: ["Sciences & Technologies", "Agriculture, Environnement & Mines", "Lettres, Langues & Sciences humaines"] },
  { name: "Université Peleforo Gon Coulibaly", short: "UPGC", city: "Korhogo", type: "Université publique", domains: ["Sciences & Technologies", "Agriculture, Environnement & Mines", "Lettres, Langues & Sciences humaines"] },
  { name: "Université de San-Pédro", city: "San-Pédro", type: "Université publique", domains: ["Transport, Logistique & Tourisme", "Agriculture, Environnement & Mines", "Économie, Gestion & Commerce"] },
  { name: "Université de Man", city: "Man", type: "Université publique", domains: ["Sciences & Technologies", "Agriculture, Environnement & Mines", "Économie, Gestion & Commerce"] },
  { name: "Université Virtuelle de Côte d'Ivoire", short: "UVCI", city: "Abidjan (en ligne)", type: "Université publique", domains: ["Sciences & Technologies", "Économie, Gestion & Commerce", "Communication, Arts & Design"] },

  // Grandes écoles publiques
  { name: "Institut National Polytechnique Félix Houphouët-Boigny", short: "INP-HB", city: "Yamoussoukro", type: "Grande école publique", domains: ["Sciences & Technologies", "BTP & Architecture", "Agriculture, Environnement & Mines", "Économie, Gestion & Commerce"] },
  { name: "École Supérieure Africaine des TIC", short: "ESATIC", city: "Abidjan (Treichville)", type: "Grande école publique", domains: ["Sciences & Technologies", "Communication, Arts & Design"] },
  { name: "École Nationale d'Administration", short: "ENA", city: "Abidjan", type: "Grande école publique", domains: ["Droit, Sciences politiques & Administration", "Économie, Gestion & Commerce"] },
  { name: "École Nationale Supérieure de Statistique et d'Économie Appliquée", short: "ENSEA", city: "Abidjan", type: "Grande école publique", domains: ["Sciences & Technologies", "Économie, Gestion & Commerce"] },
  { name: "Institut National de Formation des Agents de Santé", short: "INFAS", city: "Abidjan, Bouaké, Korhogo", type: "Grande école publique", domains: ["Santé"] },
  { name: "Institut National Supérieur des Arts et de l'Action Culturelle", short: "INSAAC", city: "Abidjan", type: "Grande école publique", domains: ["Communication, Arts & Design", "Éducation & Formation"] },
  { name: "Institut des Sciences et Techniques de la Communication (ISTC Polytechnique)", short: "ISTC", city: "Abidjan", type: "Grande école publique", domains: ["Communication, Arts & Design"] },
  { name: "École Normale Supérieure", short: "ENS", city: "Abidjan", type: "Grande école publique", domains: ["Éducation & Formation", "Lettres, Langues & Sciences humaines", "Sciences & Technologies"] },
  { name: "Institut Pédagogique National de l'Enseignement Technique et Professionnel", short: "IPNETP", city: "Abidjan", type: "Grande école publique", domains: ["Éducation & Formation", "Sciences & Technologies"] },
  { name: "Institut National de la Jeunesse et des Sports", short: "INJS", city: "Abidjan", type: "Grande école publique", domains: ["Éducation & Formation"] },
  { name: "École de Spécialisation en Mécanique et Électricité (ESME / centres FPC)", city: "Abidjan", type: "Grande école publique", domains: ["Sciences & Technologies"] },
  { name: "Académie Régionale des Sciences et Techniques de la Mer", short: "ARSTM", city: "Abidjan", type: "Grande école publique", domains: ["Transport, Logistique & Tourisme", "Sciences & Technologies"] },
  { name: "Centres d'Animation et de Formation Pédagogique", short: "CAFOP", city: "Plusieurs villes", type: "Grande école publique", domains: ["Éducation & Formation"] },

  // Établissements privés
  { name: "Institut Universitaire d'Abidjan", short: "IUA", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Sciences & Technologies", "Transport, Logistique & Tourisme"] },
  { name: "Groupe HEC Côte d'Ivoire", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce"] },
  { name: "ESCA – École Supérieure de Commerce d'Abidjan", short: "ESCA", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Transport, Logistique & Tourisme"] },
  { name: "ESAM – École Supérieure Africaine de Management", short: "ESAM", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Communication, Arts & Design"] },
  { name: "Groupe ESCAE", short: "ESCAE", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Transport, Logistique & Tourisme"] },
  { name: "Groupe Loko", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Sciences & Technologies"] },
  { name: "PIGIER Côte d'Ivoire", city: "Abidjan et intérieur", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Sciences & Technologies", "Communication, Arts & Design"] },
  { name: "Groupe CSI Pôle Polytechnique", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies", "BTP & Architecture"] },
  { name: "ESTP – École Supérieure des Travaux Publics", short: "ESTP", city: "Abidjan (Yopougon)", type: "Établissement privé", domains: ["BTP & Architecture", "Sciences & Technologies"] },
  { name: "EAMAU (formations architecture, via candidature régionale)", city: "Abidjan / Lomé", type: "Établissement privé", domains: ["BTP & Architecture"] },
  { name: "Université Internationale de Grand-Bassam", short: "UIGB", city: "Grand-Bassam", type: "Établissement privé", domains: ["Sciences & Technologies", "Économie, Gestion & Commerce", "Lettres, Langues & Sciences humaines"] },
  { name: "Université Catholique de l'Afrique de l'Ouest – UUA", short: "UCAO-UUA", city: "Abidjan (Cocody)", type: "Établissement privé", domains: ["Droit, Sciences politiques & Administration", "Économie, Gestion & Commerce", "Santé", "Lettres, Langues & Sciences humaines"] },
  { name: "Université Méthodiste de Côte d'Ivoire", short: "UMECI", city: "Abidjan", type: "Établissement privé", domains: ["Santé", "Économie, Gestion & Commerce", "Sciences & Technologies"] },
  { name: "Université Charles Louis de Montesquieu", short: "UCLM", city: "Abidjan", type: "Établissement privé", domains: ["Droit, Sciences politiques & Administration", "Économie, Gestion & Commerce"] },
  { name: "Université de l'Atlantique", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce", "Sciences & Technologies", "Santé"] },
  { name: "Université Félix Houphouët-Boigny Privée / IUGB partenaires", city: "Abidjan", type: "Établissement privé", domains: ["Économie, Gestion & Commerce"] },
  { name: "ISTA – Institut Supérieur de Technologie d'Abidjan", short: "ISTA", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies", "BTP & Architecture"] },
  { name: "IPG – Institut Polytechnique Gervais", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies", "Économie, Gestion & Commerce"] },
  { name: "ESIG – École Supérieure d'Informatique et de Gestion", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies", "Économie, Gestion & Commerce"] },
  { name: "IPNET Institute", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies"] },
  { name: "Simplon Côte d'Ivoire", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies"] },
  { name: "Orange Digital Center / Orange Digital Academy", short: "ODC", city: "Abidjan", type: "Établissement privé", domains: ["Sciences & Technologies", "Communication, Arts & Design"] },
  { name: "École Supérieure de Journalisme et Communication (privées agréées)", city: "Abidjan", type: "Établissement privé", domains: ["Communication, Arts & Design"] },
  { name: "Institut Supérieur du Tourisme et de l'Hôtellerie", city: "Abidjan / Grand-Bassam", type: "Établissement privé", domains: ["Transport, Logistique & Tourisme"] },
  { name: "École Supérieure d'Agronomie privée (ESA partenaires)", city: "Yamoussoukro / Abidjan", type: "Établissement privé", domains: ["Agriculture, Environnement & Mines"] },
];

export const SCHOOL_TYPES: SchoolType[] = [
  "Université publique",
  "Grande école publique",
  "Établissement privé",
];
