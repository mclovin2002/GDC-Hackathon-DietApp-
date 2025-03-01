
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import GroceryList from '@/components/GroceryList';
import { Ingredient } from '@/utils/types';

const GroceryListPage = () => {
  const [groceryList, setGroceryList] = useState<Ingredient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load grocery list from localStorage
    const storedGroceryList = localStorage.getItem('groceryList');
    if (!storedGroceryList) {
      navigate('/meal-plan');
      return;
    }
    
    setGroceryList(JSON.parse(storedGroceryList));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Grocery List</h1>
            <p className="text-muted-foreground">
              All the ingredients you need for your meal plan
            </p>
          </div>
          
          <GroceryList ingredients={groceryList} />
        </div>
      </main>
    </div>
  );
};

export default GroceryListPage;
