"use client";
import { useState } from "react";
import Image from "next/image";
import { CaregorySubcategoryData } from "@/public/JSON_DATA/CaregorySubcategoryData";

interface Option {
  id: number;
  name: string;
  image: string;
}

interface Subcategory {
  id: number;
  name: string;
  image: string;
  options: Option[];
}

interface Category {
  id: number;
  name: string;
  image: string;
  subcategories: Subcategory[];
}

interface DataStructure {
  mainCategories: Category[];
}

export default function Home() {
  // Ensure the data matches the DataStructure interface
  const data = CaregorySubcategoryData as DataStructure;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-gray-100 to-blue-50">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Expendifi Home Page
      </h1>
      {selectedCategory ? (
        <div>
          <button
            onClick={handleBackClick}
            className="mb-8 inline-flex items-center gap-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition font-medium"
          >
            <span className="text-xl">&larr;</span>
            <span>Back</span>
          </button>
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">
            {selectedCategory.name}
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {selectedCategory.subcategories.map((subcat) => (
              <div
                key={subcat.id}
                className="group relative flex flex-col items-center rounded-lg p-4 shadow-md hover:shadow-2xl border border-transparent hover:border-transparent transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                }}
              >
                <div className="w-32 h-32 mb-4 relative overflow-hidden rounded-full shadow-lg">
                  <Image
                    src={subcat.image}
                    alt={subcat.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-medium text-center text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                  {subcat.name}
                </h3>
                <div className="absolute inset-0 pointer-events-none rounded-lg group-hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] transition-shadow duration-300" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.mainCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="group relative flex flex-col items-center rounded-lg p-4 shadow-md hover:shadow-2xl border border-transparent hover:border-transparent transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              }}
            >
              <div className="w-32 h-32 mb-4 relative overflow-hidden rounded-full shadow-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 rounded-full"
                />
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                {category.name}
              </h2>
              <div className="absolute inset-0 pointer-events-none rounded-lg group-hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] transition-shadow duration-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
