import { Helmet } from "react-helmet-async";

const defaultSEO = {
  zh: {
    title: "广东嵘德钢管有限公司 - 高端钢管与工业阀门解决方案",
    description:
      "广东嵘德钢管有限公司专注于高端钢管、工业阀门及配套流体控制部件的研发、集成与交付，以稳定质量和快速响应服务全球工业客户。",
    keywords: "钢管, 工业阀门, 流体控制, 无缝钢管, 球阀, 闸阀, 广东嵘德钢管有限公司",
    ogImage: "/images/hero-pipes.jpg",
  },
  en: {
    title: "Guangdong Rongde Steel Pipe Co., Ltd. - Premium Steel Pipe & Valve Solutions",
    description:
      "Guangdong Rongde Steel Pipe Co., Ltd. focuses on premium steel pipes, industrial valves, and fluid-control components with strong capabilities in engineering, integration, and delivery.",
    keywords: "steel pipe, industrial valves, flow control, seamless pipe, ball valve, gate valve, Guangdong Rongde Steel Pipe",
    ogImage: "/images/hero-pipes.jpg",
  },
};

export function SEO({ language = "zh", page = "home", custom = {} }) {
  const langDefaults = defaultSEO[language] || defaultSEO.zh;

  const pageTitles = {
    zh: {
      home: "广东嵘德钢管有限公司 - 高端钢管与工业阀门解决方案",
      products: "产品中心 - 广东嵘德钢管有限公司",
      productDetail: "产品详情 - 广东嵘德钢管有限公司",
    },
    en: {
      home: "Guangdong Rongde Steel Pipe Co., Ltd. - Premium Steel Pipe & Valve Solutions",
      products: "Product Center - Guangdong Rongde Steel Pipe Co., Ltd.",
      productDetail: "Product Details - Guangdong Rongde Steel Pipe Co., Ltd.",
    },
  };

  const title = custom.title || pageTitles[language]?.[page] || langDefaults.title;
  const description = custom.description || langDefaults.description;
  const keywords = custom.keywords || langDefaults.keywords;
  const ogImage = custom.ogImage || langDefaults.ogImage;

  const langAttr = language === "zh" ? "zh-CN" : "en";
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Helmet>
      {/* 基础 Meta */}
      <html lang={langAttr} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={language === "zh" ? "zh_CN" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0f1f33" />

      {/*  robots */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}

export default SEO;
