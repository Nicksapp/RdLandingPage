import cloudbase from "@cloudbase/node-sdk";
import { content, sectionIds } from "../src/data/siteContent.js";

const env = process.env.CLOUDBASE_ENV_ID ?? "tx-base-cloud-0giy45il8f83ce7e";
const accessKey = process.env.CLOUDBASE_ACCESS_KEY;

if (!accessKey) {
  console.error("Missing CLOUDBASE_ACCESS_KEY");
  process.exit(1);
}

const app = cloudbase.init({
  env,
  accessKey,
});

const db = app.database();

function makeId(...parts) {
  return parts
    .join("_")
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function upsertMany(collectionName, docs) {
  for (const doc of docs) {
    const { _id, ...data } = doc;
    await db.collection(collectionName).doc(_id).set({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }
}

async function ensureCollection(collectionName) {
  try {
    await db.createCollection(collectionName);
    console.log(`Created collection: ${collectionName}`);
  } catch (error) {
    if (error?.code === "DATABASE_COLLECTION_EXIST") {
      return;
    }

    throw error;
  }
}

function buildLocaleDocuments(locale, copy) {
  const siteSettings = [
    {
      _id: locale,
      locale,
      brand: copy.brand,
      nav: copy.nav,
      switchLabel: copy.switchLabel,
      footer: copy.footer,
      sectionIds,
    },
  ];

  const heroSlides = copy.heroSlides.map((slide, index) => ({
    _id: makeId(locale, "hero", index + 1),
    locale,
    index,
    title: slide.title,
    description: slide.description,
    image: slide.image,
    eyebrow: copy.heroEyebrow,
    heroTitle: copy.heroTitle,
    heroTagline: copy.heroTagline,
    primaryAction: copy.heroPrimary,
    secondaryAction: copy.heroSecondary,
  }));

  const homeSections = [
    {
      _id: makeId(locale, "home", "capabilities"),
      locale,
      section: "capabilities",
      title: copy.capabilitiesTitle,
      lead: copy.capabilitiesLead,
      items: copy.capabilities,
    },
    {
      _id: makeId(locale, "home", "about"),
      locale,
      section: "about",
      title: copy.aboutTitle,
      lead: copy.aboutLead,
      body: copy.aboutBody,
      highlights: copy.aboutHighlights,
      backgroundImage: copy.aboutImage,
    },
    {
      _id: makeId(locale, "home", "showcase"),
      locale,
      section: "showcase",
      title: copy.showcaseTitle,
      lead: copy.showcaseLead,
      cta: copy.showcaseCta,
    },
    {
      _id: makeId(locale, "home", "projects"),
      locale,
      section: "projects",
      title: copy.projectTitle,
      lead: copy.projectLead,
      items: copy.projectCards,
    },
    {
      _id: makeId(locale, "home", "contact"),
      locale,
      section: "contact",
      title: copy.contactTitle,
      lead: copy.contactLead,
      backgroundImage: copy.contactImage,
      items: copy.contactItems,
    },
  ];

  const pageMeta = [
    {
      _id: makeId(locale, "page", "products"),
      locale,
      page: "products",
      title: copy.productsPageTitle,
      overviewTitle: copy.productsOverviewTitle,
      lead: copy.productsPageLead,
      categoryLabel: copy.productCategoriesLabel,
      inquiryLabel: copy.productInquiry,
      specsLabel: copy.productSpecs,
      moreLabel: copy.productMore,
      relatedLabel: copy.categoriesLabelRelated,
    },
  ];

  const productGroups = copy.productGroups.map((group, index) => ({
    _id: makeId(locale, "group", group.id),
    locale,
    index,
    groupId: group.id,
    title: group.title,
    backgroundImage: group.image,
    subcategories: group.subcategories,
  }));

  const products = copy.products.map((product, index) => ({
    _id: makeId(locale, "product", product.slug),
    locale,
    index,
    slug: product.slug,
    category: product.category,
    title: product.title,
    description: product.text,
    specs: product.specs,
    image: product.image,
  }));

  return {
    siteSettings,
    heroSlides,
    homeSections,
    pageMeta,
    productGroups,
    products,
  };
}

async function main() {
  const locales = Object.entries(content);

  const batched = {
    site_settings: [],
    hero_slides: [],
    home_sections: [],
    page_meta: [],
    product_groups: [],
    products: [],
  };

  for (const [locale, copy] of locales) {
    const docs = buildLocaleDocuments(locale, copy);
    batched.site_settings.push(...docs.siteSettings);
    batched.hero_slides.push(...docs.heroSlides);
    batched.home_sections.push(...docs.homeSections);
    batched.page_meta.push(...docs.pageMeta);
    batched.product_groups.push(...docs.productGroups);
    batched.products.push(...docs.products);
  }

  for (const [collectionName, docs] of Object.entries(batched)) {
    await ensureCollection(collectionName);
    await upsertMany(collectionName, docs);
    console.log(`Seeded ${collectionName}: ${docs.length}`);
  }
}

main()
  .then(() => {
    console.log("CloudBase seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("CloudBase seed failed");
    console.error(error);
    process.exit(1);
  });
