import { useState, useEffect } from "react";
import { BrandContext } from "./brand-context";

export const DEFAULT_BRAND_NAME = 'My Budget Tracker';
const STORAGE_KEY = 'brand-name-preference';
const MAX_LENGTH = 25;

export const BrandProvider = ({ children }) => {
  const [brandName, setBrandNameState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_BRAND_NAME;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && stored.trim() ? stored : DEFAULT_BRAND_NAME;
  });

  // Keep the browser tab title and localStorage in sync whenever the brand name changes
  useEffect(() => {
    document.title = brandName;
    window.localStorage.setItem(STORAGE_KEY, brandName);
  }, [brandName]);

  const setBrandName = (name) => {
    const trimmed = name.trim().slice(0, MAX_LENGTH);
    setBrandNameState(trimmed || DEFAULT_BRAND_NAME);
  };

  const resetBrandName = () => setBrandNameState(DEFAULT_BRAND_NAME);

  return (
    <BrandContext.Provider value={{ brandName, setBrandName, resetBrandName, maxLength: MAX_LENGTH }}>
      {children}
    </BrandContext.Provider>
  );
};