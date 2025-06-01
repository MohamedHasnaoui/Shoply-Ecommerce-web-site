import { useContext } from "react";
import { CategoryContext, CartContext } from "./Context";

export const useCategory = () => {
  return useContext(CategoryContext);
};
export const useCartContext = () => useContext(CartContext);
