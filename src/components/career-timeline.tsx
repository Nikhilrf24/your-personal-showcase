import { useState } from "react";
import { experience } from "@/lib/resume";

/** Expanding accordion panels: hover, tap or focus a role to open it. Oldest first. */
export function CareerTimeline() {
  const items = [...experience].reverse();
  const [active, setActive] = useState(items.length - 1);

  return (
    <section className="border-b border-border bg-foreground text-background" aria-label="Career timeline">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">The journey · 2018 → now</p>
            <h2 className="display mt-4 text-[12vw] leading-none md:text-[6vw]">Career path</h2>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.2em] text-background/60 md:block">
            Hover or tap a role
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-2 md:h-[480px] md:flex-row">
          {items.map((job, i) => {
            const on = i === active;
            return (
              <button
                key={job.company}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={`group relative flex cursor-pointer flex-col overflow-hidden border text-left transition-all duration-500 ease-out md:min-w-0 ${
                  on
                    ? "border-accent bg-primary text-primary-foreground md:flex-[4]"
                    : "border-background/20 bg-background/5 hover:bg-background/10 md:flex-1"
                }`}
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <span className={`font-mono text-xs ${on ? "text-accent" : "text-background/60"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-mono text-xs ${on ? "text-accent" : "text-background/50"} md:hidden`}>
                    {job.period}
                  </span>
                </div>

                {!on && (
                  <span className="display hidden flex-1 items-end p-6 text-3xl leading-none md:flex md:[writing-mode:vertical-rl] md:rotate-180 md:items-start md:self-start">
                    {job.company}
                  </span>
                )}
                {!on && <span className="display px-6 pb-6 text-2xl md:hidden">{job.company}</span>}

                {on && (
                  <div className="mt-auto p-6 md:p-10">
                    <p className="hidden font-mono text-sm text-accent md:block">{job.period}</p>
                    <h3 className="display mt-3 text-4xl leading-[0.9] md:text-6xl">{job.company}</h3>
                    <p className="mt-4 max-w-2xl text-base opacity-90 md:text-lg">{job.title}</p>
                    <p className="mt-3 max-w-2xl text-sm opacity-75">{job.points[0]}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
