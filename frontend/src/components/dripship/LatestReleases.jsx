import products from "./products";
import ProductCard from "./ProductCard";

export default function LatestReleases({ onProductClick }) {
  return (
    <section style={{ background: "transparent", padding: "100px 60px", position: "relative", zIndex: 1 }}
      className="ds-releases"
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.4em",
          color: "#666", textTransform: "uppercase", margin: "0 0 12px",
        }}>— NEW ARRIVALS</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: 52, color: "#080808", margin: 0, lineHeight: 1.1,
        }}>Latest Releases</h2>
      </div>
      <hr style={{
        border: "none", borderTop: "1px solid rgba(0,0,0,0.1)",
        margin: "0 0 60px",
      }} />

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 2,
      }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ds-releases {
            padding: 60px 20px !important;
          }
          .ds-releases h2 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}