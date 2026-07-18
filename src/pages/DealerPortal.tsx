import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const DealerPortal: React.FC = () => {
  const { session, orders, submitKYC } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  // Registration Form State Variables 
  const [bizName, setBizName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [bizVolume, setBizVolume] = useState('100k-500k');

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      {!session.isAuthenticated ? (
        
        // VIEW A: The Registration / KYC Form for new businesses
        <div style={{ maxWidth: '600px', margin: '60px auto', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ marginTop: 0, color: '#0f172a' }}>B2B Account Registration</h2>
          <p style={{ color: '#64748b' }}>
            Request wholesale pricing and submit high-volume order manifests directly from the {GLOBAL_TENANT_DATA.businessName} logistics engine.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '30px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>LEGAL CORPORATE ENTITY NAME</label>
              <input type="text" value={bizName} onChange={(e)=>setBizName(e.target.value)} placeholder="e.g. Acme Spares Pvt. Ltd." style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>NATIONAL PAN / VAT REGISTRATION NUMBER</label>
              <input type="text" value={panNumber} onChange={(e)=>setPanNumber(e.target.value)} placeholder="9-Digit Taxpayer ID" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>ESTIMATED MONTHLY PROCUREMENT VOLUMES</label>
              <select value={bizVolume} onChange={(e)=>setBizVolume(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                <option value="100k-500k">Level 1 (Up to 500k)</option>
                <option value="500k-2m">Level 2 (500k - 2 Million)</option>
                <option value="2m+">Level 3 (2 Million+ Enterprise Tier)</option>
              </select>
            </div>
            <button onClick={() => submitKYC({ bizName, panNumber, bizVolume })} style={{ padding: '16px', backgroundColor: theme.primaryColor, color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
              Transmit Corporate Verification Manifest
            </button>
          </div>
        </div>

      ) : (

        // VIEW B: The Verified B2B Dashboard
        <div>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', color: theme.accentColor, fontWeight: 'bold', textTransform: 'uppercase' }}>
                B2B ACCOUNT WORKSPACE
              </span>
              <h1 style={{ margin: '6px 0 0 0', fontSize: '28px', color: '#0f172a' }}>{session.companyName || "Verified Corporate Affiliate"}</h1>
              <p style={{ margin: '6px 0 0 0', color: '#64748b' }}>Security Scope: {session.role} Portfolio Matrix</p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>COMPLIANCE KYC STATE</span>
              <span style={{
                display: 'inline-block', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', marginTop: '6px',
                backgroundColor: session.kycStatus === 'VERIFIED' ? '#dcfce7' : '#fef9c3', 
                color: session.kycStatus === 'VERIFIED' ? '#16a34a' : '#ca8a04'
              }}>
                ⚡ Status: {session.kycStatus}
              </span>
            </div>
          </div>

          <h2 style={{ marginBottom: '20px', color: '#0f172a' }}>Historical Procurement Logs</h2>
          
          {orders.length === 0 ? (
            <p style={{ color: '#64748b' }}>You have not placed any orders yet. Visit the catalog to initiate an order.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map((order) => (
                <div key={order.id} style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0f172a' }}>Transaction: {order.orderNumber}</span>
                      <span style={{ marginLeft: '20px', color: '#64748b', fontSize: '14px' }}>Logged: {order.date}</span>
                    </div>
                    <span style={{
                      padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                      backgroundColor: order.status === 'DELIVERED' ? '#dcfce7' : '#f1f5f9', 
                      color: order.status === 'DELIVERED' ? '#16a34a' : '#475569'
                    }}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', margin: '8px 0', color: '#475569' }}>
                        <span>{item.name} (SKU: {item.sku}) <strong style={{color: '#0f172a'}}>x {item.quantity} units</strong></span>
                        <span style={{ fontWeight: '600', color: '#0f172a' }}>{GLOBAL_TENANT_DATA.currencySymbol} {item.pricePaidNPR * item.quantity}</span>
                      </div>
                    ))}
                    <div style={{ textAlign: 'right', marginTop: '16px', borderTop: '1px dashed #cbd5e1', paddingTop: '16px', fontWeight: 'bold', fontSize: '18px', color: theme.primaryColor }}>
                      Total Manifest Settlement: {GLOBAL_TENANT_DATA.currencySymbol} {order.totalAmountNPR}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
