import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const AdminPortal: React.FC = () => {
  const { session, orders, tFix } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);

  // Security check: Only allow ADMIN to see this page
  if (session.role !== 'ADMIN') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#dc2626' }}>Restricted Access</h2>
        <p style={{ color: '#64748b' }}>You must be logged in as an Administrator to view the command center.</p>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'PENDING_REVIEW');

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      <div style={{ marginBottom: '30px', borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{tFix("Admin Command Center")}</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Manage orders, approve dealers, and monitor regional operations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Order Management Widget */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', borderTop: `4px solid ${theme.accentColor}` }}>
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Order Management</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.primaryColor, marginBottom: '8px' }}>
            {pendingOrders.length}
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Orders requiring dispatch approval</p>
        </div>

        {/* KYC & Dealer Onboarding Widget */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Dealer KYC Approvals</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d97706', marginBottom: '8px' }}>
            0
          </div>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Pending business account registrations</p>
        </div>

        {/* Regional Territory Widget */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', borderTop: '4px solid #10b981' }}>
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Sales Territories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Eastern Region:</span>
              <span style={{ fontSize: '12px', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Western Region:</span>
              <span style={{ fontSize: '12px', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>Active</span>
            </div>
          </div>
        </div>

      </div>

      {/* Live Order Feed */}
      <h2 style={{ color: '#0f172a', marginBottom: '16px' }}>Incoming Order Feed</h2>
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '16px', color: '#475569' }}>Order Ref</th>
              <th style={{ padding: '16px', color: '#475569' }}>Date</th>
              <th style={{ padding: '16px', color: '#475569' }}>Value</th>
              <th style={{ padding: '16px', color: '#475569' }}>Status</th>
              <th style={{ padding: '16px', color: '#475569' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No orders in the system yet.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 'bold' }}>{order.orderNumber}</td>
                  <td style={{ padding: '16px' }}>{order.date}</td>
                  <td style={{ padding: '16px' }}>{GLOBAL_TENANT_DATA.currencySymbol} {order.totalAmountNPR}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button style={{ backgroundColor: theme.primaryColor, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
