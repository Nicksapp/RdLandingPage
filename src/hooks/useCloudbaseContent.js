import { useEffect, useState, useRef } from "react";
import { content as fallbackContent } from "../data/siteContent";

const MIN_LOADING_TIME = 400; // 最小加载时间，避免闪烁

// 获取预加载数据（SSR/SSG 时注入）
function getPreloadedData() {
  if (typeof window !== "undefined" && window.__PRELOADED_STATE__) {
    return window.__PRELOADED_STATE__;
  }
  return null;
}

async function fetchLocaleContent(locale) {
  const response = await fetch(`/data/content.${locale}.json`, {
    cache: "no-cache",
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error ?? "Static content fetch failed");
  }

  return payload;
}

export function useCloudbaseContent(language) {
  // 检查是否有预加载数据
  const preloaded = getPreloadedData();
  const initialCopy = preloaded?.copy && preloaded?.lang === language 
    ? preloaded.copy 
    : fallbackContent[language];
  
  const [copy, setCopy] = useState(() => initialCopy);
  const [loading, setLoading] = useState(!preloaded); // 有预加载数据时直接就绪
  const [error, setError] = useState(null);
  const [source, setSource] = useState(preloaded ? "ssg-preload" : "fallback");
  const [isReady, setIsReady] = useState(!!preloaded);
  
  const loadingStartTimeRef = useRef(Date.now());
  const prevLanguageRef = useRef(language);

  useEffect(() => {
    let disposed = false;
    
    // 如果有预加载数据且语言匹配，直接使用
    const preloadedData = getPreloadedData();
    if (preloadedData && preloadedData.lang === language) {
      if (!disposed) {
        setCopy(preloadedData.copy);
        setSource("ssg-preload");
        setLoading(false);
        setIsReady(true);
      }
      return;
    }
    
    // 语言切换时重置状态
    if (prevLanguageRef.current !== language) {
      setIsReady(false);
      loadingStartTimeRef.current = Date.now();
    }
    prevLanguageRef.current = language;

    setCopy(fallbackContent[language]);
    setLoading(true);
    setError(null);
    setSource("fallback");

    fetchLocaleContent(language)
      .then((payload) => {
        if (!disposed) {
          setCopy(payload.copy);
          setSource(payload.source ?? "static-export");
        }
      })
      .catch((fetchError) => {
        if (!disposed) {
          setError(fetchError);
          console.warn("CloudBase content fallback enabled:", fetchError);
        }
      })
      .finally(() => {
        if (!disposed) {
          // 确保最小加载时间，避免闪烁
          const elapsed = Date.now() - loadingStartTimeRef.current;
          const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);
          
          setTimeout(() => {
            if (!disposed) {
              setLoading(false);
              setIsReady(true);
            }
          }, remaining);
        }
      });

    return () => {
      disposed = true;
    };
  }, [language]);

  return {
    copy,
    loading,
    error,
    source,
    isReady,
  };
}

export default useCloudbaseContent;
