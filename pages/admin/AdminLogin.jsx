import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginAdmin } = useProducts();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginAdmin(username, password)) {
            navigate("/admin/dashboard");
        } else {
            setError("Geçersiz kullanıcı adı veya şifre.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-[#E8E0D5]">
                <h2 className="text-3xl font-serif text-[#2A2520] mb-6 text-center">Admin Girişi</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username">Kullanıcı Adı</Label>
                        <Input 
                            id="username" 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="border-[#E8E0D5]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Şifre</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="border-[#E8E0D5]"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#2A2520] hover:bg-[#3D3530] text-white py-2">
                        Giriş Yap
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
