import { z } from "zod";

export const registrationSchema = z.object({
  // Section 1: Identité
  fullName: z.string().min(2, "Le nom est requis"),
  gender: z.enum(["Homme", "Femme", "Ne pas préciser"]),
  age: z.string().min(1, "L'âge est requis").refine((val) => parseInt(val) > 0, "L'âge doit être positif"),
  phone: z.string().min(8, "Numéro de téléphone valide requis"),
  email: z.string().email("Email invalide"),
  country: z.string().min(2, "Pays requis"),
  city: z.string().min(2, "Ville requise"),

  // Section 2: Situation Professionnelle
  status: z.enum(["Étudiant", "Salarié", "Entrepreneur", "Freelance", "En recherche d’emploi", "Autre"]),
  domain: z.string().min(2, "Domaine d'activité requis"),
  organization: z.string().optional(),
  position: z.string().optional(),

  // Section 3: Profil Data & Technique
  workedWithData: z.enum(["Oui", "Non"]),
  dataLevel: z.enum(["Débutant", "Intermédiaire", "Avancé"]),
  tools: z.array(z.string()).min(1, "Sélectionnez au moins un outil (ou Aucun)"),
  createdDashboard: z.enum(["Oui", "Non"]),
  knowsDax: z.enum(["Oui", "Non", "Entendu parler"]),
  createdSurvey: z.enum(["Oui", "Non"]),

  // Section 4: Objectifs
  motivation: z.string().min(10, "Veuillez détailler votre motivation"),
  expectations: z.string().min(10, "Veuillez détailler vos attentes"),
  usage: z.enum(["Emploi actuel", "Évolution pro", "Création dashboards", "Consultant", "CV", "Autre"]),

  // Section 5: Logistique
  participationMode: z.enum(["Présentiel", "En ligne"]),
  availableSaturdays: z.enum(["Oui", "Non"]),
  hasLaptop: z.enum(["Oui", "Non"]),
  hasInternet: z.enum(["Oui", "Non"]),
  readyToInstall: z.enum(["Oui", "Non"]),
  paymentMode: z.enum(["Intégral", "Deux tranches"]),

  // Section 6: Certification
  wantCertificate: z.enum(["Oui", "Non"]),
  source: z.enum(["Réseaux sociaux", "WhatsApp", "Recommandation", "Site web", "Autre"]),
  contactFuture: z.enum(["Oui", "Non"]),

  // Section 7: Conformité
  gdprAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions",
  }),

  // Section 8: Commentaires
  comments: z.string().optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
