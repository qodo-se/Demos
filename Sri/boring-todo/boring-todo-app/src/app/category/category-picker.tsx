'use client';

import React from 'react';
import { Category } from './category-type';

interface CategoryPickerProps {
  categories: Category[];
  selectedCategoryIds: string[];
  onChange: (categoryIds: string[]) => void;
}

export function CategoryPicker({ categories, selectedCategoryIds, onChange }: CategoryPickerProps) {
  const toggleCategory = (categoryId: string) => {
    const updatedCategoryIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter(id => id !== categoryId)
      : [...selectedCategoryIds, categoryId];
    
    onChange(updatedCategoryIds);
  };

  return (
    <div className="category-picker">
      <div className="category-options">
        {categories.map(category => (
          <div 
            key={category.id} 
            className={`category-option ${selectedCategoryIds.includes(category.id) ? 'selected' : ''}`}
            onClick={() => toggleCategory(category.id)}
            style={{ 
              backgroundColor: selectedCategoryIds.includes(category.id) 
                ? category.color 
                : category.color + '30' 
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="no-categories">No categories available</div>
      )}
    </div>
  );
}