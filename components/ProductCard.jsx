"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

const ProductCard = ({ flower }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { addToCart, removeFromCart, cartItems } = useCart();

    const cartItem = cartItems.find(item => item.id === flower.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    
    // Calculate Average Rating
    const totalRating = flower.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
    const averageRating = flower.reviews?.length ? (totalRating / flower.reviews.length).toFixed(1) : 0;

    const handleIncrement = () => {
        addToCart(flower);
    };

    const handleDecrement = () => {
        removeFromCart(flower.id);
    };

    // Helper to render stars
    const renderStars = (rating) => {
        return (
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "text-gray-300"}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                         <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
    <>
      <div 
        className="group relative bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl border border-[#E8E0D5] cursor-pointer" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Image Container */}
        <div className="relative h-[400px] overflow-hidden bg-[#F5EDE4]">
          <img src={flower.image || "/placeholder.svg"} alt={flower.name} className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"}`}/>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category Badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#6B5D52] text-xs font-medium uppercase tracking-wider rounded-full">
            {flower.category}
          </span>
        </div>

        {/* Stock Badges */}
        {flower.stock === 0 ? (
             <div className="absolute top-5 right-5 z-10">
                <span className="inline-block px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Stokta Yok
                </span>
            </div>
        ) : flower.stock < 10 ? (
            <div className="absolute top-5 right-5 z-10">
                <span className="inline-block px-3 py-1.5 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Stokta Az Kaldı
                </span>
            </div>
        ) : (
            /* Heart Icon (Only show if not displaying a stock badge to prevent clutter) */
            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#E8B4A8] hover:text-white transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </button>
            </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
          <div className="flex justify-between items-start mb-3">
             <h3 className="text-2xl font-serif text-[#2A2520] group-hover:text-[#E8B4A8] transition-colors duration-300">
               {flower.name}
             </h3>
             <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                {renderStars(averageRating)}
                <span className="text-xs text-gray-500 font-medium ml-1">({flower.reviews?.length || 0})</span>
             </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-light text-[#2A2520]">{flower.price}</span>
              <span className="text-[#6B5D52] text-sm font-medium">TL</span>
            </div>

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    if(flower.stock > 0) addToCart(flower);
                }}
                disabled={flower.stock === 0}
                className={`group/btn px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 transform ${
                    flower.stock === 0 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-[#2A2520] text-white hover:bg-[#3D3530] hover:scale-105"
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {flower.stock === 0 ? 'Tükendi' : (quantity > 0 ? `Sepette: ${quantity}` : 'Sepete Ekle')}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] border-none p-0">
            <div className="grid md:grid-cols-2">
                {/* Left Side: Image */}
                <div className="relative h-64 md:h-full min-h-[400px]">
                    <img 
                        src={flower.image} 
                        alt={flower.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
                
                {/* Right Side: Details */}
                <div className="p-8 flex flex-col">
                    <DialogHeader>
                        <div className="flex justify-between items-start">
                             <DialogTitle className="text-3xl font-serif text-[#2A2520] mb-2">{flower.name}</DialogTitle>
                             <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-bold text-[#2A2520]">{averageRating}</span>
                                    {renderStars(averageRating)}
                                </div>
                                <span className="text-xs text-gray-500">{flower.reviews?.length || 0} Değerlendirme</span>
                             </div>
                        </div>
                        <DialogDescription className="text-[#6B5D52] mb-4 text-base">
                            {flower.description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Specifications */}
                    <div className="space-y-3 mb-6 bg-white p-4 rounded-lg border border-[#E8E0D5]">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-medium text-[#2A2520]">Tür:</span>
                            <span className="text-[#6B5D52]">{flower.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-medium text-[#2A2520]">Renk:</span>
                            <span className="text-[#6B5D52]">{flower.color}</span>
                        </div>
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-medium text-[#2A2520]">Menşei:</span>
                            <span className="text-[#6B5D52]">{flower.origin}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="font-medium text-[#2A2520]">Stok:</span>
                            <span className="text-[#6B5D52]">{flower.stock} Adet</span>
                        </div>
                    </div>
                    
                    {/* Reviews Section */}
                    <div className="mb-6">
                        <h4 className="font-serif text-lg text-[#2A2520] mb-3 border-b border-[#E8E0D5] pb-1">Müşteri Yorumları</h4>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {flower.reviews && flower.reviews.length > 0 ? (
                                flower.reviews.map((review) => (
                                    <div key={review.id} className="bg-white p-3 rounded shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-sm text-[#2A2520]">{review.user}</span>
                                            {renderStars(review.rating)}
                                        </div>
                                        <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Henüz yorum yapılmamış.</p>
                            )}
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-auto pt-4 border-t border-[#E8E0D5] flex items-center justify-between sticky bottom-0 bg-[#FDFBF7]">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Toplam Tutar</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-light text-[#2A2520]">
                                    {flower.price * (quantity > 0 ? quantity : 1)}
                                </span>
                                <span className="text-sm font-medium text-[#6B5D52]">TL</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-white rounded-full border border-[#E8E0D5] p-1 shadow-sm">
                             <button 
                                onClick={handleDecrement}
                                disabled={quantity === 0}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5EDE4] disabled:opacity-50 transition-colors text-[#2A2520] text-xl font-medium"
                             >
                                -
                             </button>
                             <span className="font-medium text-lg w-6 text-center">{quantity}</span>
                             <button 
                                onClick={handleIncrement}
                                className="w-10 h-10 rounded-full bg-[#2A2520] text-white flex items-center justify-center hover:bg-[#3D3530] transition-colors text-xl font-medium"
                             >
                                +
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
    );
};
export default ProductCard;
