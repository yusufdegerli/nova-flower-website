"use client";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { getCartTotal, getCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return (<nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#E8E0D5]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className={`text-2xl font-serif italic transition-colors duration-300 ${scrolled ? "text-[#2A2520]" : "text-[#2A2520]"}`}>
              Nova
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors duration-300 hover:text-[#E8B4A8] ${scrolled ? "text-[#2A2520]" : "text-[#2A2520]"}`}>
              Ana Sayfa
            </Link>
            <a href="/#products" className={`text-sm font-medium transition-colors duration-300 hover:text-[#E8B4A8] ${scrolled ? "text-[#2A2520]" : "text-[#2A2520]"}`}>
              Koleksiyon
            </a>
            <a href="#" className={`text-sm font-medium transition-colors duration-300 hover:text-[#E8B4A8] ${scrolled ? "text-[#2A2520]" : "text-[#2A2520]"}`}>
              Hakkımızda
            </a>
            <a href="#" className={`text-sm font-medium transition-colors duration-300 hover:text-[#E8B4A8] ${scrolled ? "text-[#2A2520]" : "text-[#2A2520]"}`}>
              İletişim
            </a>

            {/* Cart Button */}
            <button 
                onClick={() => navigate('/cart')}
                className="ml-4 px-6 py-2.5 bg-[#2A2520] text-white rounded-full text-sm font-medium hover:bg-[#3D3530] transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Sepet ({getCartCount()}) - {getCartTotal()} TL</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-lg transition-colors ${scrolled ? "text-[#2A2520]" : "text-[#2A2520]"}`}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpen ? (<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>) : (<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>)}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (<div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-[#E8E0D5] animate-slide-down">
          <div className="px-6 py-4 space-y-3">
            <Link to="/" className="block py-2 text-[#2A2520] hover:text-[#E8B4A8] transition-colors font-medium">
              Ana Sayfa
            </Link>
            <a href="/#products" className="block py-2 text-[#2A2520] hover:text-[#E8B4A8] transition-colors font-medium">
              Koleksiyon
            </a>
            <a href="#" className="block py-2 text-[#2A2520] hover:text-[#E8B4A8] transition-colors font-medium">
              Hakkımızda
            </a>
            <a href="#" className="block py-2 text-[#2A2520] hover:text-[#E8B4A8] transition-colors font-medium">
              İletişim
            </a>
            <div className="pt-4 border-t border-gray-100">
                <button 
                    onClick={() => {
                        navigate('/cart');
                        setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-[#2A2520] font-medium"
                >
                    Sepet: {getCartTotal()} TL ({getCartCount()} Ürün)
                </button>
            </div>
          </div>
        </div>)}
    </nav>);
};
export default Navbar;
