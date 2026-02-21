const col = {
  heading: {
    fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.25em",
    textTransform: "uppercase", color: "#080808", marginBottom: 20,
  },
  link: {
    fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13,
    color: "#666", display: "block", marginBottom: 14,
    textDecoration: "none", cursor: "pointer", transition: "all 0.3s",
    background: "none", border: "none", padding: 0, textAlign: "left",
  },
};

export default function Footer() {
  return (
    <footer className="ds-footer" style={{
      background: "linear-gradient(180deg, #f5f5f5 0%, #ececec 100%)", borderTop: "1px solid rgba(0,0,0,0.1)",
      padding: "80px 60px 40px", position: "relative", zIndex: 1,
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40,
      }} className="ds-footer-grid">
        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
            fontSize: 32, color: "#080808", margin: "0 0 8px",
          }}>DRIPSHIP</h3>
          <p style={{
            fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.25em",
            color: "#666", margin: "0 0 24px",
          }}>— Wear The Cold</p>
          <div style={{ display: "flex", gap: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.2" 
              style={{ cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.stroke = "#080808"; e.currentTarget.style.transform = "scale(1.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.stroke = "#666"; e.currentTarget.style.transform = "scale(1)"; }}>
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="#666" stroke="none" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.2" 
              style={{ cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.stroke = "#080808"; e.currentTarget.style.transform = "scale(1.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.stroke = "#666"; e.currentTarget.style.transform = "scale(1)"; }}>
              <path d="M4 4l6.5 8L4 20h2l5.5-6.6L16 20h4l-7-8.5L19.5 4H18l-5 6L9 4H4z" />
            </svg>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 style={col.heading}>SHOP</h4>
          {["New Arrivals", "Hoodies", "T-Shirts", "All Products"].map(l => (
            <button key={l} style={col.link}
              onMouseEnter={e => { e.target.style.color = "#080808"; e.target.style.paddingLeft = "4px"; }}
              onMouseLeave={e => { e.target.style.color = "#666"; e.target.style.paddingLeft = "0"; }}
            >{l}</button>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4 style={col.heading}>SUPPORT</h4>
          {["Shipping Policy", "Returns", "Track Order", "Contact Us"].map(l => (
            <button key={l} style={col.link}
              onMouseEnter={e => { e.target.style.color = "#080808"; e.target.style.paddingLeft = "4px"; }}
              onMouseLeave={e => { e.target.style.color = "#666"; e.target.style.paddingLeft = "0"; }}
            >{l}</button>
          ))}
        </div>

        {/* Brand */}
        <div>
          <h4 style={col.heading}>BRAND</h4>
          {["Our Story", "Collaborations", "Careers"].map(l => (
            <button key={l} style={col.link}
              onMouseEnter={e => { e.target.style.color = "#080808"; e.target.style.paddingLeft = "4px"; }}
              onMouseLeave={e => { e.target.style.color = "#666"; e.target.style.paddingLeft = "0"; }}
            >{l}</button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "48px 0 24px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 8, letterSpacing: "0.15em",
          color: "#666",
        }}>© 2025 DRIPSHIP. All rights reserved.</span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 12,
          color: "#666",
        }}>Designed with cold. Built with care.</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ds-footer { padding: 60px 20px 30px !important; }
          .ds-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}