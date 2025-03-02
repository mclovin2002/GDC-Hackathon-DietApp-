import React, { useState } from 'react';
import { Package, MapPin, Clock, Calendar, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const MOCK_DELIVERIES = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    status: 'In Transit',
    estimatedDelivery: '2024-03-15T14:00:00',
    items: ['Vegetables', 'Fruits', 'Dairy'],
    progress: 65,
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    status: 'Scheduled',
    estimatedDelivery: '2024-03-18T10:00:00',
    items: ['Meat', 'Seafood', 'Grains'],
    progress: 25,
  },
];

const DeliveryPage = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10-12');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, City, State 12345');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Delivery Status</h1>
      <p className="text-muted-foreground mb-8">Track your grocery deliveries and manage preferences</p>

      {/* Active Deliveries */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Active Deliveries</h2>
        <div className="grid gap-6">
          {MOCK_DELIVERIES.map((delivery) => (
            <Card key={delivery.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order #{delivery.orderNumber}
                    </CardTitle>
                    <CardDescription>
                      Estimated delivery: {new Date(delivery.estimatedDelivery).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${delivery.status === 'In Transit' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                      {delivery.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{delivery.progress}%</span>
                    </div>
                    <Progress value={delivery.progress} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {delivery.items.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delivery Preferences */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Preferences
          </CardTitle>
          <CardDescription>Manage your delivery settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Delivery Address</Label>
              <div className="flex gap-2">
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Delivery Time</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8-10">8:00 AM - 10:00 AM</SelectItem>
                  <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="12-14">12:00 PM - 2:00 PM</SelectItem>
                  <SelectItem value="14-16">2:00 PM - 4:00 PM</SelectItem>
                  <SelectItem value="16-18">4:00 PM - 6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Delivery Instructions</Label>
              <Input
                placeholder="E.g., Leave at front door, Call upon arrival, etc."
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Delivery History
          </CardTitle>
          <CardDescription>View your past deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: '2024-03-01',
                orderNumber: 'ORD-2024-001',
                items: ['Vegetables', 'Fruits', 'Dairy'],
                status: 'Delivered',
              },
              {
                date: '2024-02-15',
                orderNumber: 'ORD-2024-002',
                items: ['Meat', 'Seafood', 'Grains'],
                status: 'Delivered',
              },
            ].map((delivery, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">Order #{delivery.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(delivery.date).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {delivery.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-secondary rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-green-600">{delivery.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryPage;
