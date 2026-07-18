import React, { createContext, useContext, useState } from 'react';
import { UserSession, CartItem, Order, ToastMessage, Product, UserRole } from '../types';

interface AppStateContextProps {
  session: UserSession;
  cart: CartItem[];
  orders: Order[];
  toasts: ToastMessage[];
  currentScreen: string;
  switchRole: (role: UserRole) => void;
  submitKYC: (formData: any) => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  executeCheckout: (deliveryMethod: string, paymentMethod: string) => void;
  pushToast: (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  clearToast: (id: string) => void;
  navigateTo: (path: string) => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  
  const [session, setSession] = useState<UserSession>({
    isAuthenticated: false,
    role: 'PUBLIC',
    username: 'Guest Visitor',
    kycStatus: 'NOT_SUBMITTED'
  });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const navigateTo = (path: string) => {
    setCurrentScreen(path);
    window.scrollTo(0, 0); 
  };

  const clearToast = (id: string) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  };

  const pushToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    
    // THE FIX: Automatically sweep away the toast after 4 seconds (4000 milliseconds)
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'PUBLIC') {
      setSession({ isAuthenticated: false, role: 'PUBLIC', username: 'Guest Visitor', kycStatus: 'NOT_SUBMITTED' });
      setCart([]); 
      pushToast("Session Closed", "Logged out securely. Viewing as public visitor.", "info");
    } else {
      setSession({
        isAuthenticated: true,
        role: role,
        username: role === 'ADMIN' ? 'System Administrator' : 'Bageshwari Verified Partner',
        companyName: "Mid-West Agri Machinery Wholesalers",
        kycStatus: role === 'DEALER' ? 'VERIFIED' : 'PENDING'
      });
      pushToast("Authentication Successful", `Access granted as: ${role}`, "success");
    }
  };

  const submitKYC = (formData: any) => {
    setSession(prev => ({ ...prev, kycStatus: 'PENDING' }));
    pushToast("Documents Received", "KYC documents uploaded successfully. Pending admin review.", "warning");
  };

  const addToCart = (product: Product, quantity: number) => {
    if (quantity < product.minimumOrderQuantity) {
      pushToast("Validation Error", `This item requires a minimum order quantity of ${product.minimumOrderQuantity}`, "error");
      return;
    }
    
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
    pushToast("Cart Updated", `${product.name} added to your order manifest.`, "success");
  };

  const updateCartQty = (productId: string, qty: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    pushToast("Item Removed", "Product cleared from your order.", "info");
  };

  const executeCheckout = (deliveryMethod: string, paymentMethod: string) => {
    if (cart.length === 0) return;
    
    const newOrder: Order = {
      id: `ord-${Math.random().toString(36).substring(2, 9)}`,
      orderNumber: `BT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => {
        const price = session.role === 'DEALER' ? item.product.dealerPriceNPR : 
                      session.role === 'REGISTERED_B2B' ? item.product.wholesalePriceNPR : 
                      item.product.mrpNPR;
        return { 
          productId: item.product.id, 
          name: item.product.name, 
          sku: item.product.sku, 
          pricePaidNPR: price, 
          quantity: item.quantity 
        };
      }),
      totalAmountNPR: cart.reduce((sum, item) => {
        const price = session.role === 'DEALER' ? item.product.dealerPriceNPR : 
                      session.role === 'REGISTERED_B2B' ? item.product.wholesalePriceNPR : 
                      item.product.mrpNPR;
        return sum + (price * item.quantity);
      }, 0),
      status: 'PENDING_REVIEW'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]); 
    pushToast("Order Placed Successfully", `Your order reference is: ${newOrder.orderNumber}`, "success");
    navigateTo('dealer-portal'); 
  };

  return (
    <AppStateContext.Provider value={{
      session, cart, orders, toasts, currentScreen, 
      switchRole, submitKYC, addToCart, updateCartQty, removeFromCart, executeCheckout, pushToast, clearToast, navigateTo
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider.");
  }
  return context;
};
