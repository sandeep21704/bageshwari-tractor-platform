import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Bageshwari Tractor Operations Center.</p>
      
      {/* HUD Metrics Placeholder */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
        <div style={{ padding: '16px', border: '1px solid #ccc' }}>Pending Approvals</div>
        <div style={{ padding: '16px', border: '1px solid #ccc' }}>Total Sales Today</div>
        <div style={{ padding: '16px', border: '1px solid #ccc' }}>Low Stock Alerts</div>
        <div style={{ padding: '16px', border: '1px solid #ccc' }}>Orders Awaiting Dispatch</div>
        <div style={{ padding: '16px', border: '1px solid #ccc' }}>Orders Under Processing</div>
        <div style={{ padding: '16px', border: '1px solid #ccc' }}>New Orders</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
