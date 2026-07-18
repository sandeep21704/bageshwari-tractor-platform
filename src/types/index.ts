export type UserRole = 'PUBLIC' | 'REGISTERED_B2B' | 'DEALER' | 'ADMIN';
export type KYCStatus = 'NOT_SUBMITTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface UserSession {
  isAuthenticated: boolean;
  role: UserRole;
  username: string;
  companyName?: string;
  kycStatus: KYCStatus;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  isOwnedBrand: boolean;
  legalStatusConfigurableKey: string; 
  brandColorOverride?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brandId: string;
  categoryId: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  compatibility: string[];
  unit: string;
  packSize: string;
  dealerPriceNPR: number;
  wholesalePriceNPR: number;
  mrpNPR: number;
  minimumOrderQuantity: number;
  isFeatured: boolean;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: Array<{
    productId: string;
    name: string;
    sku: string;
    pricePaidNPR: number;
    quantity: number;
  }>;
  totalAmountNPR: number;
  status: 'PENDING_REVIEW' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED';
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: ToastType;
}
