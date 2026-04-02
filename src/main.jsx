import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import App from "./App";
import "./styles.css";

// 支持 SSG hydrate：如果 DOM 已被预渲染，则使用 hydrateRoot
const rootElement = document.getElementById("root");
const isPrerendered = rootElement?.childElementCount > 0;

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

if (isPrerendered) {
  // SSG 模式：hydrate 已存在的 DOM
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  // SPA 模式：创建新的 root
  ReactDOM.createRoot(rootElement).render(app);
}
