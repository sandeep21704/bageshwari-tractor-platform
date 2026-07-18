import React from 'react';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { BRANDS_REGISTRY } from '../../data/brands';
import { CATEGORIES_REGISTRY } from '../../data/categories';
import { getThemeTokens } from '../../utils/themeEngine';

export const Footer: React.FC = () => {
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);

  return (
    <footer style={{ backgroundColor: theme.primaryColor, color: '#f8fafc', padding: '60px 20px 20px 20px', marginTop: 'auto', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Column 1: Company Profile */}
        <div>
          <h3 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '20px' }}>{GLOBAL_TENANT_DATA.businessName}</h3>
          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>{GLOBAL_TENANT_DATA.tagline}</p>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '16px' }}><strong>HQ Operations:</strong> {GLOBAL_TENANT_DATA.contact.hqAddress}, {GLOBAL_TENANT_DATA.contact.country}</p>
        </div>

        {/* Column 2: Dynamic Categories */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '15px', letterSpacing: '0.5px' }}>DISTRIBUTION LINES</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#cbd5e1' }}>
            {Object.values(CATEGORIES_REGISTRY).map(c => (
              <li key={c.id} style={{ cursor: 'pointer' }}>⚙️ {c.name}</li>
            ))}
          </ul>
        </div>

        {/* Column 3: Partner Brands */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '15px', letterSpacing: '0.5px' }}>VERIFIED PARTNERS</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
            {Object.values(BRANDS_REGISTRY).map(b => (
              <li key={b.id}>
                <span style={{ color: b.isOwnedBrand ? theme.accentColor : '#ffffff', fontWeight: 'bold' }}>{b.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & B2B Channels */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '15px', letterSpacing: '0.5px' }}>B2B LOGISTICS CHANNELS</h4>
          <p style={{ fontSize: '14px', color: '#cbd5e1', margin: '0 0 8px 0' }}><strong>Inquiries:</strong> {GLOBAL_TENANT_DATA.contact.email}</p>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', display: 'block', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}>DIRECT DISPATCH HOTLINES</span>
            {GLOBAL_TENANT_DATA.contact.hotlines.map((h, i) => (
              <div key={i} style={{ fontSize: '15px', fontWeight: 'bold', color: theme.accentColor, marginTop: '4px' }}>📞 {h}</div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8' }}>
        <div>© 2026 {GLOBAL_TENANT_DATA.businessName} Digital Platform. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>B2B Terms of Trade</span>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};
