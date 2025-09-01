"use client";
import React from 'react';
import { BusinessCard } from '@/types/businessCard';

interface CardFooterAttributionProps {
  card: BusinessCard;
}

export function CardFooterAttribution({ card }: CardFooterAttributionProps) {
  return (
    <div className="mt-4 text-center">
      <div 
        className="inline-block px-4 py-2 rounded-full text-white text-xs font-medium shadow-sm"
        style={{ backgroundColor: card.brandColor }}
      >
        <span className="opacity-90">Created by: </span>
        <a 
          href="https://digipromoting.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:opacity-80 transition-opacity underline"
        >
          https://digipromoting.com
        </a>
      </div>
    </div>
  );
}