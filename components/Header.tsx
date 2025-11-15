
import React from 'react';
import { RoboLogo, QuestionMarkIcon } from './Icons';

interface HeaderProps {
  onHelpClick: () => void;
}

export function Header({ onHelpClick }: HeaderProps): React.ReactElement {
  return (
    <header className="relative w-full p-4 md:p-6 text-center border-b border-gray-700/50">
      <div className="flex items-center justify-center gap-3">
        <RoboLogo className="h-8 w-8" />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Robo AI - Image Editor & Analyzer
        </h1>
      </div>
      <p className="mt-2 text-sm md:text-base text-gray-400">
        Upload a photo to analyze it or bring your creative ideas to life with text-powered editing.
      </p>
      <button 
        onClick={onHelpClick}
        className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
        aria-label="Open help guide"
      >
        <QuestionMarkIcon className="h-6 w-6" />
      </button>
    </header>
  );
}
