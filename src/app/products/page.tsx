"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

interface ApiResponse {
  status: number;
  data: Product[];
  count: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data: ApiResponse = await response.json();
    setProducts(data.data);
  };
  const handleSearch = (e: any)=> {
    setSearchTerm(e.target.value);

  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ Product Table</h1>
      <input type="text" value={searchTerm} onChange={(e)=> handleSearch(e)}/>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-right">Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product)=> (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {product.title}
                </td>
                <td className="border px-4 py-2">
                  {product.category}
                </td>
                <td className="border px-4 py-2">
                  {product.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
