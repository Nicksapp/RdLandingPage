import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import SEO from "./components/SEO";
import { useCloudbaseContent } from "./hooks/useCloudbaseContent";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import "./loading-styles.css";

// 页面加载状态组件
function PageTransition({ children, isLoading, isReady }) {
  const [showContent, setShowContent] = useState(!isLoading);
  const [opacity, setOpacity] = useState(isReady ? 1 : 0);

  useEffect(() => {
    if (isReady) {
      setShowContent(true);
      requestAnimationFrame(() => {
        setOpacity(1);
      });
    } else if (isLoading) {
      setOpacity(0);
      const timer = setTimeout(() => setShowContent(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isReady]);

  if (!showContent) {
    return <PageSkeleton />;
  }

  return (
    <div
      className="page-transition"
      style={{
        opacity,
        transition: "opacity 0.35s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

// 骨架屏组件
function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-busy="true" aria-label="页面加载中">
      <div className="skeleton-hero">
        <div className="skeleton-shader" />
        <div className="skeleton-hero-content">
          <div className="skeleton-text skeleton-text--eyebrow" />
          <div className="skeleton-text skeleton-text--title" />
          <div className="skeleton-text skeleton-text--tagline" />
          <div className="skeleton-actions">
            <div className="skeleton-button" />
            <div className="skeleton-button skeleton-button--ghost" />
          </div>
        </div>
      </div>
      <div className="skeleton-section">
        <div className="skeleton-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
    </div>
  );
}

// 路由追踪组件（用于 SEO）
function RouteTracker({ language, onRouteChange }) {
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;
    let page = "home";
    if (path === "/products") page = "products";
    else if (path.startsWith("/products/")) page = "productDetail";
    onRouteChange(page);
  }, [location, onRouteChange]);
  
  return null;
}

function App() {
  const [language, setLanguage] = useState("zh");
  const [currentPage, setCurrentPage] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { copy, error, source, isReady } = useCloudbaseContent(language);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 从 copy 中获取产品标题（用于产品详情页 SEO）
  const getProductTitle = () => {
    const path = window.location.hash;
    const match = path.match(/\/products\/(.+)/);
    if (match) {
      const slug = match[1];
      const product = copy.products?.find((p) => p.slug === slug);
      return product?.title;
    }
    return null;
  };

  const seoCustom = {};
  const productTitle = getProductTitle();
  if (currentPage === "productDetail" && productTitle) {
    seoCustom.title = language === "zh" ? `${productTitle} - 广东嵘德` : `${productTitle} - Guangdong Rongde`;
  }

  return (
    <HashRouter>
      <SEO language={language} page={currentPage} custom={seoCustom} />
      <RouteTracker language={language} onRouteChange={setCurrentPage} />
      
      <div className="app-shell">
        <SiteHeader 
          copy={copy} 
          onToggleLanguage={() => setLanguage(language === "zh" ? "en" : "zh")} 
        />
        
        {import.meta.env.DEV && error ? (
          <div className="cloudbase-status cloudbase-status--error">
            <strong>CloudBase fallback</strong>
            <span>{error.message}</span>
          </div>
        ) : null}
        
        {import.meta.env.DEV && !error && source !== "fallback" ? (
          <div className="cloudbase-status">{source}</div>
        ) : null}

        <PageTransition isLoading={!isReady} isReady={isReady}>
          <Routes>
            <Route path="/" element={<HomePage copy={copy} />} />
            <Route path="/products" element={<ProductsPage copy={copy} />} />
            <Route path="/products/:slug" element={<ProductDetailPage copy={copy} />} />
          </Routes>
        </PageTransition>

        <button
          className={showBackToTop ? "back-to-top is-visible" : "back-to-top"}
          type="button"
          aria-label={language === "zh" ? "回到顶部" : "Back to top"}
          onClick={scrollToTop}
        >
          ↑
        </button>
        
        <footer className="site-footer">{copy.footer}</footer>
      </div>
    </HashRouter>
  );
}

export default App;
