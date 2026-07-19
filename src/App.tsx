import React from 'react';
import { AppStateProvider } from './context/AppStateContext'; 
import Header from './components/layout/Header'; 
import Footer from './components/layout/Footer'; // Corrected path to layout folder
import Toast from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import DealerPortal from './pages/DealerPortal';
import AdminDashboard from './pages/AdminDashboard';
import DevTools from './components/DevTools';

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
