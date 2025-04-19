import { useContext } from "react";
import { CategoryContext } from "./Context";

export const useCategory = () => {
  return useContext(CategoryContext);
};
