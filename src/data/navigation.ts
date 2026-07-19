// Export the navigation array as MAIN_NAVIGATION
export const MAIN_NAVIGATION = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' },
  { name: 'Dealer Portal', path: '/dealer-portal' },
  { name: 'Admin Panel', path: '/admin', roles: ['ADMIN'] },
  { name: 'System Tools', path: '/devtools', roles: ['ADMIN'] }
];
