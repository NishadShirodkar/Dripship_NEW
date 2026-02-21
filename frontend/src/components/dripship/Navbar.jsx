import { useState } from "react";
import DrawerMenu from "./DrawerMenu";

const S = {
  nav: {
    position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
    background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    height: 58, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", borderBottom: "1px solid rgba(0,0,0,0.08)", boxSizing: "border-box",
    boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
  },
  brand: {
    fontFamily: "'Tenor Sans', sans-serif", fontSize: 13, letterSpacing: "0.35em",
    color: "#080808", textTransform: "uppercase", position: "absolute", left: "50%",
    transform: "translateX(-50%)", whiteSpace: "nowrap", transition: "all 0.3s",
  },
  iconBtn: {
    background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex",
    alignItems: "center", justifyContent: "center", transition: "transform 0.2s, opacity 0.3s",
  },
  right: { display: "flex", alignItems: "center", gap: 16 },
  badge: {
    position: "absolute", top: -2, right: -4, background: "#080808", color: "#ffffff",
    fontFamily: "'Tenor Sans', sans-serif", fontSize: 8, fontWeight: 600,
    width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", letterSpacing: 0,
  },
};

export default function Navbar({ cartCount, onCartClick, onNavClick }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav style={S.nav}>
        <button style={S.iconBtn} onClick={() => setDrawerOpen(true)} aria-label="Menu"
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#080808" strokeWidth="1" />
            <line x1="0" y1="7" x2="20" y2="7" stroke="#080808" strokeWidth="1" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="#080808" strokeWidth="1" />
          </svg>
        </button>

        <span style={S.brand}>DRIPSHIP</span>

        <div style={S.right}>
          <button style={S.iconBtn} aria-label="Search"
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="#080808" strokeWidth="1" />
              <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="#080808" strokeWidth="1" />
            </svg>
          </button>
          <button style={{ ...S.iconBtn, position: "relative" }} onClick={onCartClick} aria-label="Cart"
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M1 6h16v13H1z" stroke="#080808" strokeWidth="1" fill="none" />
              <path d="M5 6V4a4 4 0 018 0v2" stroke="#080808" strokeWidth="1" fill="none" />
            </svg>
            {cartCount > 0 && <span style={S.badge}>{cartCount}</span>}
          </button>
        </div>
      </nav>
      <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavClick={onNavClick} />
    </>
  );
}