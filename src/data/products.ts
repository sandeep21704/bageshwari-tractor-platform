import { Product } from '../types';

export const B2B_PRODUCTS_CATALOG: Product[] = [
  {
    id: "prod-everest-001",
    sku: "EV-LINK-789",
    oemPartNumber: "OEM-MH-450",
    name: "Everest Brand Heavy-Duty Linkage Pin",
    category: "Tractor Components",
    compatibleBrands: ["Mahindra", "Swaraj", "Sonalika"],
    
    // UPDATED: Matched strictly to types/index.ts
    baseMrpNPR: 1200,
    baseWholesalePriceNPR: 950,
    baseDealerPriceNPR: 800,
    
    stockQuantity: 450,
    minimumOrderQuantity: 10,
    reorderLevel: 50,       // ADDED: Required by schema
    minimumStockLevel: 20,  // ADDED: Required by schema
    
    packSize: "Box of 10",
    isActive: true,
    isFeatured: true,
    description: "Premium quality Everest brand linkage pin engineered for high stress agricultural applications."
  },
  {
    id: "prod-dlt-002",
    sku: "DLT-BRG-6204",
    oemPartNumber: "6204-2RS",
    name: "DLT Deep Groove Ball Bearing",
    category: "Bearings",
    compatibleBrands: ["Universal"],
    
    baseMrpNPR: 450,
    baseWholesalePriceNPR: 350,
    baseDealerPriceNPR: 280,
    
    stockQuantity: 1200,
    minimumOrderQuantity: 50,
    reorderLevel: 200,
    minimumStockLevel: 100,
    
    packSize: "Carton of 50",
    isActive: true,
    isFeatured: true,
    description: "Sealed DLT bearing ensuring dust and moisture resistance for prolonged field life."
  },
  {
    id: "prod-aristo-003",
    sku: "AR-FAST-10X50",
    oemPartNumber: "ISO-4014",
    name: "Aristo High-Tensile Hex Bolt",
    category: "Industrial Fasteners",
    compatibleBrands: ["Universal"],
    
    baseMrpNPR: 85,
    baseWholesalePriceNPR: 65,
    baseDealerPriceNPR: 50,
    
    stockQuantity: 5000,
    minimumOrderQuantity: 100,
    reorderLevel: 1000,
    minimumStockLevel: 500,
    
    packSize: "Box of 100",
    isActive: true,
    isFeatured: false,
    description: "Grade 8.8 Aristo group high-tensile fastener for structural machinery assembly."
  },
  {
    id: "prod-bhumiputra-004",
    sku: "BHUMI-TILL-01",
    oemPartNumber: "BT-MINI-09",
    name: "Bhumiputra Mini Tiller Rotary Attachment",
    category: "Agri Implements",
    compatibleBrands: ["Honda", "Kama", "VST"],
    
    baseMrpNPR: 18500,
    baseWholesalePriceNPR: 16000,
    baseDealerPriceNPR: 14500,
    
    stockQuantity: 24,
    minimumOrderQuantity: 1,
    reorderLevel: 5,
    minimumStockLevel: 2,
    
    packSize: "Single Unit",
    isActive: true,
    isFeatured: true,
    description: "Micro-mechanization rotary slasher and tiller attachment imported from Haryana, India."
  }
];
