import cloudbase from "@cloudbase/node-sdk";
import { content as fallbackContent } from "../src/data/siteContent.js";

let db;
let activeEnv = "";
let activeAccessKey = "";

function firstDoc(result) {
  return Array.isArray(result?.data) ? (result.data[0] ?? null) : null;
}

function docList(result) {
  return Array.isArray(result?.data) ? result.data : [];
}

function getDatabase() {
  const env = process.env.CLOUDBASE_ENV_ID ?? "tx-base-cloud-0giy45il8f83ce7e";
  const accessKey = process.env.CLOUDBASE_ACCESS_KEY ?? "";

  if (!accessKey) {
    throw new Error("Missing CLOUDBASE_ACCESS_KEY in local server environment");
  }

  if (!db || activeEnv !== env || activeAccessKey !== accessKey) {
    db = cloudbase.init({ env, accessKey }).database();
    activeEnv = env;
    activeAccessKey = accessKey;
  }

  return db;
}

function buildCopy(locale, payload) {
  const fallback = fallbackContent[locale];
  const heroBase = payload.heroSlides[0];
  const homeSectionMap = Object.fromEntries(payload.homeSections.map((section) => [section.section, section]));

  return {
    ...fallback,
    brand: payload.siteSettings?.brand ?? fallback.brand,
    nav: payload.siteSettings?.nav ?? fallback.nav,
    switchLabel: payload.siteSettings?.switchLabel ?? fallback.switchLabel,
    footer: payload.siteSettings?.footer ?? fallback.footer,
    heroEyebrow: heroBase?.eyebrow ?? fallback.heroEyebrow,
    heroTitle: heroBase?.heroTitle ?? fallback.heroTitle,
    heroTagline: heroBase?.heroTagline ?? fallback.heroTagline,
    heroPrimary: heroBase?.primaryAction ?? fallback.heroPrimary,
    heroSecondary: heroBase?.secondaryAction ?? fallback.heroSecondary,
    heroSlides: payload.heroSlides.map((slide) => ({
      title: slide.title,
      description: slide.description,
      image: slide.image,
    })),
    capabilitiesTitle: homeSectionMap.capabilities?.title ?? fallback.capabilitiesTitle,
    capabilitiesLead: homeSectionMap.capabilities?.lead ?? fallback.capabilitiesLead,
    capabilities: homeSectionMap.capabilities?.items ?? fallback.capabilities,
    aboutTitle: homeSectionMap.about?.title ?? fallback.aboutTitle,
    aboutLead: homeSectionMap.about?.lead ?? fallback.aboutLead,
    aboutBody: homeSectionMap.about?.body ?? fallback.aboutBody,
    aboutHighlights: homeSectionMap.about?.highlights ?? fallback.aboutHighlights,
    aboutImage: homeSectionMap.about?.backgroundImage ?? fallback.aboutImage,
    showcaseTitle: homeSectionMap.showcase?.title ?? fallback.showcaseTitle,
    showcaseLead: homeSectionMap.showcase?.lead ?? fallback.showcaseLead,
    showcaseCta: homeSectionMap.showcase?.cta ?? fallback.showcaseCta,
    productsPageTitle: payload.pageMeta?.title ?? fallback.productsPageTitle,
    productsPageLead: payload.pageMeta?.lead ?? fallback.productsPageLead,
    productsOverviewTitle: payload.pageMeta?.overviewTitle ?? fallback.productsOverviewTitle,
    productCategoriesLabel: payload.pageMeta?.categoryLabel ?? fallback.productCategoriesLabel,
    productInquiry: payload.pageMeta?.inquiryLabel ?? fallback.productInquiry,
    productSpecs: payload.pageMeta?.specsLabel ?? fallback.productSpecs,
    categoriesLabelRelated: payload.pageMeta?.relatedLabel ?? fallback.categoriesLabelRelated,
    productMore: payload.pageMeta?.moreLabel ?? fallback.productMore,
    projectTitle: homeSectionMap.projects?.title ?? fallback.projectTitle,
    projectLead: homeSectionMap.projects?.lead ?? fallback.projectLead,
    projectCards: homeSectionMap.projects?.items ?? fallback.projectCards,
    productGroups: payload.productGroups.map((group) => ({
      id: group.groupId,
      title: group.title,
      image: group.backgroundImage,
      subcategories: group.subcategories ?? [],
    })),
    products: payload.products.map((product) => ({
      slug: product.slug,
      category: product.category,
      title: product.title,
      text: product.description,
      specs: product.specs ?? [],
      image: product.image,
    })),
    contactTitle: homeSectionMap.contact?.title ?? fallback.contactTitle,
    contactLead: homeSectionMap.contact?.lead ?? fallback.contactLead,
    contactItems: homeSectionMap.contact?.items ?? fallback.contactItems,
    contactImage: homeSectionMap.contact?.backgroundImage ?? fallback.contactImage,
  };
}

export async function fetchCloudbaseContent(locale = "zh") {
  const database = getDatabase();

  const [
    siteSettingsResult,
    heroSlidesResult,
    homeSectionsResult,
    pageMetaResult,
    productGroupsResult,
    productsResult,
  ] = await Promise.all([
    database.collection("site_settings").doc(locale).get(),
    database.collection("hero_slides").where({ locale }).orderBy("index", "asc").get(),
    database.collection("home_sections").where({ locale }).get(),
    database.collection("page_meta").where({ locale, page: "products" }).limit(1).get(),
    database.collection("product_groups").where({ locale }).orderBy("index", "asc").get(),
    database.collection("products").where({ locale }).orderBy("index", "asc").get(),
  ]);

  const payload = {
    siteSettings: firstDoc(siteSettingsResult),
    heroSlides: docList(heroSlidesResult),
    homeSections: docList(homeSectionsResult),
    pageMeta: firstDoc(pageMetaResult),
    productGroups: docList(productGroupsResult),
    products: docList(productsResult),
  };

  if (!payload.siteSettings || payload.heroSlides.length === 0 || payload.productGroups.length === 0 || payload.products.length === 0) {
    throw new Error(`CloudBase returned empty content for locale "${locale}"`);
  }

  return buildCopy(locale, payload);
}
