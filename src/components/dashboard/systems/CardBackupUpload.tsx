"use client";
import React from 'react';
import { ImageUploadCard } from './ImageUploadCard';

export function CardBackupUpload() {
  const handleImagesChange = (images: string[]) => {
    // Store in localStorage for demo purposes
    localStorage.setItem('cardBackupImage', JSON.stringify(images[0] || ''));
    console.log('Card backup image updated:', images[0]);
  };

  return (
    <ImageUploadCard
      title="Card Backup Image"
      description="Upload a default backup image for business cards"
      multiple={false}
      onImagesChange={handleImagesChange}
      acceptedTypes="image/png,image/jpeg,image/webp"
      maxSize={5}
    />
  );
}