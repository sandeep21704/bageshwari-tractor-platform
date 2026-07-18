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
  logoUrl: string;
  contact: {
    hotlines: string[];
    whatsappNumber: string;
    email: string;
    hqAddress: string;
    district: string;
    country: string;
  };
  aboutUs: {
    history: string;
    mission: string;
    vision: string;
    establishedYear: string;
    coreValues: Array<{ title: string; description: string; icon: string }>;
  };
  // NEW: Secure payment details for checkout
  paymentDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    branch: string;
    fonepayQrUrl: string;
  };
}

export const GLOBAL_TENANT_DATA: TenantConfiguration = {
  companyId: "bt-nepalgunj-01",
  businessName: "Bageshwari Tractor",
  tagline: "Your Trusted Partner for Tractor Spare Parts & Agricultural Implements",
  businessType: "B2B_INDUSTRIAL",
  currentTheme: "WINTER_CLEAN", 
  currencySymbol: "NPR",
  defaultMoqEnforced: true,
  logoUrl: "/logo.png", 
  contact: {
    hotlines: ["9704588501", "9704588502"],
    whatsappNumber: "9779704588501",
    email: "orders@bageshwaritractor.com",
    hqAddress: "Nepalgunj, Banke",
    district: "Banke",
    country: "Nepal"
  },
  aboutUs: {
    history: "Founded as a regional supplier in Nepalgunj, we have spent years mastering the logistics of heavy machinery spares. Today, we are transforming the B2B supply chain, upgrading from traditional ledger systems to a fully automated digital procurement platform.",
    mission: "To empower dealers, wholesalers, and agricultural workshops with reliable, high-quality spare parts and seamless B2B technology.",
    vision: "To become the undisputed digital and physical backbone of agricultural and industrial machinery distribution across the nation.",
    establishedYear: "1998",
    coreValues: [
      { title: "Genuine Quality", description: "We source directly from verified manufacturers and trusted brands to ensure field reliability.", icon: "🛡️" },
      { title: "B2B Innovation", description: "Pioneering digital wholesale platforms for faster, smarter, and transparent ordering.", icon: "🚀" },
      { title: "Reliable Logistics", description: "Ensuring timely dispatch and delivery across regional and national networks.", icon: "📦" }
    ]
  },
  // NEW: Dummy payment details (Replace with your actual Bageshwari Tractor Bank Info)
  paymentDetails: {
    bankName: "Everest Bank Ltd ",
    accountName: "Bageshwari Tractor",
    accountNumber: "01900105200295",
    branch: "Nepalgunj Branch",
    fonepayQrUrl: "/qr.png" // You can upload your QR code to the public folder later and put "/qr.png" here!
  }
};
