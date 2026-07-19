import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { Header } from './components/layout/Header'; 
import { ProductGrid } from './components/business/ProductGrid'; 
import { DealerKYCForm } from './components/DealerKYCForm';

const AppContent: React.FC = () => {
  const { currentScreen } = useAppState();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <main className="pb-20">
        {/* Typo fixed, and the real ProductGrid is back! */}
        {currentScreen === 'products' && <ProductGrid />}
        {currentScreen === 'kyc-registration' && <DealerKYCForm />}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
};

export default App;
