import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { getThemeTokens } from '../../utils/themeEngine';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Checks if the client wants a tight Amazon-style layout or a wider industrial layout
  const isCompact = theme.gridStyle === 'COMPACT_RETAIL';

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
        <h3 style={{ color: '#0f172a' }}>No products found</h3>
        <p style={{ color: '#64748b' }}>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      // This is the magic CSS that automatically makes the grid responsive on mobile vs desktop!
      gridTemplateColumns: isCompact ? 'repeat(auto-fill, minmax(220px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: isCompact ? '16px' : '24px',
      padding: '20px 0',
      fontFamily: 'sans-serif'
    }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
