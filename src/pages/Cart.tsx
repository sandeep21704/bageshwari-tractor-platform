import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { GLOBAL_TENANT_DATA } from '../data/tenantConfig';
import { getThemeTokens } from '../utils/themeEngine';

export const Cart: React.FC = () => {
  const { cart, session, updateCartQty, removeFromCart, executeCheckout, navigateTo, tFix } = useAppState();
  const theme = getThemeTokens(GLOBAL_TENANT_DATA.currentTheme);
  
  const [deliveryMethod, setDeliveryMethod] = useState<string>('STORE_PICKUP_NEPALGUNJ');
  
  // Default to Bank Deposit now
  const [paymentTerms, setPaymentTerms] = useState<string>('BANK_DEPOSIT');

  const [pickupDetails, setPickupDetails] = useState('');
  const [transportDetails, setTransportDetails] = useState('');
  const [busDetails, setBusDetails] = useState('');

  const calcItemPrice = (product: any) => {
    if (session.role === 'DEALER') return product.dealerPriceNPR;
    if (session.role === 'REGISTERED_B2B') return product.wholesalePriceNPR;
    return product.mrpNPR;
  };

  const totalSummary = cart.reduce((sum, item) => sum + (calcItemPrice(item.product) * item.quantity), 0);

  const handleCheckout = () => {
    let finalDeliveryStr = deliveryMethod;
    if (deliveryMethod === 'STORE_PICKUP_NEPALGUNJ' && pickupDetails) finalDeliveryStr += ` (Person: ${pickupDetails})`;
    if (deliveryMethod === 'BY_TRANSPORT' && transportDetails) finalDeliveryStr += ` (Transport: ${transportDetails})`;
    if (deliveryMethod === 'BY_BUS' && busDetails) finalDeliveryStr += ` (Bus: ${busDetails})`;
    
    executeCheckout(finalDeliveryStr, paymentTerms);
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>{tFix("Your Cart is Empty")}</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Looks like you haven't added any products to your cart yet.</p>
        <button onClick={() => navigateTo('products')} style={{ padding: '12px 24px', backgroundColor: theme.primaryColor, color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      
      {/* LEFT COLUMN: Cart Items */}
      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '10px', color: '#0f172a' }}>
          {tFix("Cart")}
        </h2>
        
        {cart.map((item) => {
          const itemPrice = calcItemPrice(item.product);
          const subtotal = itemPrice * item.quantity;
          
          return (
            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ flex: 2 }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block' }}>{tFix("SKU")}: {item.product.sku}</span>
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

      {/* RIGHT COLUMN: Checkout Logic */}
      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a' }}>
          {tFix("Checkout Options")}
        </h3>
        
        {/* DELIVERY METHOD */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>DELIVERY METHOD</label>
          <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '12px' }}>
            <option value="STORE_PICKUP_NEPALGUNJ">Store Pickup from Nepalgunj</option>
            <option value="BY_TRANSPORT">By Transport</option>
            <option value="BY_BUS">By Bus</option>
          </select>

          <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: theme.primaryColor, fontWeight: 'bold' }}>
              ℹ️ Optional: Enter details below to facilitate the delivery process.
            </p>
            {deliveryMethod === 'STORE_PICKUP_NEPALGUNJ' && (
              <input type="text" placeholder="Person coming to collect (Name & Phone)" value={pickupDetails} onChange={(e) => setPickupDetails(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13px' }}/>
            )}
            {deliveryMethod === 'BY_TRANSPORT' && (
              <input type="text" placeholder="Preferred Transport Name & Contact Number" value={transportDetails} onChange={(e) => setTransportDetails(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13px' }}/>
            )}
            {deliveryMethod === 'BY_BUS' && (
              <input type="text" placeholder="Bus Number & Driver Mobile Number" value={busDetails} onChange={(e) => setBusDetails(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13px' }}/>
            )}
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', color: '#475569' }}>PAYMENT METHOD</label>
          <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <option value="BANK_DEPOSIT">Bank Deposit / Transfer</option>
            <option value="CONNECT_IPS">Connect IPS</option>
            <option value="FONEPAY_QR">Fonepay QR</option>
            <option value="CASH_ON_DELIVERY">Cash on Delivery (COD)</option>
            <option value="DEALER_CREDIT_FACILITY" disabled={session.role !== 'DEALER'}>
              Credit Account (Dealers Only)
            </option>
          </select>

          {/* CONDITIONAL PAYMENT UI */}
          {['BANK_DEPOSIT', 'CONNECT_IPS'].includes(paymentTerms) && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '6px', marginTop: '12px', color: '#166534', fontSize: '14px' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '15px' }}>🏦 Account Details:</p>
              <div style={{ display: 'grid', gap: '6px' }}>
                <div><strong>Bank:</strong> {GLOBAL_TENANT_DATA.paymentDetails.bankName}</div>
                <div><strong>Account Name:</strong> {GLOBAL_TENANT_DATA.paymentDetails.accountName}</div>
                <div><strong>Account No:</strong> {GLOBAL_TENANT_DATA.paymentDetails.accountNumber}</div>
                <div><strong>Branch:</strong> {GLOBAL_TENANT_DATA.paymentDetails.branch}</div>
              </div>
              <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#fff', borderLeft: '4px solid #f59e0b', fontSize: '13px', color: '#92400e', fontWeight: '600' }}>
                ⚠️ Important: Please mention your Order Number (which you will receive after clicking Checkout) in the transaction remarks so we can update our records!
              </div>
            </div>
          )}

          {paymentTerms === 'FONEPAY_QR' && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '6px', marginTop: '12px', color: '#166534', textAlign: 'center' }}>
              <p style={{ margin: '0 0 16px 0', fontWeight: 'bold', fontSize: '15px' }}>📱 Scan to Pay with Fonepay:</p>
              {GLOBAL_TENANT_DATA.paymentDetails.fonepayQrUrl ? (
                <img src={GLOBAL_TENANT_DATA.paymentDetails.fonepayQrUrl} alt="Fonepay QR Code" style={{ width: '200px', height: '200px', objectFit: 'contain', margin: '0 auto', border: '2px solid #22c55e', borderRadius: '8px', padding: '4px', backgroundColor: '#fff' }} />
              ) : (
                <div style={{ width: '200px', height: '200px', backgroundColor: '#fff', border: '2px dashed #22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#16a34a', fontWeight: 'bold' }}>
                  [Upload QR to /public/qr.png]
                </div>
              )}
              <div style={{ marginTop: '16px', padding: '10px', backgroundColor: '#fff', borderLeft: '4px solid #f59e0b', fontSize: '13px', color: '#92400e', fontWeight: '600', textAlign: 'left' }}>
                ⚠️ Important: Please mention your Order Number (which you will receive after clicking Checkout) in the Fonepay remarks so we can update our records!
              </div>
            </div>
          )}
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

        <button onClick={handleCheckout} style={{
          width: '100%', padding: '16px', backgroundColor: theme.badgeBackground, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s'
        }}>
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
};
