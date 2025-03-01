
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Ingredient, GroceryStore } from '@/utils/types';
import { mockGroceryStores } from '@/utils/mockData';
import { GroceryCategory } from './GroceryCategory';
import { GroceryStoreSelector } from './GroceryStoreSelector';
import { OrderSummary } from './OrderSummary';
import { OrderConfirmation } from './OrderConfirmation';

interface GroceryListProps {
  ingredients: Ingredient[];
  mealPlanId?: string;
}

export default function GroceryList({ ingredients, mealPlanId }: GroceryListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedStore, setSelectedStore] = useState<GroceryStore | null>(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const { toast } = useToast();

  // Group ingredients by category (for demo we'll just use first letter)
  const groupedIngredients: Record<string, Ingredient[]> = {};
  
  ingredients.forEach(ingredient => {
    const firstLetter = ingredient.name.charAt(0).toUpperCase();
    if (!groupedIngredients[firstLetter]) {
      groupedIngredients[firstLetter] = [];
    }
    groupedIngredients[firstLetter].push(ingredient);
  });

  const sortedCategories = Object.keys(groupedIngredients).sort();

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllItems = (checked: boolean) => {
    const newCheckedItems: Record<string, boolean> = {};
    ingredients.forEach(item => {
      newCheckedItems[item.id] = checked;
    });
    setCheckedItems(newCheckedItems);
  };

  const checkedCount = Object.values(checkedItems).filter(v => v).length;
  const allChecked = checkedCount === ingredients.length;
  const someChecked = checkedCount > 0 && checkedCount < ingredients.length;

  const handlePlaceOrder = () => {
    if (!selectedStore) {
      toast({
        title: "Please select a store",
        description: "You need to select a grocery store to place an order.",
        variant: "destructive",
      });
      return;
    }

    setIsOrdering(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrdering(false);
      setIsOrderComplete(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your grocery order from ${selectedStore.name} will be delivered soon.`,
        variant: "default",
      });
    }, 2000);
  };

  const calculateTotalCost = () => {
    return ingredients.reduce((total, item) => {
      // For demo purposes, we'll generate a random price if not provided
      const price = item.price || (Math.random() * 5 + 1);
      return total + price * item.amount;
    }, 0).toFixed(2);
  };

  return (
    <div className="animate-fade-in">
      {isOrderComplete ? (
        <OrderConfirmation
          selectedStore={selectedStore}
          totalCost={calculateTotalCost()}
          onBackToList={() => setIsOrderComplete(false)}
        />
      ) : (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Grocery List
                  </CardTitle>
                  <CardDescription>
                    {ingredients.length} items in your shopping list
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="select-all"
                    checked={allChecked}
                    onCheckedChange={(checked) => toggleAllItems(!!checked)}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none ml-2"
                  >
                    {allChecked ? 'Deselect All' : 'Select All'}
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {sortedCategories.map((category) => (
                <GroceryCategory
                  key={category}
                  category={category}
                  ingredients={groupedIngredients[category]}
                  checkedItems={checkedItems}
                  onToggleItem={toggleItem}
                />
              ))}
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Choose a Grocery Store</CardTitle>
              <CardDescription>
                Select where you want to order your groceries from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GroceryStoreSelector
                stores={mockGroceryStores}
                selectedStore={selectedStore}
                onSelectStore={setSelectedStore}
              />
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <OrderSummary
                ingredientCount={ingredients.length}
                selectedStore={selectedStore}
                totalCost={calculateTotalCost()}
                isOrdering={isOrdering}
                onPlaceOrder={handlePlaceOrder}
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
