import { useRef, useState } from "react";

/** 3D perspective card: tilts toward the cursor, with layered depth and a moving glare. */
export function TiltCard({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 6, ry: -10, gx: 30, gy: 20, on: false });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - y) * 22, ry: (x - 0.5) * 26, gx: x * 100, gy: y * 100, on: true });
  };
  const reset = () => setT({ rx: 6, ry: -10, gx: 30, gy: 20, on: false });

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="tilt-scene">
      <div
        className="tilt-card"
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        {/* depth layers behind the photo */}
        <div className="tilt-layer bg-accent" style={{ transform: "translateZ(-60px) translate(18px, 18px)" }} />
        <div className="tilt-layer border-2 border-primary" style={{ transform: "translateZ(-30px) translate(9px, 9px)" }} />

        <div className="tilt-photo border-2 border-foreground" style={{ transform: "translateZ(0)" }}>
          <img src={src} alt={alt} className="h-full w-full object-cover object-[50%_45%] scale-110" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent mix-blend-multiply" />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: t.on ? 1 : 0.5,
              background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, color-mix(in oklab, var(--background) 55%, transparent), transparent 45%)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* floating elements pop forward */}
        <span
          className="absolute -left-6 -bottom-5 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-foreground border-2 border-foreground"
          style={{ transform: "translateZ(70px)" }}
        >
          Risk · Trust · Controls
        </span>
        <span
          className="absolute -right-5 top-8 bg-primary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground"
          style={{ transform: "translateZ(90px)" }}
        >
          Atlanta, GA
        </span>
      </div>
    </div>
  );
}
