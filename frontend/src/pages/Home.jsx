import { useState, useCallback, useEffect } from "react";
import Navbar from "../components/dripship/Navbar";
import HeroSection from "../components/dripship/HeroSection";
import LatestReleases from "../components/dripship/LatestReleases";
import EditorialSection from "../components/dripship/EditorialSection";
import ProductModal from "../components/dripship/ProductModal";
import OrderFormModal from "../components/dripship/OrderFormModal";
import CartView from "../components/dripship/CartView";
import Footer from "../components/dripship/Footer";
import Toast from "../components/dripship/Toast";
import { addPlacedOrder, getCatalog } from "@/lib/dripshipStore";

const makeOrderId = () => "DS-" + String(Math.floor(100000 + Math.random() * 900000));

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [catalog, setCatalog] = useState(() => getCatalog());

  const refreshCatalog = useCallback(() => {
    setCatalog(getCatalog());
  }, []);

  useEffect(() => {
    const sync = () => refreshCatalog();
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshCatalog();
    };
    window.addEventListener("storage", sync);
    window.addEventListener("dripship:catalog-updated", sync);
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("dripship:catalog-updated", sync);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshCatalog]);

  const isUnavailable = useCallback((productId) => {
    const product = catalog.find((item) => item.id === productId);
    return !product || product.outOfStock;
  }, [catalog]);

  const addToCart = useCallback((item) => {
    if (isUnavailable(item.productId)) {
      setOrderProduct(null);
      setSelectedProduct(null);
      setToast("This item is out of stock ❄");
      return;
    }

    const itemPrice = parseInt(String(item.price || "0").replace(/[₹,]/g, ""), 10) || 0;
    addPlacedOrder({
      id: makeOrderId(),
      createdAt: new Date().toISOString(),
      itemCount: 1,
      total: itemPrice,
      items: [item],
    });

    setCart(prev => [...prev, item]);
    setOrderProduct(null);
    setSelectedProduct(null);
    setToast("Added to cart ❄");
  }, [isUnavailable]);

  const removeFromCart = useCallback((idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const confirmOrder = useCallback(() => {
    // Orders are persisted at add-to-cart time for immediate admin visibility.
  }, []);

  const handleNavClick = (link) => {
    if (link === "HOME") setCurrentView("home");
    else if (link === "SHOP" || link === "NEW ARRIVALS" || link === "HOODIES" || link === "T-SHIRTS") {
      setCurrentView("home");
      setTimeout(() => {
        const el = document.querySelector(".ds-releases");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const scrollToShop = () => {
    const el = document.querySelector(".ds-releases");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&family=Tenor+Sans&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #ececec 100%); color: #080808; overflow-x: hidden; }
        ::selection { background: rgba(0,0,0,0.15); color: #080808; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 2px; }
      `}</style>

      <Navbar
        cartCount={cart.length}
        onCartClick={() => setCurrentView(currentView === "cart" ? "home" : "cart")}
        onNavClick={handleNavClick}
      />

      {currentView === "home" ? (
        <div style={{ position: "relative", zIndex: 1 }}>
          <HeroSection onShopClick={scrollToShop} />
          <LatestReleases
            products={catalog}
            onProductClick={(p) => {
              if (p.outOfStock) {
                setToast("This item is out of stock ❄");
                return;
              }
              setSelectedProduct(p);
            }}
          />
          <EditorialSection />
          <Footer />
        </div>
      ) : (
        <div style={{ position: "relative", zIndex: 1 }}>
          <CartView
            cart={cart}
            onRemove={removeFromCart}
            onConfirm={confirmOrder}
            onBackToShop={() => { setCart([]); setCurrentView("home"); }}
          />
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onPlaceOrder={(p) => setOrderProduct(p)}
        />
      )}

      {/* Order Form Modal */}
      {orderProduct && (
        <OrderFormModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}