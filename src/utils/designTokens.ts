export const designTokens = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    section: '60px'
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '50px',
    circle: '50%'
  },
  shadows: {
    card: '0 2px 4px rgba(0,0,0,0.02)',
    dropdown: '0 4px 12px rgba(0,0,0,0.15)'
  },
  typography: {
    family: 'sans-serif',
    size: {
      micro: '10px',
      xs: '12px',
      sm: '13px',
      md: '15px',
      lg: '18px',
      h2: '28px',
      h1: '46px'
    },
    weight: {
      regular: '400',
      medium: '500',
      bold: '700',
      black: '900'
    }
  },
  colors: {
    // These are standard UI colors that don't change with the seasonal theme
    text: {
      primary: '#0f172a',   // Very dark slate
      secondary: '#475569', // Medium slate
      muted: '#64748b',     // Light slate
      inverse: '#ffffff'    // White text
    },
    surface: {
      background: '#f8fafc', // App background
      card: '#ffffff',       // White panels
      hover: '#f1f5f9'       // Light gray for hovering
    },
    border: {
      light: '#f1f5f9',
      default: '#e2e8f0',
      dark: '#cbd5e1'
    },
    status: {
      error: '#dc2626',
      errorBg: '#fef2f2',
      success: '#16a34a',
      successBg: '#f0fdf4',
      warning: '#d97706',
      warningBg: '#fef3c7'
    }
  }
};
