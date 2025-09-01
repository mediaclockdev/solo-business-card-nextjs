"use client";
import React from 'react';
import { ImageUploadCard } from './ImageUploadCard';

export function SliderImagesUpload() {
  const handleImagesChange = (images: string[]) => {
    // Store in localStorage for demo purposes
    localStorage.setItem('sliderImages', JSON.stringify(images));
    console.log('Slider images updated:', images);
  };

  return (
    <ImageUploadCard
      title="Slider Images"
      description="Upload multiple images for carousel/slider display"
      multiple={true}
      onImagesChange={handleImagesChange}
      acceptedTypes="image/png,image/jpeg,image/webp"
      maxSize={5}
    />
  );
}