import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ChromaGrid({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
  onItemClick,
}) {
  const rootRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(-1);

  const demo = [
    {
      title: "Arctic Layer",
      subtitle: "Winter Essential",
      handle: "@dripship",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      placeholder: "❄",
    },
    {
      title: "Midnight Knit",
      subtitle: "Heavyweight",
      handle: "@dripship",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg,#10B981,#000)",
      placeholder: "❄",
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (event) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    moveTo(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handleLeave = () => {};

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{
        "--r": `${radius}px`,
        "--x": "50%",
        "--y": "50%",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        alignItems: "stretch",
        gap: 14,
        maxWidth: 1260,
        margin: "0 auto",
      }}
    >
      {data.map((item, index) => (
        <article
          key={item.id ?? index}
          onMouseMove={handleCardMove}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(-1)}
          onClick={() => onItemClick?.(item)}
          style={{
            "--card-border": item.borderColor || "transparent",
            background: item.gradient,
            "--spotlight-color": "rgba(255,255,255,0.26)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minHeight: 360,
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.16)",
            cursor: "pointer",
            transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
            boxShadow: hoveredCard === index ? "0 16px 36px rgba(0,0,0,0.28)" : "0 8px 18px rgba(0,0,0,0.16)",
            transform: hoveredCard === index ? "translateY(-3px)" : "translateY(0)",
            zIndex: hoveredCard === index ? 2 : 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              transition: "opacity 500ms ease",
              zIndex: 20,
              opacity: hoveredCard === index ? 1 : 0,
              background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
            }}
          />

          <div style={{ position: "relative", zIndex: 10, flex: 1, padding: 10, boxSizing: "border-box" }}>
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 240,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                minHeight: 240,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 88, lineHeight: 1, userSelect: "none" }}>{item.placeholder || "❄"}</span>
              </div>
            )}
          </div>

          <footer style={{
            position: "relative",
            zIndex: 10,
            padding: 12,
            color: "#f8f8f8",
            fontFamily: "'Tenor Sans', sans-serif",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "4px 12px",
          }}>
            <h3 style={{ margin: 0, fontSize: "1.02rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{item.title}</h3>
            {item.handle && <span style={{ fontSize: "0.86rem", opacity: 0.82, textAlign: "right", alignSelf: "center" }}>{item.handle}</span>}
            <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.88, letterSpacing: "0.04em" }}>{item.subtitle}</p>
            {item.location && <span style={{ fontSize: "0.8rem", opacity: 0.85, textAlign: "right" }}>{item.location}</span>}
          </footer>
        </article>
      ))}
    </div>
  );
}