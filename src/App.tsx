import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { DealerPortal } from './pages/DealerPortal';
import { DevTools } from './pages/DevTools';
// NEW: Imported the About page
import { About } from './pages/About';
import { Toast } from './components/ui/Toast';

const RenderActiveView: React.FC = () => {
  const { currentScreen } = useAppState();
  switch (currentScreen) {
    case 'home': return <Home />;
    case 'products': return <Products />;
    case 'cart': return <Cart />;
    case 'dealer-portal': return <DealerPortal />;
    case 'devtools': return <DevTools />;
    // NEW: Added the route for the About page
    case 'about': return <About />;
    default: return <Home />;
  }
};

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <RenderActiveView />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainLayout />
    </AppStateProvider>
  );
}
