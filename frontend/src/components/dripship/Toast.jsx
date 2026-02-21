import { useEffect, useState } from "react";

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", bottom: 32, right: 32, zIndex: 2000,
      background: "#1a1a18", border: "1px solid rgba(255,255,255,0.08)",
      padding: "14px 28px", fontFamily: "'Tenor Sans', sans-serif",
      fontSize: 9, letterSpacing: "0.2em", color: "#f2f2f0",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.4s ease", pointerEvents: "none",
    }}>
      {message}
    </div>
  );
}