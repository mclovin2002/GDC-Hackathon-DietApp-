import React, { useState } from 'react';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Clock, History, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    features: [
      'Personalized meal plans',
      'Basic recipe access',
      'Shopping list generation',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 19.99,
    features: [
      'Everything in Basic',
      'Advanced recipe customization',
      'Nutrition tracking',
      'Priority support',
      'Meal prep guides',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 29.99,
    features: [
      'Everything in Pro',
      'Personal nutrition coach',
      'Custom recipe creation',
      '24/7 support',
      'Family meal planning',
      'Advanced analytics',
    ],
  },
];

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [showAddCard, setShowAddCard] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = () => {
    toast({
      title: "Subscription updated",
      description: "Your subscription has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payment & Subscription</h1>
            <p className="text-muted-foreground">
              Manage your payment methods and subscription details
            </p>
          </div>
          
          <Tabs defaultValue="payment-methods">
            <TabsList className="mb-6">
              <TabsTrigger value="payment-methods">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="billing-history">
                <History className="h-4 w-4 mr-2" />
                Billing History
              </TabsTrigger>
              <TabsTrigger value="subscription">
                <Clock className="h-4 w-4 mr-2" />
                Subscription
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment-methods">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showAddCard ? (
                    <div className="space-y-4">
                      <RadioGroup defaultValue="card1">
                        <div className="flex items-center space-x-4 border rounded-lg p-4">
                          <RadioGroupItem value="card1" id="card1" />
                          <Label htmlFor="card1" className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/24</p>
                              </div>
                              <img src="/visa.svg" alt="Visa" className="h-8" />
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowAddCard(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Card
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVC</Label>
                          <Input placeholder="123" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setShowAddCard(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="flex-1">Add Card</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing-history">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View your past transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">Monthly Subscription</p>
                          <p className="text-sm text-muted-foreground">May {index + 1}, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$14.99</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscription">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Your Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {SUBSCRIPTION_PLANS.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`relative ${selectedPlan === plan.id ? 'border-primary' : ''}`}
                      >
                        {selectedPlan === plan.id && (
                          <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-1.5">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            ${plan.price}/month
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={selectedPlan === plan.id ? "secondary" : "outline"}
                            onClick={() => setSelectedPlan(plan.id)}
                          >
                            {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Plan Features:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="bg-primary/20 text-primary rounded-full p-1 mr-2">✓</span>
                        <span>Unlimited personalized meal plans</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/20 text-primary rounded-full p-1 mr-2">✓</span>
                        <span>Access to premium recipes</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/20 text-primary rounded-full p-1 mr-2">✓</span>
                        <span>Grocery delivery integration</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/20 text-primary rounded-full p-1 mr-2">✓</span>
                        <span>Nutrition tracking and analytics</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="text-destructive">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
