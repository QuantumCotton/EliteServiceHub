import { BusinessType } from '../types/business';

const serviceTemplateMap: Record<BusinessType, () => Promise<any>> = {
  TURF_SERVICE: () => import('./examples/turf-service'),
  POOL_SERVICE: () => import('./examples/pool-service'),
  HVAC_SERVICE: () => import('./examples/hvac-service'),
  CLEANING_SERVICE: () => import('./examples/cleaning-service'),
  CHRISTMAS_LIGHTS: () => import('./examples/christmas-lights'),
  CONSTRUCTION_CLEANUP: () => import('./examples/construction-cleanup'),
  AUTO_DETAILING: () => import('./examples/auto-detailing'),
  LANDSCAPING_SERVICE: () => import('./examples/landscaping-service'),
  MOBILE_MECHANIC: () => import('./examples/mobile-mechanic'),
  PEST_CONTROL: () => import('./examples/pest-control'),
};

export const loadServiceTemplate = async (type: BusinessType) => {
  try {
    const module = await serviceTemplateMap[type]();
    return module.default;
  } catch (error) {
    console.error(`Error loading service template for ${type}:`, error);
    throw new Error(`Failed to load service template for ${type}`);
  }
};

export const preloadServiceTemplate = (type: BusinessType) => {
  // Preload the service template in the background
  serviceTemplateMap[type]().catch(error => {
    console.warn(`Failed to preload service template for ${type}:`, error);
  });
};

export const preloadAllServiceTemplates = () => {
  Object.keys(serviceTemplateMap).forEach(type => {
    preloadServiceTemplate(type as BusinessType);
  });
};
