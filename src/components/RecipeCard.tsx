
import React from 'react';
import { Clock, Utensils, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Recipe } from '@/utils/types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  isSelected?: boolean;
}

export default function RecipeCard({ recipe, onSelect, isSelected = false }: RecipeCardProps) {
  return (
    <Card 
      className={`
        overflow-hidden transition-all duration-300 hover:shadow-lg
        ${isSelected ? 'border-primary ring-2 ring-primary/30' : ''}
      `}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {recipe.dietaryTags.filter(tag => tag !== 'none').map((tag) => (
            <TooltipProvider key={tag}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium capitalize">
                    {tag.replace('-', ' ')}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tag.replace('-', ' ')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold line-clamp-1">{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <div className="flex items-center">
            <Utensils className="h-3.5 w-3.5 mr-1" />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 text-xs my-3">
          <div className="bg-secondary rounded px-2 py-1.5 text-center">
            <div className="font-medium">{recipe.protein}g</div>
            <div className="text-muted-foreground">Protein</div>
          </div>
          <div className="bg-secondary rounded px-2 py-1.5 text-center">
            <div className="font-medium">{recipe.carbs}g</div>
            <div className="text-muted-foreground">Carbs</div>
          </div>
          <div className="bg-secondary rounded px-2 py-1.5 text-center">
            <div className="font-medium">{recipe.fat}g</div>
            <div className="text-muted-foreground">Fat</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-1" />
                Details
              </Button>
            </TooltipTrigger>
            <TooltipContent className="w-64">
              <div className="space-y-2">
                <p className="font-medium text-sm">Ingredients:</p>
                <ul className="text-xs space-y-1">
                  {recipe.ingredients.slice(0, 6).map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))}
                  {recipe.ingredients.length > 6 && <li>+ {recipe.ingredients.length - 6} more...</li>}
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          size="sm" 
          onClick={() => onSelect(recipe)}
          variant={isSelected ? "secondary" : "default"}
        >
          {isSelected ? "Selected" : "Add to Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}
