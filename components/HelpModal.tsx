
import React from 'react';
import { CloseIcon, EditIcon, AnalyzeIcon, EnhanceIcon, UploadIcon } from './Icons';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps): React.ReactElement | null {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl max-w-2xl w-full text-gray-300 p-6 md:p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="help-modal-title" className="text-2xl font-bold text-white">How to Use Robo AI</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close help"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-full mt-1">
              <UploadIcon className="h-6 w-6"/>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">1. Upload an Image</h3>
              <p className="text-gray-400">Click the upload area or drag and drop a file to begin. Your image will appear in the preview window.</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-3">2. Choose an Action</h3>
            <div className="space-y-4 pl-4 border-l-2 border-gray-700 ml-5">
              <div className="flex items-start gap-4">
                <div className="bg-gray-700 p-2 rounded-full mt-1">
                    <EditIcon className="h-5 w-5 text-purple-400"/>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Edit</h4>
                  <p className="text-gray-400">Use the text box to describe the changes you want. Get creative! Try "add a hat to the cat" or "make this look like a watercolor painting".</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-gray-700 p-2 rounded-full mt-1">
                    <AnalyzeIcon className="h-5 w-5 text-blue-400"/>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Analyze</h4>
                  <p className="text-gray-400">Ask questions about your image. For example, "what kind of flower is this?" or "describe the mood of this photo".</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-gray-700 p-2 rounded-full mt-1">
                    <EnhanceIcon className="h-5 w-5 text-green-400"/>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Enhance</h4>
                  <p className="text-gray-400">Click this tab for a one-click improvement to your image's quality, sharpness, and clarity. No prompt is needed!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
             <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-full mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">3. Generate Your Result</h3>
              <p className="text-gray-400">Hit the "Generate" button and watch the AI work its magic. Your result will appear on the right side of the screen.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
