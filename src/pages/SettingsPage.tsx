
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
import { Settings, Bell, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">
                <Settings className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="help">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Email Address</h3>
                      <div className="flex items-center gap-4">
                        <Input value="user@example.com" readOnly className="max-w-md" />
                        <Button variant="outline">Change</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="flex items-center gap-4">
                        <Input type="password" value="********" readOnly className="max-w-md" />
                        <Button variant="outline">Change</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Management</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Pause Service</p>
                            <p className="text-sm text-muted-foreground">
                              Temporarily pause your subscription and meal plans
                            </p>
                          </div>
                          <Button variant="outline">Pause Service</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control which notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly meal plan updates and grocery recommendations
                          </p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="delivery-updates">Delivery Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your grocery delivery status
                          </p>
                        </div>
                        <Switch id="delivery-updates" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reminder-notifications">Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get reminders to update your meal plan and place grocery orders
                          </p>
                        </div>
                        <Switch id="reminder-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-notifications">Marketing</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive information about new features and promotions
                          </p>
                        </div>
                        <Switch id="marketing-notifications" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage your data privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-collection">Data Collection</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect usage data to improve our service
                          </p>
                        </div>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="personalized-ads">Personalized Recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to use your preferences for personalized recommendations
                          </p>
                        </div>
                        <Switch id="personalized-ads" defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Data Management</h3>
                      <p className="text-sm text-muted-foreground">
                        You can download or delete your data at any time
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline">Download My Data</Button>
                        <Button variant="outline" className="text-destructive">
                          Delete My Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>
                    Get help with your account or service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <h4 className="font-medium mb-1">How do I update my meal preferences?</h4>
                          <p className="text-sm text-muted-foreground">
                            You can update your meal preferences in the My Profile section.
                          </p>
                        </div>
                        
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <h4 className="font-medium mb-1">When will my groceries be delivered?</h4>
                          <p className="text-sm text-muted-foreground">
                            Delivery times vary by store, but you can track your delivery in the Delivery Status section.
                          </p>
                        </div>
                        
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <h4 className="font-medium mb-1">How can I cancel my subscription?</h4>
                          <p className="text-sm text-muted-foreground">
                            You can cancel your subscription in the Payment & Subscription section.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Contact Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Need more help? Our support team is available 24/7.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button>Contact Support</Button>
                        <Button variant="outline">View Documentation</Button>
                      </div>
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

export default SettingsPage;
