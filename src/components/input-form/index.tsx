import { ChatRequestOptions } from 'ai';
import { useEffect, useRef } from 'react';

interface InputFormProps {
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
}

export default function InputForm({ isLoading, handleInputChange, handleSubmit }: InputFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        placeholder="Enter the ingredients you have, separated by commas"
        onChange={handleInputChange}
        disabled={isLoading}
        className="textarea textarea-bordered textarea-md mb-6 w-full max-w-md resize-none overflow-y-hidden rounded-lg px-4 py-2 shadow-sm focus:outline-none"
      />
      <button type="submit" disabled={isLoading} className="btn btn-primary relative w-full rounded-lg">
        {isLoading && (
          <span className="loading loading-dots loading-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"></span>
        )}
        {!isLoading && 'Show me recipes'}
      </button>
    </form>
  );
}