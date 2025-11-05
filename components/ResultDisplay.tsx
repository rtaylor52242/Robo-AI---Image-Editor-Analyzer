
import React from 'react';
import type { GeminiResult } from '../types';
import { DownloadIcon } from './Icons';

interface ResultDisplayProps {
  result: GeminiResult | null;
  isLoading: boolean;
  originalImagePreview: string | null;
}

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-300 text-lg">Gemini is thinking...</p>
    </div>
);


const Placeholder = ({ imagePreview }: { imagePreview: string | null }) => {
    if (imagePreview) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <img src={imagePreview} alt="Your uploaded image" className="max-w-full max-h-[80vh] rounded-lg shadow-lg" />
                <p className="mt-4 text-gray-400">Your original image. The result will appear here.</p>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Upload an image and enter a prompt to see the result</p>
        </div>
    );
};

export function ResultDisplay({ result, isLoading, originalImagePreview }: ResultDisplayProps): React.ReactElement {
  return (
    <div className="bg-gray-800/50 w-full h-full min-h-[400px] lg:min-h-0 rounded-2xl flex items-center justify-center p-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : result ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          {result.type === 'image' ? (
            <div className="relative group">
              <img src={result.url} alt="Generated result" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />
              <a 
                href={result.url} 
                download="gemini-edited-image.png"
                className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                aria-label="Download image"
              >
                <DownloadIcon className="h-6 w-6" />
              </a>
            </div>
          ) : (
            <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 max-w-full p-6 bg-gray-900/50 rounded-lg overflow-y-auto max-h-[80vh]">
              <p>{result.content}</p>
            </div>
          )}
        </div>
      ) : (
        <Placeholder imagePreview={originalImagePreview} />
      )}
    </div>
  );
}
