import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const Cart: React.FC = () => {
  const { cart, session, updateCartQty, removeFromCart, executeCheckout, navigateTo } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  const [deliveryMethod, setDeliveryMethod] = useState<string>('CENTRAL_DEPOT_PICKUP');
  const [paymentTerms, setPaymentTerms] = useState<string>('CASH_ON_DELIVERY');

  const calcItemPrice = (product: any) => {
    if (session.role === 'DEALER') return product.dealerPriceNPR;
    if (session.role === 'REGISTERED_B2B') return product.wholesalePriceNPR;
    return product.mrpNPR;
  };

  const totalSummary = cart.reduce((sum, item) => sum + (calcItemPrice(item.product) * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>Your Cart is Empty</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Looks like you haven't added any products to your cart yet.</p>
        <button onClick={() => navigateTo('products')} style={{ padding: '12px 24px', backgroundColor: theme.primaryColor, color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '10px', color: '#0f172a' }}>
          Shopping Cart
        </h2>
        
        {cart.map((item) => {
          const itemPrice = calcItemPrice(item.product);
          const subtotal = itemPrice * item.quantity;
          
          return (
            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ flex: 2 }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block' }}>SKU: {item.product.sku}</span>
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#0f172a' }}>{item.product.name}</span>
                <span style={{ fontSize: '12px', display: 'block', color: '#64748b', marginTop: '4px' }}>Unit: {item.product.packSize}</span>
              </div>
              
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <input 
                  type="number" 
                  min={item.product.minimumOrderQuantity} 
                  value={item.quantity}
                  onChange={(e) => updateCartQty(item.product.id, parseInt(e.target.value) || item.product.minimumOrderQuantity)}
                  style={{ width: '70px', padding: '6px', textAlign: 'center', borderRadius: '4px', border: '1px solid #cbd5e1' }} 
                />
              </div>

              <div style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', color: '#0f172a' }}>
                <div>{GLOBAL_TENANT_DATA.currencySymbol} {subtotal}</div>
                <button onClick={() => removeFromCart(item.product.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', cursor: 'pointer', padding: '4px 0', marginTop: '4px' }}>
                  🗑️ Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a' }}>
          Checkout Options
        </h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>DELIVERY METHOD</label>
          <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <option value="CENTRAL_DEPOT_PICKUP">Store Pickup ({GLOBAL_TENANT_DATA.contact.hqAddress})</option>
            <option value="NATIONAL_EXPRESS_FREIGHT">Standard Shipping</option>
            <option value="REGIONAL_DISTRIBUTION_TRUCK">Express Delivery</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>PAYMENT METHOD</label>
          <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <option value="CASH_ON_DELIVERY">Cash on Delivery (COD)</option>
            <option value="BANK_WIRE_TRANSFER">Bank Transfer / eSewa</option>
            <option value="DEALER_CREDIT_FACILITY" disabled={session.role !== 'DEALER'}>
              Credit Account (Dealers Only)
            </option>
          </select>
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '15px', color: '#475569' }}>
            <span>Subtotal:</span>
            <span style={{ fontWeight: 'bold' }}>{GLOBAL_TENANT_DATA.currencySymbol} {totalSummary}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', borderTop: '2px solid #cbd5e1', paddingTop: '10px', color: theme.primaryColor }}>
            <span>Total:</span>
            <span>{GLOBAL_TENANT_DATA.currencySymbol} {totalSummary}</span>
          </div>
        </div>

        <button onClick={() => executeCheckout(deliveryMethod, paymentTerms)} style={{
          width: '100%', padding: '16px', backgroundColor: theme.badgeBackground, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s'
        }}>
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
};
