import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, CartItem, Order, ToastMessage, Product, UserRole } from '../types';
import { OVERRIDE_DICTIONARY } from '../utils/dictionary';

interface AppStateContextProps {
  session: UserSession;
  cart: CartItem[];
  orders: Order[];
  toasts: ToastMessage[];
  currentScreen: string;
  tFix: (text: string) => React.ReactNode; 
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
  // The app now immediately launches into the 'products' catalog instead of 'home'
  const [currentScreen, setCurrentScreen] = useState<string>('products');
  const [isNepali, setIsNepali] = useState<boolean>(false);
  
  const [session, setSession] = useState<UserSession>({
    isAuthenticated: false,
    role: 'PUBLIC',
    username: 'Guest Visitor',
    kycStatus: 'NOT_SUBMITTED'
  });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const checkGoogleLang = setInterval(() => {
      const cookie = document.cookie;
      const isNe = cookie.includes('/ne') || document.querySelector('html')?.lang === 'ne';
      if (isNepali !== isNe) setIsNepali(isNe);
    }, 1000);
    return () => clearInterval(checkGoogleLang);
  }, [isNepali]);

  const tFix = (text: string) => {
    if (isNepali && OVERRIDE_DICTIONARY[text]) {
      return <span className="notranslate">{OVERRIDE_DICTIONARY[text]}</span>;
    }
    return <span>{text}</span>;
  };

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
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'PUBLIC') {
      setSession({ isAuthenticated: false, role: 'PUBLIC', username: 'Guest Visitor', kycStatus: 'NOT_SUBMITTED' });
      setCart([]); 
      pushToast("Session Closed", "Logged out securely.", "info");
    } else {
      setSession({
        isAuthenticated: true,
        role: role,
        username: role === 'ADMIN' ? 'System Administrator' : 'Verified User',
        companyName: "Bageshwari Tractor Pvt. Ltd.",
        kycStatus: role === 'DEALER' ? 'VERIFIED' : 'PENDING'
      });
      pushToast("Authentication Successful", `Access granted as: ${role}`, "success");
    }
  };

  const submitKYC = (formData: any) => {
    setSession(prev => ({ ...prev, kycStatus: 'PENDING' }));
    pushToast("Documents Received", "Registration submitted.", "warning");
  };

  const addToCart = (product: Product, quantity: number) => {
    if (quantity < product.minimumOrderQuantity) {
      pushToast("Validation Error", `Minimum order is ${product.minimumOrderQuantity}`, "error");
      return;
    }
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { product, quantity }];
    });
    pushToast("Cart Updated", `${product.name} added.`, "success");
  };

  const updateCartQty = (productId: string, qty: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const executeCheckout = (deliveryMethod: string, paymentMethod: string) => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `ord-${Math.random().toString(36).substring(2, 9)}`,
      orderNumber: `BT-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({ 
        productId: item.product.id, name: item.product.name, sku: item.product.sku, 
        pricePaidNPR: session.role === 'DEALER' ? item.product.dealerPriceNPR : session.role === 'REGISTERED_B2B' ? item.product.wholesalePriceNPR : item.product.mrpNPR, 
        quantity: item.quantity 
      })),
      totalAmountNPR: cart.reduce((sum, item) => sum + ((session.role === 'DEALER' ? item.product.dealerPriceNPR : session.role === 'REGISTERED_B2B' ? item.product.wholesalePriceNPR : item.product.mrpNPR) * item.quantity), 0),
      
      // NEW: Capturing the checkout fields strictly based on our new schema
      paymentMethod: paymentMethod,
      paymentStatus: 'UNPAID',
      status: 'PENDING_REVIEW',
      remarks: `Dispatch via: ${deliveryMethod}`
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); 
    pushToast("Order Placed", `Reference: ${newOrder.orderNumber}`, "success");
    navigateTo('home'); 
  };

  return (
    <AppStateContext.Provider value={{
      session, cart, orders, toasts, currentScreen, tFix,
      switchRole, submitKYC, addToCart, updateCartQty, removeFromCart, executeCheckout, pushToast, clearToast, navigateTo
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within an AppStateProvider.");
  return context;
};
