"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  /** Clave única por producto + opciones seleccionadas. */
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  options?: Record<string, string>;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** Marca de tiempo del último añadido, para animar el badge. */
  lastAddedAt: number | null;
  add: (item: Omit<CartItem, "quantity" | "key">, quantity?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

function makeKey(slug: string, options?: Record<string, string>): string {
  if (!options || Object.keys(options).length === 0) return slug;
  const suffix = Object.entries(options)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${slug}__${suffix}`;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      lastAddedAt: null,
      add: (item, quantity = 1) =>
        set((state) => {
          const key = makeKey(item.slug, item.options);
          const existing = state.items.find((i) => i.key === key);
          const items = existing
            ? state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              )
            : [...state.items, { ...item, key, quantity }];
          return { items, isOpen: true, lastAddedAt: Date.now() };
        }),
      remove: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "nuevavida-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Selectores derivados (evitan recomputar en cada render del store completo).
export const selectCount = (s: CartState) =>
  s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
