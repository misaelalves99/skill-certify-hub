"use client";

import { useRef, useState } from "react";
import { AppShell } from "../_components/AppShell";
import styles from "./page.module.css";

type PracticeStatus = "now" | "next" | "quarantine";

const statusOrder: PracticeStatus[] = ["now", "next", "quarantine"];

const statusLabels: Record<PracticeStatus, string> = {
  now: "Now",
  next: "Next",
  quarantine: "Quarantine",
};

const practices = [
  {
    id: "practice-semantic-layout",
    title: "Build a semantic page shell",
    description:
      "Practice landmarks, heading order and keyboard-safe navigation in a small frontend exercise.",
    status: "now",
  },
  {
    id: "practice-filter-state",
    title: "Model a filtered empty state",
    description:
      "Exercise a deterministic local filter without implying remote data or persistence.",
    status: "next",
  },
  {
    id: "practice-error-boundary",
    title: "Review an async error-state pattern",
    description:
      "Held until a governed asynchronous data source exists so the practice does not simulate a fake backend failure.",
    status: "quarantine",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  status: PracticeStatus;
}>;

export default function PracticesPage() {
  const [activeStatus, setActiveStatus] = useState<PracticeStatus>("now");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const visiblePractices = practices.filter(
    (practice) => practice.status === activeStatus,
  );

  const moveToTab = (index: number) => {
    const nextStatus = statusOrder[index];
    setActiveStatus(nextStatus);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveToTab((index + 1) % statusOrder.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveToTab((index - 1 + statusOrder.length) % statusOrder.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveToTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveToTab(statusOrder.length - 1);
    }
  };

  return (
    <AppShell activePath="/practices">
      <div className={styles.content}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Practices</p>
            <h1>Practice by status</h1>
            <p className={styles.lead}>
              Review a small synthetic practice queue using only the essential
              frontend states: now, next and quarantine.
            </p>
          </div>
          <div className={styles.previewBadge}>Local synthetic state</div>
        </div>

        <section className={styles.statusPanel} aria-labelledby="status-title">
          <div>
            <p className={styles.sectionLabel}>Status filter</p>
            <h2 id="status-title">Choose the current practice state</h2>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Practice status">
            {statusOrder.map((status, index) => (
              <button
                key={status}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={activeStatus === status}
                aria-controls="practice-status-panel"
                id={`practice-tab-${status}`}
                tabIndex={activeStatus === status ? 0 : -1}
                onClick={() => setActiveStatus(status)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </section>

        <section
          className={styles.results}
          id="practice-status-panel"
          role="tabpanel"
          aria-labelledby={`practice-tab-${activeStatus}`}
          tabIndex={0}
        >
          <div className={styles.resultsHeader}>
            <div>
              <p className={styles.sectionLabel}>Current state</p>
              <h2>{statusLabels[activeStatus]}</h2>
            </div>
            <span>{visiblePractices.length} synthetic practice</span>
          </div>

          <div className={styles.grid}>
            {visiblePractices.map((practice) => (
              <article className={styles.card} key={practice.id}>
                <span className={styles.cardStatus}>{statusLabels[practice.status]}</span>
                <h3>{practice.title}</h3>
                <p>{practice.description}</p>
              </article>
            ))}
          </div>

          <p className={styles.boundaryNote}>
            Status changes exist only in this browser session. They are not saved,
            synchronized, personalized or backed by an API/database.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
