import { useCallback, useEffect, useRef } from "react";
import { cookieAuthenticatedVar } from "../../../apollo/cache";

function CookieManager() {
  const firstTimeGeneration = useRef(true);

  const fetchCookie = useCallback(async () => {
    const response = await fetch("/cookie", { credentials: "include" });
    if (response.ok) {
      cookieAuthenticatedVar(true);
    }
  }, []);

  useEffect(() => {
    if (firstTimeGeneration.current) {
      fetchCookie();
      firstTimeGeneration.current = false;
    }
  }, [fetchCookie]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchCookie();
    }, 11 * 60 * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [fetchCookie]);

  return null;
}

export default CookieManager;
