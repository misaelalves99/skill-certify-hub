import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Skill Certify Hub home">
          <span className={styles.brandMark} aria-hidden="true">
            SC
          </span>
          <span>Skill Certify Hub</span>
        </Link>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/" aria-current="page">
              Dashboard
            </Link>
          </nav>
        </details>

        <div className={styles.status} aria-label="Application status">
          Frontend preview
        </div>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <nav aria-label="Primary navigation">
            <p className={styles.navLabel}>Workspace</p>
            <Link className={styles.navItem} href="/" aria-current="page">
              Dashboard
            </Link>
            <span className={styles.navPending} aria-disabled="true">
              Certifications
              <small>Coming next</small>
            </span>
          </nav>
        </aside>

        <main className={styles.main} id="main-content" tabIndex={-1}>
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
                  The next frontend surface will introduce a certification list
                  using clearly identified synthetic data. Until then, this
                  dashboard stays intentionally empty rather than inventing user
                  history, analytics, or backend state.
                </p>
              </div>
              <div className={styles.nextStep} aria-label="Next product step">
                <span>Next surface</span>
                <strong>Certifications catalog</strong>
                <small>Pending a governed implementation task</small>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
