
import { Recipe, GroceryStore } from './types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Grilled Chicken Salad with Avocado',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    description: 'A protein-rich salad with grilled chicken breast, fresh greens, and creamy avocado.',
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 25,
    prepTime: 15,
    cookTime: 15,
    dietaryTags: ['none', 'gluten-free', 'dairy-free'],
    ingredients: [
      { id: '1-1', name: 'Chicken breast', amount: 200, unit: 'g' },
      { id: '1-2', name: 'Mixed greens', amount: 100, unit: 'g' },
      { id: '1-3', name: 'Avocado', amount: 1, unit: 'whole' },
      { id: '1-4', name: 'Cherry tomatoes', amount: 100, unit: 'g' },
      { id: '1-5', name: 'Olive oil', amount: 1, unit: 'tbsp' },
      { id: '1-6', name: 'Lemon juice', amount: 1, unit: 'tbsp' },
      { id: '1-7', name: 'Salt', amount: 0.5, unit: 'tsp' },
      { id: '1-8', name: 'Black pepper', amount: 0.25, unit: 'tsp' },
    ],
    instructions: [
      'Season chicken breast with salt and pepper.',
      'Grill chicken for 6-7 minutes per side until fully cooked.',
      'Wash and dry mixed greens and place in a large bowl.',
      'Slice avocado and cherry tomatoes.',
      'Slice grilled chicken into strips.',
      'Arrange chicken, avocado, and tomatoes over greens.',
      'Whisk together olive oil, lemon juice, salt, and pepper.',
      'Drizzle dressing over salad and serve.'
    ]
  },
  {
    id: '2',
    title: 'Lentil and Vegetable Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    description: 'A hearty, plant-based soup filled with lentils and seasonal vegetables.',
    calories: 320,
    protein: 18,
    carbs: 45,
    fat: 6,
    prepTime: 20,
    cookTime: 40,
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    ingredients: [
      { id: '2-1', name: 'Green lentils', amount: 200, unit: 'g' },
      { id: '2-2', name: 'Onion', amount: 1, unit: 'medium' },
      { id: '2-3', name: 'Carrot', amount: 2, unit: 'medium' },
      { id: '2-4', name: 'Celery', amount: 2, unit: 'stalks' },
      { id: '2-5', name: 'Garlic', amount: 2, unit: 'cloves' },
      { id: '2-6', name: 'Vegetable broth', amount: 1.5, unit: 'liters' },
      { id: '2-7', name: 'Tomato', amount: 2, unit: 'medium' },
      { id: '2-8', name: 'Cumin', amount: 1, unit: 'tsp' },
      { id: '2-9', name: 'Olive oil', amount: 1, unit: 'tbsp' },
      { id: '2-10', name: 'Salt', amount: 1, unit: 'tsp' },
      { id: '2-11', name: 'Black pepper', amount: 0.5, unit: 'tsp' },
    ],
    instructions: [
      'Dice onion, carrots, celery, and tomatoes. Mince garlic.',
      'Heat olive oil in a large pot over medium heat.',
      'Add onion, carrot, and celery. Cook until onion is translucent, about 5 minutes.',
      'Add garlic and cumin, cook for another minute until fragrant.',
      'Add lentils, vegetable broth, and tomatoes.',
      'Bring to a boil, then reduce heat and simmer for 35-40 minutes until lentils are tender.',
      'Season with salt and pepper to taste.',
      'Serve hot, optionally garnished with fresh herbs.'
    ]
  },
  {
    id: '3',
    title: 'Protein-Packed Overnight Oats',
    image: 'https://images.unsplash.com/photo-1651476298221-cb56590bff34',
    description: 'A convenient make-ahead breakfast with oats, protein powder, and fresh fruit.',
    calories: 380,
    protein: 25,
    carbs: 40,
    fat: 12,
    prepTime: 10,
    cookTime: 0,
    dietaryTags: ['vegetarian'],
    ingredients: [
      { id: '3-1', name: 'Rolled oats', amount: 60, unit: 'g' },
      { id: '3-2', name: 'Protein powder', amount: 30, unit: 'g' },
      { id: '3-3', name: 'Greek yogurt', amount: 100, unit: 'g' },
      { id: '3-4', name: 'Almond milk', amount: 120, unit: 'ml' },
      { id: '3-5', name: 'Chia seeds', amount: 10, unit: 'g' },
      { id: '3-6', name: 'Honey', amount: 1, unit: 'tbsp' },
      { id: '3-7', name: 'Blueberries', amount: 50, unit: 'g' },
      { id: '3-8', name: 'Sliced almonds', amount: 15, unit: 'g' },
    ],
    instructions: [
      'In a jar or container, combine rolled oats, protein powder, and chia seeds.',
      'Add Greek yogurt, almond milk, and honey. Stir well to combine.',
      'Seal container and refrigerate overnight or for at least 4 hours.',
      'Before serving, top with fresh blueberries and sliced almonds.'
    ]
  },
  {
    id: '4',
    title: 'Grilled Salmon with Asparagus',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    description: 'Omega-3 rich salmon fillet with grilled asparagus and lemon.',
    calories: 460,
    protein: 40,
    carbs: 10,
    fat: 28,
    prepTime: 10,
    cookTime: 20,
    dietaryTags: ['none', 'gluten-free', 'dairy-free'],
    ingredients: [
      { id: '4-1', name: 'Salmon fillet', amount: 200, unit: 'g' },
      { id: '4-2', name: 'Asparagus', amount: 200, unit: 'g' },
      { id: '4-3', name: 'Olive oil', amount: 2, unit: 'tbsp' },
      { id: '4-4', name: 'Lemon', amount: 1, unit: 'whole' },
      { id: '4-5', name: 'Garlic powder', amount: 0.5, unit: 'tsp' },
      { id: '4-6', name: 'Salt', amount: 0.5, unit: 'tsp' },
      { id: '4-7', name: 'Black pepper', amount: 0.25, unit: 'tsp' },
      { id: '4-8', name: 'Fresh dill', amount: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Trim woody ends from asparagus and toss with 1 tbsp olive oil, salt, and pepper.',
      'Rub salmon with remaining olive oil, garlic powder, salt, and pepper.',
      'Slice half the lemon into rounds and the other half for juicing.',
      'Place salmon skin-side down on the grill. Arrange lemon slices on top.',
      'Grill for 10-12 minutes until salmon flakes easily with a fork.',
      'Grill asparagus for 5-7 minutes, turning occasionally.',
      'Plate salmon and asparagus, squeeze fresh lemon juice over both.',
      'Garnish with fresh dill and serve.'
    ]
  }
];

export const mockGroceryStores: GroceryStore[] = [
  {
    id: '1',
    name: 'Walmart',
    logo: 'https://logo.clearbit.com/walmart.com',
    deliveryFee: 9.95,
    minOrder: 35,
    hasAPI: true
  },
  {
    id: '2',
    name: 'Costco',
    logo: 'https://logo.clearbit.com/costco.com',
    deliveryFee: 11.99,
    minOrder: 40,
    hasAPI: true
  },
  {
    id: '3',
    name: 'Save on Foods',
    logo: 'https://logo.clearbit.com/saveonfoods.com',
    deliveryFee: 7.95,
    minOrder: 30,
    hasAPI: true
  }
];
