import { createContext, useContext } from 'react';

export const BrandContext = createContext();

export const useBrand = () => useContext(BrandContext);