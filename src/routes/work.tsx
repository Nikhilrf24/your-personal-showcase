import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Marquee } from "@/components/site-chrome";
import { experience, projects } from "@/lib/resume";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Nikhil Joshi, TPRM & GRC" },
      {
        name: "description",
        content:
          "Third-party risk, GRC and vulnerability management experience across Mercedes-Benz, Intel, TikTok and TCS.",
      },
      { property: "og:title", content: "Work — Nikhil Joshi, TPRM & GRC" },
      {
        property: "og:description",
        content: "Vendor risk assessments, Archer GRC lifecycle work, IAM governance and AppSec projects.",
      },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <main>
      <PageShell eyebrow="Experience" title="The Work">
        <Marquee />
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          {experience.map((job) => (
            <article
              key={job.company}
              className="grid gap-6 border-b border-border py-12 md:grid-cols-[1fr_2fr] md:gap-16"
            >
              <div>
                <h2 className="display text-4xl md:text-5xl">{job.company}</h2>
                <p className="mt-3 text-sm text-primary">{job.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {job.period}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{job.context}</p>
              </div>
              <ul className="space-y-4">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-px w-6 shrink-0 bg-primary" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="border-t border-border bg-secondary">
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
            <h2 className="display text-[12vw] leading-none md:text-[6vw]">Selected projects</h2>
            <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
              {projects.map((p) => (
                <article key={p.index} className="bg-secondary p-8">
                  <span className="display text-primary">{p.index}</span>
                  <h3 className="display mt-4 text-3xl">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
