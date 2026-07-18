import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MAIN_NAVIGATION } from '../../data/navigation';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { getThemeTokens } from '../../utils/themeEngine';

export const Header: React.FC = () => {
  const { session, cart, currentScreen, navigateTo } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  const allowedNav = MAIN_NAVIGATION.filter(item => item.rolesPermitted.includes(session.role));
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: theme.primaryColor, color: '#ffffff', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
        <div>🗺️ Logistics Hub: {GLOBAL_TENANT_DATA.contact.hqAddress}, {GLOBAL_TENANT_DATA.contact.district}</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>📞 Hotline: {GLOBAL_TENANT_DATA.contact.hotlines.join(" / ")}</span>
          <a href={`https://wa.me/${GLOBAL_TENANT_DATA.contact.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ color: theme.accentColor, textDecoration: 'none', fontWeight: 'bold' }}>
            💬 B2B WhatsApp Support
          </a>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* BRAND LOGO AND NAME AREA */}
        <div onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {GLOBAL_TENANT_DATA.logoUrl ? (
            <img 
              src={GLOBAL_TENANT_DATA.logoUrl} 
              alt={`${GLOBAL_TENANT_DATA.businessName} Logo`} 
              style={{ height: '45px', objectFit: 'contain' }} 
            />
          ) : (
            <div style={{ padding: '8px 14px', backgroundColor: theme.primaryColor, color: '#fff', fontWeight: 900, borderRadius: '4px', letterSpacing: '1px', fontSize: '18px' }}>
              {GLOBAL_TENANT_DATA.businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          
          {/* We added the Business Name text right next to the logo here */}
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #cbd5e1', paddingLeft: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.5px' }}>
              {GLOBAL_TENANT_DATA.businessName.toUpperCase()}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', letterSpacing: '1px' }}>
              B2B WHOLESALE ENGINE
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '24px' }}>
          {allowedNav.map(item => {
            const isActive = currentScreen === item.path;
            return (
              <button key={item.path} onClick={() => navigateTo(item.path)} style={{
                background: 'none', border: 'none', padding: '8px 0', fontSize: '15px', fontWeight: isActive ? '700' : '500',
                color: isActive ? theme.accentColor : '#0f172a', 
                borderBottom: isActive ? `2px solid ${theme.accentColor}` : '2px solid transparent', 
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => navigateTo('cart')} style={{ position: 'relative', background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#0f172a' }}>
            📦 Order Manifest
            {totalCartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: theme.badgeBackground, color: '#fff', fontSize: '12px', borderRadius: '50%', padding: '2px 8px', fontWeight: 'bold' }}>
                {totalCartCount}
              </span>
            )}
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '12px' }}>
            <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{session.username}</span>
            <span style={{ backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', color: '#475569', fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>
              Role: {session.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
