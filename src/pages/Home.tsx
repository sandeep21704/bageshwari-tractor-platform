import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { B2B_PRODUCTS_CATALOG } from '../data/products';
import { ProductGrid } from '../components/business/ProductGrid';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const Home: React.FC = () => {
  const { navigateTo, session } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Only grab products marked as "isFeatured: true" for the homepage
  const featuredProducts = B2B_PRODUCTS_CATALOG.filter(p => p.isFeatured);

  return (
    <div style={{ minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. Dynamic Hero Banner Area */}
      <section style={{ 
        background: theme.bannerBackground, 
        color: theme.bannerTextColor, 
        padding: '80px 20px', 
        textAlign: 'center', 
        borderBottom: `4px solid ${theme.accentColor}` 
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.accentColor, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            {GLOBAL_TENANT_DATA.businessType.replace('_', ' ')} LEADER
          </span>
          <h1 style={{ fontSize: '46px', margin: '0 0 24px 0', fontWeight: '800', lineHeight: '1.2' }}>
            {GLOBAL_TENANT_DATA.businessName}
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', margin: '0 0 40px 0', lineHeight: '1.6' }}>
            {GLOBAL_TENANT_DATA.tagline}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => navigateTo('products')} style={{ padding: '16px 32px', backgroundColor: theme.accentColor, color: '#0f172a', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }}>
              Launch Catalog Engine
            </button>
            {!session.isAuthenticated && (
              <button onClick={() => navigateTo('dealer-portal')} style={{ padding: '16px 32px', backgroundColor: 'transparent', color: '#fff', border: '2px solid #ffffff', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                Establish Wholesale Account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Featured Inventory Grid Section */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '0 0 10px 0' }}>Featured Hardware & Logistics</h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>High-demand items currently available for dispatch from {GLOBAL_TENANT_DATA.contact.hqAddress}</p>
        </div>
        
        {/* We insert the Grid we built on Day 5 here! */}
        <ProductGrid products={featuredProducts} />
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button onClick={() => navigateTo('products')} style={{ padding: '12px 24px', backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
            View Full Inventory Pipeline →
          </button>
        </div>
      </section>

    </div>
  );
};
