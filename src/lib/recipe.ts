import { Recipe } from '@/types/recipe';
import { Message } from 'ai/react';

export function extractRecipes(messages: Message[]): Recipe[] | null {
  const message = messages.find((msg) => msg.role === 'assistant');
  if (!message) {
    return null;
  }

  try {
    const data = JSON.parse(message.content);
    const recipes: Recipe[] = Object.keys(data).map((key) => {
      const recipe = data[key];
      recipe.instructions = recipe.instructions.map(cleanInstruction);
      return recipe;
    });
    return recipes;
  } catch (error) {
    console.error('Failed to parse recipe JSON:', error);
    return null;
  }
}

function cleanInstruction(instruction: string): string {
  // Regex to remove numbers followed by periods or dashes, and standalone bullet points
  return instruction.replace(/^\s*[\d]+\.\s*|^\s*[-•]\s*/gm, '').trim();
}
