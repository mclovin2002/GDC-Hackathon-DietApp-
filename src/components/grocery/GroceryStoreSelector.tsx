
import React from 'react';
import { Check, Store } from 'lucide-react';
import { GroceryStore } from '@/utils/types';

interface GroceryStoreSelectorProps {
  stores: GroceryStore[];
  selectedStore: GroceryStore | null;
  onSelectStore: (store: GroceryStore) => void;
}

export function GroceryStoreSelector({ 
  stores, 
  selectedStore, 
  onSelectStore 
}: GroceryStoreSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stores.map((store) => (
        <div
          key={store.id}
          className={`
            flex flex-col items-center p-4 rounded-lg border transition-all cursor-pointer
            ${selectedStore?.id === store.id 
              ? 'border-primary bg-primary/5 ring-1 ring-primary/30' 
              : 'border-border hover:bg-secondary/50'}
          `}
          onClick={() => onSelectStore(store)}
        >
          <img
            src={store.logo}
            alt={store.name}
            className="w-12 h-12 mb-3 object-contain"
          />
          <p className="font-medium">{store.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            ${store.deliveryFee} delivery fee
          </p>
          {selectedStore?.id === store.id && (
            <div className="absolute top-2 right-2">
              <Check className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
