import { createFileRoute, Link } from "@tanstack/react-router";
import { Marquee } from "@/components/site-chrome";
import { AuroraBackground } from "@/components/aurora-bg";
import { Magnetic } from "@/components/magnetic";
import { useReveal, useScrollY } from "@/hooks/use-reveal";
import { profile, stats, experience, projects } from "@/lib/resume";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikhil Joshi — Cybersecurity, TPRM & GRC Portfolio" },
      {
        name: "description",
        content:
          "Nikhil Joshi is a cybersecurity, third-party risk and GRC professional in Atlanta assessing 80+ vendor applications against ISO 27001, NIST CSF and SOC 2.",
      },
      { property: "og:title", content: "Nikhil Joshi — Cybersecurity, TPRM & GRC Portfolio" },
      {
        property: "og:description",
        content:
          "Vendor risk assessments, IAM governance and security remediation, translated into decisions leadership can act on.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function Index() {
  const scrollY = useScrollY();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <AuroraBackground />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">{profile.role}</p>
          <h1
            className="display rise-in mt-6 text-[20vw] leading-[0.8] md:text-[13vw]"
            style={{ transform: `translate3d(0, ${scrollY * -0.12}px, 0)` }}
          >
            <span className="block" aria-label={profile.first}>
              {profile.first.split("").map((c, i) => (
                <span key={i} aria-hidden="true" className="kinetic-char" style={{ animationDelay: `${i * 60}ms` }}>{c}</span>
              ))}
            </span>
            <span
              className="block outline-text"
              aria-label={profile.last}
              style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
            >
              {profile.last.split("").map((c, i) => (
                <span key={i} aria-hidden="true" className="kinetic-char" style={{ animationDelay: `${300 + i * 60}ms` }}>{c}</span>
              ))}
            </span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {profile.summary}
            </p>
            <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>{profile.location}</span>
              <span>Work authorization: {profile.authorization}</span>
              <Magnetic className="mt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-medium tracking-[0.2em] text-primary-foreground"
                >
                  Get in touch
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px border-b border-border bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="bg-background">
            <div className="p-6 md:p-10">
              <p className="display heat-text text-5xl md:text-7xl">{s.value}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
            <h2 className="display text-[12vw] leading-none md:text-[6vw]">Track record</h2>
            <Magnetic strength={0.25}>
              <Link
                to="/work"
                className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-primary hover:underline"
              >
                All work →
              </Link>
            </Magnetic>
          </div>
        </Reveal>
        <ul>
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 80}>
              <li className="row-reveal group grid gap-2 border-b border-border py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8">
                <span className="display relative text-3xl transition-all duration-500 group-hover:translate-x-3 group-hover:text-primary md:text-5xl">
                  {job.company}
                </span>
                <span className="relative text-sm text-muted-foreground">{job.title}</span>
                <span className="relative text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {job.period}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="display text-[12vw] leading-none md:text-[6vw]">Projects</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.index} delay={i * 110} className="bg-secondary">
                <article className="row-reveal h-full p-8">
                  <span className="display relative text-primary">{p.index}</span>
                  <h3 className="display relative mt-4 text-3xl">{p.title}</h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.blurb}
                  </p>
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
