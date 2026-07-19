import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const DevTools: React.FC = () => {
  const { session, switchRole, tFix } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      <div style={{ marginBottom: '30px', borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{tFix("System DevTools")}</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Developer panel to simulate different user sessions and test platform behaviors.</p>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
        <h3 style={{ marginTop: 0, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          Current Session State
        </h3>
        <pre style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '4px', fontSize: '13px', color: '#334155', overflowX: 'auto' }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          Session Management (Login Simulation)
        </h3>
        
        <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
          <button 
            onClick={() => switchRole('PUBLIC')} 
            style={{ padding: '12px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#0f172a', textAlign: 'left' }}
          >
            👤 Logout (Simulate Guest Visitor)
          </button>
          
          <button 
            onClick={() => switchRole('DEALER')} 
            style={{ padding: '12px', backgroundColor: '#e0f2fe', border: '1px solid #7dd3fc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#0369a1', textAlign: 'left' }}
          >
            🏢 Simulate DEALER Login (Wholesale Rates)
          </button>

          <button 
            onClick={() => switchRole('ADMIN')} 
            style={{ padding: '12px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#991b1b', textAlign: 'left' }}
          >
            🛡️ Simulate ADMIN Login (Back-Office Access)
          </button>
        </div>
      </div>

    </div>
  );
};
