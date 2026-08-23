"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type LocalEvidence = {
  id: number;
  url: string;
};

export default function EvidencePage() {
  const [url, setUrl] = useState("");
  const [evidence, setEvidence] = useState<LocalEvidence[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedUrl = url.trim();
    if (!normalizedUrl) return;

    setEvidence((current) => [
      ...current,
      { id: Date.now(), url: normalizedUrl },
    ]);
    setUrl("");
  }

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
            <Link href="/certifications">Certifications</Link>
            <Link href="/practices">Practices</Link>
            <Link href="/evidence" aria-current="page">Evidence</Link>
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
            <Link className={styles.navLink} href="/certifications">Certifications</Link>
            <Link className={styles.navLink} href="/practices">Practices</Link>
            <Link className={styles.navItem} href="/evidence" aria-current="page">
              Evidence
            </Link>
          </nav>
        </aside>

        <main className={styles.main} id="main-content" tabIndex={-1}>
          <div className={styles.content}>
            <div className={styles.intro}>
              <div>
                <p className={styles.eyebrow}>Evidence</p>
                <h1>Register local evidence</h1>
                <p className={styles.lead}>
                  Add a link to exercise the evidence workflow at the frontend
                  boundary. Nothing entered here is uploaded, persisted or synced.
                </p>
              </div>
              <div className={styles.previewBadge}>Session-only data</div>
            </div>

            <section className={styles.formPanel} aria-labelledby="evidence-form-title">
              <div>
                <p className={styles.sectionLabel}>Evidence field</p>
                <h2 id="evidence-form-title">Add an evidence link</h2>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="evidence-url">Evidence URL</label>
                <p id="evidence-help" className={styles.helpText}>
                  Use a valid http(s) link. The value lives only in this browser session.
                </p>
                <div className={styles.inputRow}>
                  <input
                    id="evidence-url"
                    name="evidence-url"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    aria-describedby="evidence-help"
                    placeholder="https://example.com/evidence"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    required
                  />
                  <button type="submit">Add local evidence</button>
                </div>
              </form>
            </section>

            <section className={styles.results} aria-live="polite" aria-labelledby="evidence-list-title">
              <div className={styles.resultsHeader}>
                <div>
                  <p className={styles.sectionLabel}>Current session</p>
                  <h2 id="evidence-list-title">
                    {evidence.length ? "Local evidence links" : "No evidence added yet"}
                  </h2>
                </div>
                <span>{evidence.length} local item{evidence.length === 1 ? "" : "s"}</span>
              </div>

              {evidence.length ? (
                <div className={styles.evidenceList}>
                  {evidence.map((item, index) => (
                    <article className={styles.evidenceCard} key={item.id}>
                      <div>
                        <span>Local evidence {index + 1}</span>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {item.url}
                        </a>
                      </div>
                    </article>
                  ))}
                  <button
                    className={styles.clearButton}
                    type="button"
                    onClick={() => setEvidence([])}
                  >
                    Clear local evidence
                  </button>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>
                    Add a link above to verify the local evidence interaction. Refreshing
                    the page intentionally clears the list.
                  </p>
                </div>
              )}

              <p className={styles.boundaryNote}>
                Frontend-only boundary: no upload, remote storage, account association,
                API, database or persistence is used by this surface.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
