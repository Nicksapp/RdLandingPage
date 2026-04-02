import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "../components/ImageWithFallback";

function ProductsPage({ copy }) {
  const itemsPerPage = 9;
  const [activeGroupId, setActiveGroupId] = useState(copy.productGroups[0].id);
  const [activeSubcategoryTitle, setActiveSubcategoryTitle] = useState(copy.productGroups[0].subcategories[0].title);
  const [activeChildTitle, setActiveChildTitle] = useState(copy.productGroups[0].subcategories[0].children[0].title);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const firstGroup = copy.productGroups[0];

    if (!firstGroup) {
      return;
    }

    const firstSubcategory = firstGroup.subcategories[0];
    const firstChild = firstSubcategory?.children[0];

    setActiveGroupId(firstGroup.id);
    setActiveSubcategoryTitle(firstSubcategory?.title ?? "");
    setActiveChildTitle(firstChild?.title ?? "");
  }, [copy.productGroups]);

  const activeGroup = useMemo(
    () => copy.productGroups.find((group) => group.id === activeGroupId) ?? copy.productGroups[0],
    [activeGroupId, copy.productGroups],
  );

  const activeSubcategory = useMemo(
    () =>
      activeGroup.subcategories.find((subcategory) => subcategory.title === activeSubcategoryTitle) ??
      activeGroup.subcategories[0],
    [activeGroup, activeSubcategoryTitle],
  );

  const activeChild = useMemo(
    () => activeSubcategory.children.find((child) => child.title === activeChildTitle) ?? activeSubcategory.children[0],
    [activeChildTitle, activeSubcategory],
  );

  const activeSubcategoryHasMeaningfulChildren = useMemo(
    () =>
      activeSubcategory.children.some(
        (child) => child.title !== activeSubcategory.title || activeSubcategory.children.length > 1,
      ),
    [activeSubcategory],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeGroupId, activeSubcategoryTitle, activeChildTitle]);

  if (!activeGroup || !activeSubcategory || !activeChild) {
    return null;
  }

  const currentItems = activeChild.items;
  const totalPages = Math.max(1, Math.ceil(currentItems.length / itemsPerPage));
  const paginatedItems = currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const subcategoryHasMeaningfulChildren = (subcategory) =>
    subcategory.children.some((child) => child.title !== subcategory.title || subcategory.children.length > 1);

  return (
    <main className="catalog-page">
      <section className="catalog-hero catalog-hero--banner">
        <div className="catalog-hero__background">
          <ImageWithFallback 
            src={activeGroup.image} 
            alt={activeGroup.title}
            loading="eager"
          />
        </div>
        <div className="catalog-hero__overlay" />
        <div className="shell catalog-hero__inner catalog-hero__inner--banner">
          <div className="catalog-hero__copy">
            <p className="module-index">Products & Services</p>
            <h1>{copy.productsOverviewTitle}</h1>
            <p>{copy.productsPageLead}</p>
          </div>
        </div>
      </section>

      <section className="catalog-layout shell">
        <aside className="catalog-sidebar">
          <div className="catalog-sidebar__groups">
            {copy.productGroups.map((group) => (
              <div className="catalog-group-block" key={group.id}>
                <button
                  type="button"
                  className={group.id === activeGroupId ? "catalog-group-link is-active" : "catalog-group-link"}
                  onClick={() => {
                    setActiveGroupId(group.id);
                    setActiveSubcategoryTitle(group.subcategories[0].title);
                    setActiveChildTitle(group.subcategories[0].children[0].title);
                  }}
                >
                  <span>{group.title}</span>
                  <span className="catalog-chevron">{group.id === activeGroupId ? "⌄" : "›"}</span>
                </button>
                {group.id === activeGroupId ? (
                  <div className="catalog-sidebar__list">
                    {activeGroup.subcategories.map((subcategory) => {
                      const hasMeaningfulChildren = subcategoryHasMeaningfulChildren(subcategory);

                      return (
                        <div className="catalog-category-group" key={subcategory.title}>
                        <button
                          type="button"
                          className={
                            subcategory.title === activeSubcategoryTitle
                              ? "catalog-category is-active"
                              : "catalog-category"
                          }
                          onClick={() => {
                            setActiveSubcategoryTitle(subcategory.title);
                            setActiveChildTitle(subcategory.children[0].title);
                          }}
                        >
                          <span>{subcategory.title}</span>
                          <span className="catalog-chevron">
                            {hasMeaningfulChildren && subcategory.title === activeSubcategoryTitle ? "⌄" : "›"}
                          </span>
                        </button>
                        {subcategory.title === activeSubcategoryTitle && hasMeaningfulChildren ? (
                          <div className="catalog-subcategory-list">
                            {subcategory.children.map((child) => (
                              <button
                                key={child.title}
                                type="button"
                                className={
                                  child.title === activeChildTitle
                                    ? "catalog-subcategory is-active"
                                    : "catalog-subcategory"
                                }
                                onClick={() => setActiveChildTitle(child.title)}
                              >
                                <span>{child.title}</span>
                                <span className="catalog-chevron">
                                  {child.title === activeChildTitle ? "⌄" : "›"}
                                </span>
                              </button>
                            ))}
                          </div>
                        ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </aside>

        <div className="catalog-content">
          <div className="catalog-content__header">
            <div>
              <h2>{activeSubcategoryHasMeaningfulChildren ? activeChild.title : activeSubcategory.title}</h2>
              <p>
                {activeSubcategoryHasMeaningfulChildren
                  ? `${activeGroup.title} / ${activeSubcategory.title}`
                  : activeGroup.title}
              </p>
            </div>
          </div>
          <div className="catalog-grid">
            {paginatedItems.map((item) => {
              const product = copy.products.find((entry) => entry.slug === item.slug) ?? copy.products[0];

              return (
                <article className="catalog-card catalog-card--clean" key={product.slug}>
                  <div className="catalog-card__media">
                    <ImageWithFallback 
                      src={product.image} 
                      alt={product.title}
                      loading="lazy"
                    />
                    <div className="catalog-card__hoverpanel">
                      <ul className="catalog-points catalog-points--hover">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <div className="catalog-card__rule" />
                      <Link className="catalog-card__link catalog-card__link--text" to={`/products/${product.slug}`}>
                        {copy.productMore}
                      </Link>
                    </div>
                  </div>
                  <div className="catalog-card__body catalog-card__body--clean">
                    <h3>{item.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
          {totalPages > 1 ? (
            <div className="catalog-pagination" aria-label="Product pagination">
              <button
                type="button"
                className="catalog-pagination__button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <div className="catalog-pagination__pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={
                      page === currentPage
                        ? "catalog-pagination__button is-active"
                        : "catalog-pagination__button"
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="catalog-pagination__button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
