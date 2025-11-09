import { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search for anime...",
}: SearchBarProps) {
  // Handle input text changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Clear the input field when clicking the "X" button
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Search icon on the left side */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg bg-white 
                     border-2 border-gray-300 rounded-xl focus:outline-none 
                     focus:border-anime-primary focus:ring-2 focus:ring-anime-primary/20 
                     transition-all shadow-lg text-gray-900"
        />

        {/* Clear button (X icon) */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 
                       focus:outline-none"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
