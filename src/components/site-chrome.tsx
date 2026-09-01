import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { profile, marqueeWords } from "@/lib/resume";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" className="display text-xl tracking-tight md:text-2xl">
          {profile.first}
          <span className="text-primary">.</span>
          {profile.last}
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-sweep text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-5 pb-6 pt-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="display block py-2 text-3xl text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Marquee({ words = marqueeWords }: { words?: string[] }) {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-border bg-secondary py-4">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span
            key={i}
            className="display mx-6 text-2xl text-muted-foreground md:text-4xl"
          >
            {w}
            <span className="ml-6 text-primary">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Let&apos;s reduce some risk
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 block break-words font-mono text-xl font-medium tracking-tight text-foreground transition-colors hover:text-primary md:text-3xl"
        >
          {profile.email}
        </a>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>
            {profile.location} · {profile.phone}
          </span>
          <a href={profile.linkedin} className="hover:text-primary" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span>© {new Date().getFullYear()} Nikhil Joshi</span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <section className="grain mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
        <h1 className="display rise-in mt-4 text-[16vw] leading-[0.82] md:text-[9vw]">{title}</h1>
      </section>
      {children}
    </div>
  );
}
