import { createContext, useState, useContext, useEffect } from 'react';
import { flowers as initialFlowers } from '../data/flowers';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Load from local storage if available, otherwise use initial data
    const savedProducts = localStorage.getItem('nova_products');
    return savedProducts ? JSON.parse(savedProducts) : initialFlowers;
  });

  useEffect(() => {
    // Save to local storage whenever products change
    localStorage.setItem('nova_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]); // Simple ID generation
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Admin Authentication State (Simple implementation)
  const [isAdmin, setIsAdmin] = useState(() => {
      return localStorage.getItem('nova_admin_logged_in') === 'true';
  });

  const loginAdmin = (username, password) => {
    if (username === 'admin' && password === '1234') {
        setIsAdmin(true);
        localStorage.setItem('nova_admin_logged_in', 'true');
        return true;
    }
    return false;
  };

  const logoutAdmin = () => {
      setIsAdmin(false);
      localStorage.removeItem('nova_admin_logged_in');
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isAdmin,
    loginAdmin,
    logoutAdmin
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
