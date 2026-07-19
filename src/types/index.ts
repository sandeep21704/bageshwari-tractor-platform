// ---------------------------------------------------------
// CORE SYSTEM TYPES
// ---------------------------------------------------------
export type UserRole = 'PUBLIC' | 'REGISTERED_B2B' | 'DEALER' | 'SALES_REP' | 'ADMIN';

export interface UserSession {
  isAuthenticated: boolean;
  role: UserRole;
  username: string;
  kycStatus: 'NOT_SUBMITTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  companyName?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// ---------------------------------------------------------
// 1. PRODUCTS TABLE
// ---------------------------------------------------------
export interface Product {
  id: string;
  sku: string;
  oemPartNumber?: string;
  name: string;
  category: string;
  compatibleBrands?: string[];
  
  // Financials (Stored Exclusive of VAT)
  baseMrpNPR: number;
  baseWholesalePriceNPR: number;
  baseDealerPriceNPR: number;
  
  // ---> BACKWARD COMPATIBLE ALIASES (Prevents legacy code crashes)
  mrpNPR?: number;
  wholesalePriceNPR?: number;
  dealerPriceNPR?: number;
  brandId?: string;
  
  // Inventory Management (Busy Software Logic)
  stockQuantity: number;
  minimumOrderQuantity: number;
  reorderLevel: number;      // Triggers low stock alert
  minimumStockLevel: number; // Triggers critical stock alert
  packSize: string;
  isActive: boolean;
  
  // UI Display Extras
  isFeatured?: boolean;
  imageUrl?: string;
  description?: string;

  // Logistics (Dormant fields for future logistics API)
  weightKG?: number;
  lengthCM?: number;
  widthCM?: number;
  heightCM?: number;
}

// ---------------------------------------------------------
// 2. DEALERS TABLE (CRM)
// ---------------------------------------------------------
export interface Dealer {
  id: string;
  firmName: string;
  ownerName: string;
  panVatNumber: string;
  citizenshipNumber: string;
  email: string;
  mobileNumber: string;
  whatsappNumber: string;
  address: string;
  district: string;
  areaCovered: string;
  
  // KYC Documents (Stored as secure Cloud URLs)
  docFirmRegUrl?: string;
  docPanVatUrl?: string;
  docCitizenshipUrl?: string;
  
  // Logistics & Financials
  preferredTransportName: string;
  estimatedMonthlyPurchaseNPR: number;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  creditLimitNPR: number;
  outstandingBalanceNPR: number;
  
  createdAt: string;
}

// ---------------------------------------------------------
// 3. ORDERS TABLE & CART
// ---------------------------------------------------------
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderLineItem {
  productId: string;
  name: string;
  sku: string;
  requestedQty: number;
  allocatedQty: number;   // What the Store Keeper actually picked
  backorderedQty: number; // Difference automatically calculated
  pricePaidExclusiveNPR: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  dealerId?: string;
  placedByUserId?: string; // Tracks if a Sales Rep placed it
  
  date: string;
  
  // Financial Breakdown
  baseTotalNPR: number;
  vatAmountNPR: number;
  grandTotalNPR: number;
  
  // Logistics & Payment
  freightTerms: 'TO_PAY';
  paymentMethod?: 'CONNECT_IPS' | 'BANK_DEPOSIT' | 'CREDIT';
  paymentReceiptUrl?: string; // Where the dealer's screenshot is saved
  
  orderStatus: 'PENDING_APPROVAL' | 'ORDER_APPROVED' | 'PAYMENT_PENDING' | 'PAYMENT_APPROVED' | 'READY_FOR_PACKAGING' | 'PACKED' | 'DISPATCHED' | 'COMPLETED';
  
  remarks?: string;
  items: OrderLineItem[];
}

// ---------------------------------------------------------
// 4. SHIPMENTS TABLE (LOGISTICS)
// ---------------------------------------------------------
export interface Shipment {
  id: string;
  orderId: string;
  dispatchMethod: 'STORE_PICKUP_NEPALGUNJ' | 'BY_TRANSPORT' | 'BY_BUS';
  
  courierTransportName?: string; 
  busNumber?: string;            
  driverOrContactPhone?: string; 
  
  trackingOrBiltyNumber?: string; 
  dispatchDate?: string;          
  
  shipmentStatus: 'AWAITING_DISPATCH' | 'IN_TRANSIT' | 'DELIVERED';
}
