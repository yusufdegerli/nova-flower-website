import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";

const AdminDashboard = () => {
    const { products, addProduct, updateProduct, deleteProduct, logoutAdmin } = useProducts();
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        color: "",
        type: "",
        origin: "",
        stock: "",
        otherColors: ""
    });

    const handleLogout = () => {
        logoutAdmin();
        navigate("/admin");
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            ...product,
            otherColors: product.otherColors ? product.otherColors.join(", ") : ""
        });
        setIsDialogOpen(true);
    };

    const handleAddNewClick = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            price: "",
            image: "",
            category: "",
            description: "",
            color: "",
            type: "",
            origin: "",
            stock: "",
            otherColors: ""
        });
        setIsDialogOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation Check
        const requiredFields = ['name', 'price', 'image', 'category', 'description', 'color', 'type', 'origin', 'stock'];
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === "");

        if (missingFields.length > 0) {
            alert(`Lütfen şu alanları doldurun: ${missingFields.join(', ')}`);
            return;
        }
        
        const processedData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            otherColors: formData.otherColors ? formData.otherColors.split(",").map(c => c.trim()).filter(c => c !== "") : []
        };

        if (editingProduct) {
            updateProduct({ ...processedData, id: editingProduct.id, reviews: editingProduct.reviews });
        } else {
            addProduct({ ...processedData, reviews: [] });
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-[#2A2520]">Admin Paneli - Ürün Yönetimi</h1>
                    <div className="flex gap-4">
                        <Button onClick={handleAddNewClick} className="bg-[#2A2520] hover:bg-[#3D3530] text-white">
                            + Yeni Ürün Ekle
                        </Button>
                        <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                            Çıkış Yap
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-[#E8E0D5] overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Resim</TableHead>
                                <TableHead>Ürün Adı</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Fiyat</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead className="text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price} TL</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            product.stock === 0 ? 'bg-red-100 text-red-700' : 
                                            product.stock < 10 ? 'bg-orange-100 text-orange-700' : 
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {product.stock}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => handleEditClick(product)}
                                        >
                                            Düzenle
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="destructive"
                                            onClick={() => {
                                                if(window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
                                                    deleteProduct(product.id);
                                                }
                                            }}
                                        >
                                            Sil
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit/Add Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Ürün Adı <span className="text-red-500">*</span></Label>
                                <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
                                <Input id="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Fiyat (TL) <span className="text-red-500">*</span></Label>
                                <Input id="price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="stock">Stok Adedi <span className="text-red-500">*</span></Label>
                                <Input id="stock" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="color">Renk <span className="text-red-500">*</span></Label>
                                <Input id="color" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Tür <span className="text-red-500">*</span></Label>
                                <Input id="type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="origin">Menşei <span className="text-red-500">*</span></Label>
                                <Input id="origin" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="otherColors">Diğer Renkler (Virgülle ayırın)</Label>
                                <Input id="otherColors" value={formData.otherColors} onChange={e => setFormData({...formData, otherColors: e.target.value})} placeholder="Kırmızı, Beyaz" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="image">Ürün Fotoğrafı <span className="text-red-500">*</span></Label>
                                <div className="flex items-center gap-4">
                                    <Input 
                                        id="image" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer"
                                    />
                                    {formData.image && (
                                        <div className="w-16 h-16 rounded overflow-hidden border border-gray-200">
                                            <img src={formData.image} alt="Önizleme" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="description">Açıklama <span className="text-red-500">*</span></Label>
                                <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} />
                            </div>
                            
                            <div className="col-span-2 pt-4 flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
                                <Button type="submit" className="bg-[#2A2520] text-white">Kaydet</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AdminDashboard;
