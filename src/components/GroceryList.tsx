import React, { useState } from 'react';
import { ShoppingCart, Check, CheckCircle, X as XIcon, Store, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Ingredient, GroceryStore } from '@/utils/types';
import { mockGroceryStores } from '@/utils/mockData';

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
        <Card className="glass-card animate-slide-in-up">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <CardDescription>Your grocery order has been placed successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-secondary p-4">
              <div className="flex items-center mb-4">
                <img
                  src={selectedStore?.logo}
                  alt={selectedStore?.name}
                  className="w-8 h-8 mr-3 object-contain"
                />
                <div>
                  <p className="font-medium">{selectedStore?.name}</p>
                  <p className="text-sm text-muted-foreground">Delivery in 2-3 hours</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">${calculateTotalCost()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Fee</span>
                  <span className="text-sm">${selectedStore?.deliveryFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(parseFloat(calculateTotalCost()) + (selectedStore?.deliveryFee || 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-center text-muted-foreground">
              <p>You can track your order in the orders section.</p>
              <p>Est. delivery time: 2-3 hours</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={() => setIsOrderComplete(false)}>
              Back to Grocery List
            </Button>
          </CardFooter>
        </Card>
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
                <div key={category} className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
                  <div className="space-y-2">
                    {groupedIngredients[category].map((ingredient) => (
                      <div 
                        key={ingredient.id}
                        className={`
                          flex items-center justify-between p-2 rounded-md transition-colors
                          ${checkedItems[ingredient.id] ? 'bg-secondary/50' : 'hover:bg-secondary/30'}
                        `}
                      >
                        <div className="flex items-center">
                          <Checkbox
                            id={`item-${ingredient.id}`}
                            checked={checkedItems[ingredient.id] || false}
                            onCheckedChange={() => toggleItem(ingredient.id)}
                          />
                          <label
                            htmlFor={`item-${ingredient.id}`}
                            className={`ml-2 ${checkedItems[ingredient.id] ? 'line-through text-muted-foreground' : ''}`}
                          >
                            {ingredient.name}
                          </label>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ingredient.amount} {ingredient.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockGroceryStores.map((store) => (
                  <div
                    key={store.id}
                    className={`
                      flex flex-col items-center p-4 rounded-lg border transition-all cursor-pointer
                      ${selectedStore?.id === store.id 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/30' 
                        : 'border-border hover:bg-secondary/50'}
                    `}
                    onClick={() => setSelectedStore(store)}
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
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full flex justify-between items-center p-3 rounded-md bg-secondary">
                <div>
                  <p className="font-medium">Total Estimated Cost</p>
                  <p className="text-sm text-muted-foreground">
                    {ingredients.length} items + ${selectedStore?.deliveryFee.toFixed(2) || '0.00'} delivery
                  </p>
                </div>
                <p className="text-xl font-semibold">
                  ${(parseFloat(calculateTotalCost()) + (selectedStore?.deliveryFee || 0)).toFixed(2)}
                </p>
              </div>
              
              <Button 
                className="w-full"
                disabled={!selectedStore || isOrdering}
                onClick={handlePlaceOrder}
              >
                {isOrdering ? (
                  <>Processing Order...</>
                ) : (
                  <>
                    Order from {selectedStore?.name} <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
