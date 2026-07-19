import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { getThemeTokens } from '../../utils/themeEngine';
import { useAppState } from '../../context/AppStateContext';

// We make products optional (?) so if App.tsx doesn't pass it, it won't crash!
interface ProductGridProps {
  products?: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products: propProducts }) => {
  // Grab the products from global state if they aren't passed down
  const { products: contextProducts } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Use props if provided, otherwise use global state, otherwise fallback to empty array
  const displayProducts = propProducts || contextProducts || [];
  
  const isCompact = theme.gridStyle === 'COMPACT_RETAIL';

  if (displayProducts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
        <h3 style={{ color: '#0f172a' }}>No products found</h3>
        <p style={{ color: '#64748b' }}>We are updating our catalog. Please check back soon.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isCompact ? 'repeat(auto-fill, minmax(220px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: isCompact ? '16px' : '24px',
      padding: '20px 24px',
      fontFamily: 'sans-serif',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
