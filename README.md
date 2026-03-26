# 广东嵘德企业官网 Landing Page

这是一个面向 **广东嵘德** 的双语企业官网项目，聚焦高端钢管、工业阀门与配套工业流体控制产品展示。

项目当前已经具备：

- 中英文切换
- 首页全屏 Hero 轮播
- 公司简介、核心业务、产品展示、联系我们等模块
- 产品中心多级分类结构
- 产品详情页
- CloudBase 文档数据库内容读取
- 可导出为纯静态部署版本
- 桌面端与移动端响应式适配

## 技术栈

- React 18
- Vite 5
- React Router
- CloudBase Node SDK
- `@paper-design/shaders-react`
- Inter 字体

## 项目功能

### 首页

- 全屏 Hero 轮播
- 滚动进入动效
- 公司简介模块
- 核心业务模块
- 产品展示模块
- 联系我们模块
- 回到顶部按钮

### 产品中心

- 顶部横幅 Banner
- 左侧多级商品分类
- 右侧商品卡片展示
- 商品 hover 信息展示
- 桌面端三列布局
- 移动端自动纵向适配

### 产品详情页

- 产品图片展示
- 应用规格标签
- 相关产品推荐
- 适配桌面端与移动端布局

## 项目目录结构

```text
.
├── public/                     # 静态资源
├── scripts/
│   ├── cloudbaseContentService.mjs
│   └── seed-cloudbase.mjs
├── src/
│   ├── components/            # 通用组件
│   ├── data/                  # 本地兜底数据
│   ├── hooks/                 # 自定义 Hook
│   ├── pages/                 # 页面模块
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── server.mjs                 # 生产环境 Node 服务
├── vite.config.js
└── package.json
```

## 环境变量

项目根目录提供了环境变量模板文件 [`.env.example`](./.env.example)。

可以先复制一份本地环境文件：

```bash
cp .env.example .env.local
```

需要配置的变量如下：

```env
CLOUDBASE_ENV_ID=你的CloudBase环境ID
CLOUDBASE_REGION=ap-shanghai
CLOUDBASE_ACCESS_KEY=你的服务端Access Key
HOST=0.0.0.0
PORT=3000
```

注意事项：

- `CLOUDBASE_ACCESS_KEY` 只能放在服务端环境变量中
- `.env.local` 已加入 `.gitignore`，不会提交到仓库
- 不要把 CloudBase 的服务端密钥暴露到前端代码里

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

开发模式下会通过前端请求 `/api/cloudbase/content` 读取 CloudBase 数据内容。

## CloudBase 数据初始化

项目内置了数据写入脚本，可将网站文案、首页轮播、产品分类、商品信息等初始化到 CloudBase 文档数据库。

执行命令：

```bash
npm run seed:cloudbase
```

当前会写入以下集合：

- `site_settings`
- `hero_slides`
- `home_sections`
- `page_meta`
- `product_groups`
- `products`

## CloudBase 内容更新如何在线上生效

当前项目已经改造成 **纯静态部署模式**，因此线上页面不会在运行时实时读取 CloudBase。

现在的内容更新流程是：

1. 先在 CloudBase 中修改文案、分类、商品或页面内容
2. 在本地执行静态内容导出
3. 重新构建项目
4. 将新的 `dist/` 上传到静态网站托管

对应命令如下：

```bash
npm run sync:content
npm run build
```

说明：

- `npm run sync:content` 会从 CloudBase 拉取最新内容，生成：
  - `public/data/content.zh.json`
  - `public/data/content.en.json`
- `npm run build` 会把这些静态 JSON 一起打包进最终产物
- 只有重新上传新的 `dist/` 后，线上页面内容才会更新

也就是说：

- **CloudBase 改了内容，不会自动实时同步到线上**
- **要想生效，必须重新导出静态内容并重新部署**

如果未来希望做到“CloudBase 一改，线上立即生效”，则需要改回动态读取方案，而不是继续使用当前的纯静态部署模式。

## 生产构建

### 1. 打包前端资源

```bash
npm run build
```

### 2. 启动生产服务

```bash
npm run start
```

构建前会自动执行静态内容导出：

- 从 CloudBase 拉取中英文内容
- 生成 `public/data/content.zh.json`
- 生成 `public/data/content.en.json`
- 前端运行时直接读取静态 JSON 文件

## 部署说明

### 当前项目支持纯静态部署

项目已经改造成可部署到腾讯云静态网站托管的纯静态版本。  
构建时会把 CloudBase 内容导出为静态 JSON 文件，因此线上不再依赖 Node 服务。

### 最小部署步骤

1. 配置服务器环境变量
2. 安装依赖
3. 先执行 `npm run sync:content`
4. 再执行 `npm run build`
5. 将 `dist/` 目录中的内容上传到静态网站托管根目录

推荐部署命令流程：

```bash
npm install
npm run sync:content
npm run build
```

然后把 `dist/` 里的文件上传到腾讯云静态网站托管，不要把整个 `dist` 文件夹作为子目录上传。

## 路由说明

项目使用的是 `HashRouter`，因此部署时不需要额外处理前端 History 路由重写规则，这一点对上线比较友好。

## 移动端适配

项目已经针对移动端做过一轮响应式调整，主要包括：

- 首页 Hero 标题根据屏幕宽度自动缩放与换行
- 各模块标题、正文、按钮在小屏设备下同步缩小
- 图片高度根据屏幕宽度按比例调整
- 产品中心分类栏与商品卡片在手机宽度下收紧布局
- 产品详情页与联系模块在窄屏下自动改为单列

## 当前状态

项目当前已经可以用于：

- 本地开发
- CloudBase 数据驱动内容展示
- 导出纯静态部署产物
- 部署到腾讯云静态网站托管

## License

私有项目。
