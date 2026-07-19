import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';
import { useIsMobile } from '../hooks/useIsMobile';

export const AdminDashboard: React.FC = () => {
  const { session, navigateTo } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  const isMobile = useIsMobile();
  
  // Security Check: Kick out non-admins
  if (session.role !== 'ADMIN') {
    return (
      <div style={{ padding: theme.spacing.xxl, textAlign: 'center', fontFamily: theme.typography.family }}>
        <h2 style={{ color: theme.colors.status.error }}>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => navigateTo('products')} style={{ padding: theme.spacing.md, backgroundColor: theme.primaryColor, color: '#fff', borderRadius: theme.radii.md, border: 'none', cursor: 'pointer' }}>
          Return to Store
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Pending Dealer Approvals', value: '3', color: theme.colors.status.warning },
    { label: 'Total Sales Today', value: `Rs. 2,45,000`, color: theme.colors.status.success },
    { label: 'Low Stock Alerts', value: '12', color: theme.colors.status.error },
    { label: 'Orders Awaiting Dispatch', value: '5', color: theme.primaryColor },
    { label: 'All Orders Processing', value: '18', color: theme.colors.status.warning },
    { label: 'New Orders', value: '8', color: theme.colors.status.success }
  ];

  return (
    <div style={{ padding: isMobile ? theme.spacing.md : theme.spacing.xl, fontFamily: theme.typography.family, maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: theme.colors.text.primary }}>Operations Command Center</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.lg, marginBottom: theme.spacing.xxl }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ backgroundColor: theme.colors.surface.card, padding: theme.spacing.lg, borderRadius: theme.radii.lg, border: `1px solid ${theme.colors.border.default}`, borderLeft: `4px solid ${stat.color}` }}>
            <div style={{ fontSize: theme.typography.size.xs, color: theme.colors.text.muted, textTransform: 'uppercase' }}>{stat.label}</div>
            <div style={{ fontSize: theme.typography.size.h2, fontWeight: theme.typography.weight.black }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
