import { useState, useEffect } from "react";

export default function ProductModal({ product, onClose, onPlaceOrder }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => setVisible(true));
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  if (!product) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      display: "flex", justifyContent: "flex-end",
    }}>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
          opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
        }}
      />

      {/* Panel */}
      <div className="ds-product-modal-panel" style={{
        width: 480, maxWidth: "100vw", height: "100%", background: "#0f0f0d",
        borderLeft: "1px solid rgba(255,255,255,0.06)", position: "relative",
        overflowY: "auto", padding: "48px 40px", boxSizing: "border-box",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.77,0,0.175,1)",
      }}>
        {/* Close */}
        <button
          onClick={close}
          style={{
            position: "absolute", top: 20, right: 24, background: "none",
            border: "none", color: "#888884", fontSize: 18, cursor: "pointer",
            fontFamily: "'Tenor Sans', sans-serif", transition: "color 0.3s",
          }}
          onMouseEnter={e => e.target.style.color = "#f2f2f0"}
          onMouseLeave={e => e.target.style.color = "#888884"}
        >✕</button>

        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.4em",
          color: "#888884", textTransform: "uppercase", margin: "0 0 24px",
        }}>— DRIPSHIP ORIGINAL</p>

        {/* Image placeholder */}
        <div style={{
          width: "100%", aspectRatio: "4/3", background: "#1a1a18",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 100,
            color: "rgba(255,255,255,0.03)", userSelect: "none",
          }}>❄</span>
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 36, color: "#f2f2f0", margin: "24px 0 8px", lineHeight: 1.1,
        }}>{product.name}</h2>

        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 13, letterSpacing: "0.2em",
          color: "#f2f2f0", margin: "0 0 20px",
        }}>{product.price}</p>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0 0 20px" }} />

        {/* Details grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: 20 }}>
          {[
            ["Material", product.material],
            ["Fit", product.fit],
            ["Color", product.color],
          ].map(([label, val]) => (
            <div key={label}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "#888884",
              }}>{label}: </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "#f2f2f0",
              }}>{val}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13,
          lineHeight: 1.7, color: "#888884", margin: "16px 0 24px",
        }}>{product.description}</p>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0 0 24px" }} />

        <button
          onClick={() => onPlaceOrder(product)}
          style={{
            width: "100%", border: "1px solid rgba(242,242,240,0.5)", background: "none",
            color: "#f2f2f0", padding: 16, fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "#f2f2f0"; e.target.style.color = "#080808"; }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#f2f2f0"; }}
        >PLACE ORDER</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ds-product-modal-panel {
            width: 100vw !important;
            max-width: 100vw !important;
            border-left: none !important;
          }
        }
      `}</style>
    </div>
  );
}