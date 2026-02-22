import { useState, useEffect } from "react";

export default function ProductModal({ product, onClose, onPlaceOrder }) {
  const [visible, setVisible] = useState(false);
  const outOfStock = Boolean(product?.outOfStock);

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
          background: "rgba(0,0,0,0.38)", backdropFilter: "blur(3px)",
          opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
        }}
      />

      {/* Panel */}
      <div className="ds-product-modal-panel" style={{
        width: 480, maxWidth: "100vw", height: "100%", background: "#ffffff",
        borderLeft: "1px solid rgba(8,8,8,0.12)", position: "relative",
        overflowY: "auto", padding: "48px 40px", boxSizing: "border-box",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.77,0,0.175,1)",
      }}>
        {/* Close */}
        <button
          onClick={close}
          style={{
            position: "absolute", top: 20, right: 24, background: "none",
            border: "none", color: "#666", fontSize: 18, cursor: "pointer",
            fontFamily: "'Tenor Sans', sans-serif", transition: "color 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#080808"}
          onMouseLeave={e => e.currentTarget.style.color = "#666"}
        >✕</button>

        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.4em",
          color: "#666", textTransform: "uppercase", margin: "0 0 24px",
        }}>— DRIPSHIP ORIGINAL</p>

        {/* Image placeholder */}
        <div style={{
          width: "100%", aspectRatio: "4/3", background: "#f3f3f1",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 100,
            color: "rgba(8,8,8,0.08)", userSelect: "none",
          }}>❄</span>
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 36, color: "#080808", margin: "24px 0 8px", lineHeight: 1.1,
        }}>{product.name}</h2>

        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 13, letterSpacing: "0.2em",
          color: "#080808", margin: "0 0 20px",
        }}>{product.price}</p>

        {outOfStock && (
          <p style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em",
            color: "#8f4343", margin: "-8px 0 20px", textTransform: "uppercase",
          }}>— OUT OF STOCK</p>
        )}

        <hr style={{ border: "none", borderTop: "1px solid rgba(8,8,8,0.12)", margin: "0 0 20px" }} />

        {/* Details grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: 20 }}>
          {[
            ["Material", product.material],
            ["Fit", product.fit],
            ["Color", product.color],
          ].map(([label, val]) => (
            <div key={label}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "#666",
              }}>{label}: </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "#080808",
              }}>{val}</span>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13,
          lineHeight: 1.7, color: "#4a4a4a", margin: "16px 0 24px",
        }}>{product.description}</p>

        <hr style={{ border: "none", borderTop: "1px solid rgba(8,8,8,0.12)", margin: "0 0 24px" }} />

        <button
          disabled={outOfStock}
          onClick={() => { if (!outOfStock) onPlaceOrder(product); }}
          style={{
            width: "100%", border: "1px solid rgba(8,8,8,0.45)", background: outOfStock ? "rgba(8,8,8,0.08)" : "none",
            color: outOfStock ? "#888" : "#080808", padding: 16, fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            cursor: outOfStock ? "not-allowed" : "pointer", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            if (outOfStock) return;
            e.currentTarget.style.background = "#080808";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={e => {
            if (outOfStock) return;
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "#080808";
          }}
        >{outOfStock ? "OUT OF STOCK" : "PLACE ORDER"}</button>
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