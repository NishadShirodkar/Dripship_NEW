export default function EditorialSection() {
  return (
    <section style={{
      width: "100%", height: "75vh", background: "transparent",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", position: "relative", zIndex: 1,
      padding: "0 20px", boxSizing: "border-box",
    }}>
      <div style={{
        width: "60%", height: "100%", background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)", minWidth: 280,
        display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.08)",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 20, color: "rgba(0,0,0,0.15)", letterSpacing: "0.3em",
        }}>[ editorial image ]</span>
      </div>
      <p style={{
        alignSelf: "flex-end", fontFamily: "'Tenor Sans', sans-serif", fontSize: 8,
        letterSpacing: "0.4em", color: "#666", textTransform: "uppercase",
        marginTop: 16, paddingRight: 40,
      }}>
        DRIPSHIP WINTER '25 — COLD NEVER LOOKED THIS GOOD
      </p>
    </section>
  );
}