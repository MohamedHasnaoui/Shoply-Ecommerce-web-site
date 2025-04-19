import { useState } from "react";
import { Category } from "../generated";
import { CategoryContext } from "./Context";

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [productNameFilter, setProductNameFilter] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        setTotalPage,
        totalPage,
        productNameFilter,
        setProductNameFilter,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
