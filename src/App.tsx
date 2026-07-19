import React from 'react';
import { useAppState } from './context/AppStateContext';
import { Header } from './components/layout/Header'; // <-- FIXED: Added '/layout/' to the path
import { ProductGrid } from './components/ProductGrid';
import { DealerKYCForm } from './components/DealerKYCForm';
// Import other components you have like Cart, AdminPortal, etc.

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
        {/* {currentScreen === 'dealer-portal' && <DealerPortal />} */}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
