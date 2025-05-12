import { createContext } from "react";
import { Category } from "../generated";

interface CategoryContextType {
  selectedCategory: Category | undefined;
  setSelectedCategory: (category: Category | undefined) => void;
  productNameFilter: string;
  setProductNameFilter: (productNameFilter: string) => void;
  totalPage: number;
  setTotalPage: (totalPage: number) => void;
}
interface CartContextType {
  totalItems: number;
  setTotalItems: (value: number) => void;
}
export const CartContext = createContext<CartContextType>({
  totalItems: 0,
  setTotalItems: () => {},
});

// Création du contexte avec une valeur par défaut
export const CategoryContext = createContext<CategoryContextType>({
  selectedCategory: undefined,
  setSelectedCategory: () => {},
  productNameFilter: "",
  setProductNameFilter: () => {},
  totalPage: 1,
  setTotalPage: () => {},
});
