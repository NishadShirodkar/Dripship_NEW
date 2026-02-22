import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);
  const unavailable = Boolean(product.outOfStock);

  return (
    <div
      onClick={() => { if (!unavailable) onClick(product); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: unavailable ? "not-allowed" : "pointer", position: "relative", opacity: unavailable ? 0.75 : 1 }}
    >
      {/* Image placeholder */}
      <div style={{
        aspectRatio: "3/4", background: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered && !unavailable ? "scale(1.02)" : "scale(1)", boxShadow: hovered && !unavailable ? "0 10px 30px rgba(0,0,0,0.15)" : "0 2px 10px rgba(0,0,0,0.05)",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 120,
          color: "rgba(0,0,0,0.04)", userSelect: "none",
        }}>❄</span>

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
        }}>
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.25em",
            textTransform: "uppercase", color: "#080808",
          }}>{unavailable ? "OUT OF STOCK" : "VIEW DETAILS →"}</span>
        </div>

        {/* Badge */}
        {(product.badge || unavailable) && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontFamily: "'Tenor Sans', sans-serif", fontSize: 8, letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#080808",
            border: "1px solid rgba(0,0,0,0.2)", padding: "4px 10px", background: "rgba(255,255,255,0.9)",
          }}>{unavailable ? "OUT OF STOCK" : product.badge}</span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "16px 0 8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13,
            color: "#080808",
          }}>{product.name}</div>
          <div style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.2em",
            color: "#666", marginTop: 4, textTransform: "uppercase",
          }}>{product.category} · {product.color}</div>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18,
          color: "#080808", whiteSpace: "nowrap", paddingLeft: 12,
        }}>{product.price}</div>
      </div>
    </div>
  );
}