
import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreviewUrl: string | null;
}

export function ImageUploader({ onImageUpload, imagePreviewUrl }: ImageUploaderProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
    // Reset the input value to allow uploading the same file again
    event.target.value = '';
  };

  const handleClick = () => {
    inputRef.current?.click();
  };
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
    e.dataTransfer.clearData();
  }, [onImageUpload]);

  return (
    <div 
      className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600 hover:border-gray-500'}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Image upload input"
      />
      {imagePreviewUrl ? (
        <div className="relative group">
          <img src={imagePreviewUrl} alt="Preview" className="w-full h-auto object-contain max-h-80 rounded-lg" />
          <div 
            onClick={handleClick} 
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg cursor-pointer"
          >
            <div className="text-center text-white">
              <UploadIcon className="mx-auto h-8 w-8 mb-2" />
              <p className="font-semibold">Change Image</p>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={handleClick} className="flex flex-col items-center justify-center p-10 cursor-pointer text-gray-400">
          <UploadIcon className="h-12 w-12 mb-3" />
          <p className="font-semibold text-gray-300">Click to upload or drag & drop</p>
          <p className="text-xs mt-1">PNG, JPG, GIF, or WEBP</p>
        </div>
      )}
    </div>
  );
}
