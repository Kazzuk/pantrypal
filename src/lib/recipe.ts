import { Message } from 'ai/react';

export interface Recipe {
  title: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  item: string;
  quantity: number | string;
  measurement: string;
}

export const extractRecipe = (messages: Message[]): Recipe | null => {
  const assistantMessage = messages.find((msg) => msg.role === 'assistant');
  if (!assistantMessage) {
    return null;
  }

  try {
    const recipeData: Recipe = JSON.parse(assistantMessage.content);
    recipeData.instructions = recipeData.instructions.map(cleanInstruction);
    return recipeData;
  } catch (error) {
    console.error('Failed to parse recipe JSON:', error);
    return null;
  }
};

function cleanInstruction(instruction: string): string {
  // Regex to remove numbers followed by periods or dashes, and standalone bullet points
  return instruction.replace(/^\s*[\d]+\.\s*|^\s*[-•]\s*/gm, '').trim();
}
