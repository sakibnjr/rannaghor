"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const MenuFilterContext = createContext<{
  category: string;
  selectCategory: (category: string) => void;
} | null>(null);

export function MenuFilterProvider({ children }: { children: ReactNode }) {
  const [category, selectCategory] = useState("Popular");
  return <MenuFilterContext.Provider value={{ category, selectCategory }}>{children}</MenuFilterContext.Provider>;
}

export function useMenuFilter() {
  const context = useContext(MenuFilterContext);
  if (!context) throw new Error("Menu filters require MenuFilterProvider");
  return context;
}
