// ---------------------------------------------------------
// CORE SYSTEM TYPES
// ---------------------------------------------------------
export type UserRole = 'PUBLIC' | 'REGISTERED_B2B' | 'DEALER' | 'ADMIN';

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
  oemPartNumber?: string;      // Optional: For precise mechanical cross-referencing
  name: string;
  category: string;
  compatibleBrands?: string[]; // Array of tractor brands (e.g., ["Mahindra", "Swaraj"])
  
  // Tiered Pricing
  mrpNPR: number;
  wholesalePriceNPR: number;
  dealerPriceNPR: number;
  
  // Inventory & Logistics
  stockQuantity: number;
  minimumOrderQuantity: number;
  packSize: string;
  isActive: boolean;
  
  // UI Display Extras
  isFeatured?: boolean;
  imageUrl?: string;
  description?: string;
}

// ---------------------------------------------------------
// 2. DEALERS TABLE (CRM)
// ---------------------------------------------------------
export interface Dealer {
  id: string;
  businessName: string;        
  ownerName: string;
  panVatNumber: string;        
  
  // Contact & Location
  mobileNumber: string;
  district: string;
  territory: 'EASTERN_REGION' | 'WESTERN_REGION' | 'CENTRAL'; 
  
  // Financial Standing
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
  pricePaidNPR: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  dealerId?: string; // Links to Dealers Table
  
  date: string;
  totalAmountNPR: number;
  
  // Status Tracking
  paymentMethod?: string;
  paymentStatus?: 'UNPAID' | 'PARTIAL' | 'PAID';
  status: 'PENDING_REVIEW' | 'PROCESSING' | 'READY_FOR_DISPATCH' | 'COMPLETED' | 'CANCELLED';
  
  remarks?: string;
  items: OrderLineItem[];
}

// ---------------------------------------------------------
// 4. SHIPMENTS TABLE (LOGISTICS)
// ---------------------------------------------------------
export interface Shipment {
  id: string;
  orderId: string;             // Links to Orders Table
  
  dispatchMethod: 'STORE_PICKUP_NEPALGUNJ' | 'BY_TRANSPORT' | 'BY_BUS';
  
  // Conditional Logistics Fields
  courierTransportName?: string; 
  busNumber?: string;            
  driverOrContactPhone?: string; 
  
  trackingOrBiltyNumber?: string; // e.g., Transport receipt number
  dispatchDate?: string;          
  
  shipmentStatus: 'AWAITING_DISPATCH' | 'IN_TRANSIT' | 'DELIVERED';
}
