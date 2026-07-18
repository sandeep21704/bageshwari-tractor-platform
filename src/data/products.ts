import { Product } from '../types';
import { convertBusyRowToB2BProduct, BusyExcelRow } from '../utils/busyImporter';

// Simulates the exact raw data structure exported from your office software
const officeBusySpreadsheetMock: BusyExcelRow[] = [
  {
    ITEM_NAME: "Oil Filter Sonalika Everest",
    ITEM_ALIAS: "SONA-OF-01",
    "ITEM CATEGORY": "filters",
    "ITEM BRAND": "everest",
    MAIN_UNIT: "Box",
    ALTERNATE_UNIT: "Piece",
    CONVERSION_TYPE: "Multiply",
    CONVERSION_FACTOR: 10,
    LOCATION: "Nepalgunj Depot Rack A3",
    HSN_CODE: "84212300",
    TAX_CATEGORY: "VAT 13%",
    MAIN_UNIT_SALES_PRICE: 300,
    MAIN_UNIT_PURCHASE_PRICE: 220,
    MAIN_UNIT_MRP: 450,
    REORDER_LEVEL: 10,
    REORDER_QUANTITY: 5,
    MAXIMUM_QUANTITY: 100
  },
  {
    ITEM_NAME: "P706754 Hydraulic Filter Swaraj",
    ITEM_ALIAS: "SW-HF-99",
    "ITEM CATEGORY": "filters",
    "ITEM BRAND": "swaraj",
    MAIN_UNIT: "Piece",
    ALTERNATE_UNIT: "None",
    CONVERSION_TYPE: "None",
    CONVERSION_FACTOR: 1,
    LOCATION: "Nepalgunj Depot Rack B1",
    HSN_CODE: "84212300",
    TAX_CATEGORY: "VAT 13%",
    MAIN_UNIT_SALES_PRICE: 800,
    MAIN_UNIT_PURCHASE_PRICE: 610,
    MAIN_UNIT_MRP: 1150,
    REORDER_LEVEL: 5,
    REORDER_QUANTITY: 2,
    MAXIMUM_QUANTITY: 40
  },
  {
    ITEM_NAME: "6201-2RS Bearing DLT",
    ITEM_ALIAS: "DLT-6201",
    "ITEM CATEGORY": "bearings",
    "ITEM BRAND": "dlt",
    MAIN_UNIT: "Sleeve",
    ALTERNATE_UNIT: "Piece",
    CONVERSION_TYPE: "Multiply",
    CONVERSION_FACTOR: 20,
    LOCATION: "Bearings Vault Drawer 2",
    HSN_CODE: "84821011",
    TAX_CATEGORY: "VAT 13%",
    MAIN_UNIT_SALES_PRICE: 65,
    MAIN_UNIT_PURCHASE_PRICE: 42,
    MAIN_UNIT_MRP: 100,
    REORDER_LEVEL: 50,
    REORDER_QUANTITY: 20,
    MAXIMUM_QUANTITY: 1000
  }
];

// Instantly runs the parsing engine over your data array to generate standard type-safe listings
export const B2B_PRODUCTS_CATALOG: Product[] = officeBusySpreadsheetMock.map((row, index) => 
  convertBusyRowToB2BProduct(row, index)
);
