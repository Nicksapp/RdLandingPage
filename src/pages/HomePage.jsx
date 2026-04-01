import { useEffect, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";
import { Link, useLocation } from "react-router-dom";
import RevealSection from "../components/RevealSection";
import ImageWithFallback from "../components/ImageWithFallback";
import { sectionIds } from "../data/siteContent";

function HomePage({ copy }) {
  const location = useLocation();
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToContactSection = () => {
    const target = document.getElementById(sectionIds.contact);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % copy.heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [copy.heroSlides.length]);

  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (!targetId) {
      return;
    }

    window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [location.state]);

  return (
    <main className="home-page">
      <section className="hero-banner" id={sectionIds.home}>
        <div className="hero-banner__shader" aria-hidden="true">
          <GrainGradient
            width="100%"
            height="100%"
            colors={["#f8f9fb", "#dce1e8", "#b4bec9", "#e7ebf0"]}
            colorBack="#b7c1cb"
            softness={0.72}
            intensity={0.18}
            noise={0.14}
            shape="corners"
            speed={0.35}
          />
        </div>

        <div className="hero-banner__slides">
          {copy.heroSlides.map((slide, index) => (
            <article className={index === activeSlide ? "hero-slide is-active" : "hero-slide"} key={slide.title}>
              <div className="hero-slide__image">
                <ImageWithFallback 
                  src={slide.image} 
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fill
                />
              </div>
              <div className="hero-slide__overlay" />
              <div className="hero-slide__content shell">
                <p className="hero-slide__eyebrow">{copy.heroEyebrow}</p>
                <h1>{copy.heroTitle}</h1>
                <p className="hero-slide__tagline">{copy.heroTagline}</p>
                <h2>{slide.title}</h2>
                <p className="hero-slide__description">{slide.description}</p>
                <div className="hero-slide__actions">
                  <Link className="cta cta--solid" to="/products">
                    {copy.heroPrimary}
                  </Link>
                  <button className="cta cta--ghost" type="button" onClick={scrollToContactSection}>
                    {copy.heroSecondary}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hero-banner__bottom shell">
          <div className="hero-banner__dots">
            {copy.heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === activeSlide ? "hero-dot is-active" : "hero-dot"}
                onClick={() => setActiveSlide(index)}
                aria-label={slide.title}
              />
            ))}
          </div>
        </div>
      </section>

      <RevealSection className="showcase-band">
        <div className="shell showcase-band__inner">
          <div className="section-heading">
            <p>01</p>
            <div>
              <h2>{copy.capabilitiesTitle}</h2>
              <span>{copy.capabilitiesLead}</span>
            </div>
          </div>
          <div className="capability-grid">
            {copy.capabilities.map((item) => (
              <article className="capability-card" key={item.title}>
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                />
                <div className="capability-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="split-module split-module--light" id={sectionIds.about}>
        <div className="shell split-module__inner">
          <div className="split-module__media">
            <ImageWithFallback 
              src={copy.aboutImage} 
              alt={copy.aboutTitle}
              loading="lazy"
            />
          </div>
          <div className="split-module__content">
            <p className="module-index">02</p>
            <h2>{copy.aboutTitle}</h2>
            <p className="module-lead">{copy.aboutLead}</p>
            <p className="module-body">{copy.aboutBody}</p>
            <div className="highlight-list">
              {copy.aboutHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="product-showcase" id={sectionIds.products}>
        <div className="shell product-showcase__inner">
          <div className="product-showcase__header">
            <div>
              <p className="module-index">03</p>
              <h2>{copy.showcaseTitle}</h2>
              <p>{copy.showcaseLead}</p>
            </div>
            <Link className="section-link" to="/products">
              {copy.showcaseCta}
            </Link>
          </div>
          <div className="product-showcase__grid">
            <article className="feature-tile feature-tile--large">
              <ImageWithFallback 
                src={copy.products[0].image} 
                alt={copy.products[0].title}
                loading="lazy"
              />
              <div className="feature-tile__content">
                <p>{copy.products[0].category}</p>
                <h3>{copy.products[0].title}</h3>
                <span>{copy.products[0].text}</span>
              </div>
            </article>
            {copy.products.slice(1, 5).map((product) => (
              <article className="feature-tile" key={product.slug}>
                <ImageWithFallback 
                  src={product.image} 
                  alt={product.title}
                  loading="lazy"
                />
                <div className="feature-tile__content">
                  <p>{product.category}</p>
                  <h3>{product.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="applications-band">
        <div className="shell applications-band__inner">
          <div className="applications-band__intro">
            <p className="module-index">04</p>
            <h2>{copy.projectTitle}</h2>
            <p>{copy.projectLead}</p>
          </div>
          <div className="applications-band__cards">
            {copy.projectCards.map((card) => (
              <article className="application-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="split-module split-module--dark" id={sectionIds.contact}>
        <div className="shell split-module__inner">
          <div className="split-module__content">
            <p className="module-index">05</p>
            <h2>{copy.contactTitle}</h2>
            <p className="module-lead">{copy.contactLead}</p>
            <div className="contact-stack">
              {copy.contactItems.map((item) => (
                <div className="contact-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="split-module__media">
            <ImageWithFallback 
              src={copy.contactImage} 
              alt={copy.contactTitle}
              loading="lazy"
            />
          </div>
        </div>
      </RevealSection>
    </main>
  );
}

export default HomePage;
