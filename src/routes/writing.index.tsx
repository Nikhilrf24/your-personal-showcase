import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/writing/")({
  head: () => ({
    meta: [
      { title: "Writing — Nikhil Joshi on Cybersecurity" },
      { name: "description", content: "Notes and essays by Nikhil Joshi on cybersecurity, third-party risk, GRC and emerging threats." },
      { property: "og:title", content: "Writing — Nikhil Joshi on Cybersecurity" },
      { property: "og:description", content: "Notes and essays on cybersecurity, TPRM, GRC and emerging threats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WritingList,
});

function WritingList() {
  const { data, isLoading } = useQuery({
    queryKey: ["articles", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("slug,title,excerpt,tags,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <PageShell eyebrow="Field notes" title="Writing">
      <section className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10">
        {isLoading && <p className="text-muted-foreground">Loading…</p>}
        {data && data.length === 0 && (
          <p className="border-t border-border pt-8 text-muted-foreground">
            First articles coming soon.
          </p>
        )}
        <ul>
          {data?.map((a) => (
            <li key={a.slug} className="row-reveal group border-b border-border first:border-t">
              <Link to="/writing/$slug" params={{ slug: a.slug }} className="relative grid gap-3 py-10 md:grid-cols-[160px_1fr] md:gap-10">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <div>
                  <h2 className="display text-3xl transition-all duration-500 group-hover:translate-x-3 group-hover:text-primary md:text-5xl">
                    {a.title}
                  </h2>
                  {a.excerpt && <p className="mt-3 max-w-2xl text-muted-foreground">{a.excerpt}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.tags.map((t) => (
                      <span key={t} className="border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
