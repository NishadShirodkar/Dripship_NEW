import defaultProducts from "@/components/dripship/products";

const CATALOG_KEY = "dripship_catalog_v1";
const ORDERS_KEY = "dripship_orders_v1";
const ADMIN_SESSION_KEY = "dripship_admin_session_v1";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "dripship@123";

const withStockFlag = (product) => ({
  ...product,
  outOfStock: Boolean(product.outOfStock),
});

const readJSON = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const emitCatalogUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("dripship:catalog-updated"));
};

const emitOrdersUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("dripship:orders-updated"));
};

export const getCatalog = () => {
  const fallback = defaultProducts.map(withStockFlag);
  const saved = readJSON(CATALOG_KEY, null);
  if (!Array.isArray(saved)) return fallback;
  return saved.map(withStockFlag);
};

export const saveCatalog = (products) => {
  const safe = Array.isArray(products) ? products.map(withStockFlag) : [];
  writeJSON(CATALOG_KEY, safe);
  emitCatalogUpdate();
};

export const addCatalogProduct = (productInput) => {
  const current = getCatalog();
  const nextId = current.length ? Math.max(...current.map((item) => Number(item.id) || 0)) + 1 : 1;
  const created = {
    id: nextId,
    name: productInput.name?.trim() || "Untitled Product",
    category: productInput.category?.trim() || "Apparel",
    price: productInput.price?.trim() || "₹0",
    badge: productInput.badge?.trim() || "NEW",
    color: productInput.color?.trim() || "N/A",
    material: productInput.material?.trim() || "N/A",
    fit: productInput.fit?.trim() || "Regular",
    description: productInput.description?.trim() || "",
    sizes: Array.isArray(productInput.sizes) && productInput.sizes.length
      ? productInput.sizes
      : ["S", "M", "L"],
    outOfStock: false,
  };
  saveCatalog([...current, created]);
  return created;
};

export const removeCatalogProduct = (productId) => {
  const current = getCatalog();
  saveCatalog(current.filter((item) => item.id !== productId));
};

export const toggleCatalogOutOfStock = (productId) => {
  const current = getCatalog();
  saveCatalog(
    current.map((item) =>
      item.id === productId ? { ...item, outOfStock: !item.outOfStock } : item
    )
  );
};

export const getOrders = () => {
  const saved = readJSON(ORDERS_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

export const addPlacedOrder = (order) => {
  const current = getOrders();
  const next = [order, ...current];
  writeJSON(ORDERS_KEY, next);
  emitOrdersUpdate();
};

export const isAdminAuthenticated = () => {
  return Boolean(readJSON(ADMIN_SESSION_KEY, false));
};

export const adminLogin = (username, password) => {
  const valid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  if (valid) writeJSON(ADMIN_SESSION_KEY, true);
  return valid;
};

export const adminLogout = () => {
  writeJSON(ADMIN_SESSION_KEY, false);
};
