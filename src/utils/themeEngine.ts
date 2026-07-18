import { SeasonalTheme } from '../data/tenantConfig';

export interface ThemeTokens {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bannerBackground: string;
  bannerTextColor: string;
  badgeBackground: string;
  gridStyle: 'COMPACT_RETAIL' | 'HEAVY_INDUSTRIAL';
}

export const getThemeTokens = (theme: SeasonalTheme): ThemeTokens => {
  switch (theme) {
    case 'DASHAIN_TIHAR_FESTIVE':
      return {
        primaryColor: '#b91c1c', 
        secondaryColor: '#ea580c',
        accentColor: '#facc15',
        bannerBackground: 'linear-gradient(135deg, #7f1d1d 0%, #c2410c 100%)',
        bannerTextColor: '#ffffff',
        badgeBackground: '#e11d48',
        gridStyle: 'COMPACT_RETAIL'
      };
      
    case 'MONSOON_AGRI':
      return {
        primaryColor: '#15803d',
        secondaryColor: '#0369a1',
        accentColor: '#22c55e',
        bannerBackground: 'linear-gradient(135deg, #14532d 0%, #0c4a6e 100%)',
        bannerTextColor: '#f8fafc',
        badgeBackground: '#16a34a',
        gridStyle: 'HEAVY_INDUSTRIAL'
      };

    case 'WINTER_CLEAN':
      return {
        primaryColor: '#0f172a',
        secondaryColor: '#334155',
        accentColor: '#38bdf8',
        bannerBackground: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        bannerTextColor: '#ffffff',
        badgeBackground: '#0284c7',
        gridStyle: 'COMPACT_RETAIL'
      };

    case 'STANDARD_INDUSTRIAL':
    default:
      return {
        primaryColor: '#1e293b',
        secondaryColor: '#475569',
        accentColor: '#2563eb',
        bannerBackground: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        bannerTextColor: '#ffffff',
        badgeBackground: '#2563eb',
        gridStyle: 'HEAVY_INDUSTRIAL'
      };
  }
};
