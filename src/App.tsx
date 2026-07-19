import React from 'react';
import { useAppState } from './context/AppStateContext';
import { Products } from './pages/Products';
import { DealerPortal } from './pages/DealerPortal';
import { About } from './pages/About';
import { AdminDashboard } from './pages/AdminDashboard';
import { Header } from './components/layout/Header';

export const App: React.FC = () => {
  const { currentScreen } = useAppState();

  const RenderActiveView = () => {
    switch (currentScreen) {
      case 'products': return <Products />;
      case 'dealer-portal': return <DealerPortal />;
      case 'about': return <About />;
      case 'admin': return <AdminDashboard />;
      default: return <Products />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <RenderActiveView />
      </main>
    </div>
  );
};
