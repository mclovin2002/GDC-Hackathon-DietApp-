
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GroceryStore, Ingredient } from '@/utils/types';

interface OrderConfirmationProps {
  selectedStore: GroceryStore | null;
  totalCost: string;
  onBackToList: () => void;
}

export function OrderConfirmation({ 
  selectedStore, 
  totalCost, 
  onBackToList 
}: OrderConfirmationProps) {
  return (
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
              <span className="text-sm">${totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Delivery Fee</span>
              <span className="text-sm">${selectedStore?.deliveryFee.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${(parseFloat(totalCost) + (selectedStore?.deliveryFee || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-center text-muted-foreground">
          <p>You can track your order in the orders section.</p>
          <p>Est. delivery time: 2-3 hours</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" onClick={onBackToList}>
          Back to Grocery List
        </Button>
      </CardFooter>
    </Card>
  );
}
