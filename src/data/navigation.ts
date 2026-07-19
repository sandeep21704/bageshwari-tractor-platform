export interface NavItem {
  label: string;
  path: string;
  rolesPermitted: string[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", path: "home", rolesPermitted: ["PUBLIC", "REGISTERED_B2B", "DEALER", "ADMIN"] },
  { label: "Products Catalog", path: "products", rolesPermitted: ["PUBLIC", "REGISTERED_B2B", "DEALER", "ADMIN"] },
  { label: "About Us", path: "about", rolesPermitted: ["PUBLIC", "REGISTERED_B2B", "DEALER", "ADMIN"] },
  { label: "Become a Dealer", path: "dealer-portal", rolesPermitted: ["PUBLIC"] },
  { label: "Dealer Dashboard", path: "dealer-portal", rolesPermitted: ["REGISTERED_B2B", "DEALER"] },
  { label: "Admin Dashboard", path: "admin", rolesPermitted: ["ADMIN"] }, // NEW: Secure Admin Link
  { label: "System DevTools", path: "devtools", rolesPermitted: ["PUBLIC", "REGISTERED_B2B", "DEALER", "ADMIN"] } 
];
