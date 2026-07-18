import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MAIN_NAVIGATION } from '../../data/navigation';
import { GLOBAL_TENANT_DATA } from '../../data/tenantConfig';
import { getThemeTokens } from '../../utils/themeEngine';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Header: React.FC = () => {
  const { session, cart, currentScreen, navigateTo, tFix } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const allowedNav = MAIN_NAVIGATION.filter(item => item.rolesPermitted.includes(session.role));
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMenuOpen(false); 
  };

  return (
    <header style={{ borderBottom: `1px solid ${theme.colors.border.default}`, backgroundColor: theme.colors.surface.card, fontFamily: theme.typography.family }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: theme.primaryColor, color: theme.colors.text.inverse, padding: `${theme.spacing.sm} ${theme.spacing.md}`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: theme.typography.size.xs, gap: theme.spacing.sm, textAlign: 'center' }}>
        {!isMobile && <div>📍 {tFix("Location:")} {GLOBAL_TENANT_DATA.contact.hqAddress}, {GLOBAL_TENANT_DATA.contact.district}</div>}
        <div style={{ display: 'flex', gap: theme.spacing.lg, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span>📞 {tFix("Support:")} {GLOBAL_TENANT_DATA.contact.hotlines[0]}</span>
          <div id="google_translate_element" style={{ backgroundColor: theme.colors.surface.card, borderRadius: theme.radii.sm, padding: '2px', height: '28px', overflow: 'hidden' }}></div>
        </div>
      </div>
      
      {/* Main Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? `${theme.spacing.md} ${theme.spacing.md}` : `${theme.spacing.lg} ${theme.spacing.xl}`, maxWidth: '1400px', margin: '0 auto', flexWrap: 'wrap' }}>
        
        {/* Logo */}
        <div onClick={() => navigateTo('products')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
          {GLOBAL_TENANT_DATA.logoUrl ? (
            <img src={GLOBAL_TENANT_DATA.logoUrl} alt="Logo" style={{ height: isMobile ? '35px' : '45px', objectFit: 'contain' }} />
          ) : (
            <div className="notranslate" style={{ padding: `${theme.spacing.sm} ${theme.spacing.md}`, backgroundColor: theme.primaryColor, color: theme.colors.text.inverse, fontWeight: theme.typography.weight.black, borderRadius: theme.radii.sm, fontSize: isMobile ? theme.typography.size.md : theme.typography.size.lg }}>
              {GLOBAL_TENANT_DATA.businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${theme.colors.border.dark}`, paddingLeft: theme.spacing.md }}>
            <span className="notranslate" style={{ fontSize: isMobile ? theme.typography.size.md : theme.typography.size.lg, fontWeight: theme.typography.weight.black, color: theme.colors.text.primary, letterSpacing: '0.5px' }}>
              {GLOBAL_TENANT_DATA.businessName.toUpperCase()}
            </span>
            {!isMobile && (
              <span style={{ fontSize: theme.typography.size.micro, fontWeight: theme.typography.weight.bold, color: theme.colors.text.muted, letterSpacing: '1px' }}>{tFix("ONLINE STORE")}</span>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            {isMobile && (
              <button onClick={() => navigateTo('cart')} style={{ position: 'relative', background: theme.colors.surface.hover, border: 'none', padding: `${theme.spacing.sm} ${theme.spacing.md}`, borderRadius: theme.radii.md, cursor: 'pointer', fontWeight: theme.typography.weight.bold, color: theme.colors.text.primary, fontSize: theme.typography.size.xs }}>
                🛒 {totalCartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: theme.badgeBackground, color: theme.colors.text.inverse, fontSize: theme.typography.size.micro, borderRadius: theme.radii.circle, padding: '2px 6px' }}>{totalCartCount}</span>}
              </button>
            )}
            {isMobile && (
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: `1px solid ${theme.colors.border.dark}`, padding: `${theme.spacing.sm} ${theme.spacing.md}`, borderRadius: theme.radii.sm, fontSize: theme.typography.size.lg, cursor: 'pointer' }}>
                ☰
              </button>
            )}
        </div>

        {/* Navigation */}
        <nav style={{ 
          display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: isMobile ? theme.spacing.md : theme.spacing.xl, 
          width: isMobile ? '100%' : 'auto',
          marginTop: isMobile && menuOpen ? theme.spacing.lg : '0',
          borderTop: isMobile && menuOpen ? `1px solid ${theme.colors.border.default}` : 'none',
          paddingTop: isMobile && menuOpen ? theme.spacing.lg : '0'
        }}>
          {allowedNav.map(item => {
            const isActive = currentScreen === item.path;
            return (
              <button key={item.path} onClick={() => handleNavClick(item.path)} style={{
                background: 'none', border: 'none', padding: `${theme.spacing.sm} 0`, fontSize: theme.typography.size.md, fontWeight: isActive ? theme.typography.weight.bold : theme.typography.weight.medium,
                color: isActive ? theme.accentColor : theme.colors.text.primary, borderBottom: !isMobile && isActive ? `2px solid ${theme.accentColor}` : '2px solid transparent', 
                textAlign: isMobile ? 'left' : 'center', cursor: 'pointer'
              }}>
                {tFix(item.label)}
              </button>
            );
          })}
        </nav>

        {/* Desktop Cart */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xl }}>
            <button onClick={() => navigateTo('cart')} style={{ position: 'relative', background: theme.colors.surface.hover, border: 'none', padding: `${theme.spacing.sm} ${theme.spacing.lg}`, borderRadius: theme.radii.md, cursor: 'pointer', fontWeight: theme.typography.weight.bold, color: theme.colors.text.primary }}>
              🛒 {tFix("Cart")}
              {totalCartCount > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: theme.badgeBackground, color: theme.colors.text.inverse, fontSize: theme.typography.size.xs, borderRadius: theme.radii.circle, padding: '2px 8px', fontWeight: theme.typography.weight.bold }}>{totalCartCount}</span>}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: theme.typography.size.xs }}>
              <span style={{ fontWeight: theme.typography.weight.bold, color: theme.colors.text.primary }}>{session.username}</span>
              <span style={{ backgroundColor: theme.colors.border.default, padding: '2px 8px', borderRadius: theme.radii.sm, color: theme.colors.text.secondary, fontSize: theme.typography.size.micro, marginTop: '4px', fontWeight: theme.typography.weight.bold }}>Role: {session.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
