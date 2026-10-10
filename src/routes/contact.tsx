import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { profile } from "@/lib/resume";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nikhil Joshi" },
      {
        name: "description",
        content:
          "Get in touch with Nikhil Joshi for third-party risk, GRC and application security roles. Based in Atlanta, GA.",
      },
      { property: "og:title", content: "Contact — Nikhil Joshi" },
      {
        property: "og:description",
        content: "Email, phone and LinkedIn for cybersecurity, TPRM and GRC opportunities.",
      },
    ],
  }),
  component: Contact,
});

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  { label: "LinkedIn", value: "nikhil-joshi1710", href: profile.linkedin },
];

function Contact() {
  return (
    <main>
      <PageShell eyebrow="Say hello" title="Contact">
        <section className="mx-auto max-w-[1400px] border-t border-border px-5 py-12 md:px-10">
          <p className="max-w-2xl text-lg text-muted-foreground">
            Open to cybersecurity, third-party risk, application security and IAM opportunities.
            Based in {profile.location}.
          </p>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.label === "LinkedIn" ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-4 py-8 transition-colors hover:text-primary"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {l.label}
                </span>
                <span
                  className={
                    l.label === "Email"
                      ? "break-all font-mono text-xl font-medium tracking-tight md:text-3xl"
                      : "display break-all text-3xl md:text-5xl"
                  }
                >
                  {l.value}
                </span>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>
      </PageShell>
    </main>
  );
}
