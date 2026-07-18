import React from 'react';
import { useAppState } from '../context/AppStateContext';

export const DevTools: React.FC = () => {
  const { session, switchRole } = useAppState();

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '60vh', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginTop: 0, color: '#dc2626' }}>🔧 Sandbox Validation & Control Rig</h2>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        This module allows you to emulate authentication tokens and test wholesale pricing configurations instantly.
      </p>

      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '6px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', color: '#0f172a' }}>Current Active Profile</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#475569' }}>
          <li style={{ padding: '6px 0' }}><strong>Identity Scope:</strong> {session.role}</li>
          <li style={{ padding: '6px 0' }}><strong>Operator Name:</strong> {session.username}</li>
          <li style={{ padding: '6px 0' }}><strong>KYC Pipeline State:</strong> {session.kycStatus}</li>
        </ul>
      </div>

      <h3 style={{ color: '#0f172a' }}>Emulate B2B Customer Tiers</h3>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
        Clicking these buttons will alter your access level and instantly recalculate all catalog pricing:
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={() => switchRole('PUBLIC')} style={{ padding: '12px 20px', backgroundColor: session.role === 'PUBLIC' ? '#0f172a' : '#e2e8f0', color: session.role === 'PUBLIC' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Public (Standard MRP)
        </button>
        <button onClick={() => switchRole('REGISTERED_B2B')} style={{ padding: '12px 20px', backgroundColor: session.role === 'REGISTERED_B2B' ? '#0284c7' : '#e2e8f0', color: session.role === 'REGISTERED_B2B' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Wholesaler Tier (Level 1 Discount)
        </button>
        <button onClick={() => switchRole('DEALER')} style={{ padding: '12px 20px', backgroundColor: session.role === 'DEALER' ? '#16a34a' : '#e2e8f0', color: session.role === 'DEALER' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Contracted Dealer (Maximum Discount)
        </button>
      </div>
    </div>
  );
};
