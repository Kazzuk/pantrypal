import { ChatRequestOptions } from 'ai';
import { Message } from 'ai/react';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface InputFormProps {
  isLoading: boolean;
  setMessages: (messages: Message[]) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
}

export default function InputForm({ isLoading, handleInputChange, handleSubmit, setMessages }: InputFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);

  useEffect(() => {
    function resizeTextarea() {
      const maxHeight = 300; // Set the maximum height in pixels
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        const desiredHeight = textarea.scrollHeight;
        if (desiredHeight > maxHeight) {
          textarea.style.height = `${maxHeight}px`; // Limit the height and show scrollbar
          textarea.style.overflowY = 'auto'; // Enable scrollbar when content exceeds max height
        } else {
          textarea.style.height = `${desiredHeight}px`;
          textarea.style.overflowY = 'hidden'; // Hide scrollbar when content is within max height
        }
      }
    }

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', resizeTextarea);
      return () => {
        textarea.removeEventListener('input', resizeTextarea);
      };
    }
  }, []);

  function localHandleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const requestOptions = {
      data: {
        vegetarian: isVegetarian.toString(),
        vegan: isVegan.toString(),
        glutenFree: isGlutenFree.toString(),
      },
    };
    clearMessages();
    handleSubmit(e, requestOptions);
  }

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <form onSubmit={localHandleSubmit}>
      <textarea
        ref={textareaRef}
        placeholder="Enter your ingredients..."
        onChange={handleInputChange}
        disabled={isLoading}
        className="textarea textarea-bordered textarea-md mb-6 w-full max-w-md resize-none overflow-y-hidden rounded-lg px-4 py-2 shadow-sm focus:outline-none"
      />
      <div className="mb-6 flex justify-between">
        <label className="mr-4 inline-flex items-center">
          <input
            type="checkbox"
            name="vegetarian"
            checked={isVegetarian}
            onChange={(e) => setIsVegetarian(e.target.checked)}
            disabled={isLoading}
            className="checkbox"
          />
          <span className="ml-2">Vegetarian</span>
        </label>
        <label className="mr-4 inline-flex items-center">
          <input
            type="checkbox"
            name="vegan"
            checked={isVegan}
            onChange={(e) => setIsVegan(e.target.checked)}
            disabled={isLoading}
            className="checkbox"
          />
          <span className="ml-2">Vegan</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="glutenFree"
            checked={isGlutenFree}
            onChange={(e) => setIsGlutenFree(e.target.checked)}
            disabled={isLoading}
            className="checkbox"
          />
          <span className="ml-2">Gluten-Free</span>
        </label>
      </div>
      <button type="submit" disabled={isLoading} className="btn btn-primary relative w-full rounded-lg">
        {isLoading && (
          <span className="loading loading-dots loading-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"></span>
        )}
        {!isLoading && 'Show me recipes'}
      </button>
    </form>
  );
}
