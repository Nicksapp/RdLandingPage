import { useState } from "react";

export function ImageWithFallback({
  src,
  alt,
  className = "",
  fallback = "/images/hero-pipes.jpg",
  loading = "lazy",
  fill = false, // 新增：是否填满父容器（用于轮播图等场景）
  style = {},
  ...props
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  const imageSrc = error ? fallback : src;

  // fill 模式时，使用绝对定位填满父容器
  const wrapperStyle = fill
    ? { position: "absolute", inset: 0, ...style }
    : style;

  return (
    <div
      className={`image-wrapper ${loaded ? "is-loaded" : "is-loading"} ${className}`}
      style={wrapperStyle}
    >
      {!loaded && <div className="image-skeleton" aria-hidden="true" />}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
        {...props}
      />
    </div>
  );
}

export default ImageWithFallback;
