import Link from "next/link";
import { AppShell } from "./_components/AppShell";
import styles from "./page.module.css";

export default function Home() {
  return (
    <AppShell activePath="/">
      <div className={styles.content}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Dashboard</p>
            <h1>Your certification workspace</h1>
            <p className={styles.lead}>
              Start from a clear overview while the certification catalog is
              being built as the next governed product surface.
            </p>
          </div>

          <div className={styles.previewBadge}>
            <span aria-hidden="true" />
            Synthetic preview
          </div>
        </div>

        <section className={styles.summary} aria-labelledby="summary-title">
          <div>
            <p className={styles.sectionLabel}>Current view</p>
            <h2 id="summary-title">Nothing to track yet</h2>
          </div>
          <p>
            No certifications or progress records are loaded in this frontend
            slice. This empty state is intentional and does not represent a
            connected account, saved progress, or live catalog data.
          </p>
        </section>

        <section className={styles.emptyState} aria-labelledby="empty-title">
          <div className={styles.emptyIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.emptyCopy}>
            <p className={styles.sectionLabel}>Empty state</p>
            <h2 id="empty-title">Your dashboard is ready for the catalog</h2>
            <p>
              The certification list now uses clearly identified synthetic data.
              This dashboard remains intentionally empty rather than inventing
              user history, analytics, or backend state.
            </p>
          </div>
          <div className={styles.nextStep} aria-label="Available product step">
            <span>Available surfaces</span>
            <strong>Catalog, practices and evidence</strong>
            <Link href="/certifications">Browse synthetic catalog</Link>
            <Link href="/practices">Review practice status</Link>
            <Link href="/evidence">Register local evidence</Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
