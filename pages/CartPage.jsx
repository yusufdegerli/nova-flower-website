import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart, getCartTotal } = useCart();
    const [saveCard, setSaveCard] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Sabit kargo ücreti (Örnek)
    const shippingCost = getCartTotal() > 500 ? 0 : 50; 
    const totalAmount = getCartTotal() + shippingCost;

    const handlePayment = (e) => {
        e.preventDefault();
        alert(`Ödeme Başarılı!\nToplam: ${totalAmount} TL\nKart Kaydedildi mi: ${saveCard ? "Evet" : "Hayır"}`);
        // Gerçek senaryoda burada backend isteği atılır.
    };
    
    const openProductDetail = (product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    // Helper to render stars (reused from ProductCard logic)
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

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FDFBF7] px-4">
                <div className="w-24 h-24 bg-[#F5EDE4] rounded-full flex items-center justify-center mb-6 text-[#2A2520]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                </div>
                <h2 className="text-2xl font-serif text-[#2A2520] mb-2">Sepetiniz Boş</h2>
                <p className="text-[#6B5D52] mb-8">Henüz sepetinize hiç çiçek eklemediniz.</p>
                <Link to="/">
                    <Button className="bg-[#2A2520] hover:bg-[#3D3530] text-white px-8 py-6 rounded-full text-lg">
                        Alışverişe Başla
                    </Button>
                </Link>
            </div>
        );
    }

    // Calculate details for selected product (if any)
    const selectedProductRating = selectedProduct ? (selectedProduct.reviews?.reduce((acc, r) => acc + r.rating, 0) || 0) / (selectedProduct.reviews?.length || 1) : 0;
    const selectedProductQuantity = selectedProduct ? (cartItems.find(i => i.id === selectedProduct.id)?.quantity || 0) : 0;


    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-serif text-[#2A2520] mb-8">Sepetim & Ödeme</h1>
                
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* SOL TARAF - Özet ve Ödeme */}
                    <div className="space-y-6 lg:col-span-1 order-1 lg:order-none sticky top-24">
                        {/* Sipariş Özeti */}
                        <div className="bg-white rounded-lg p-6 border border-[#E8E0D5] shadow-sm">
                            <h2 className="font-serif text-xl text-[#2A2520] mb-4">Sipariş Özeti</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-[#6B5D52]">
                                    <span>Ara Toplam</span>
                                    <span>{getCartTotal()} TL</span>
                                </div>
                                <div className="flex justify-between text-[#6B5D52]">
                                    <span>Kargo</span>
                                    <span>{shippingCost === 0 ? "Ücretsiz" : `${shippingCost} TL`}</span>
                                </div>
                                <div className="border-t border-[#E8E0D5] pt-3 flex justify-between font-bold text-lg text-[#2A2520]">
                                    <span>Toplam</span>
                                    <span>{totalAmount} TL</span>
                                </div>
                            </div>
                        </div>

                        {/* Ödeme Formu */}
                        <div className="bg-white rounded-lg p-6 border border-[#E8E0D5] shadow-sm">
                             <h2 className="font-serif text-xl text-[#2A2520] mb-6">Ödeme Bilgileri</h2>
                             
                             <Tabs defaultValue="credit-card" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#F5EDE4]">
                                    <TabsTrigger value="credit-card" className="data-[state=active]:bg-white data-[state=active]:text-[#2A2520] active:scale-95 transition-transform duration-200">Kredi Kartı</TabsTrigger>
                                    <TabsTrigger value="installments" className="data-[state=active]:bg-white data-[state=active]:text-[#2A2520] active:scale-95 transition-transform duration-200">Taksitli Ödeme</TabsTrigger>
                                </TabsList>
                                
                                <form onSubmit={handlePayment}>
                                    <TabsContent value="credit-card" className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                                            <Input id="cardName" placeholder="Ad Soyad" required className="border-[#E8E0D5] focus:ring-[#2A2520]" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Kart Numarası</Label>
                                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" maxLength={19} required className="border-[#E8E0D5] focus:ring-[#2A2520]" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Son Kullanma Tarihi</Label>
                                                <Input id="expiry" placeholder="Ay/Yıl" required className="border-[#E8E0D5] focus:ring-[#2A2520]" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input id="cvv" placeholder="123" maxLength={3} required className="border-[#E8E0D5] focus:ring-[#2A2520]" />
                                            </div>
                                        </div>
                                    </TabsContent>
                                    
                                    <TabsContent value="installments">
                                        <div className="p-4 bg-[#FDFBF7] rounded border border-[#E8E0D5] text-sm text-[#6B5D52]">
                                            <p className="mb-2 font-bold">Anlaşmalı Kartlar:</p>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li>World - 3 Taksit (Vade farksız)</li>
                                                <li>Bonus - 3 Taksit (Vade farksız)</li>
                                                <li>Axess - 2 Taksit (+%2 Vade farkı)</li>
                                                <li>Maximum - 6 Taksit (+%5 Vade farkı)</li>
                                            </ul>
                                            <p className="mt-4 text-xs italic">* Taksit seçenekleri kart numaranızı girdikten sonra aktif olacaktır.</p>
                                            
                                             {/* Taksitte de kart bilgisi istenir, basitlik için aynısını gösteriyoruz */}
                                            <div className="space-y-4 mt-4">
                                                <div className="space-y-2">
                                                    <Label>Kart Numarası</Label>
                                                    <Input placeholder="0000 0000 0000 0000" className="border-[#E8E0D5]" />
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <div className="flex items-center space-x-2 mt-6 mb-6">
                                        <Checkbox 
                                            id="save-card" 
                                            checked={saveCard}
                                            onCheckedChange={setSaveCard}
                                            className="border-[#6B5D52] data-[state=checked]:bg-[#2A2520] data-[state=checked]:border-[#2A2520]"
                                        />
                                        <label
                                            htmlFor="save-card"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#2A2520]"
                                        >
                                            Kart bilgilerimi sonraki alışverişlerim için sakla
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full bg-[#2A2520] hover:bg-[#3D3530] text-white py-6 text-lg">
                                        Ödemeyi Tamamla ({totalAmount} TL)
                                    </Button>
                                </form>
                             </Tabs>
                        </div>
                    </div>

                    {/* SAĞ TARAF - Ürün Listesi */}
                    <div className="lg:col-span-2 space-y-4 order-2 lg:order-none">
                        <div className="bg-white rounded-lg p-6 border border-[#E8E0D5] shadow-sm">
                            <h2 className="font-serif text-xl text-[#2A2520] mb-4 pb-4 border-b border-[#E8E0D5]">Ürünler ({cartItems.length})</h2>
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 sm:gap-6">
                                        {/* Resim */}
                                        <div 
                                            className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-[#F5EDE4] rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => openProductDetail(item)}
                                        >
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        
                                        {/* Bilgiler */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 
                                                        className="font-serif text-lg text-[#2A2520] cursor-pointer hover:text-[#E8B4A8] transition-colors"
                                                        onClick={() => openProductDetail(item)}
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <span className="font-medium text-[#2A2520]">{item.price * item.quantity} TL</span>
                                                </div>
                                                <p className="text-sm text-[#6B5D52] cursor-pointer hover:underline" onClick={() => openProductDetail(item)}>
                                                    {item.color} / {item.type}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end mt-4">
                                                <div className="flex items-center gap-3 bg-[#FDFBF7] rounded-full border border-[#E8E0D5] p-1">
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E8E0D5] text-[#2A2520]"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => addToCart(item)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E8E0D5] text-[#2A2520]"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                                                >
                                                    <span className="text-xs underline">Kaldır</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRODUCT DETAIL DIALOG */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] border-none p-0">
                    {selectedProduct && (
                        <div className="grid md:grid-cols-2">
                            {/* Left Side: Image */}
                            <div className="relative h-64 md:h-full min-h-[400px]">
                                <img 
                                    src={selectedProduct.image} 
                                    alt={selectedProduct.name} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Right Side: Details */}
                            <div className="p-8 flex flex-col">
                                <DialogHeader>
                                    <div className="flex justify-between items-start">
                                            <DialogTitle className="text-3xl font-serif text-[#2A2520] mb-2">{selectedProduct.name}</DialogTitle>
                                            <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1">
                                                <span className="text-lg font-bold text-[#2A2520]">{selectedProductRating.toFixed(1)}</span>
                                                {renderStars(selectedProductRating)}
                                            </div>
                                            <span className="text-xs text-gray-500">{selectedProduct.reviews?.length || 0} Değerlendirme</span>
                                            </div>
                                    </div>
                                    <DialogDescription className="text-[#6B5D52] mb-4 text-base">
                                        {selectedProduct.description}
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Specifications */}
                                <div className="space-y-3 mb-6 bg-white p-4 rounded-lg border border-[#E8E0D5]">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-[#2A2520]">Tür:</span>
                                        <span className="text-[#6B5D52]">{selectedProduct.type}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-[#2A2520]">Renk:</span>
                                        <span className="text-[#6B5D52]">{selectedProduct.color}</span>
                                    </div>
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="font-medium text-[#2A2520]">Menşei:</span>
                                        <span className="text-[#6B5D52]">{selectedProduct.origin}</span>
                                    </div>
                                        <div className="flex justify-between">
                                        <span className="font-medium text-[#2A2520]">Stok:</span>
                                        <span className="text-[#6B5D52]">{selectedProduct.stock} Adet</span>
                                    </div>
                                </div>
                                
                                {/* Reviews Section */}
                                <div className="mb-6">
                                    <h4 className="font-serif text-lg text-[#2A2520] mb-3 border-b border-[#E8E0D5] pb-1">Müşteri Yorumları</h4>
                                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                                            selectedProduct.reviews.map((review) => (
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
                                                {selectedProduct.price * (selectedProductQuantity > 0 ? selectedProductQuantity : 1)}
                                            </span>
                                            <span className="text-sm font-medium text-[#6B5D52]">TL</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 bg-white rounded-full border border-[#E8E0D5] p-1 shadow-sm">
                                            <button 
                                            onClick={() => removeFromCart(selectedProduct.id)}
                                            disabled={selectedProductQuantity === 0}
                                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5EDE4] disabled:opacity-50 transition-colors text-[#2A2520] text-xl font-medium"
                                            >
                                            -
                                            </button>
                                            <span className="font-medium text-lg w-6 text-center">{selectedProductQuantity}</span>
                                            <button 
                                            onClick={() => addToCart(selectedProduct)}
                                            className="w-10 h-10 rounded-full bg-[#2A2520] text-white flex items-center justify-center hover:bg-[#3D3530] transition-colors text-xl font-medium"
                                            >
                                            +
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CartPage;
