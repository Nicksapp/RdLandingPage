import { Link, useParams } from "react-router-dom";

function ProductDetailPage({ copy }) {
  const { slug } = useParams();
  const product = copy.products.find((item) => item.slug === slug) ?? copy.products[0];
  const relatedProducts = copy.products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );

  return (
    <main className="detail-page">
      <section className="catalog-hero catalog-hero--banner">
        <div className="catalog-hero__background">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="catalog-hero__overlay" />
        <div className="shell catalog-hero__inner catalog-hero__inner--banner">
          <div className="catalog-hero__copy">
            <p className="module-index">{product.category}</p>
            <h1>{product.title}</h1>
            <p>{product.text}</p>
          </div>
        </div>
      </section>

      <section className="detail-layout shell">
        <div className="detail-layout__media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-layout__content">
          <div className="detail-panel">
            <p>{copy.productSpecs}</p>
            <div className="spec-tags">
              {product.specs.map((spec) => (
                <span key={spec}>{spec}</span>
              ))}
            </div>
          </div>
          <div className="detail-panel">
            <p>{copy.productInquiry}</p>
            <span>{product.text}</span>
          </div>
          {relatedProducts.length > 0 ? (
            <div className="detail-panel">
              <p>{copy.categoriesLabelRelated}</p>
              <div className="detail-related">
                {relatedProducts.map((item) => (
                  <Link key={item.slug} to={`/products/${item.slug}`}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;
