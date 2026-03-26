import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sectionIds } from "../data/siteContent";

function SiteHeader({ copy, onToggleLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 24) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHomeSection = (sectionId) => {
    if (location.pathname === "/") {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      return;
    }

    navigate("/", { state: { scrollTo: sectionId } });
  };

  const isChinese = copy.switchLabel === "English";
  const currentLanguage = isChinese ? "中文 / ZH" : "English / EN";
  const nextLanguage = isChinese ? "English / EN" : "中文 / ZH";

  return (
    <header className={isVisible ? "site-header is-visible" : "site-header is-hidden"}>
      <div className="site-header__inner">
        <button className="site-brand" type="button" onClick={() => scrollToHomeSection(sectionIds.home)}>
          <span className="site-brand__mark">RD</span>
          <span>{copy.brand}</span>
        </button>

        <nav className="site-nav">
          <button className="site-nav__link" type="button" onClick={() => scrollToHomeSection(sectionIds.home)}>
            {copy.nav[0]}
          </button>
          <button className="site-nav__link" type="button" onClick={() => scrollToHomeSection(sectionIds.about)}>
            {copy.nav[1]}
          </button>
          <button className="site-nav__link" type="button" onClick={() => scrollToHomeSection(sectionIds.products)}>
            {copy.nav[2]}
          </button>
          <button className="site-nav__link" type="button" onClick={() => scrollToHomeSection(sectionIds.contact)}>
            {copy.nav[3]}
          </button>
        </nav>

        <div className="language-switcher" tabIndex={0}>
          <button className="language-switcher__trigger" type="button" aria-label="Switch language">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a15 15 0 0 1 0 18" />
              <path d="M12 3a15 15 0 0 0 0 18" />
            </svg>
          </button>
          <div className="language-switcher__menu">
            <span className="language-switcher__current">{currentLanguage}</span>
            <button className="language-switcher__option" type="button" onClick={onToggleLanguage}>
              {nextLanguage}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
