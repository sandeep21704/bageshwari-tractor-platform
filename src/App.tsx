import React from 'react';
import { AppStateProvider } from './context/AppStateContext'; // Ensure this path is correct
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import DealerPortal from './pages/DealerPortal';
import AdminDashboard from './pages/AdminDashboard'; // Ensure this matches your file path
import DevTools from './components/DevTools';

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <div className="app-container">
        <Header />
        <main>
          {/* This is the routing logic */}
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
