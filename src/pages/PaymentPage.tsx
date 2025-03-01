
import React from 'react';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Clock, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const PaymentPage = () => {
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
                  <div className="space-y-5">
                    <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-primary/10 rounded flex items-center justify-center mr-4">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/25</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button>Add New Payment Method</Button>
                    </div>
                  </div>
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
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mb-6">
                    <h3 className="text-lg font-medium mb-2">Current Plan: Premium</h3>
                    <p className="text-muted-foreground mb-4">Your next billing date is June 1, 2023</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">$14.99/month</span>
                      <Button variant="outline">Change Plan</Button>
                    </div>
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
