import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export const Toast: React.FC = () => {
  const { toasts, clearToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', width: '100%', fontFamily: 'sans-serif' }}>
      {toasts.map((t) => {
        let borderColor = '#0f172a';
        if (t.type === 'success') borderColor = '#16a34a';
        if (t.type === 'error') borderColor = '#dc2626';
        if (t.type === 'warning') borderColor = '#ca8a04';
        if (t.type === 'info') borderColor = '#2563eb';

        return (
          <div key={t.id} style={{
            backgroundColor: '#ffffff', color: '#0f172a', padding: '16px', borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderLeft: `6px solid ${borderColor}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
          }}>
            <div>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>{t.title}</strong>
              <span style={{ fontSize: '13px', color: '#475569' }}>{t.message}</span>
            </div>
            <button onClick={() => clearToast(t.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', padding: '0 0 0 10px' }}>
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
