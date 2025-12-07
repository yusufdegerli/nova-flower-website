import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ProductList from "./components/ProductList"
import Footer from "./components/Footer"
import { CartProvider } from "./context/CartContext"
import { ProductProvider, useProducts } from "./context/ProductContext"
import CartPage from "./pages/CartPage"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"

// Basit korumalı rota bileşeni
const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useProducts();
    if (!isAdmin) {
        return <Navigate to="/admin" replace />;
    }
    return children;
};

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-900 overflow-x-hidden flex flex-col">
          <MainContent />
        </div>
      </CartProvider>
    </ProductProvider>
  )
}

// Navbar ve Footer'ı route'a göre koşullu render etmek için alt bileşen
const MainContent = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');
    
    return (
        <>
            {!isAdminPage && <Navbar />}
            <main className="flex-grow">
            <Routes>
                <Route path="/" element={
                <>
                    <Hero />
                    <ProductList />
                </>
                } />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
            </main>
            {!isAdminPage && <Footer />}
        </>
    )
}

export default App
