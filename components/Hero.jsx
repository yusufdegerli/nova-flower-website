"use client";
import { useEffect, useState } from "react";
const Hero = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (<div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5EDE4] via-[#FFF9F3] to-[#F0E8DF]">
      {/* Elegant Background Image */}
      <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.5}px)`,
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF9F3]/50 to-[#FDFBF7]"></div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E8B4A8] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#B8C5B4] rounded-full opacity-15 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20">
        <div className="mb-6 opacity-0 animate-fade-in">
          <span className="inline-block px-5 py-2 bg-white/60 backdrop-blur-sm border border-[#D4C5B9] rounded-full text-[#6B5D52] text-sm font-medium tracking-wide">
            Taze Çiçekler Her Gün Kapınızda
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-[#2A2520] mb-8 leading-[0.95] tracking-tight opacity-0 animate-refined-fade stagger-1">
          <span className="block font-serif italic">Doğanın</span>
          <span className="block font-serif">En Zarif</span>
          <span className="block font-serif italic">Armağanı</span>
        </h1>

        <p className="text-xl md:text-2xl text-[#6B5D52] mb-14 max-w-2xl mx-auto leading-relaxed font-light opacity-0 animate-refined-fade stagger-2">
          Sevdiklerinize özenle seçilmiş, el yapımı çiçek aranjmanları ile duygularınızı en güzel şekilde ifade edin.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center opacity-0 animate-refined-fade stagger-3">
          <button className="group px-12 py-4 bg-[#2A2520] text-white rounded-full text-base font-medium hover:bg-[#3D3530] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Koleksiyonu İncele
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button className="px-12 py-4 bg-transparent text-[#2A2520] border-2 border-[#2A2520] rounded-full text-base font-medium hover:bg-[#2A2520] hover:text-white transition-all duration-300 transform hover:scale-105">
            İletişime Geç
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-delay-2">
          <div className="flex flex-col items-center gap-2 text-[#6B5D52]">
            <div className="w-[1px] h-16 bg-[#D4C5B9] animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>);
};
export default Hero;
