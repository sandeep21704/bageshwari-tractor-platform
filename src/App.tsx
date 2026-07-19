import React from 'react';
import { AppStateProvider } from './context/AppStateContext'; 

// Layout components from src/components/layout/
import Header from './components/layout/Header'; 
import Footer from './components/layout/Footer'; 

// UI components from src/components/ui/
import Toast from './components/ui/Toast';

// Pages from src/pages/
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import DealerPortal from './pages/DealerPortal';
import AdminDashboard from './pages/AdminDashboard';
import DevTools from './pages/DevTools';

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <div className="app-container">
        <Header />
        <main>
          <Home /> 
          <Products />
          <Cart />
          <DealerPortal />
          <AdminDashboard />
          <DevTools />
        </main>
        <Footer />
        <Toast />
      </div>
    </AppStateProvider>
  );
};

export default App;
