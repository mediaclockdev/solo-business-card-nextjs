"use client";
import React from 'react';
import { ImageUploadCard } from './ImageUploadCard';

export function CardPreviewUpload() {
  const handleImagesChange = (images: string[]) => {
    // Store in localStorage for demo purposes
    localStorage.setItem('cardPreviewImage', JSON.stringify(images[0] || ''));
    console.log('Card preview image updated:', images[0]);
  };

  return (
    <ImageUploadCard
      title="Card Preview Image"
      description="Upload an image to preview how your card will look"
      multiple={false}
      onImagesChange={handleImagesChange}
      acceptedTypes="image/png,image/jpeg,image/webp"
      maxSize={5}
    />
  );
}