import React, { useState } from 'react';
import { B2B_PRODUCTS_CATALOG } from '../data/products';
import { BRANDS_REGISTRY } from '../data/brands';
import { CATEGORIES_REGISTRY } from '../data/categories';
import { ProductGrid } from '../components/business/ProductGrid';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const Products: React.FC = () => {
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Local "memory" for the search bar and dropdowns
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // The Filtering Engine: Runs every time the user types a letter or changes a dropdown
  const filteredProducts = B2B_PRODUCTS_CATALOG.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.compatibility.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesBrand = selectedBrand === 'ALL' || product.brandId === selectedBrand;
    const matchesCategory = selectedCategory === 'ALL' || product.categoryId === selectedCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      <h1 style={{ color: '#0f172a', marginBottom: '8px' }}>Complete Inventory Manifest</h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>Real-time catalog synchronized with {GLOBAL_TENANT_DATA.businessName} office systems.</p>

      {/* SEARCH AND FILTER CONSOLE */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        
        {/* Search Bar */}
        <div style={{ flex: '2 1 250px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#64748b', textTransform: 'uppercase' }}>
            Smart Keyword Search
          </label>
          <input 
            type="text" 
            placeholder="Search SKUs, names, or fleet compatibility..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', outlineColor: theme.primaryColor }} 
          />
        </div>

        {/* Brand Dropdown */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#64748b', textTransform: 'uppercase' }}>
            Filter by Partner Brand
          </label>
          <select 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', cursor: 'pointer', outlineColor: theme.primaryColor }}
          >
            <option value="ALL">All Active Brands</option>
            {Object.values(BRANDS_REGISTRY).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        {/* Category Dropdown */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#64748b', textTransform: 'uppercase' }}>
            Filter by Category Type
          </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', cursor: 'pointer', outlineColor: theme.primaryColor }}
          >
            <option value="ALL">All Categories Matrix</option>
            {Object.values(CATEGORIES_REGISTRY).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* RESULTS TRACKER */}
      <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 'bold', color: theme.primaryColor }}>
        📊 Operational Pipeline Query: Showing {filteredProducts.length} verified components.
      </div>

      {/* CATALOG GRID */}
      <ProductGrid products={filteredProducts} />

    </div>
  );
};
