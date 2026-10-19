import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/** Colored panel that sweeps across the screen whenever the page changes. */
export function PageTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey((k) => k + 1);
    window.scrollTo({ top: 0 });
  }, [path]);

  if (key === 0) return null;
  return (
    <div key={key} aria-hidden className="page-wipe pointer-events-none fixed inset-0 z-[100]">
      <div className="page-wipe-a absolute inset-0 bg-primary" />
      <div className="page-wipe-b absolute inset-0 bg-accent" />
    </div>
  );
}
