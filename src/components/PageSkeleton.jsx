export function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-busy="true" aria-label="页面加载中">
      {/* Hero 区域骨架屏 */}
      <div className="skeleton-hero">
        <div className="skeleton-shader" />
        <div className="skeleton-content">
          <div className="skeleton-text skeleton-text--short" />
          <div className="skeleton-text skeleton-text--long" />
          <div className="skeleton-text skeleton-text--medium" />
          <div className="skeleton-actions">
            <div className="skeleton-button" />
            <div className="skeleton-button skeleton-button--ghost" />
          </div>
        </div>
      </div>

      {/* 内容区域骨架屏 */}
      <div className="skeleton-section">
        <div className="skeleton-header">
          <div className="skeleton-text skeleton-text--number" />
          <div className="skeleton-title-group">
            <div className="skeleton-text skeleton-text--title" />
            <div className="skeleton-text skeleton-text--subtitle" />
          </div>
        </div>
        <div className="skeleton-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
    </div>
  );
}

export function ContentTransition({ children, isLoading, minDisplayTime = 300 }) {
  const [showContent, setShowContent] = useState(!isLoading);
  const [opacity, setOpacity] = useState(isLoading ? 0 : 1);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      // 内容加载完成，延迟显示以提供平滑过渡
      timer = setTimeout(() => {
        setShowContent(true);
        // 下一帧开始淡入
        requestAnimationFrame(() => {
          setOpacity(1);
        });
      }, minDisplayTime);
    } else {
      setOpacity(0);
      timer = setTimeout(() => setShowContent(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isLoading, minDisplayTime]);

  if (!showContent) {
    return <PageSkeleton />;
  }

  return (
    <div
      className="content-transition"
      style={{
        opacity,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

import { useEffect, useState } from "react";

export default PageSkeleton;
