import { Product } from '../types';

// Matches the exact uppercase column headers exported from your office BUSY software
export interface BusyExcelRow {
  ITEM_NAME: string;
  ITEM_ALIAS: string;
  "ITEM CATEGORY": string;
  "ITEM BRAND": string;
  MAIN_UNIT: string;
  ALTERNATE_UNIT: string;
  CONVERSION_TYPE: string;
  CONVERSION_FACTOR: number;
  LOCATION: string;
  HSN_CODE: string;
  TAX_CATEGORY: string;
  MAIN_UNIT_SALES_PRICE: number;
  MAIN_UNIT_PURCHASE_PRICE: number;
  MAIN_UNIT_MRP: number;
  REORDER_LEVEL: number;
  REORDER_QUANTITY: number;
  MAXIMUM_QUANTITY: number;
}

export const convertBusyRowToB2BProduct = (row: BusyExcelRow, index: number): Product => {
  // 1. AUTOMATED SKU GENERATION STRATEGY MATRIX
  // Extracts the first two characters of the Brand and Category to form a predictable prefix (e.g., "SW-FI")
  const brandPrefix = row["ITEM BRAND"] ? row["ITEM BRAND"].substring(0, 2).toUpperCase().trim() : "GEN";
  const catPrefix = row["ITEM CATEGORY"] ? row["ITEM CATEGORY"].substring(0, 2).toUpperCase().trim() : "PT";
  
  // Creates a clean number tracking string from the name or uses the item index as a fallback
  const numericExtract = row.ITEM_NAME.replace(/[^0-9]/g, '');
  const uniqueCode = numericExtract.length > 2 ? numericExtract.substring(0, 6) : `10${index + 1}`;
  
  const generatedSku = `${brandPrefix}-${catPrefix}-${uniqueCode}`;

  // 2. AUTOMATED BARCODE SYNTHESIS
  // Generates a predictable 13-digit barcode string based on the item's tax profile and database location
  const hsnPrefix = row.HSN_CODE ? row.HSN_CODE.substring(0, 4) : "8432";
  const generatedBarcode = `${hsnPrefix}000${index + 10000}`;

  // 3. CLEANING SLUG PASS
  const cleanSlug = row.ITEM_NAME
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // 4. PARSING EXTRACT MATRIX INTO SYSTEM FORMAT
  return {
    id: `busy-id-${generatedSku.toLowerCase()}`,
    sku: generatedSku,
    name: row.ITEM_NAME,
    slug: cleanSlug,
    brandId: row["ITEM BRAND"] ? row["ITEM BRAND"].toLowerCase().trim() : "generic",
    categoryId: row["ITEM CATEGORY"] ? row["ITEM CATEGORY"].toLowerCase().trim() : "accessories",
    shortDescription: `Genuine ${row.ITEM_NAME} distributed directly from our ${row.LOCATION || 'Nepalgunj Core'} depot node.`,
    fullDescription: `Automated spare parts logistics entry synchronized with office accounting systems. Main unit profile: ${row.MAIN_UNIT}. Alternate configuration unit: ${row.ALTERNATE_UNIT || 'None'}. HSN compliance index: ${row.HSN_CODE || 'Exempt'}.`,
    specifications: {
      "Office Location Depot": row.LOCATION || "Central Warehouse",
      "HSN Tariff Index": row.HSN_CODE || "8432.90.00",
      "Taxation Profile Group": row.TAX_CATEGORY || "13% VAT Eligible",
      "System Main Storage Unit": row.MAIN_UNIT,
      "System Alternate Storage Unit": row.ALTERNATE_UNIT || "Not Specified",
      "System Conversion Parameter": `1 ${row.MAIN_UNIT} = ${row.CONVERSION_FACTOR || 1} ${row.ALTERNATE_UNIT || 'Units'}`,
      "Generated Hardware Barcode": generatedBarcode,
      "Office Reorder Limit Trigger": `${row.REORDER_LEVEL || 5} ${row.MAIN_UNIT}`
    },
    // Scans item names to automatically assign fleet vehicle compatibility tags
    compatibility: row.ITEM_NAME.toUpperCase().includes("SONALIKA") ? ["Sonalika DI 35", "Sonalika DI 60"] :
                   row.ITEM_NAME.toUpperCase().includes("SWARAJ") ? ["Swaraj 744 FE", "Swaraj 855 FE"] : 
                   ["Universal Tractor Powertrain Systems", "Agricultural Implements Assemblies"],
    unit: row.MAIN_UNIT || "Piece",
    packSize: `Commercial Packing Vector: ${row.MAIN_UNIT}`,
    dealerPriceNPR: Number(row.MAIN_UNIT_SALES_PRICE) || 0,
    wholesalePriceNPR: Math.round(Number(row.MAIN_UNIT_SALES_PRICE) * 0.96), // Automated fallback wholesale calculation tier
    mrpNPR: Number(row.MAIN_UNIT_MRP) || 0,
    minimumOrderQuantity: row.REORDER_QUANTITY || 1, 
    isFeatured: true,
    isActive: true
  };
};
