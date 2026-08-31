import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { Marquee } from "@/components/site-chrome";
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
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <section className="grain relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">{profile.role}</p>
          <h1 className="display rise-in mt-6 text-[20vw] leading-[0.8] md:text-[13vw]">
            <span className="block">{profile.first}</span>
            <span className="block outline-text">{profile.last}</span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {profile.summary}
            </p>
            <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>{profile.location}</span>
              <span>Work authorization: {profile.authorization}</span>
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center gap-2 bg-primary px-6 py-3 font-medium tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px border-b border-border bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-6 md:p-10">
            <p className="display heat-text text-5xl md:text-7xl">{s.value}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <h2 className="display text-[12vw] leading-none md:text-[6vw]">Track record</h2>
          <Link
            to="/work"
            className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-primary hover:underline"
          >
            All work →
          </Link>
        </div>
        <ul>
          {experience.map((job) => (
            <li
              key={job.company}
              className="group grid gap-2 border-b border-border py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8"
            >
              <span className="display text-3xl transition-colors group-hover:text-primary md:text-5xl">
                {job.company}
              </span>
              <span className="text-sm text-muted-foreground">{job.title}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {job.period}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <h2 className="display text-[12vw] leading-none md:text-[6vw]">Projects</h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.index} className="bg-secondary p-8">
                <span className="display text-primary">{p.index}</span>
                <h3 className="display mt-4 text-3xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
