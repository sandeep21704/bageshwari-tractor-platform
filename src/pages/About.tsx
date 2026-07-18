import React from 'react';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const About: React.FC = () => {
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  const { aboutUs, businessName, tagline } = GLOBAL_TENANT_DATA;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '80vh' }}>
      
      {/* 1. Hero Section */}
      <section style={{ 
        background: theme.bannerBackground, 
        color: theme.bannerTextColor, 
        padding: '80px 20px', 
        textAlign: 'center', 
        borderBottom: `4px solid ${theme.accentColor}` 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.accentColor, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            ABOUT OUR ENTERPRISE
          </span>
          <h1 style={{ fontSize: '42px', margin: '0 0 20px 0', fontWeight: '900', lineHeight: '1.2' }}>
            Driving the Future of {GLOBAL_TENANT_DATA.businessType.replace('_', ' ')}
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: '1.6' }}>
            {tagline}
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Dual Cards */}
      <section style={{ maxWidth: '1200px', margin: '-40px auto 40px auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${theme.primaryColor}` }}>
            <h3 style={{ fontSize: '24px', color: '#0f172a', margin: '0 0 16px 0' }}>Our Mission</h3>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.7', margin: 0 }}>{aboutUs.mission}</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${theme.secondaryColor}` }}>
            <h3 style={{ fontSize: '24px', color: '#0f172a', margin: '0 0 16px 0' }}>Our Vision</h3>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.7', margin: 0 }}>{aboutUs.vision}</p>
          </div>

        </div>
      </section>

      {/* 3. Company History Timeline */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#0f172a', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}>
          ESTABLISHED {aboutUs.establishedYear}
        </span>
        <h2 style={{ fontSize: '32px', color: '#0f172a', margin: '0 0 24px 0' }}>The {businessName} Story</h2>
        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.8', margin: 0 }}>
          {aboutUs.history}
        </p>
      </section>

      {/* 4. Core Values Grid */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', color: '#0f172a', margin: '0 0 48px 0' }}>Our Core Values</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {aboutUs.coreValues.map((value, idx) => (
              <div key={idx} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{value.icon}</div>
                <h3 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 12px 0' }}>{value.title}</h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
