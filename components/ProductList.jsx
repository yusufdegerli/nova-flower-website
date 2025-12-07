"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductContext";

const ProductList = () => {
    const { products } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    
    // Güvenlik önlemi: products yüklenmediyse boş dizi kullan
    const currentProducts = products || [];
    const categories = ["Tümü", ...new Set(currentProducts.map((f) => f.category))];
    const filteredFlowers = selectedCategory === "Tümü" ? currentProducts : currentProducts.filter((f) => f.category === selectedCategory);
    
    return (<section id="products" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#E8B4A8] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#B8C5B4] rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-5">
            <span className="px-5 py-2 bg-white border border-[#D4C5B9] text-[#6B5D52] text-xs font-medium uppercase tracking-widest rounded-full">
              Sezonun Favorileri
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-[#2A2520] mb-6 italic">Özel Koleksiyon</h2>
          <p className="text-lg text-[#6B5D52] max-w-2xl mx-auto leading-relaxed font-light">
            Her biri özenle seçilmiş ve hazırlanmış, doğanın en zarif armağanları. Sevdiklerinize en özel anlarınızda
            eşlik edecek benzersiz çiçek aranjmanları.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (<button key={category} onClick={() => setSelectedCategory(category)} className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                ? "bg-[#2A2520] text-white shadow-md"
                : "bg-white text-[#6B5D52] border border-[#D4C5B9] hover:border-[#2A2520] hover:text-[#2A2520]"}`}>
              {category}
            </button>))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlowers.map((flower, index) => (<div key={flower.id} className="opacity-0 animate-refined-fade" style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard flower={flower}/>
            </div>))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-20">
          <button className="group px-12 py-4 bg-transparent border-2 border-[#2A2520] text-[#2A2520] rounded-full text-base font-medium hover:bg-[#2A2520] hover:text-white transition-all duration-300 transform hover:scale-105">
            Tüm Koleksiyonu Gör
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>);
};
export default ProductList;
