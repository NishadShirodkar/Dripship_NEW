import { useState, useEffect } from "react";

const inputBase = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1px solid rgba(8,8,8,0.2)", color: "#080808",
  fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14,
  padding: "10px 0", outline: "none", transition: "border-color 0.3s",
};

const labelBase = {
  fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.25em",
  textTransform: "uppercase", color: "#666", display: "block", marginBottom: 6,
};

export default function OrderFormModal({ product, onClose, onAddToCart }) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [size, setSize] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", size: "" });
  const [shake, setShake] = useState("");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const validate = () => {
    const e = { name: "", email: "", phone: "", size: "" };
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!size) e.size = "Select a size";
    setErrors(e);
    const invalidFields = Object.entries(e)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key);

    if (invalidFields.length > 0) {
      setShake(invalidFields[0]);
      setTimeout(() => setShake(""), 500);
    }
    return invalidFields.length === 0;
  };

  const submit = () => {
    if (product.outOfStock) return;
    if (!validate()) return;
    onAddToCart({
      productId: product.id, productName: product.name, price: product.price,
      size, customerName: form.name, customerEmail: form.email,
      customerPhone: form.phone, quantity: 1,
    });
  };

  const Field = ({ label, field, type = "text" }) => (
    <div style={{ marginBottom: 24 }}>
      <label style={labelBase}>{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={e => {
          const nextValue = field === "phone"
            ? e.target.value.replace(/\D/g, "").slice(0, 15)
            : e.target.value;
          setForm(prev => ({ ...prev, [field]: nextValue }));
          setErrors(prev => ({ ...prev, [field]: "" }));
        }}
        onFocus={e => e.target.style.borderBottomColor = "#080808"}
        onBlur={e => e.target.style.borderBottomColor = "rgba(8,8,8,0.2)"}
        style={{
          ...inputBase,
          boxSizing: "border-box",
          animation: shake === field ? "ds-shake 0.4s ease" : "none",
        }}
        inputMode={field === "phone" ? "numeric" : undefined}
        autoComplete={field === "phone" ? "tel" : undefined}
      />
      {errors[field] && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c45050", marginTop: 4, display: "block" }}>{errors[field]}</span>}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={close} style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)",
        opacity: visible ? 1 : 0, transition: "opacity 0.35s ease",
      }} />
      <div className="ds-order-modal" style={{
        width: 440, maxWidth: "90vw", background: "#ffffff",
        border: "1px solid rgba(8,8,8,0.12)", padding: "48px 40px",
        position: "relative", boxSizing: "border-box",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <button
          onClick={close}
          style={{
            position: "absolute", top: 16, right: 20, background: "none",
            border: "none", color: "#666", fontSize: 18, cursor: "pointer",
            fontFamily: "'Tenor Sans', sans-serif", transition: "color 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#080808"}
          onMouseLeave={e => e.currentTarget.style.color = "#666"}
        >✕</button>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 28, color: "#080808", margin: "0 0 8px",
        }}>Complete Your Order</h3>
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.25em",
          color: "#666", margin: "0 0 32px",
        }}>— {product.name} / {product.price}</p>

        <Field label="Full Name" field="name" />
        <Field label="Email Address" field="email" type="email" />
        <Field label="Phone Number" field="phone" type="tel" />

        {/* Size Selector */}
        <div style={{ marginBottom: 32 }}>
          <label style={labelBase}>SELECT SIZE</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => { setSize(s); setErrors({ ...errors, size: "" }); }}
                style={{
                  border: size === s ? "1px solid #080808" : "1px solid rgba(8,8,8,0.2)",
                  background: size === s ? "rgba(8,8,8,0.06)" : "none",
                  color: "#080808", padding: "8px 14px",
                  fontFamily: "'Tenor Sans', sans-serif", fontSize: 9,
                  letterSpacing: "0.15em", cursor: "pointer", transition: "all 0.3s ease",
                }}
              >{s}</button>
            ))}
          </div>
          {errors.size && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c45050", marginTop: 6, display: "block" }}>{errors.size}</span>}
        </div>

        <button
          onClick={submit}
          disabled={product.outOfStock}
          style={{
            width: "100%", background: product.outOfStock ? "#9a9a9a" : "#080808", color: "#ffffff", border: "none",
            padding: 16, fontFamily: "'Tenor Sans', sans-serif", fontSize: 10,
            letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={e => { if (!product.outOfStock) e.currentTarget.style.background = "#1f1f1f"; }}
          onMouseLeave={e => { if (!product.outOfStock) e.currentTarget.style.background = "#080808"; }}
        >{product.outOfStock ? "OUT OF STOCK" : "ADD TO CART"}</button>
      </div>

      <style>{`
        @keyframes ds-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}