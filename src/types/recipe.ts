import { Ingredient } from '@/types/ingredient';

export interface Recipe {
  title: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
}
