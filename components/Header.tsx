
import React from 'react';
import { RoboLogo } from './Icons';

export function Header(): React.ReactElement {
  return (
    <header className="w-full p-4 md:p-6 text-center border-b border-gray-700/50">
      <div className="flex items-center justify-center gap-3">
        <RoboLogo className="h-8 w-8" />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Robo AI - Image Editor & Analyzer
        </h1>
      </div>
      <p className="mt-2 text-sm md:text-base text-gray-400">
        Upload a photo to analyze it or bring your creative ideas to life with text-powered editing.
      </p>
    </header>
  );
}