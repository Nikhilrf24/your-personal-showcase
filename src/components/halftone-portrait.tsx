import { useEffect, useRef, useState } from "react";

/** Photo rendered as an interactive halftone dot field inside a retro "OS window" frame. */
export function HalftonePortrait({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/New_York" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--primary").trim() || "#2a3cff";
    const hot = css.getPropertyValue("--accent").trim() || "#b6f000";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const img = new Image();
    img.src = src;
    let raf = 0;
    let lum: Float32Array | null = null;
    let cols = 0, rows = 0;
    const step = 5;

    const setup = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(r.width / step);
      rows = Math.floor(r.height / step);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d")!;
      // crop tight on the subject (centered at ~53% x, from mid-height down)
      const ar = cols / rows;
      const sh = img.height * 0.52, sw = sh * ar;
      const sx = img.width * 0.535 - sw / 2, sy = img.height * 0.48;
      o.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        lum[i] = (0.299 * d[i * 4]! + 0.587 * d[i * 4 + 1]! + 0.114 * d[i * 4 + 2]!) / 255;
      }
    };

    const draw = (t: number) => {
      if (!lum) return;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouse.current;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const raw = 1 - lum[y * cols + x]!;
          const fx = (x / cols - 0.5) / 0.42, fy = (y / rows - 0.55) / 0.6;
          const focus = Math.max(0, 1 - Math.hypot(fx, fy) ** 2);
          const v = Math.min(1, Math.max(0, (raw - 0.3) * 1.9)) * (0.25 + focus * 0.75);
          const px = x * step + step / 2, py = y * step + step / 2;
          const dist = Math.hypot(px - mx, py - my);
          const near = Math.max(0, 1 - dist / 90);
          const wave = reduce ? 0 : Math.sin(t / 900 + x * 0.15 + y * 0.1) * 0.12;
          const rad = Math.max(0.3, (v + wave) * step * 0.55 + near * 2.2);
          ctx.fillStyle = near > 0.25 ? hot : ink;
          ctx.globalAlpha = 0.35 + v * 0.65;
          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    img.onload = () => {
      setup();
      raf = requestAnimationFrame(loop);
    };
    const onResize = () => img.complete && setup();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [src]);

  return (
    <div className="ht-window border-2 border-foreground bg-background">
      <div className="flex items-center justify-between border-b-2 border-foreground font-mono text-[10px] uppercase tracking-[0.2em]">
        <div className="flex">
          <span className="border-r-2 border-foreground px-3 py-2 font-bold text-primary">NJ</span>
          <span className="px-3 py-2 text-muted-foreground">file</span>
        </div>
        <div className="flex">
          <span className="flex items-center gap-2 border-l-2 border-foreground px-3 py-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" /> online
          </span>
          <span className="border-l-2 border-foreground px-3 py-2">{time}</span>
        </div>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          className="block aspect-[4/5] w-full"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          }}
          onPointerLeave={() => (mouse.current = { x: -9999, y: -9999 })}
        />
        <div className="pointer-events-none absolute left-3 top-3 bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          <p className="display text-2xl">01</p>
          <p className="text-muted-foreground">portrait.dot</p>
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 bg-background/85 px-2 py-1 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          <p className="display text-2xl">02</p>
          <p className="text-muted-foreground">grc.trust</p>
        </div>
      </div>
    </div>
  );
}
