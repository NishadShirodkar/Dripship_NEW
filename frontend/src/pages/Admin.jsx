import { useEffect, useMemo, useState } from "react";
import {
  addCatalogProduct,
  adminLogin,
  adminLogout,
  getCatalog,
  getOrders,
  isAdminAuthenticated,
  removeCatalogProduct,
  toggleCatalogOutOfStock,
} from "@/lib/dripshipStore";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid rgba(0,0,0,0.2)",
  background: "#fff",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

export default function Admin() {
  const [authed, setAuthed] = useState(isAdminAuthenticated());
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [catalog, setCatalog] = useState(() => getCatalog());
  const [orders, setOrders] = useState(() => getOrders());
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Hoodie",
    price: "",
    badge: "NEW",
    color: "",
    material: "",
    fit: "Regular",
    sizes: "S,M,L,XL",
    description: "",
  });

  useEffect(() => {
    const syncCatalog = () => setCatalog(getCatalog());
    const syncOrders = () => setOrders(getOrders());
    const syncAll = () => {
      syncCatalog();
      syncOrders();
    };

    window.addEventListener("storage", syncAll);
    window.addEventListener("dripship:catalog-updated", syncCatalog);
    window.addEventListener("dripship:orders-updated", syncOrders);
    return () => {
      window.removeEventListener("storage", syncAll);
      window.removeEventListener("dripship:catalog-updated", syncCatalog);
      window.removeEventListener("dripship:orders-updated", syncOrders);
    };
  }, []);

  const totalOrders = orders.length;
  const totalItems = useMemo(
    () => orders.reduce((sum, order) => sum + (order.itemCount || order.items?.length || 0), 0),
    [orders]
  );

  const submitLogin = (event) => {
    event.preventDefault();
    const ok = adminLogin(login.username.trim(), login.password);
    if (!ok) {
      setLoginError("Invalid admin credentials");
      return;
    }
    setLoginError("");
    setAuthed(true);
  };

  const addItem = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.price.trim()) return;

    addCatalogProduct({
      ...form,
      sizes: form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    setForm({
      name: "",
      category: "Hoodie",
      price: "",
      badge: "NEW",
      color: "",
      material: "",
      fit: "Regular",
      sizes: "S,M,L,XL",
      description: "",
    });
    setCatalog(getCatalog());
  };

  const handleLogout = () => {
    adminLogout();
    setAuthed(false);
    setLogin({ username: "", password: "" });
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "#f2f2f0" }}>
        <form onSubmit={submitLogin} style={{ width: 360, background: "#fff", border: "1px solid rgba(0,0,0,0.12)", padding: 28 }}>
          <h2 style={{ margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, fontStyle: "italic" }}>Admin Access</h2>
          <p style={{ margin: "0 0 20px", fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#666" }}>— PRIVATE PANEL</p>

          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Username"
              value={login.username}
              onChange={(event) => setLogin({ ...login, username: event.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(event) => setLogin({ ...login, password: event.target.value })}
              style={inputStyle}
            />
          </div>
          {loginError && <p style={{ margin: "0 0 10px", color: "#b04a4a", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{loginError}</p>}

          <button type="submit" style={{ width: "100%", border: "1px solid #080808", background: "#080808", color: "#fff", padding: 11, fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", cursor: "pointer" }}>
            LOGIN
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f6f6f4", padding: "36px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 400, fontStyle: "italic", color: "#080808" }}>Dripship Admin</h1>
            <p style={{ margin: "8px 0 0", fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#666" }}>— CATALOG & ORDERS</p>
          </div>
          <button onClick={handleLogout} style={{ border: "1px solid rgba(0,0,0,0.3)", background: "transparent", color: "#080808", padding: "10px 14px", fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.18em", cursor: "pointer" }}>
            LOGOUT
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
          <section style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", padding: 16 }}>
            <h3 style={{ margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500 }}>Add New Item</h3>
            <form onSubmit={addItem} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" style={inputStyle} />
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (₹1,999)" style={inputStyle} />
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" style={inputStyle} />
              <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Badge" style={inputStyle} />
              <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="Color" style={inputStyle} />
              <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} placeholder="Material" style={inputStyle} />
              <input value={form.fit} onChange={(e) => setForm({ ...form, fit: e.target.value })} placeholder="Fit" style={inputStyle} />
              <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="Sizes (S,M,L)" style={inputStyle} />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" style={{ ...inputStyle, minHeight: 74, gridColumn: "1 / -1", resize: "vertical" }} />
              <button type="submit" style={{ gridColumn: "1 / -1", border: "1px solid #080808", background: "#080808", color: "#fff", padding: 11, fontFamily: "'Tenor Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", cursor: "pointer" }}>
                ADD ITEM
              </button>
            </form>
          </section>

          <section style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", padding: 16 }}>
            <h3 style={{ margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500 }}>Orders</h3>
            <p style={{ margin: "0 0 12px", color: "#666", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
              Total Orders: {totalOrders} · Items Sold: {totalItems}
            </p>
            <div style={{ maxHeight: 350, overflowY: "auto", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {orders.length === 0 ? (
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", fontSize: 13 }}>No placed orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    style={{ padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", cursor: "pointer" }}
                    onClick={() => {
                      setExpandedOrderId((prev) => (prev === order.id ? null : order.id));
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{order.id}</strong>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666" }}>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#333", marginTop: 4 }}>
                      {(order.items || []).map((item) => item.productName).join(", ")}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666", marginTop: 2 }}>
                      {order.itemCount} item(s) · ₹{order.total?.toLocaleString("en-IN")}
                    </div>
                    {expandedOrderId === order.id && (
                      <div style={{ marginTop: 8, padding: 10, background: "#fafafa", border: "1px solid rgba(0,0,0,0.08)" }}>
                        {(order.items || []).map((item, index) => (
                          <div key={`${order.id}-${index}`} style={{ marginBottom: index === (order.items.length - 1) ? 0 : 10 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#1f1f1f", fontWeight: 500 }}>
                              {item.productName} · {item.size}
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666", marginTop: 2 }}>
                              {item.customerName} · {item.customerEmail}
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666", marginTop: 2 }}>
                              Phone: {item.customerPhone}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <section style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", marginTop: 20, padding: 16 }}>
          <h3 style={{ margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500 }}>Manage Items</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {catalog.map((product) => (
              <div key={product.id} style={{ border: "1px solid rgba(0,0,0,0.08)", padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#080808" }}>{product.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666" }}>{product.category} · {product.price} · {product.outOfStock ? "Out of Stock" : "In Stock"}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => {
                      toggleCatalogOutOfStock(product.id);
                      setCatalog(getCatalog());
                    }}
                    style={{ border: "1px solid rgba(0,0,0,0.25)", background: "transparent", color: "#080808", padding: "8px 10px", fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.14em", cursor: "pointer" }}
                  >
                    {product.outOfStock ? "MARK IN STOCK" : "MARK OOS"}
                  </button>
                  <button
                    onClick={() => {
                      removeCatalogProduct(product.id);
                      setCatalog(getCatalog());
                    }}
                    style={{ border: "1px solid rgba(176,74,74,0.45)", background: "transparent", color: "#9a3f3f", padding: "8px 10px", fontFamily: "'Tenor Sans', sans-serif", fontSize: 9, letterSpacing: "0.14em", cursor: "pointer" }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
