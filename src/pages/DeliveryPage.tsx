
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, History, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const DeliveryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Delivery Status</h1>
            <p className="text-muted-foreground">
              Track your grocery deliveries
            </p>
          </div>
          
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">
                <Package className="h-4 w-4 mr-2" />
                Active Deliveries
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                Delivery History
              </TabsTrigger>
              <TabsTrigger value="issues">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issues
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <Card className="glass-card mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Active Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium">Order #2439</h3>
                          <p className="text-sm text-muted-foreground">Placed on May 15, 2023</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          In Transit
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center mr-3">
                              <img src="https://placehold.co/100" alt="Store logo" className="w-6 h-6" />
                            </div>
                            <span>Whole Foods Market</span>
                          </div>
                          <span className="text-sm">14 items</span>
                        </div>
                        
                        <div className="bg-secondary/50 rounded p-3">
                          <h4 className="font-medium text-sm mb-2">Estimated Delivery</h4>
                          <p className="text-sm">Today, between 3:00 PM - 5:00 PM</p>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex justify-between">
                          <Button variant="outline" size="sm">Track Order</Button>
                          <Button variant="outline" size="sm">Order Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="bg-muted/50 rounded-lg p-5 text-center">
                    <p className="text-muted-foreground">No other active deliveries at the moment.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Delivery History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item, index) => (
                      <div key={index} className="flex items-start justify-between py-4 border-b last:border-0">
                        <div>
                          <h3 className="font-medium">Order #{2438 - index}</h3>
                          <p className="text-sm text-muted-foreground">
                            Delivered on May {15 - (index * 7)}, 2023
                          </p>
                          <div className="flex items-center text-sm mt-1">
                            <span className="inline-flex items-center mr-4">
                              <img src="https://placehold.co/100" alt="Store logo" className="w-4 h-4 mr-1" />
                              Whole Foods
                            </span>
                            <span>12 items</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="issues">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Report Delivery Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Need help with your delivery?</p>
                          <p className="text-sm mt-1">
                            If you're missing items, received damaged goods, or have other issues with your delivery, we're here to help.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Select an order to report an issue:</h3>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">Order #2439</h4>
                            <p className="text-sm text-muted-foreground">Delivered today</p>
                          </div>
                          <Button variant="outline" size="sm">Report Issue</Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">Order #2438</h4>
                            <p className="text-sm text-muted-foreground">Delivered on May 8, 2023</p>
                          </div>
                          <Button variant="outline" size="sm">Report Issue</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Contact Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        For urgent issues or help with anything else, our support team is available.
                      </p>
                      <Button>Contact Support</Button>
                    </div>
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

export default DeliveryPage;
