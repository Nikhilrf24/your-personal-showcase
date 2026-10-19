import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/resume";

/** Pinned scroll story: one large panel per role, oldest first. */
export function CareerTimeline() {
  const items = [...experience].reverse();
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(items.length - 1, Math.floor(progress * items.length));

  return (
    <section
      ref={ref}
      className="relative border-b border-border bg-foreground text-background"
      style={{ height: `${items.length * 90 + 10}vh` }}
      aria-label="Career timeline"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 pt-24 md:px-10">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">The journey · 2018 → now</p>
          <p className="font-mono text-xs text-background/60">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] flex-1 px-5 md:px-10">
          {items.map((job, i) => {
            const state = i === active ? "on" : i < active ? "past" : "next";
            return (
              <article
                key={job.company}
                className="timeline-panel absolute inset-x-5 top-1/2 md:inset-x-10"
                data-state={state}
                aria-hidden={state !== "on"}
              >
                <p className="font-mono text-sm text-accent">{job.period}</p>
                <h3 className="display mt-3 text-[13vw] leading-[0.85] md:text-[8vw]">{job.company}</h3>
                <p className="mt-4 max-w-3xl text-lg text-background/80 md:text-xl">{job.title}</p>
                <p className="mt-3 max-w-3xl text-sm text-background/60 md:text-base">{job.points[0]}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 md:px-10">
          <div className="flex gap-2">
            {items.map((job, i) => (
              <div key={job.company} className="flex-1">
                <div className="h-1 overflow-hidden rounded-full bg-background/15">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: i <= active ? "100%" : "0%" }}
                  />
                </div>
                <p
                  className={`mt-2 hidden text-[10px] uppercase tracking-[0.2em] md:block ${i === active ? "text-background" : "text-background/40"}`}
                >
                  {job.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
