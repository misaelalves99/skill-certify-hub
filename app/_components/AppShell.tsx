import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./AppShell.module.css";

type NavItem = {
  href: "/" | "/certifications" | "/practices" | "/evidence";
  label: string;
  helper?: string;
};

const navigation: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/certifications", label: "Certifications", helper: "Synthetic catalog" },
  { href: "/practices", label: "Practices", helper: "Local synthetic status" },
  { href: "/evidence", label: "Evidence", helper: "Session-only links" },
];

type AppShellProps = {
  activePath: NavItem["href"];
  children: ReactNode;
};

export function AppShell({ activePath, children }: AppShellProps) {
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
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activePath === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
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
            {navigation.map((item) => {
              const isActive = activePath === item.href;

              return (
                <Link
                  key={item.href}
                  className={isActive ? styles.navItem : styles.navLink}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {!isActive && item.helper ? <small>{item.helper}</small> : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className={styles.main} id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
