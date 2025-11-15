
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { AnalyzeIcon, EditIcon, EnhanceIcon } from './components/Icons';
import { analyzeImage, editImage, enhanceImage } from './services/geminiService';
import type { GeminiResult } from './types';
import { HelpModal } from './components/HelpModal';

export default function App(): React.ReactElement {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<GeminiResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'analyze' | 'enhance'>('edit');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setOriginalImagePreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
    setPrompt('');
  }, []);

  const handleSubmit = async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    if ((activeTab === 'edit' || activeTab === 'analyze') && !prompt) {
      setError(`Please enter a prompt to ${activeTab} the image.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (activeTab === 'edit') {
        const editedImageUrl = await editImage(originalImage, prompt);
        setResult({ type: 'image', url: editedImageUrl });
      } else if (activeTab === 'enhance') {
        const enhancedImageUrl = await enhanceImage(originalImage);
        setResult({ type: 'image', url: enhancedImageUrl });
      } else {
        const analysisText = await analyzeImage(originalImage, prompt);
        setResult({ type: 'text', content: analysisText });
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const editSuggestions = [
    "Add a retro, vintage filter",
    "Make the sky look like a van Gogh painting",
    "Add a small, friendly robot in the corner",
    "Turn this into a black and white sketch",
    "Remove the person in the background"
  ];

  const analyzeSuggestions = [
    "Describe this image in detail",
    "What is the main subject of this photo?",
    "What emotions does this image evoke?",
    "Suggest a creative caption for this picture",
    "Is this a real place? If so, where is it?"
  ];


  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Header onHelpClick={() => setIsHelpModalOpen(true)} />
        <main className="flex-grow p-4 md:p-8 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
          {/* Control Panel */}
          <div className="w-full lg:w-1/3 lg:max-w-md flex flex-col gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg h-fit lg:sticky lg:top-8">
            <ImageUploader onImageUpload={handleImageUpload} imagePreviewUrl={originalImagePreview} />
            
            {originalImagePreview && (
              <div className="flex flex-col gap-4 transition-opacity duration-500">
                <div className="flex bg-gray-700 rounded-lg p-1">
                  <button 
                    onClick={() => setActiveTab('edit')} 
                    className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'edit' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setActiveTab('analyze')}
                    className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'analyze' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                  >
                    Analyze
                  </button>
                   <button 
                    onClick={() => setActiveTab('enhance')}
                    className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'enhance' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                  >
                    Enhance
                  </button>
                </div>

                { (activeTab === 'edit' || activeTab === 'analyze') && (
                  <>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={activeTab === 'edit' ? "e.g., Add a retro filter..." : "e.g., Describe this image..."}
                      className="w-full h-28 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                      aria-label="Prompt for image editing or analysis"
                    />
                    
                    <div className="text-xs text-gray-400">
                      <p className="font-semibold mb-1">Suggestions:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(activeTab === 'edit' ? editSuggestions : analyzeSuggestions).map((s) => (
                          <button key={s} onClick={() => handlePromptSuggestion(s)} className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded-md transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'enhance' && (
                  <div className="text-sm text-gray-400 p-3 bg-gray-700 rounded-lg text-center">
                    <p>Automatically improve image quality, resolution, sharpness, and clarity with one click.</p>
                  </div>
                )}


                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {activeTab === 'edit' && <EditIcon />}
                      {activeTab === 'analyze' && <AnalyzeIcon />}
                      {activeTab === 'enhance' && <EnhanceIcon />}
                      {activeTab === 'edit' ? 'Generate Edit' : activeTab === 'analyze' ? 'Analyze Image' : 'Enhance Image'}
                    </>
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mt-2" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </div>

          {/* Result Display */}
          <div className="w-full lg:w-2/3 flex-grow">
            <ResultDisplay result={result} isLoading={isLoading} originalImagePreview={originalImagePreview} />
          </div>
        </main>
      </div>
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  );
}
