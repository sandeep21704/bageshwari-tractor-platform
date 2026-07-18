import { Category } from '../types';

export const CATEGORIES_REGISTRY: Record<string, Category> = {
  "filters": { id: "filters", name: "Filters", slug: "filters", description: "Heavy-duty particulate filtration systems", displayOrder: 1, isActive: true },
  "bearings": { id: "bearings", name: "Bearings", slug: "bearings", description: "Industrial anti-friction mechanical components", displayOrder: 2, isActive: true },
  "implements": { id: "implements", name: "Agricultural Implements", slug: "agri-implements", description: "Cultivators, rotavators, and structural assemblies", displayOrder: 3, isActive: true }
};
