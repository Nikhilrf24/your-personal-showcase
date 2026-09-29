import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/writing/$slug")({
  head: () => ({
    meta: [
      { title: "Article — Nikhil Joshi" },
      { name: "description", content: "A cybersecurity article by Nikhil Joshi." },
      { property: "og:title", content: "Article — Nikhil Joshi" },
      { property: "og:description", content: "A cybersecurity article by Nikhil Joshi." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Article,
});

function Article() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-20 md:pt-28">
      <Link to="/writing" className="text-xs uppercase tracking-[0.2em] text-primary hover:underline">← All writing</Link>
      {isLoading && <p className="mt-10 text-muted-foreground">Loading…</p>}
      {!isLoading && !data && <p className="mt-10 text-muted-foreground">Article not found.</p>}
      {data && (
        <>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {new Date(data.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {data.tags.length > 0 && ` · ${data.tags.join(" · ")}`}
          </p>
          <h1 className="display rise-in mt-4 text-5xl leading-[0.95] md:text-7xl">{data.title}</h1>
          {data.excerpt && <p className="mt-6 text-lg text-muted-foreground">{data.excerpt}</p>}
          <div className="mt-10 space-y-5 border-t border-border pt-10 text-base leading-relaxed md:text-lg">
            {data.body.split(/\n{2,}/).map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
