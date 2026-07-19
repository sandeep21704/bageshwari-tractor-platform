import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext'; // <-- FIXED: Imported AppStateProvider
import { Header } from './components/layout/Header'; 
import { ProductGrid } from './components/business/ProductGrid'; 
import { DealerKYCForm } from './components/DealerKYCForm';

const AppContent: React.FC = () => {
  const { currentScreen } = useAppState();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <main className="pb-20">
        {{currentScreen === 'products' && <div className="p-20 text-center text-xl">Product Grid is updating...</div>}
        {currentScreen === 'kyc-registration' && <DealerKYCForm />}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    // FIXED: Wrapped the application content inside the state provider
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
};

export default App;
