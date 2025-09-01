"use client";
import React from 'react';
import { ImageUploadCard } from './ImageUploadCard';

export function OGWebsiteImageUpload() {
  const handleImagesChange = (images: string[]) => {
    // Store in localStorage for demo purposes
    localStorage.setItem('ogWebsiteImage', JSON.stringify(images[0] || ''));
    console.log('OG website image updated:', images[0]);
  };

  return (
    <ImageUploadCard
      title="OG Website Image"
      description="Upload Open Graph image for social media sharing"
      multiple={false}
      onImagesChange={handleImagesChange}
      acceptedTypes="image/png,image/jpeg,image/webp"
      maxSize={5}
    />
  );
}