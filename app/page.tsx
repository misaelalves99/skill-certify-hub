import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="Skill Certify Hub home">
          <span className={styles.brandMark} aria-hidden="true">
            SC
          </span>
          <span>Skill Certify Hub</span>
        </a>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="/" aria-current="page">
              Home
            </a>
          </nav>
        </details>

        <div className={styles.status} aria-label="Application status">
          Foundation
        </div>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <nav aria-label="Primary navigation">
            <p className={styles.navLabel}>Workspace</p>
            <a className={styles.navItem} href="/" aria-current="page">
              Home
            </a>
          </nav>
        </aside>

        <main className={styles.main} id="main-content" tabIndex={-1}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Product foundation</p>
            <h1>Skill Certify Hub</h1>
            <p className={styles.lead}>
              A responsive application structure ready for future product
              capabilities.
            </p>

            <section className={styles.foundation} aria-labelledby="foundation-title">
              <h2 id="foundation-title">Foundation shell</h2>
              <p>
                This baseline establishes navigation, semantic landmarks and a
                responsive composition without introducing future feature
                screens.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
