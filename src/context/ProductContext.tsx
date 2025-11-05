"use-client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: {children: ReactNode})=> {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  }
  const removeProduct = (id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
  return(
    <ProductContext.Provider value={{products, addProduct, removeProduct}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = ()=> {
  const context = createContext(ProductContext);
  if(!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
}