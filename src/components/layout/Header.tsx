import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MAIN_NAVIGATION } from '../../data/navigation';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { getThemeTokens } from '../../utils/themeEngine';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Header: React.FC = () => {
  const { session, cart, currentScreen, navigateTo, tFix } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Activate the mobile detector!
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const allowedNav = MAIN_NAVIGATION.filter(item => item.rolesPermitted.includes(session.role));
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMenuOpen(false); // Close the mobile menu after clicking a link
  };

  return (
    <header style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* Top Banner (Condenses on Mobile) */}
      <div style={{ backgroundColor: theme.primaryColor, color: '#ffffff', padding: '8px 10px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', gap: '8px', textAlign: 'center' }}>
        {!isMobile && <div>📍 {tFix("Location:")} {GLOBAL_TENANT_DATA.contact.hqAddress}, {GLOBAL_TENANT_DATA.contact.district}</div>}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span>📞 {tFix("Support:")} {GLOBAL_TENANT_DATA.contact.hotlines[0]}</span>
          <div id="google_translate_element" style={{ backgroundColor: '#ffffff', borderRadius: '4px', padding: '2px', height: '28px', overflow: 'hidden' }}></div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 10px' : '16px 20px', maxWidth: '1400px', margin: '0 auto', flexWrap: 'wrap' }}>
        
        {/* Logo (Shrinks on Mobile) */}
        <div onClick={() => navigateTo('products')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {GLOBAL_TENANT_DATA.logoUrl ? (
            <img src={GLOBAL_TENANT_DATA.logoUrl} alt="Logo" style={{ height: isMobile ? '35px' : '45px', objectFit: 'contain' }} />
          ) : (
            <div className="notranslate" style={{ padding: '6px 10px', backgroundColor: theme.primaryColor, color: '#fff', fontWeight: 900, borderRadius: '4px', fontSize: isMobile ? '14px' : '18px' }}>
              {GLOBAL_TENANT_DATA.businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #cbd5e1', paddingLeft: '10px' }}>
            <span className="notranslate" style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.5px' }}>
              {GLOBAL_TENANT_DATA.businessName.toUpperCase()}
            </span>
            {!isMobile && (
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', letterSpacing: '1px' }}>{tFix("ONLINE STORE")}</span>
            )}
          </div>
        </div>

        {/* Mobile Controls (Hamburger & Cart) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isMobile && (
              <button onClick={() => navigateTo('cart')} style={{ position: 'relative', background: '#f1f5f9', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#0f172a', fontSize: '12px' }}>
                🛒 {totalCartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: theme.badgeBackground, color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px' }}>{totalCartCount}</span>}
              </button>
            )}
            {isMobile && (
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '4px', fontSize: '18px', cursor: 'pointer' }}>
                ☰
              </button>
            )}
        </div>

        {/* Navigation Links (Turns into dropdown on mobile) */}
        <nav style={{ 
          display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: isMobile ? '10px' : '24px', 
          width: isMobile ? '100%' : 'auto',
          marginTop: isMobile && menuOpen ? '16px' : '0',
          borderTop: isMobile && menuOpen ? '1px solid #e2e8f0' : 'none',
          paddingTop: isMobile && menuOpen ? '16px' : '0'
        }}>
          {allowedNav.map(item => {
            const isActive = currentScreen === item.path;
            return (
              <button key={item.path} onClick={() => handleNavClick(item.path)} style={{
                background: 'none', border: 'none', padding: '8px 0', fontSize: '15px', fontWeight: isActive ? '700' : '500',
                color: isActive ? theme.accentColor : '#0f172a', borderBottom: !isMobile && isActive ? `2px solid ${theme.accentColor}` : '2px solid transparent', 
                textAlign: isMobile ? 'left' : 'center', cursor: 'pointer'
              }}>
                {tFix(item.label)}
              </button>
            );
          })}
        </nav>

        {/* Desktop Cart & Role Indicator */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => navigateTo('cart')} style={{ position: 'relative', background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#0f172a' }}>
              🛒 {tFix("Cart")}
              {totalCartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: theme.badgeBackground, color: '#fff', fontSize: '12px', borderRadius: '50%', padding: '2px 8px', fontWeight: 'bold' }}>{totalCartCount}</span>}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{session.username}</span>
              <span style={{ backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', color: '#475569', fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>Role: {session.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
