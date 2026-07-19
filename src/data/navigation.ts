import { UserRole } from '../types';

export interface NavItem {
  label: string;
  path: string;
  rolesPermitted: UserRole[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: 'Products', path: 'products', rolesPermitted: ['PUBLIC', 'REGISTERED_B2B', 'DEALER', 'ADMIN'] },
  { label: 'Dealer Portal', path: 'dealer-portal', rolesPermitted: ['REGISTERED_B2B', 'DEALER', 'ADMIN'] },
  { label: 'About Us', path: 'about', rolesPermitted: ['PUBLIC', 'REGISTERED_B2B', 'DEALER', 'ADMIN'] },
  { label: 'Admin Panel', path: 'admin', rolesPermitted: ['ADMIN'] }
];
