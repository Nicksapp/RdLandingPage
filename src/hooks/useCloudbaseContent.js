import { useEffect, useState } from "react";
import { content as fallbackContent } from "../data/siteContent";

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

  useEffect(() => {
    let disposed = false;

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
          setLoading(false);
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
  };
}
