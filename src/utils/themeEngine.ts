import { SeasonalTheme } from '../data/tenantConfig';
import { designTokens } from './designTokens';

export interface ThemeTokens {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bannerBackground: string;
  bannerTextColor: string;
  badgeBackground: string;
}

const themes: Record<SeasonalTheme, ThemeTokens> = {
  STANDARD_INDUSTRIAL: {
    primaryColor: '#1e293b',
    secondaryColor: '#334155',
    accentColor: '#fbbf24',
    bannerBackground: '#0f172a',
    bannerTextColor: '#ffffff',
    badgeBackground: '#ef4444'
  },
  DASHAIN_TIHAR_FESTIVE: {
    primaryColor: '#b91c1c',
    secondaryColor: '#dc2626',
    accentColor: '#facc15',
    bannerBackground: 'linear-gradient(90deg, #991b1b 0%, #dc2626 100%)',
    bannerTextColor: '#ffffff',
    badgeBackground: '#f59e0b'
  },
  MONSOON_AGRI: {
    primaryColor: '#15803d',
    secondaryColor: '#16a34a',
    accentColor: '#fef08a',
    bannerBackground: '#14532d',
    bannerTextColor: '#f0fdf4',
    badgeBackground: '#047857'
  },
  WINTER_CLEAN: {
    primaryColor: '#0369a1',
    secondaryColor: '#0ea5e9',
    accentColor: '#38bdf8',
    bannerBackground: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
    bannerTextColor: '#e0f2fe',
    badgeBackground: '#0284c7'
  }
};

// We now export BOTH the seasonal theme colors AND the standard design tokens together!
export const getThemeTokens = (theme: SeasonalTheme) => {
  return {
    ...themes[theme],
    ...designTokens 
  };
};
