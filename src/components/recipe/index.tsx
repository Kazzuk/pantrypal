import { extractRecipes } from '@/lib/recipe';
import { Message } from 'ai/react';
import { useState } from 'react';
import ListDisplay from '../list-display';
import Pagination from '../pagination';

interface RecipeProps {
  isLoading: boolean;
  messages: Message[];
}

export default function Recipe({ isLoading, messages }: RecipeProps) {
  const [page, setActivePage] = useState(1);

  if (isLoading) {
    return null;
  }

  const recipes = extractRecipes(messages);
  if (!recipes) {
    return null;
  }

  console.log(recipes);

  const currentRecipe = recipes[page - 1];
  const ingredients = currentRecipe.ingredients.map(
    (ingredient) => `${ingredient.quantity} ${ingredient.measurement} ${ingredient.item}`
  );
  const instructions = currentRecipe.instructions;
  const title = currentRecipe.title;

  return (
    <div className="flex flex-col items-center">
      <div className="card my-6 w-full rounded-lg border border-black/20 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">{title}</h2>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <ListDisplay title="Ingredients" items={ingredients} />
            </div>
            <div className="md:w-1/2">
              <ListDisplay title="Instructions" items={instructions} ordered />
            </div>
          </div>
        </div>
      </div>
      <Pagination recipes={recipes.length} setActivePage={setActivePage} />
    </div>
  );
}
