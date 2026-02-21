import { useEffect, useState } from "react";
import SnowflakeCanvas from "./SnowflakeCanvas";

const logoUrl = "/src/assets/dripship_logooo.png";

export default function HeroSection({ onShopClick }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1200);
    const t4 = setTimeout(() => setStage(4), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", position: "relative",
      background: "transparent", zIndex: 1, overflow: "hidden",
    }}>
      <SnowflakeCanvas scoped fadeBottom />
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "30vh",
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(245,245,245,0.82) 72%, #ececec 100%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 2 }}>
      {/* Logo Image */}
      <img
        src={logoUrl}
        alt="DRIPSHIP"
        style={{
          width: "clamp(180px, 20vw, 260px)", height: "auto", marginBottom: 12,
          opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? "scale(1)" : "scale(0.6)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
          filter: "invert(0)",
        }}
      />

      {/* Brand Name */}
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
        fontSize: "clamp(52px, 10vw, 140px)", color: "#080808", letterSpacing: "-0.01em",
        margin: 0, lineHeight: 1,
        opacity: stage >= 2 ? 1 : 0, transform: stage >= 2 ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.4s ease, transform 1.4s ease",
      }}>
        DRIPSHIP
      </h1>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.4em",
        textTransform: "uppercase", color: "#666", margin: "16px 0 0",
        opacity: stage >= 3 ? 1 : 0, transition: "opacity 1s ease",
      }}>
        — WEAR THE COLD —
      </p>

      {/* CTA */}
      <button
        onClick={onShopClick}
        style={{
          marginTop: 28, border: "1px solid rgba(0,0,0,0.3)", background: "none",
          color: "#080808", padding: "14px 44px", fontFamily: "'Tenor Sans', sans-serif",
          fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer",
          transition: "all 0.3s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          opacity: stage >= 4 ? 1 : 0,
        }}
        onMouseEnter={e => { e.target.style.background = "#080808"; e.target.style.color = "#ffffff"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 25px rgba(0,0,0,0.15)"; }}
        onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#080808"; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)"; }}
      >
        SHOP NOW
      </button>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: "absolute", bottom: 40, display: "flex", flexDirection: "column",
        alignItems: "center", animation: "pulse-scroll 2.5s ease-in-out infinite", zIndex: 2,
      }}>
        <div style={{ width: 1, height: 40, background: "#666" }} />
        <svg width="10" height="6" viewBox="0 0 10 6" style={{ marginTop: 6 }}>
          <path d="M1 1l4 4 4-4" stroke="#666" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <style>{`
        @keyframes pulse-scroll {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}