import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export const Toast: React.FC = () => {
  const { toasts, clearToast, tFix } = useAppState();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)', // This locks it perfectly in the center!
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '90%', // Ensures it doesn't break out of the phone screen
      maxWidth: '400px', // Keeps it from getting too wide on a computer
      pointerEvents: 'none' // Allows scrolling underneath the popups
    }}>
      {toasts.map((toast) => (
        <div key={toast.id} style={{
          pointerEvents: 'auto',
          backgroundColor: toast.type === 'error' ? '#fef2f2' : toast.type === 'warning' ? '#fffbeb' : toast.type === 'success' ? '#f0fdf4' : '#f8fafc',
          border: `1px solid ${toast.type === 'error' ? '#f87171' : toast.type === 'warning' ? '#fbbf24' : toast.type === 'success' ? '#4ade80' : '#cbd5e1'}`,
          color: '#0f172a', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>{tFix(toast.title)}</strong>
            <span style={{ fontSize: '13px', color: '#475569' }}>{tFix(toast.message)}</span>
          </div>
          <button onClick={() => clearToast(toast.id)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b', padding: '0 0 0 10px' }}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
