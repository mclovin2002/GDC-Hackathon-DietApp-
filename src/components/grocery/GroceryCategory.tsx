
import React from 'react';
import { GroceryItem } from './GroceryItem';
import { Ingredient } from '@/utils/types';

interface GroceryCategoryProps {
  category: string;
  ingredients: Ingredient[];
  checkedItems: Record<string, boolean>;
  onToggleItem: (id: string) => void;
}

export function GroceryCategory({ 
  category, 
  ingredients, 
  checkedItems, 
  onToggleItem 
}: GroceryCategoryProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <GroceryItem
            key={ingredient.id}
            ingredient={ingredient}
            isChecked={checkedItems[ingredient.id] || false}
            onToggle={onToggleItem}
          />
        ))}
      </div>
    </div>
  );
}
