import { useEffect, useState, useRef } from "react";
import { content as fallbackContent } from "../data/siteContent";

const MIN_LOADING_TIME = 400; // 最小加载时间，避免闪烁

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
  const [copy, setCopy] = useState(() => fallbackContent[language]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("fallback");
  const [isReady, setIsReady] = useState(false);
  
  const loadingStartTimeRef = useRef(Date.now());
  const prevLanguageRef = useRef(language);

  useEffect(() => {
    let disposed = false;
    
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
    isReady, // 新增：表示内容已准备好可以显示
  };
}

export default useCloudbaseContent;
