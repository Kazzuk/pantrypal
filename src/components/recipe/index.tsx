import ListDisplay from '@/components/list-display';
import { extractRecipe } from '@/lib/recipe';
import { Message } from 'ai/react';

interface RecipeProps {
  isLoading: boolean;
  messages: Message[];
}

export default function Recipe({ isLoading, messages }: RecipeProps) {
  const recipe = extractRecipe(messages);

  if (isLoading || !recipe) {
    return null;
  }

  const ingredients =
    recipe?.ingredients.map((ingredient) => `${ingredient.quantity} ${ingredient.measurement} ${ingredient.item}`) ||
    [];
  const instructions = recipe?.instructions || [];
  const recipeTitle = recipe?.title || 'Recipe';

  return (
    <div className="card my-6 w-full rounded-lg border border-black/20 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl">{recipeTitle}</h2>
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
  );
}
