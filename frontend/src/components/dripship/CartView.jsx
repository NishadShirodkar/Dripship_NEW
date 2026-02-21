import { useState } from "react";

export default function CartView({ cart, onRemove, onConfirm, onBackToShop }) {
  const [confirmed, setConfirmed] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const orderId = "DS-" + String(Math.floor(100000 + Math.random() * 900000));

  const subtotal = cart.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[₹,]/g, ""), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setFadeIn(true), 50);
    setTimeout(() => onConfirm(), 1000);
  };

  const handleContinue = () => {
    onBackToShop();
  };

  if (confirmed) {
    return (
      <div style={{
        minHeight: "100vh", background: "#080808", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "100px 20px", boxSizing: "border-box",
        opacity: fadeIn ? 1 : 0, transform: fadeIn ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 80,
          color: "rgba(255,255,255,0.15)", lineHeight: 1,
        }}>❄</span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 52, color: "#f2f2f0", margin: "24px 0 16px", textAlign: "center",
        }}>Order Confirmed</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14,
          color: "#888884", maxWidth: 380, textAlign: "center", lineHeight: 1.8,
        }}>Thank you. Your order has been received and is being processed.</p>
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.25em",
          color: "#888884", marginTop: 20,
        }}>ORDER ID: {orderId}</p>
        <button
          onClick={handleContinue}
          style={{
            marginTop: 36, border: "1px solid rgba(242,242,240,0.4)", background: "none",
            color: "#f2f2f0", padding: "14px 44px", fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "#f2f2f0"; e.target.style.color = "#080808"; }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#f2f2f0"; }}
        >CONTINUE SHOPPING</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: "100vh", background: "#080808", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "100px 20px",
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 32, color: "#f2f2f0", marginBottom: 24,
        }}>Your cart is empty</h2>
        <button
          onClick={onBackToShop}
          style={{
            border: "1px solid rgba(242,242,240,0.4)", background: "none",
            color: "#f2f2f0", padding: "14px 44px", fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "#f2f2f0"; e.target.style.color = "#080808"; }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#f2f2f0"; }}
        >SHOP NOW</button>
      </div>
    );
  }

  return (
    <div className="ds-cart-view" style={{
      minHeight: "100vh", background: "#080808", padding: "100px 60px 60px",
      boxSizing: "border-box",
    }}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
        fontSize: 56, color: "#f2f2f0", margin: "0 0 8px",
      }}>Your Cart</h1>
      <p style={{
        fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.25em",
        color: "#888884", marginBottom: 32,
      }}>— {cart.length} item{cart.length !== 1 ? "s" : ""}</p>
      <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0 0 24px" }} />

      {/* Items */}
      {cart.map((item, idx) => (
        <div key={idx}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "16px 0" }}>
            <div style={{ width: 80, height: 80, background: "#1a1a18", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "#f2f2f0" }}>
                {item.productName}
              </div>
              <div style={{
                fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.15em",
                color: "#888884", marginTop: 4,
              }}>Size: {item.size}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11,
                color: "#555", marginTop: 4,
              }}>{item.customerName} · {item.customerEmail}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20,
                color: "#f2f2f0",
              }}>{item.price}</div>
              <button
                onClick={() => onRemove(idx)}
                style={{
                  background: "none", border: "none", color: "#888884", fontSize: 14,
                  cursor: "pointer", marginTop: 8, fontFamily: "'Tenor Sans', sans-serif",
                  transition: "color 0.3s",
                }}
                onMouseEnter={e => e.target.style.color = "#f2f2f0"}
                onMouseLeave={e => e.target.style.color = "#888884"}
              >✕</button>
            </div>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: 0 }} />
        </div>
      ))}

      {/* Summary */}
      <div style={{ maxWidth: 320, marginLeft: "auto", marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em",
            color: "#888884", textTransform: "uppercase",
          }}>SUBTOTAL</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22,
            color: "#f2f2f0",
          }}>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0 0 24px" }} />
        <button
          onClick={handleConfirm}
          style={{
            width: "100%", border: "1px solid rgba(242,242,240,0.4)", background: "none",
            color: "#f2f2f0", padding: 16, fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "#f2f2f0"; e.target.style.color = "#080808"; }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#f2f2f0"; }}
        >CONFIRM ORDER</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ds-cart-view { padding: 100px 20px 40px !important; }
          .ds-cart-view h1 { font-size: 36px !important; }
        }
      `}</style>
    </div>
  );
}