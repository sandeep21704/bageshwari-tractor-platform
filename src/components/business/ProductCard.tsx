import React, { useState } from 'react';
import { Product } from '../../types';
import { useAppState } from '../../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { getThemeTokens } from '../../utils/themeEngine';
import { BRANDS_REGISTRY } from '../../data/brands';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { session, addToCart } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Start the quantity selector at the required Minimum Order Quantity (MOQ)
  const [qty, setQty] = useState<number>(product.minimumOrderQuantity);
  
  const targetBrand = BRANDS_REGISTRY[product.brandId];

  return (
    <div style={{
      backgroundColor: '#ffffff', 
      borderRadius: '8px', 
      border: '1px solid #e2e8f0',
      padding: '16px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      position: 'relative',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      fontFamily: 'sans-serif'
    }}>
      
      <div>
        {/* Placeholder for the Product Image */}
        <div style={{ width: '100%', height: '180px', backgroundColor: '#f8fafc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid #f1f5f9', fontSize: '32px' }}>
          ⚙️
        </div>

        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', marginBottom: '6px' }}>
          SKU: {product.sku}
        </div>
        
        <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', color: '#0f172a', fontWeight: '700', lineHeight: '1.3', height: '42px', overflow: 'hidden' }}>
          {product.name}
        </h3>
        
        <div style={{ display: 'inline-block', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 'bold', marginBottom: '12px' }}>
          🏷️ {targetBrand?.name || product.brandId}
        </div>

        {/* Dynamic Pricing Block based on User Role */}
        <div style={{ backgroundColor: '#fdf2f2', padding: '12px', borderRadius: '6px', marginBottom: '16px', border: `1px solid ${theme.primaryColor}20` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: session.isAuthenticated ? '6px' : '0', borderBottom: session.isAuthenticated ? '1px dashed #cbd5e1' : 'none' }}>
            <span style={{ color: '#64748b' }}>Market Retail (MRP):</span>
            <span style={{ fontWeight: 'bold', textDecoration: session.isAuthenticated ? 'line-through' : 'none', color: session.isAuthenticated ? '#94a3b8' : '#0f172a' }}>
              {GLOBAL_TENANT_DATA.currencySymbol} {product.mrpNPR}
            </span>
          </div>
          
          {session.role === 'DEALER' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingTop: '6px', color: theme.primaryColor, fontWeight: 'bold' }}>
              <span>Dealer Rate:</span>
              <span>{GLOBAL_TENANT_DATA.currencySymbol} {product.dealerPriceNPR}</span>
            </div>
          )}

          {session.role === 'REGISTERED_B2B' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingTop: '6px', color: theme.secondaryColor, fontWeight: 'bold' }}>
              <span>Wholesale Rate:</span>
              <span>{GLOBAL_TENANT_DATA.currencySymbol} {product.wholesalePriceNPR}</span>
            </div>
          )}

          {!session.isAuthenticated && (
            <div style={{ fontSize: '11px', color: '#ea580c', marginTop: '8px', fontWeight: 'bold', textAlign: 'center' }}>
              🔒 Login to unlock B2B commercial rates
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart Controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70px' }}>
          <span style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px', fontWeight: 'bold' }}>Qty (Min {product.minimumOrderQuantity})</span>
          <input 
            type="number" 
            min={product.minimumOrderQuantity} 
            value={qty} 
            onChange={(e) => setQty(parseInt(e.target.value) || product.minimumOrderQuantity)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 'bold', boxSizing: 'border-box', textAlign: 'center' }} 
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <button onClick={() => addToCart(product, qty)} style={{
            width: '100%', padding: '9px', backgroundColor: theme.primaryColor, color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', transition: 'opacity 0.2s'
          }}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
