import { useEffect, useRef } from "react";

export default function SnowflakeCanvas({ scoped = false, fadeBottom = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let flakes = [];

    const resize = () => {
      if (scoped && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = Math.max(1, rect.width);
        canvas.height = Math.max(1, rect.height);
        return;
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = ["❄", "·"];
    for (let i = 0; i < 80; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 12 + Math.random() * 18,
        opacity: 0.15 + Math.random() * 0.35,
        speed: 0.5 + Math.random() * 1.2,
        char: chars[i % 2],
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.015,
        swayAmp: 0.5 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f) => {
        f.y += f.speed;
        f.sway += f.swaySpeed;
        f.x += Math.sin(f.sway) * f.swayAmp;
        f.rotation += f.rotSpeed;
        if (f.y > canvas.height + 20) {
          f.y = -20;
          f.x = Math.random() * canvas.width;
        }
        if (f.x > canvas.width + 20) f.x = -20;
        if (f.x < -20) f.x = canvas.width + 20;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.font = `${f.size}px serif`;
        const fadeStart = canvas.height * 0.72;
        const fadeRange = Math.max(canvas.height * 0.28, 1);
        const fadeFactor = fadeBottom
          ? Math.max(0, Math.min(1, 1 - Math.max(0, f.y - fadeStart) / fadeRange))
          : 1;
        ctx.fillStyle = `rgba(20,25,30,${f.opacity * fadeFactor})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(f.char, 0, 0);
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [scoped, fadeBottom]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: scoped ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}