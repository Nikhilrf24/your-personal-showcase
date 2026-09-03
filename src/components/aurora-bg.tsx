import { useEffect, useRef } from "react";

/**
 * Animated aurora gradient mesh + mouse-reactive wireframe grid.
 * Pure CSS animation; mouse parallax applied via CSS vars on the wrapper.
 */
export function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--mx", `${x.toFixed(3)}`);
        el.style.setProperty("--my", `${y.toFixed(3)}`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="aurora-stage pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="wire-grid absolute inset-0" />
      <div className="float-shape float-shape-1" />
      <div className="float-shape float-shape-2" />
      <div className="float-shape float-shape-3" />
      <div className="grain-overlay absolute inset-0" />
    </div>
  );
}
