import { Brand } from '../types';

export const BRANDS_REGISTRY: Record<string, Brand> = {
  swaraj: { id: "swaraj", name: "Swaraj Genuine Parts", slug: "swaraj-genuine", isOwnedBrand: false, legalStatusConfigurableKey: "Authorized Distributorship" },
  everest: { id: "everest", name: "Everest Tractor Parts", slug: "everest-parts", isOwnedBrand: true, legalStatusConfigurableKey: "Proprietary Core Brand", brandColorOverride: "#0284c7" },
  plo: { id: "plo", name: "PLO Lubricants", slug: "plo-lubricants", isOwnedBrand: false, legalStatusConfigurableKey: "Authorized Dealer" },
  duckhams: { id: "duckhams", name: "Duckhams Lubricants", slug: "duckhams-lubricants", isOwnedBrand: false, legalStatusConfigurableKey: "Authorized Distributorship for Banke and Bardiya" },
  dlt: { id: "dlt", name: "DLT Bearings", slug: "dlt-bearings", isOwnedBrand: false, legalStatusConfigurableKey: "Authorized Partner" },
  hyb: { id: "hyb", name: "HYB Bearing", slug: "hyb-bearings", isOwnedBrand: false, legalStatusConfigurableKey: "Distribution Partner" },
  arb: { id: "arb", name: "ARB Bearing", slug: "arb-bearings", isOwnedBrand: false, legalStatusConfigurableKey: "Wholesale Partner" },
  goodyear: { id: "goodyear", name: "Goodyear Tractor Tyres", slug: "goodyear-tyres", isOwnedBrand: false, legalStatusConfigurableKey: "Strategic Distributor" }
};
