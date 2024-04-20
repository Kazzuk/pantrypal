import { SoupIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-12 flex flex-col items-center justify-center">
      <SoupIcon className="h-12 w-12 text-black" />
      <h1 className="mt-2 text-4xl font-bold">pantrypal</h1>
      <p className="mt-4 text-center text-lg">Minimise Waste, Maximise Meals</p>
      <p className="mt-1 text-sm text-gray-600">
        Enter the ingredients you have, and we&apos;ll help you find the perfect recipe
      </p>
    </header>
  );
}
