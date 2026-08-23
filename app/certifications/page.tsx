"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

const certifications = [
  {
    id: "cert-frontend-foundations",
    title: "Frontend Foundations",
    issuer: "Synthetic Learning Institute",
    level: "Foundational",
  },
  {
    id: "cert-web-platform",
    title: "Web Platform Essentials",
    issuer: "Demo Standards Academy",
    level: "Intermediate",
  },
  {
    id: "cert-typescript-practice",
    title: "TypeScript Practice",
    issuer: "Sample Developer Guild",
    level: "Intermediate",
  },
] as const;

export default function CertificationsPage() {
  const [query, setQuery] = useState("");

  const filteredCertifications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return certifications;
    }

    return certifications.filter((certification) =>
      [certification.title, certification.issuer, certification.level]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const hasResults = filteredCertifications.length > 0;

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Skill Certify Hub home">
          <span className={styles.brandMark} aria-hidden="true">SC</span>
          <span>Skill Certify Hub</span>
        </Link>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Dashboard</Link>
            <Link href="/certifications" aria-current="page">Certifications</Link>
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
            <Link className={styles.navLink} href="/">Dashboard</Link>
            <Link className={styles.navItem} href="/certifications" aria-current="page">
              Certifications
            </Link>
          </nav>
        </aside>

        <main className={styles.main} id="main-content" tabIndex={-1}>
          <div className={styles.content}>
            <div className={styles.intro}>
              <div>
                <p className={styles.eyebrow}>Certifications</p>
                <h1>Browse the synthetic catalog</h1>
                <p className={styles.lead}>
                  Explore a small frontend-only dataset created to validate list,
                  filter and responsive states. These entries are not live or official.
                </p>
              </div>
              <div className={styles.previewBadge}>Synthetic data</div>
            </div>

            <section className={styles.filterPanel} aria-labelledby="filter-title">
              <div>
                <p className={styles.sectionLabel}>Filter</p>
                <h2 id="filter-title">Find a certification</h2>
              </div>
              <label className={styles.searchField}>
                <span>Search synthetic certifications</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try TypeScript or Foundational"
                />
              </label>
            </section>

            <section className={styles.results} aria-live="polite" aria-labelledby="results-title">
              <div className={styles.resultsHeader}>
                <div>
                  <p className={styles.sectionLabel}>Current state</p>
                  <h2 id="results-title">{hasResults ? "Catalog results" : "No matching certifications"}</h2>
                </div>
                <span>{filteredCertifications.length} synthetic result{filteredCertifications.length === 1 ? "" : "s"}</span>
              </div>

              {hasResults ? (
                <div className={styles.grid}>
                  {filteredCertifications.map((certification) => (
                    <article className={styles.card} key={certification.id}>
                      <div className={styles.cardMeta}>
                        <span>{certification.level}</span>
                        <span>Synthetic</span>
                      </div>
                      <h3>{certification.title}</h3>
                      <p>{certification.issuer}</p>
                      <div className={styles.cardBoundary}>
                        Detail view is deferred to the next governed task.
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p className={styles.sectionLabel}>Filtered empty state</p>
                  <h3>No synthetic entries match “{query}”.</h3>
                  <p>Clear or change the filter to return to the populated mock catalog.</p>
                  <button type="button" onClick={() => setQuery("")}>Clear filter</button>
                </div>
              )}

              <p className={styles.boundaryNote}>
                Loading and error states remain defined in `EXPERIENCE_MODEL.md` but are not simulated here because this slice has no asynchronous data source or backend.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
