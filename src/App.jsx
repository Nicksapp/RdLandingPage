import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import { useCloudbaseContent } from "./hooks/useCloudbaseContent";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [language, setLanguage] = useState("zh");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { copy, error, source } = useCloudbaseContent(language);

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

  return (
    <HashRouter>
      <div className="app-shell">
        <SiteHeader copy={copy} onToggleLanguage={() => setLanguage(language === "zh" ? "en" : "zh")} />
        {import.meta.env.DEV && error ? (
          <div className="cloudbase-status cloudbase-status--error">
            <strong>CloudBase fallback</strong>
            <span>{error.message}</span>
          </div>
        ) : null}
        {import.meta.env.DEV && !error && source !== "fallback" ? (
          <div className="cloudbase-status">{source}</div>
        ) : null}
        <Routes>
          <Route path="/" element={<HomePage copy={copy} />} />
          <Route path="/products" element={<ProductsPage copy={copy} />} />
          <Route path="/products/:slug" element={<ProductDetailPage copy={copy} />} />
        </Routes>
        <button
          className={showBackToTop ? "back-to-top is-visible" : "back-to-top"}
          type="button"
          aria-label="Back to top"
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
