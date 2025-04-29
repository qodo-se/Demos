export interface Category {
  id: string;
  name: string;
  color?: string; // Optional color for visual identification
}

// Constants for validation
export const CATEGORY_MAX_LENGTH = 50;

// Validation functions
export function validateCategoryName(name: string): boolean {
  return name.trim().length > 0 && name.length <= CATEGORY_MAX_LENGTH;
}