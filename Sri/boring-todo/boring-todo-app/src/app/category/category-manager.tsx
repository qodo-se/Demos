'use client';

import React, { useState } from 'react';
import { Category, CATEGORY_MAX_LENGTH, validateCategoryName } from './category-type';

interface CategoryManagerProps {
  categories: Category[];
  onCategoryAdd: (category: Omit<Category, 'id'>) => void;
  onCategoryRename: (id: string, newName: string) => void;
  onCategoryDelete: (id: string) => void;
}

export function CategoryManager({ 
  categories, 
  onCategoryAdd, 
  onCategoryRename, 
  onCategoryDelete 
}: CategoryManagerProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!validateCategoryName(newCategoryName)) {
      setError(`Category name must be between 1-${CATEGORY_MAX_LENGTH} characters`);
      return;
    }
    
    onCategoryAdd({ name: newCategoryName, color: generateRandomColor() });
    setNewCategoryName('');
    setError('');
  };

  const handleStartEdit = (category: Category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = (id: string) => {
    if (!validateCategoryName(editName)) {
      setError(`Category name must be between 1-${CATEGORY_MAX_LENGTH} characters`);
      return;
    }
    
    onCategoryRename(id, editName);
    setEditingCategory(null);
    setError('');
  };

  // Generate a random pastel color for new categories
  const generateRandomColor = () => {
    return '#' + 
      Math.floor(Math.random() * 127 + 128).toString(16) +
      Math.floor(Math.random() * 127 + 128).toString(16) +
      Math.floor(Math.random() * 127 + 128).toString(16);
  };

  return (
    <div className="category-manager">
      <h3>Categories</h3>
      
      <div className="category-add">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category"
          maxLength={CATEGORY_MAX_LENGTH}
        />
        <button onClick={handleAddCategory}>Add</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <ul className="categories-list">
        {categories.map(category => (
          <li key={category.id} style={{ backgroundColor: category.color + '30' }}>
            {editingCategory === category.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  maxLength={CATEGORY_MAX_LENGTH}
                />
                <button onClick={() => handleSaveEdit(category.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <div>
                  <button onClick={() => handleStartEdit(category)}>Edit</button>
                  <button onClick={() => onCategoryDelete(category.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}