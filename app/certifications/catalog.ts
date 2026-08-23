export const certifications = [
  {
    id: "cert-frontend-foundations",
    title: "Frontend Foundations",
    issuer: "Synthetic Learning Institute",
    level: "Foundational",
    summary:
      "A synthetic certification concept used to validate a frontend detail experience around core web foundations.",
  },
  {
    id: "cert-web-platform",
    title: "Web Platform Essentials",
    issuer: "Demo Standards Academy",
    level: "Intermediate",
    summary:
      "A synthetic certification concept focused on representing browser and platform knowledge without claiming official curriculum data.",
  },
  {
    id: "cert-typescript-practice",
    title: "TypeScript Practice",
    issuer: "Sample Developer Guild",
    level: "Intermediate",
    summary:
      "A synthetic certification concept used to exercise typed frontend navigation and detail-state presentation.",
  },
] as const;

export function findCertification(id: string) {
  return certifications.find((certification) => certification.id === id);
}
