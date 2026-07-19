import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';
import { useIsMobile } from '../hooks/useIsMobile';

export const AdminDashboard: React.FC = () => {
const { session, orders, navigateTo } = useAppState();
const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
const isMobile = useIsMobile();

const [activeTab, setActiveTab] = useState('overview');

// Security Check: Kick out non-admins
if (session.role !== 'ADMIN' && session.role !== 'SYSTEM_ADMIN') {
return (
<div style={{ padding: theme.spacing.xxl, textAlign: 'center', fontFamily: theme.typography.family }}>
<h2 style={{ color: theme.colors.status.error }}>Access Denied
You do not have permission to view the administrative console.
<button onClick={() => navigateTo('home')} style={{ padding: ${theme.spacing.sm} ${theme.spacing.lg}, backgroundColor: theme.primaryColor, color: theme.colors.text.inverse, border: 'none', borderRadius: theme.radii.md, cursor: 'pointer' }}>Return to Home

);
}

// --- MOCK DATA FOR DEMONSTRATION (This will connect to the DB later) ---
const metrics = {
pendingDealerApprovals: 3,
totalSalesToday: 145000,
lowStockAlerts: 12,
ordersAwaitingDispatch: 5,
ordersUnderProcessing: 8,
newOrders: 4
};

const pendingKYC = [
{ id: 'D-101', name: 'Kisan Traders', location: 'Surkhet', status: 'Documents Uploaded' },
{ id: 'D-102', name: 'AgriMech Suppliers', location: 'Dang', status: 'Pending Review' },
{ id: 'D-103', name: 'Rapti Spares', location: 'Tulsipur', status: 'Documents Uploaded' }
];

// ------------------------------------------------------------------------

// Dashboard Metric Card Component
const MetricCard = ({ title, value, color, icon, alert }: { title: string, value: string | number, color: string, icon: string, alert?: boolean }) => (
<div style={{
backgroundColor: theme.colors.surface.card,
padding: theme.spacing.lg,
borderRadius: theme.radii.md,
border: 1px solid ${alert ? theme.colors.status.error : theme.colors.border.default},
boxShadow: theme.shadows.card,
display: 'flex',
flexDirection: 'column',
gap: theme.spacing.sm,
borderLeft: 4px solid ${color}
}}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<span style={{ fontSize: theme.typography.size.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.weight.bold }}>{title}
<span style={{ fontSize: '20px' }}>{icon}

<div style={{ fontSize: theme.typography.size.h2, fontWeight: theme.typography.weight.black, color: theme.colors.text.primary }}>
{value}


);

return (
<div style={{ display: 'flex', minHeight: '85vh', backgroundColor: theme.colors.surface.background, fontFamily: theme.typography.family, flexDirection: isMobile ? 'column' : 'row' }}>

  {/* Sidebar Navigation */}
  <aside style={{ 
    width: isMobile ? '100%' : '250px', 
    backgroundColor: theme.primaryColor, 
    color: theme.colors.text.inverse,
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md
  }}>
    <div style={{ fontSize: theme.typography.size.lg, fontWeight: theme.typography.weight.black, marginBottom: theme.spacing.xl, borderBottom: `1px solid ${theme.colors.border.dark}`, paddingBottom: theme.spacing.md }}>
      ⚙️ Command Center
    </div>
    
    {['overview', 'orders', 'dealers', 'inventory', 'workflow'].map((tab) => (
      <button 
        key={tab}
        onClick={() => setActiveTab(tab)}
        style={{
          padding: theme.spacing.md,
          backgroundColor: activeTab === tab ? theme.colors.surface.hover : 'transparent',
          color: activeTab === tab ? theme.colors.text.primary : theme.colors.text.inverse,
          border: 'none',
          borderRadius: theme.radii.md,
          textAlign: 'left',
          fontWeight: theme.typography.weight.bold,
          cursor: 'pointer',
          transition: 'all 0.2s',
          textTransform: 'capitalize'
        }}
      >
        {tab}
      </button>
    ))}
  </aside>

  {/* Main Content Area */}
  <main style={{ flex: 1, padding: isMobile ? theme.spacing.lg : theme.spacing.xxl, overflowY: 'auto' }}>
    
    {activeTab === 'overview' && (
      <div>
        <h1 style={{ margin: `0 0 ${theme.spacing.xl} 0`, fontSize: theme.typography.size.h2, color: theme.colors.text.primary }}>Business Overview</h1>
        
        {/* The 6 Critical Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '140px' : '200px'}, 1fr))`, gap: theme.spacing.lg, marginBottom: theme.spacing.xxl }}>
          <MetricCard title="New Orders" value={metrics.newOrders} color={theme.accentColor} icon="🆕" />
          <MetricCard title="Processing" value={metrics.ordersUnderProcessing} color={theme.colors.status.warning} icon="⚙️" />
          <MetricCard title="Awaiting Dispatch" value={metrics.ordersAwaitingDispatch} color={theme.colors.status.success} icon="🚚" />
          <MetricCard title="Low Stock Alerts" value={metrics.lowStockAlerts} color={theme.colors.status.error} icon="⚠️" alert={metrics.lowStockAlerts > 10} />
          <MetricCard title="Dealer Approvals" value={metrics.pendingDealerApprovals} color={theme.colors.status.warning} icon="📝" alert={metrics.pendingDealerApprovals > 0} />
          <MetricCard title="Sales Today" value={`Rs. ${metrics.totalSalesToday.toLocaleString()}`} color={theme.primaryColor} icon="📈" />
        </div>

        {/* Action Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '100%' : '400px'}, 1fr))`, gap: theme.spacing.lg }}>
          
          {/* Needs Attention: Dealers */}
          <div style={{ backgroundColor: theme.colors.surface.card, padding: theme.spacing.lg, borderRadius: theme.radii.md, border: `1px solid ${theme.colors.border.default}`, boxShadow: theme.shadows.card }}>
            <h3 style={{ margin: `0 0 ${theme.spacing.md} 0`, color: theme.colors.text.primary, borderBottom: `1px solid ${theme.colors.border.default}`, paddingBottom: theme.spacing.sm }}>📝 KYC Pending Review</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: theme.typography.size.sm }}>
              <tbody>
                {pendingKYC.map((dealer, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                    <td style={{ padding: theme.spacing.sm, fontWeight: theme.typography.weight.bold }}>{dealer.name}</td>
                    <td style={{ padding: theme.spacing.sm, color: theme.colors.text.secondary }}>{dealer.location}</td>
                    <td style={{ padding: theme.spacing.sm, textAlign: 'right' }}>
                      <button style={{ padding: '4px 8px', backgroundColor: theme.colors.surface.hover, border: `1px solid ${theme.colors.border.dark}`, borderRadius: theme.radii.sm, cursor: 'pointer', fontSize: theme.typography.size.xs }}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )}

    {/* Placeholders for other tabs */}
    {activeTab !== 'overview' && (
      <div style={{ backgroundColor: theme.colors.surface.card, padding: theme.spacing.xl, borderRadius: theme.radii.lg, border: `1px solid ${theme.colors.border.default}`, textAlign:
