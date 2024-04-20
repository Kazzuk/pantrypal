'use client';

import Header from '@/components/header';
import InputForm from '@/components/input-form';
import Recipe from '@/components/recipe';
import { useChat } from 'ai/react';

export default function Home() {
  const { isLoading, handleInputChange, handleSubmit, messages, error } = useChat();

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Header />
      <main className="w-full">
        <div className="mx-auto w-full max-w-md">
          <InputForm isLoading={isLoading} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </div>
        <div className="mx-auto w-full max-w-4xl">
          <Recipe isLoading={isLoading} messages={messages} />
        </div>
      </main>
    </div>
  );
}
