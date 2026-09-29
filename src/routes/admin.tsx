import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Writing Studio — Nikhil Joshi" },
      { name: "description", content: "Private editor for publishing articles." },
      { property: "og:title", content: "Writing Studio — Nikhil Joshi" },
      { property: "og:description", content: "Private editor for publishing articles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const input = "w-full border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary";
const btn = "bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-50";

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <main className="mx-auto max-w-[1000px] px-5 pb-28 pt-20 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-primary">Private</p>
      <h1 className="display mt-4 text-6xl md:text-8xl">Writing studio</h1>
      {!ready ? null : session ? <Editor userId={session.user.id} /> : <SignIn />}
    </main>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const res =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (res.error) setMsg(res.error.message);
    else if (mode === "up") setMsg("Check your inbox to confirm your email, then sign in.");
  };

  return (
    <form onSubmit={submit} className="mt-10 max-w-md space-y-4">
      <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      <button className={btn} type="submit">{mode === "in" ? "Sign in" : "Create owner account"}</button>
      <button type="button" className="ml-4 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "First time? Create account" : "Have an account? Sign in"}
      </button>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
}

type Draft = { id?: string; title: string; excerpt: string; body: string; tags: string; published: boolean };
const empty: Draft = { title: "", excerpt: "", body: "", tags: "", published: true };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

function Editor({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft>(empty);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin", userId],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
      return !!data;
    },
  });

  const { data: list } = useQuery({
    queryKey: ["articles", "all"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isAdmin === false)
    return (
      <div className="mt-10">
        <p className="text-muted-foreground">This account can't publish articles.</p>
        <button className="mt-4 text-xs uppercase tracking-[0.2em] text-primary" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
    );

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const row = {
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim(),
      body: draft.body,
      tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: draft.published,
      updated_at: new Date().toISOString(),
    };
    const res = draft.id
      ? await supabase.from("articles").update(row).eq("id", draft.id)
      : await supabase.from("articles").insert({ ...row, slug: `${slugify(row.title)}-${Date.now().toString(36)}` });
    setSaving(false);
    if (res.error) return setMsg(res.error.message);
    setMsg(draft.published ? "Published." : "Saved as draft.");
    setDraft(empty);
    qc.invalidateQueries({ queryKey: ["articles"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await supabase.from("articles").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["articles"] });
  };

  return (
    <div className="mt-10 grid gap-12">
      <form onSubmit={save} className="space-y-4">
        <input className={`${input} display text-2xl`} placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
        <input className={input} placeholder="One-line summary" value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
        <textarea className={`${input} min-h-[320px] leading-relaxed`} placeholder="Write your article… (blank line = new paragraph)" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} required />
        <input className={input} placeholder="Tags, comma separated (e.g. Zero Trust, AI Security)" value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
          Visible to visitors
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button className={btn} disabled={saving}>{draft.id ? "Update" : "Publish"}</button>
          {draft.id && <button type="button" className="text-xs uppercase tracking-[0.2em] text-muted-foreground" onClick={() => setDraft(empty)}>Cancel edit</button>}
          <button type="button" className="ml-auto text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
        {msg && <p className="text-sm text-primary">{msg}</p>}
      </form>

      <ul className="border-t border-border">
        {list?.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-4 border-b border-border py-4">
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{a.published ? "Live" : "Draft"}</p>
            </div>
            <div className="flex gap-4 text-xs uppercase tracking-[0.2em]">
              <button className="text-primary" onClick={() => setDraft({ id: a.id, title: a.title, excerpt: a.excerpt, body: a.body, tags: a.tags.join(", "), published: a.published })}>Edit</button>
              <button className="text-muted-foreground hover:text-destructive" onClick={() => remove(a.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
