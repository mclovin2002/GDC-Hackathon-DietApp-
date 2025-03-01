
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GroceryStore } from '@/utils/types';

interface OrderSummaryProps {
  ingredientCount: number;
  selectedStore: GroceryStore | null;
  totalCost: string;
  isOrdering: boolean;
  onPlaceOrder: () => void;
}

export function OrderSummary({ 
  ingredientCount, 
  selectedStore, 
  totalCost, 
  isOrdering, 
  onPlaceOrder 
}: OrderSummaryProps) {
  return (
    <div className="w-full flex-col space-y-4">
      <div className="w-full flex justify-between items-center p-3 rounded-md bg-secondary">
        <div>
          <p className="font-medium">Total Estimated Cost</p>
          <p className="text-sm text-muted-foreground">
            {ingredientCount} items + ${selectedStore?.deliveryFee.toFixed(2) || '0.00'} delivery
          </p>
        </div>
        <p className="text-xl font-semibold">
          ${(parseFloat(totalCost) + (selectedStore?.deliveryFee || 0)).toFixed(2)}
        </p>
      </div>
      
      <Button 
        className="w-full"
        disabled={!selectedStore || isOrdering}
        onClick={onPlaceOrder}
      >
        {isOrdering ? (
          <>Processing Order...</>
        ) : (
          <>
            Order from {selectedStore?.name} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
