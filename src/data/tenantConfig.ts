export type BusinessType = 'B2B_INDUSTRIAL' | 'B2C_RETAIL' | 'AGRO_WHOLESALE' | 'PHARMACY_LOGISTICS';
export type SeasonalTheme = 'STANDARD_INDUSTRIAL' | 'DASHAIN_TIHAR_FESTIVE' | 'MONSOON_AGRI' | 'WINTER_CLEAN';

export interface TenantConfiguration {
  companyId: string;
  businessName: string;
  tagline: string;
  businessType: BusinessType;
  currentTheme: SeasonalTheme;
  currencySymbol: string;
  defaultMoqEnforced: boolean;
  contact: {
    hotlines: string[];
    whatsappNumber: string;
    email: string;
    hqAddress: string;
    district: string;
    country: string;
  };
}

export const GLOBAL_TENANT_DATA: TenantConfiguration = {
  companyId: "bt-nepalgunj-01",
  businessName: "Bageshwari Tractor",
  tagline: "Your Trusted Partner for Tractor Spare Parts & Agricultural Implements",
  businessType: "B2B_INDUSTRIAL",
  currentTheme: "WINTER_CLEAN", // The engine maps themes based on this configuration string
  currencySymbol: "NPR",
  defaultMoqEnforced: true,
  contact: {
    hotlines: ["9704588501", "9704588502"],
    whatsappNumber: "9779704588501",
    email: "orders@bageshwaritractor.com",
    hqAddress: "Nepalgunj, Banke",
    district: "Banke",
    country: "Nepal"
  }
};
