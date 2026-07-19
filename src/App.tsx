import React from 'react';
import { useAppState } from './context/AppStateContext';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { DealerKYCForm } from './components/DealerKYCForm';
// Import other components you have like Cart, AdminPortal, etc.

const AppContent: React.FC = () => {
  const { currentScreen } = useAppState();

  // This acts as our main router. It listens to the 'currentScreen' state
  // and swaps out the page components instantly without reloading the browser.
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* The Header stays at the top of every page */}
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
