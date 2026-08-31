import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { profile, skillGroups, education, certifications, development } from "@/lib/resume";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nikhil Joshi, Cybersecurity & GRC" },
      {
        name: "description",
        content:
          "Skills, education and certifications: Archer GRC, ISO 27001, NIST CSF, SOC 2, IAM, OWASP Top 10, Python and SQL.",
      },
      { property: "og:title", content: "About — Nikhil Joshi, Cybersecurity & GRC" },
      {
        property: "og:description",
        content: "M.S. in Computer Science (Cybersecurity Track) with NSA Cyber Defense certificate.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main>
      <PageShell eyebrow="Profile" title="About">
        <section className="mx-auto max-w-[1400px] border-t border-border px-5 py-16 md:px-10 md:py-24">
          <p className="max-w-4xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {profile.summary}
          </p>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
            <h2 className="display text-[10vw] leading-none md:text-[5vw]">Capabilities</h2>
            <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((g) => (
                <div key={g.title} className="bg-secondary p-8">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-primary">{g.title}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <li
                        key={i}
                        className="border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1400px] gap-16 px-5 py-20 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="display text-4xl md:text-5xl">Education</h2>
            {education.map((e) => (
              <div key={e.school} className="mt-8 border-t border-border pt-6">
                <p className="text-lg font-medium">{e.school}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {e.place} · {e.year}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="display text-4xl md:text-5xl">Certifications</h2>
            <ul className="mt-8 space-y-4 border-t border-border pt-6">
              {certifications.map((c) => (
                <li key={c} className="text-sm text-muted-foreground">
                  <span className="mr-3 text-primary">/</span>
                  {c}
                </li>
              ))}
            </ul>
            <h2 className="display mt-16 text-4xl md:text-5xl">Always on</h2>
            <ul className="mt-8 space-y-4 border-t border-border pt-6">
              {development.map((d) => (
                <li key={d} className="text-sm leading-relaxed text-muted-foreground">
                  <span className="mr-3 text-primary">/</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
