export const sectionIds = {
  home: "home",
  about: "about",
  products: "products",
  contact: "contact",
};

// 本地图片路径映射
const images = {
  heroPipes: "/images/hero-pipes.jpg",
  heroValves: "/images/hero-valves.jpg",
  heroProject: "/images/hero-project.jpg",
  capabilityPipes: "/images/capability-pipes.jpg",
  capabilityValves: "/images/capability-valves.jpg",
  capabilityProject: "/images/capability-project.jpg",
  aboutFactory: "/images/hero-valves.jpg",
  contactMap: "/images/hero-project.jpg",
};

export const content = {
  zh: {
    brand: "广东嵘德",
    nav: ["首页", "公司简介", "产品中心", "联系我们"],
    switchLabel: "English",
    heroEyebrow: "高端工业材料与流体控制系统",
    heroTitle: "广东嵘德",
    heroTagline: "Premium Steel Pipe & Valve Solutions",
    heroPrimary: "进入产品中心",
    heroSecondary: "联系团队",
    heroSlides: [
      {
        title: "高端钢管系统",
        description: "面向能源、化工与船舶工程的高标准钢管供应，兼顾耐压、耐蚀与批次追溯。",
        image: images.heroPipes,
      },
      {
        title: "工业阀门解决方案",
        description: "覆盖球阀、闸阀、截止阀与止回阀，满足关键流体系统长期稳定运行需求。",
        image: images.heroValves,
      },
      {
        title: "项目化成套交付",
        description: "从规格匹配到出口协同，为工业客户提供更高效率的一站式采购体验。",
        image: images.heroProject,
      },
    ],
    heroStats: [
      { value: "2020", label: "公司成立" },
      { value: "1500万", label: "注册资本" },
      { value: "20+", label: "年行业经验" },
    ],
    capabilitiesTitle: "核心业务",
    capabilitiesLead: "围绕钢管、阀门与项目成套交付，构建覆盖选型、加工、供应与服务的完整能力链。",
    capabilities: [
      {
        title: "高端钢管",
        text: "覆盖无缝管、焊接管、精密管及异形管，满足高压、高温及耐腐蚀工况。",
        image: images.capabilityPipes,
      },
      {
        title: "工业阀门",
        text: "提供球阀、闸阀、截止阀和止回阀等产品，兼顾长期稳定运行与维护便利性。",
        image: images.capabilityValves,
      },
      {
        title: "项目供配",
        text: "支持工程类订单的批量供货、规格整合与出口协同，缩短项目采购周期。",
        image: images.capabilityProject,
      },
    ],
    aboutTitle: "公司简介",
    aboutLead:
      "广东嵘德专注于高端钢管、工业阀门及配套流体控制部件的研发、集成与交付，以稳定质量和快速响应服务全球工业客户。",
    aboutBody:
      "广东嵘德钢管有限公司成立于2020年，注册资本1500万元，位于佛山市顺德区乐从钢铁世界。我们深耕金属材料销售与制造，构建从选材建议、规格匹配、加工定制到出货追踪的完整服务链路，让每一次采购都更高效、更可靠。",
    aboutHighlights: [
      "金属材料销售与制造一体化服务",
      "支持多规格切割、法兰连接与组配交付",
      "服务海内外 EPC 与工业终端客户",
    ],
    aboutImage: images.aboutFactory,
    showcaseTitle: "产品中心",
    showcaseLead: "围绕关键工业场景，提供兼顾耐久性、精度与交付效率的产品矩阵。",
    showcaseCta: "查看全部产品",
    productsPageTitle: "产品中心",
    productsPageLead: "左侧按分类快速筛选，右侧查看广东嵘德的钢管、阀门与配套产品。",
    productsOverviewTitle: "产品与服务",
    productCategoriesLabel: "产品分类",
    productInquiry: "立即咨询",
    productSpecs: "应用规格",
    categoriesLabelRelated: "相关产品",
    productMore: "更多",
    projectTitle: "工程应用",
    projectLead: "从流程工业到装备制造，广东嵘德以稳定产品与快速交付服务多元工业场景。",
    projectCards: [
      {
        title: "能源化工",
        text: "满足高压输送、介质腐蚀与连续运行场景的关键材料需求。",
      },
      {
        title: "船舶海工",
        text: "支持复杂管系及海洋环境下的阀门和连接部件应用。",
      },
      {
        title: "高端制造",
        text: "配合自动化、洁净和精密输送系统的多规格管材与控制部件。",
      },
    ],
    products: [
      // 红色沟槽管件系列
      {
        slug: "red-grooved-elbow-90",
        category: "红色沟槽管件",
        title: "90°沟槽弯头",
        text: "消防管道系统专用90度弯头，红色环氧涂层，球墨铸铁材质，沟槽式快速连接。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityValves,
      },
      {
        slug: "red-grooved-elbow-45",
        category: "红色沟槽管件",
        title: "45°沟槽弯头",
        text: "消防管道系统专用45度弯头，用于管道转向连接，红色环氧涂层处理。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityValves,
      },
      {
        slug: "red-grooved-tee",
        category: "红色沟槽管件",
        title: "沟槽正三通",
        text: "消防管道分流连接专用，等径三通设计，沟槽式快速连接，安装便捷。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityValves,
      },
      {
        slug: "red-grooved-cross",
        category: "红色沟槽管件",
        title: "沟槽正四通",
        text: "消防管道十字分支连接，等径四通设计，红色涂层，球墨铸铁材质。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityValves,
      },
      {
        slug: "red-rigid-coupling",
        category: "红色沟槽管件",
        title: "刚性卡箍接头",
        text: "消防管道刚性连接接头，用于固定管道连接点，红色涂层，橡胶密封圈。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "1.6MPa/2.5MPa", "红色环氧涂层"],
        image: images.capabilityProject,
      },
      {
        slug: "red-flexible-coupling",
        category: "红色沟槽管件",
        title: "挠性卡箍接头",
        text: "消防管道挠性连接接头，允许一定角度偏差，减震降噪，红色涂层处理。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "1.6MPa/2.5MPa", "红色环氧涂层"],
        image: images.capabilityProject,
      },
      {
        slug: "red-mechanical-tee",
        category: "红色沟槽管件",
        title: "机械三通",
        text: "消防管道开孔分支连接，无需焊接，机械开孔连接，快速安装。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityPipes,
      },
      {
        slug: "red-mechanical-cross",
        category: "红色沟槽管件",
        title: "机械四通",
        text: "消防管道双分支连接，机械开孔四通设计，红色涂层，球墨铸铁材质。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityPipes,
      },
      {
        slug: "red-reducer",
        category: "红色沟槽管件",
        title: "沟槽异径管",
        text: "消防管道变径连接，同心/偏心异径设计，红色环氧涂层，沟槽连接。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityPipes,
      },
      {
        slug: "red-cap",
        category: "红色沟槽管件",
        title: "沟槽管帽/堵板",
        text: "消防管道末端封堵，盲板/管帽设计，红色涂层，沟槽式快速安装。",
        specs: ["QT450-10球墨铸铁", "DN50-DN300", "GB 5135.11标准", "红色环氧涂层"],
        image: images.capabilityProject,
      },
      // 衬塑产品系列
      {
        slug: "lined-grooved-elbow",
        category: "衬塑产品",
        title: "衬塑沟槽弯头",
        text: "饮用水/给水管件，外镀锌/喷塑内衬PE，卫生无毒，沟槽快速连接。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "饮用水专用", "卫生级硅胶密封圈"],
        image: images.capabilityValves,
      },
      {
        slug: "lined-grooved-tee",
        category: "衬塑产品",
        title: "衬塑沟槽三通",
        text: "饮用水管道分流连接，内衬PE防腐层，外镀锌保护，卫生安全。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "饮用水专用", "卫生级硅胶密封圈"],
        image: images.capabilityValves,
      },
      {
        slug: "lined-grooved-cross",
        category: "衬塑产品",
        title: "衬塑沟槽四通",
        text: "饮用水管道十字分支，内衬PE防腐，外镀锌层，适用于给水系统。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "饮用水专用", "卫生级硅胶密封圈"],
        image: images.capabilityValves,
      },
      {
        slug: "lined-coupling",
        category: "衬塑产品",
        title: "衬塑卡箍接头",
        text: "饮用水管道连接专用，内衬PE防腐层，外镀锌/银色喷塑，硅胶密封圈。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "1.6MPa压力", "卫生级硅胶密封圈"],
        image: images.capabilityProject,
      },
      {
        slug: "lined-reducer",
        category: "衬塑产品",
        title: "衬塑异径管",
        text: "饮用水管道变径连接，内衬PE防腐，外镀锌保护，卫生无毒材质。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "饮用水专用", "卫生级硅胶密封圈"],
        image: images.capabilityPipes,
      },
      {
        slug: "lined-mechanical-tee",
        category: "衬塑产品",
        title: "衬塑机械三通",
        text: "饮用水管道开孔分支，内衬PE防腐层，机械连接，无需焊接。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "饮用水专用", "卫生级硅胶密封圈"],
        image: images.capabilityPipes,
      },
      {
        slug: "lined-cap",
        category: "衬塑产品",
        title: "衬塑管帽",
        text: "饮用水管道末端封堵，内衬PE防腐，外镀锌保护，卫生安全。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "饮用水专用", "卫生级硅胶密封圈"],
        image: images.capabilityProject,
      },
      {
        slug: "lined-flange-adapter",
        category: "衬塑产品",
        title: "衬塑法兰接头",
        text: "饮用水管道法兰转换连接，内衬PE防腐，适配各种法兰标准。",
        specs: ["外镀锌内衬PE", "DN50-DN300", "GB/ANSI/DIN", "卫生级硅胶密封圈"],
        image: images.capabilityProject,
      },
    ],
    categories: ["全部产品", "红色沟槽管件", "衬塑产品"],
    productGroups: [
      {
        id: "red-grooved-fittings",
        title: "红色沟槽管件",
        image: images.heroValves,
        subcategories: [
          {
            title: "弯头系列",
            children: [
              {
                title: "90°弯头",
                items: [
                  {
                    slug: "red-grooved-elbow-90",
                    title: "90°沟槽弯头",
                    points: ["消防管道专用", "红色环氧涂层", "QT450-10材质", "GB 5135.11标准"],
                  },
                ],
              },
              {
                title: "45°弯头",
                items: [
                  {
                    slug: "red-grooved-elbow-45",
                    title: "45°沟槽弯头",
                    points: ["管道转向连接", "红色环氧涂层", "沟槽快速连接", "球墨铸铁"],
                  },
                ],
              },
            ],
          },
          {
            title: "三通四通",
            children: [
              {
                title: "正三通",
                items: [
                  {
                    slug: "red-grooved-tee",
                    title: "沟槽正三通",
                    points: ["分流连接专用", "等径设计", "红色涂层", "安装便捷"],
                  },
                ],
              },
              {
                title: "正四通",
                items: [
                  {
                    slug: "red-grooved-cross",
                    title: "沟槽正四通",
                    points: ["十字分支", "红色涂层", "球墨铸铁", "GB标准"],
                  },
                ],
              },
            ],
          },
          {
            title: "卡箍接头",
            children: [
              {
                title: "刚性接头",
                items: [
                  {
                    slug: "red-rigid-coupling",
                    title: "刚性卡箍接头",
                    points: ["固定连接", "橡胶密封", "红色涂层", "1.6/2.5MPa"],
                  },
                ],
              },
              {
                title: "挠性接头",
                items: [
                  {
                    slug: "red-flexible-coupling",
                    title: "挠性卡箍接头",
                    points: ["允许角度偏差", "减震降噪", "红色涂层", "快速安装"],
                  },
                ],
              },
            ],
          },
          {
            title: "机械连接",
            children: [
              {
                title: "机械三通",
                items: [
                  {
                    slug: "red-mechanical-tee",
                    title: "机械三通",
                    points: ["开孔分支", "无需焊接", "快速安装", "红色涂层"],
                  },
                ],
              },
              {
                title: "机械四通",
                items: [
                  {
                    slug: "red-mechanical-cross",
                    title: "机械四通",
                    points: ["双分支连接", "机械开孔", "红色涂层", "GB标准"],
                  },
                ],
              },
            ],
          },
          {
            title: "其他管件",
            children: [
              {
                title: "异径管",
                items: [
                  {
                    slug: "red-reducer",
                    title: "沟槽异径管",
                    points: ["变径连接", "同心/偏心", "红色涂层", "沟槽连接"],
                  },
                ],
              },
              {
                title: "管帽堵板",
                items: [
                  {
                    slug: "red-cap",
                    title: "沟槽管帽/堵板",
                    points: ["末端封堵", "盲板设计", "红色涂层", "快速安装"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "lined-grooved-fittings",
        title: "衬塑产品",
        image: images.capabilityPipes,
        subcategories: [
          {
            title: "衬塑弯头",
            children: [
              {
                title: "衬塑沟槽弯头",
                items: [
                  {
                    slug: "lined-grooved-elbow",
                    title: "衬塑沟槽弯头",
                    points: ["饮用水专用", "内衬PE防腐", "外镀锌保护", "卫生无毒"],
                  },
                ],
              },
            ],
          },
          {
            title: "衬塑三通四通",
            children: [
              {
                title: "衬塑三通",
                items: [
                  {
                    slug: "lined-grooved-tee",
                    title: "衬塑沟槽三通",
                    points: ["分流连接", "内衬PE", "外镀锌", "卫生安全"],
                  },
                ],
              },
              {
                title: "衬塑四通",
                items: [
                  {
                    slug: "lined-grooved-cross",
                    title: "衬塑沟槽四通",
                    points: ["十字分支", "内衬PE防腐", "给水系统", "硅胶密封"],
                  },
                ],
              },
            ],
          },
          {
            title: "衬塑接头",
            children: [
              {
                title: "衬塑卡箍",
                items: [
                  {
                    slug: "lined-coupling",
                    title: "衬塑卡箍接头",
                    points: ["管道连接", "内衬PE", "外镀锌", "1.6MPa压力"],
                  },
                ],
              },
              {
                title: "衬塑异径管",
                items: [
                  {
                    slug: "lined-reducer",
                    title: "衬塑异径管",
                    points: ["变径连接", "内衬PE", "外镀锌保护", "卫生材质"],
                  },
                ],
              },
            ],
          },
          {
            title: "其他衬塑件",
            children: [
              {
                title: "衬塑机械三通",
                items: [
                  {
                    slug: "lined-mechanical-tee",
                    title: "衬塑机械三通",
                    points: ["开孔分支", "内衬PE", "机械连接", "无需焊接"],
                  },
                ],
              },
              {
                title: "衬塑管帽",
                items: [
                  {
                    slug: "lined-cap",
                    title: "衬塑管帽",
                    points: ["末端封堵", "内衬PE", "外镀锌", "卫生安全"],
                  },
                ],
              },
              {
                title: "衬塑法兰接头",
                items: [
                  {
                    slug: "lined-flange-adapter",
                    title: "衬塑法兰接头",
                    points: ["法兰转换", "内衬PE", "多标准适配", "硅胶密封"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    contactTitle: "联系我们",
    contactLead: "如果您正在寻找可靠的高端钢管与阀门供应伙伴，欢迎直接与广东嵘德团队沟通。",
    contactItems: [
      { label: "服务热线", value: "+86 400-888-2026" },
      { label: "商务邮箱", value: "sales@rongde-gd.com" },
      { label: "公司地址", value: "广东省佛山市顺德区乐从镇广东乐从钢铁世界E1区钢铁世界大道20号南一路39号" },
    ],
    contactImage: images.contactMap,
    footer: "广东嵘德 · 专注高端钢管与阀门解决方案",
  },
  en: {
    brand: "Guangdong Rongde",
    nav: ["Home", "About", "Products", "Contact"],
    switchLabel: "中文",
    heroEyebrow: "Premium Industrial Materials & Flow Control Systems",
    heroTitle: "Guangdong Rongde",
    heroTagline: "Trusted Industrial Supply Partner",
    heroPrimary: "Open Product Center",
    heroSecondary: "Contact Us",
    heroSlides: [
      {
        title: "Premium Pipe Systems",
        description: "High-standard steel pipe supply for energy, chemical, and marine applications with traceable quality assurance.",
        image: images.heroPipes,
      },
      {
        title: "Industrial Valve Solutions",
        description: "Ball, gate, globe, and check valves engineered for stable performance in critical flow-control systems.",
        image: images.heroValves,
      },
      {
        title: "Integrated Project Delivery",
        description: "From specification matching to export execution, we simplify procurement for industrial customers.",
        image: images.heroProject,
      },
    ],
    heroStats: [
      { value: "2020", label: "Founded" },
      { value: "15M RMB", label: "Registered Capital" },
      { value: "20+", label: "Years of expertise" },
    ],
    capabilitiesTitle: "Core Business",
    capabilitiesLead: "A complete industrial supply chain covering pipes, valves, customization, and project delivery.",
    capabilities: [
      {
        title: "Premium Steel Pipes",
        text: "Seamless, welded, precision, and custom-profile pipes for demanding industrial operating conditions.",
        image: images.capabilityPipes,
      },
      {
        title: "Industrial Valves",
        text: "Ball, gate, globe, and check valves designed for reliability, lifetime stability, and easier maintenance.",
        image: images.capabilityValves,
      },
      {
        title: "Project Supply",
        text: "Integrated execution for engineering orders with specification matching and export-ready coordination.",
        image: images.capabilityProject,
      },
    ],
    aboutTitle: "About Us",
    aboutLead:
      "Guangdong Rongde focuses on premium steel pipes, industrial valves, and fluid-control components with strong capabilities in engineering, integration, and delivery.",
    aboutBody:
      "Founded in 2020 with a registered capital of 15 million RMB, Guangdong Rongde Steel Pipe Co., Ltd. is located in Lecong Steel World, Shunde District, Foshan City. We support demanding industrial scenarios through end-to-end services covering material selection, spec matching, customization, and shipment visibility.",
    aboutHighlights: [
      "Integrated metal material sales and manufacturing services",
      "Support for cut-to-size, flange connection, and assembled delivery",
      "Serving EPC contractors and industrial end clients worldwide",
    ],
    aboutImage: images.aboutFactory,
    showcaseTitle: "Product Center",
    showcaseLead: "A product portfolio built for durability, precision, and dependable lead times in critical industries.",
    showcaseCta: "View All Products",
    productsPageTitle: "Product Center",
    productsPageLead: "Browse categories on the left and explore steel pipe, valve, and accessory products on the right.",
    productsOverviewTitle: "Products & Services",
    productCategoriesLabel: "Categories",
    productInquiry: "Send Inquiry",
    productSpecs: "Specifications",
    categoriesLabelRelated: "Related Products",
    productMore: "More",
    projectTitle: "Applications",
    projectLead: "From process industry to advanced manufacturing, Guangdong Rongde supports a broad range of industrial use cases.",
    projectCards: [
      {
        title: "Energy & Chemicals",
        text: "Products for high-pressure transfer, corrosive media, and continuous industrial operation.",
      },
      {
        title: "Marine Engineering",
        text: "Solutions for complex piping systems and harsh offshore operating environments.",
      },
      {
        title: "Advanced Manufacturing",
        text: "Multi-spec tubes and control components for automated, clean, and precision systems.",
      },
    ],
    products: [
      // Red Grooved Fittings Series
      {
        slug: "red-grooved-elbow-90",
        category: "Red Grooved Fittings",
        title: "90° Grooved Elbow",
        text: "Fire protection 90-degree elbow, red epoxy coating, ductile iron, grooved quick connection.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityValves,
      },
      {
        slug: "red-grooved-elbow-45",
        category: "Red Grooved Fittings",
        title: "45° Grooved Elbow",
        text: "Fire protection 45-degree elbow for pipe direction change, red epoxy coating.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityValves,
      },
      {
        slug: "red-grooved-tee",
        category: "Red Grooved Fittings",
        title: "Grooved Tee",
        text: "Fire protection flow branch connection, equal tee design, grooved quick connection.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityValves,
      },
      {
        slug: "red-grooved-cross",
        category: "Red Grooved Fittings",
        title: "Grooved Cross",
        text: "Fire protection four-way branch connection, equal cross design, red coating.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityValves,
      },
      {
        slug: "red-rigid-coupling",
        category: "Red Grooved Fittings",
        title: "Rigid Coupling",
        text: "Fire protection rigid pipe joint for fixed connections, red coating, rubber seal.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "1.6MPa/2.5MPa", "Red Epoxy Coating"],
        image: images.capabilityProject,
      },
      {
        slug: "red-flexible-coupling",
        category: "Red Grooved Fittings",
        title: "Flexible Coupling",
        text: "Fire protection flexible pipe joint allowing angular deviation, vibration damping.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "1.6MPa/2.5MPa", "Red Epoxy Coating"],
        image: images.capabilityProject,
      },
      {
        slug: "red-mechanical-tee",
        category: "Red Grooved Fittings",
        title: "Mechanical Tee",
        text: "Fire protection branch connection with mechanical outlet, no welding required.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityPipes,
      },
      {
        slug: "red-mechanical-cross",
        category: "Red Grooved Fittings",
        title: "Mechanical Cross",
        text: "Fire protection dual branch connection, mechanical outlet cross design.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityPipes,
      },
      {
        slug: "red-reducer",
        category: "Red Grooved Fittings",
        title: "Grooved Reducer",
        text: "Fire protection pipe size transition, concentric/eccentric reducer, red coating.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityPipes,
      },
      {
        slug: "red-cap",
        category: "Red Grooved Fittings",
        title: "Grooved Cap/Plug",
        text: "Fire protection pipe end closure, cap/plug design, red coating.",
        specs: ["QT450-10 Ductile Iron", "DN50-DN300", "GB 5135.11 Standard", "Red Epoxy Coating"],
        image: images.capabilityProject,
      },
      // Lined Fittings Series
      {
        slug: "lined-grooved-elbow",
        category: "Lined Fittings",
        title: "Lined Grooved Elbow",
        text: "Drinking water pipe fitting, galvanized exterior with PE lining, hygienic and non-toxic.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "Potable Water", "Sanitary Silicone Seal"],
        image: images.capabilityValves,
      },
      {
        slug: "lined-grooved-tee",
        category: "Lined Fittings",
        title: "Lined Grooved Tee",
        text: "Drinking water branch connection, PE lined interior, galvanized protection.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "Potable Water", "Sanitary Silicone Seal"],
        image: images.capabilityValves,
      },
      {
        slug: "lined-grooved-cross",
        category: "Lined Fittings",
        title: "Lined Grooved Cross",
        text: "Drinking water four-way branch, PE lined interior, for water supply systems.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "Potable Water", "Sanitary Silicone Seal"],
        image: images.capabilityValves,
      },
      {
        slug: "lined-coupling",
        category: "Lined Fittings",
        title: "Lined Coupling",
        text: "Drinking water pipe connection, PE lined interior, galvanized/silver coating.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "1.6MPa Pressure", "Sanitary Silicone Seal"],
        image: images.capabilityProject,
      },
      {
        slug: "lined-reducer",
        category: "Lined Fittings",
        title: "Lined Reducer",
        text: "Drinking water size transition, PE lined interior, galvanized protection.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "Potable Water", "Sanitary Silicone Seal"],
        image: images.capabilityPipes,
      },
      {
        slug: "lined-mechanical-tee",
        category: "Lined Fittings",
        title: "Lined Mechanical Tee",
        text: "Drinking water branch outlet, PE lined interior, mechanical connection.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "Potable Water", "Sanitary Silicone Seal"],
        image: images.capabilityPipes,
      },
      {
        slug: "lined-cap",
        category: "Lined Fittings",
        title: "Lined Cap",
        text: "Drinking water pipe end closure, PE lined interior, galvanized protection.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "Potable Water", "Sanitary Silicone Seal"],
        image: images.capabilityProject,
      },
      {
        slug: "lined-flange-adapter",
        category: "Lined Fittings",
        title: "Lined Flange Adapter",
        text: "Drinking water flange transition, PE lined interior, multi-standard compatible.",
        specs: ["Galvanized+PE Lined", "DN50-DN300", "GB/ANSI/DIN", "Sanitary Silicone Seal"],
        image: images.capabilityProject,
      },
    ],
    categories: ["All Products", "Red Grooved Fittings", "Lined Fittings"],
    productGroups: [
      {
        id: "red-grooved-fittings",
        title: "Red Grooved Fittings",
        image: images.heroValves,
        subcategories: [
          {
            title: "Elbow Series",
            children: [
              {
                title: "90° Elbow",
                items: [
                  {
                    slug: "red-grooved-elbow-90",
                    title: "90° Grooved Elbow",
                    points: ["Fire protection", "Red epoxy coating", "QT450-10 material", "GB 5135.11 standard"],
                  },
                ],
              },
              {
                title: "45° Elbow",
                items: [
                  {
                    slug: "red-grooved-elbow-45",
                    title: "45° Grooved Elbow",
                    points: ["Direction change", "Red epoxy coating", "Grooved connection", "Ductile iron"],
                  },
                ],
              },
            ],
          },
          {
            title: "Tee & Cross",
            children: [
              {
                title: "Equal Tee",
                items: [
                  {
                    slug: "red-grooved-tee",
                    title: "Grooved Tee",
                    points: ["Flow branch", "Equal design", "Red coating", "Easy install"],
                  },
                ],
              },
              {
                title: "Equal Cross",
                items: [
                  {
                    slug: "red-grooved-cross",
                    title: "Grooved Cross",
                    points: ["Four-way branch", "Red coating", "Ductile iron", "GB standard"],
                  },
                ],
              },
            ],
          },
          {
            title: "Couplings",
            children: [
              {
                title: "Rigid Coupling",
                items: [
                  {
                    slug: "red-rigid-coupling",
                    title: "Rigid Coupling",
                    points: ["Fixed connection", "Rubber seal", "Red coating", "1.6/2.5MPa"],
                  },
                ],
              },
              {
                title: "Flexible Coupling",
                items: [
                  {
                    slug: "red-flexible-coupling",
                    title: "Flexible Coupling",
                    points: ["Angular tolerance", "Vibration damping", "Red coating", "Quick install"],
                  },
                ],
              },
            ],
          },
          {
            title: "Mechanical",
            children: [
              {
                title: "Mechanical Tee",
                items: [
                  {
                    slug: "red-mechanical-tee",
                    title: "Mechanical Tee",
                    points: ["Outlet branch", "No welding", "Quick install", "Red coating"],
                  },
                ],
              },
              {
                title: "Mechanical Cross",
                items: [
                  {
                    slug: "red-mechanical-cross",
                    title: "Mechanical Cross",
                    points: ["Dual branch", "Mechanical outlet", "Red coating", "GB standard"],
                  },
                ],
              },
            ],
          },
          {
            title: "Others",
            children: [
              {
                title: "Reducer",
                items: [
                  {
                    slug: "red-reducer",
                    title: "Grooved Reducer",
                    points: ["Size transition", "Concentric/Eccentric", "Red coating", "Grooved"],
                  },
                ],
              },
              {
                title: "Cap/Plug",
                items: [
                  {
                    slug: "red-cap",
                    title: "Grooved Cap/Plug",
                    points: ["End closure", "Plug design", "Red coating", "Quick install"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "lined-grooved-fittings",
        title: "Lined Fittings",
        image: images.capabilityPipes,
        subcategories: [
          {
            title: "Lined Elbows",
            children: [
              {
                title: "Lined Elbow",
                items: [
                  {
                    slug: "lined-grooved-elbow",
                    title: "Lined Grooved Elbow",
                    points: ["Potable water", "PE lined", "Galvanized", "Hygienic"],
                  },
                ],
              },
            ],
          },
          {
            title: "Lined Tee & Cross",
            children: [
              {
                title: "Lined Tee",
                items: [
                  {
                    slug: "lined-grooved-tee",
                    title: "Lined Grooved Tee",
                    points: ["Flow branch", "PE lined", "Galvanized", "Sanitary"],
                  },
                ],
              },
              {
                title: "Lined Cross",
                items: [
                  {
                    slug: "lined-grooved-cross",
                    title: "Lined Grooved Cross",
                    points: ["Four-way branch", "PE lined", "Water supply", "Silicone seal"],
                  },
                ],
              },
            ],
          },
          {
            title: "Lined Couplings",
            children: [
              {
                title: "Lined Coupling",
                items: [
                  {
                    slug: "lined-coupling",
                    title: "Lined Coupling",
                    points: ["Pipe connection", "PE lined", "Galvanized", "1.6MPa"],
                  },
                ],
              },
              {
                title: "Lined Reducer",
                items: [
                  {
                    slug: "lined-reducer",
                    title: "Lined Reducer",
                    points: ["Size transition", "PE lined", "Galvanized", "Sanitary"],
                  },
                ],
              },
            ],
          },
          {
            title: "Other Lined",
            children: [
              {
                title: "Lined Mech Tee",
                items: [
                  {
                    slug: "lined-mechanical-tee",
                    title: "Lined Mechanical Tee",
                    points: ["Outlet branch", "PE lined", "Mechanical", "No welding"],
                  },
                ],
              },
              {
                title: "Lined Cap",
                items: [
                  {
                    slug: "lined-cap",
                    title: "Lined Cap",
                    points: ["End closure", "PE lined", "Galvanized", "Sanitary"],
                  },
                ],
              },
              {
                title: "Lined Flange",
                items: [
                  {
                    slug: "lined-flange-adapter",
                    title: "Lined Flange Adapter",
                    points: ["Flange transition", "PE lined", "Multi-standard", "Silicone seal"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    contactTitle: "Contact Us",
    contactLead: "If you are looking for a dependable partner for premium steel pipes and valves, our team is ready to help.",
    contactItems: [
      { label: "Hotline", value: "+86 400-888-2026" },
      { label: "Email", value: "sales@rongde-gd.com" },
      { label: "Address", value: "No. 39, South 1st Road, Steel World Avenue 20, E1 District, Lecong Steel World, Lecong Town, Shunde District, Foshan City, Guangdong Province" },
    ],
    contactImage: images.contactMap,
    footer: "Guangdong Rongde · Premium Steel Pipe & Valve Solutions",
  },
};
