import React from 'react';
import { useAppState } from './context/AppStateContext';
import { Header } from './components/layout/Header'; 
import { ProductGrid } from './components/business/ProductGrid'; // <-- FIXED: Added '/business/'
import { DealerKYCForm } from './components/DealerKYCForm';

const AppContent: React.FC = () => {
  const { currentScreen } = useAppState();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <main className="pb-20">
        {currentScreen === 'products' && <ProductGrid />}
        {currentScreen === 'kyc-registration' && <DealerKYCForm />}
        
        {/* Placeholders for your other existing screens */}
        {/* {currentScreen === 'cart' && <Cart />} */}
        {/* {currentScreen === 'admin' && <AdminPortal />} */}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
