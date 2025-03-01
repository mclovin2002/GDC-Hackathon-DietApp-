
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Ingredient } from '@/utils/types';

interface GroceryItemProps {
  ingredient: Ingredient;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function GroceryItem({ ingredient, isChecked, onToggle }: GroceryItemProps) {
  return (
    <div 
      className={`
        flex items-center justify-between p-2 rounded-md transition-colors
        ${isChecked ? 'bg-secondary/50' : 'hover:bg-secondary/30'}
      `}
    >
      <div className="flex items-center">
        <Checkbox
          id={`item-${ingredient.id}`}
          checked={isChecked}
          onCheckedChange={() => onToggle(ingredient.id)}
        />
        <label
          htmlFor={`item-${ingredient.id}`}
          className={`ml-2 ${isChecked ? 'line-through text-muted-foreground' : ''}`}
        >
          {ingredient.name}
        </label>
      </div>
      <div className="text-sm text-muted-foreground">
        {ingredient.amount} {ingredient.unit}
      </div>
    </div>
  );
}
