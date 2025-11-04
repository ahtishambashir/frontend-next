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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data: ApiResponse = await response.json();
    setProducts(data.data);
    setFilteredProducts(data.data);
  };
  const handleSearch = (e: any) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (searchTerm.trim() !== "") {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
      setRecentSearch((prev) => {
        const updated = [term, ...prev.filter((t) => t !== term)];
        return updated.slice(0, 5);
      });
      return setFilteredProducts(filtered);
    } else {
      return setFilteredProducts(products);
    }
  };
  const handleRecentSearchClick = (search: any) => {
    setProducts(search);
    setFilteredProducts(search);
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ Product Table</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e)}
        placeholder="Search products..."
        className="border rounded px-3 py-2 mb-3 w-full"
      />

      {recentSearch.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="font-medium text-gray-600">Recent Searches</div>
          {recentSearch.map((search, index) => (
            <button
              key={index}
              onClick={() => handleRecentSearchClick(search)}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
            >
              {search}
            </button>
          ))}
        </div>
      )}

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
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{product.title}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
