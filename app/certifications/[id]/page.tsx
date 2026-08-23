import Link from "next/link";
import { notFound } from "next/navigation";
import { certifications, findCertification } from "../catalog";
import styles from "./page.module.css";

export function generateStaticParams() {
  return certifications.map((certification) => ({ id: certification.id }));
}

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certification = findCertification(id);

  if (!certification) {
    notFound();
  }

  return (
    <main className={styles.main} id="main-content">
      <div className={styles.content}>
        <Link className={styles.backLink} href="/certifications">
          ← Back to certifications
        </Link>

        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>Certification detail</p>
            <h1>{certification.title}</h1>
          </div>
          <span className={styles.badge}>Synthetic data</span>
        </div>

        <p className={styles.summary}>{certification.summary}</p>

        <section className={styles.panel} aria-labelledby="detail-title">
          <div>
            <p className={styles.label}>Issuer</p>
            <p className={styles.value}>{certification.issuer}</p>
          </div>
          <div>
            <p className={styles.label}>Level</p>
            <p className={styles.value}>{certification.level}</p>
          </div>
          <div>
            <p className={styles.label}>Data status</p>
            <p className={styles.value}>Frontend-only synthetic record</p>
          </div>
          <h2 className={styles.srOnly} id="detail-title">
            Synthetic certification details
          </h2>
        </section>

        <section className={styles.boundary} aria-labelledby="boundary-title">
          <p className={styles.eyebrow}>Boundary</p>
          <h2 id="boundary-title">What this detail does not claim</h2>
          <p>
            This page does not represent official certification requirements,
            pricing, prerequisites, renewal rules, live issuer data, saved progress,
            or a connected backend.
          </p>
        </section>
      </div>
    </main>
  );
}
