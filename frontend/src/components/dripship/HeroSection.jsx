import { useEffect, useState } from "react";
import SnowflakeCanvas from "./SnowflakeCanvas";
import SplitText from "./SplitText";

const logoUrl = "/src/assets/dripship_logooo.png";

export default function HeroSection({ onShopClick }) {
  const [stage, setStage] = useState(0);
  const [logoHovered, setLogoHovered] = useState(false);
  const title = "DRIPSHIP";

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
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        style={{
          width: "clamp(180px, 20vw, 260px)", height: "auto", marginBottom: 12,
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1
            ? logoHovered
              ? "scale(1.12)"
              : "scale(1)"
            : "scale(0.6)",
          transition: "opacity 1.2s ease, transform 560ms cubic-bezier(0.16, 1, 0.3, 1), filter 560ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, filter",
          cursor: "pointer",
          filter: logoHovered
            ? "invert(0) drop-shadow(0 10px 24px rgba(0,0,0,0.18))"
            : "invert(0) drop-shadow(0 4px 10px rgba(0,0,0,0.08))",
        }}
      />

      {/* Brand Name */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontStyle: "italic",
        fontSize: "clamp(40px, 7.2vw, 96px)", color: "#080808", letterSpacing: "0.02em",
        margin: 0, lineHeight: 1,
        animation: stage >= 2 ? "ds-title-float 5.5s ease-in-out infinite" : "none",
      }}>
        {stage >= 2 && (
          <SplitText
            text={title}
            className="leading-none"
            delay={90}
            duration={0.82}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(1px)" }}
            to={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag="h2"
          />
        )}
      </div>

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
        onMouseEnter={e => { e.currentTarget.style.background = "#080808"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.15)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#080808"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)"; }}
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

        @keyframes ds-title-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

      `}</style>
    </section>
  );
}