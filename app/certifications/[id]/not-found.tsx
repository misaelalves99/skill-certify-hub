import Link from "next/link";
import styles from "./page.module.css";

export default function CertificationNotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Link className={styles.backLink} href="/certifications">
          ← Back to certifications
        </Link>

        <section className={styles.boundary} aria-labelledby="not-found-title">
          <p className={styles.eyebrow}>Not found</p>
          <h1 id="not-found-title">Synthetic certification not found</h1>
          <p>
            This identifier is not part of the current frontend-only synthetic catalog.
            No live catalog or backend lookup was attempted.
          </p>
        </section>
      </div>
    </main>
  );
}
