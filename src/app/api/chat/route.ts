import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI, { APIError } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { data, messages } = await req.json();
    const ingredients = messages.map((item: any) => item.content).join(', ');
    let prompt = `Generate a detailed recipe in a JSON format using these ingredients: ${ingredients}. Including these keys 'title', 'servings', 'ingredients', and 'instructions'. For each ingredient, include 'item', 'quantity', and 'measurement'. Instructions should be a list of steps.`;

    // Add dietary requirements to the prompt if selected
    // they are stored as string booleans and not of boolean type directly
    if (data.vegetarian == 'true') {
      prompt += ' Ensure the recipe is suitable for vegetarians.';
    }

    if (data.vegan == 'true') {
      prompt += ' Ensure the recipe is suitable for vegans.';
    }

    if (data.glutenFree == 'true') {
      prompt += ' Ensure the recipe is gluten-free.';
    }

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a helpful chef assistant. Please provide responses in JSON format.' },
        { role: 'user', content: prompt },
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
