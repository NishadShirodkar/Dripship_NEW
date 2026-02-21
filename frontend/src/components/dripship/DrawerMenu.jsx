import { useEffect } from "react";

const links = ["HOME", "SHOP", "NEW ARRIVALS", "HOODIES", "T-SHIRTS", "ABOUT"];

const S = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1100,
    background: "rgba(0,0,0,0.5)", transition: "opacity 0.4s ease",
  },
  drawer: {
    position: "fixed", top: 0, left: 0, width: 320, maxWidth: "85vw", height: "100%",
    background: "#ffffff", zIndex: 1200, padding: "40px",
    transition: "transform 0.4s cubic-bezier(0.77,0,0.175,1)", boxSizing: "border-box",
    display: "flex", flexDirection: "column", overflowY: "auto", boxShadow: "2px 0 30px rgba(0,0,0,0.15)",
  },
  top: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 },
  brand: {
    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
    fontSize: 28, color: "#080808",
  },
  close: {
    background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: 22,
    fontFamily: "'Tenor Sans', sans-serif", padding: 4, transition: "color 0.3s",
  },
  link: {
    display: "block", fontFamily: "'Tenor Sans', sans-serif", fontSize: 11,
    letterSpacing: "0.3em", textTransform: "uppercase", color: "#666",
    textDecoration: "none", padding: "14px 0", cursor: "pointer",
    background: "none", border: "none", transition: "all 0.3s", textAlign: "left", width: "100%",
  },
  socials: { marginTop: "auto", display: "flex", gap: 20, paddingTop: 40 },
  socialIcon: { color: "#666", transition: "all 0.3s", cursor: "pointer" },
};

export default function DrawerMenu({ open, onClose, onNavClick }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div style={{ ...S.overlay, opacity: open ? 1 : 0 }} onClick={onClose} />
      <div style={{ ...S.drawer, transform: open ? "translateX(0)" : "translateX(-100%)" }}>
        <div style={S.top}>
          <span style={S.brand}>DRIPSHIP</span>
          <button
            style={S.close}
            onClick={onClose}
            onMouseEnter={e => e.target.style.color = "#080808"}
            onMouseLeave={e => e.target.style.color = "#666"}
          >✕</button>
        </div>
        <div>
          {links.map(l => (
            <button
              key={l} style={S.link}
              onClick={() => { onNavClick?.(l); onClose(); }}
              onMouseEnter={e => { e.target.style.color = "#080808"; e.target.style.paddingLeft = "8px"; }}
              onMouseLeave={e => { e.target.style.color = "#666"; e.target.style.paddingLeft = "0"; }}
            >{l}</button>
          ))}
        </div>
        <div style={S.socials}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.2" style={S.socialIcon}
            onMouseEnter={e => { e.currentTarget.style.stroke = "#080808"; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.stroke = "#666"; e.currentTarget.style.transform = "scale(1)"; }}>
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="#666" stroke="none" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.2" style={S.socialIcon}
            onMouseEnter={e => { e.currentTarget.style.stroke = "#080808"; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.stroke = "#666"; e.currentTarget.style.transform = "scale(1)"; }}>
            <path d="M4 4l6.5 8L4 20h2l5.5-6.6L16 20h4l-7-8.5L19.5 4H18l-5 6L9 4H4z" />
          </svg>
        </div>
      </div>
    </>
  );
}