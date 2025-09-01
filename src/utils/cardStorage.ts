"use client";
import { BusinessCard } from '@/types/businessCard';

const STORAGE_KEY = 'business_cards';
const OLD_STORAGE_KEY = 'savedCards';

// Migration function to move cards from old storage to new storage
const migrateOldCards = (): void => {
  try {
    if (typeof window === 'undefined') return;
    
    const oldCards = localStorage.getItem(OLD_STORAGE_KEY);
    const newCards = localStorage.getItem(STORAGE_KEY);
    
    if (oldCards && !newCards) {
      console.log('Migrating cards from old storage key to new storage key');
      localStorage.setItem(STORAGE_KEY, oldCards);
      localStorage.removeItem(OLD_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error during card migration:', error);
  }
};

export const loadBusinessCards = (): BusinessCard[] => {
  try {
    if (typeof window === 'undefined') return [];
    
    // Run migration on first load
    migrateOldCards();
    
    // Try new storage key first
    let saved = localStorage.getItem(STORAGE_KEY);
    
    // If no cards in new storage, check old storage as fallback
    if (!saved) {
      saved = localStorage.getItem(OLD_STORAGE_KEY);
    }
    
    const cards = saved ? JSON.parse(saved) : [];
    
    console.log('Loaded cards:', cards.map(c => ({ id: c.metadata.id, slug: c.metadata.slug })));
    return cards;
  } catch (error) {
    console.error('Error loading business cards:', error);
    return [];
  }
};

export const saveBusinessCard = (card: BusinessCard): void => {
  try {
    const cards = loadBusinessCards();
    const existingIndex = cards.findIndex(c => c.metadata.id === card.metadata.id);
    
    if (existingIndex >= 0) {
      cards[existingIndex] = card;
    } else {
      cards.push(card);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving business card:', error);
  }
};

export const deleteBusinessCard = (cardId: string): void => {
  try {
    const cards = loadBusinessCards();
    const filtered = cards.filter(c => c.metadata.id !== cardId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting business card:', error);
  }
};

export const toggleCardFavorite = (cardId: string): void => {
  try {
    const cards = loadBusinessCards();
    const card = cards.find(c => c.metadata.id === cardId);
    if (card) {
      card.metadata.favorite = !card.metadata.favorite;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

export const isUrlNameAvailable = (urlName: string, excludeCardId?: string): boolean => {
  try {
    const cards = loadBusinessCards();
    return !cards.some(card => 
      card.urlName === urlName && card.metadata.id !== excludeCardId
    );
  } catch (error) {
    console.error('Error checking URL name availability:', error);
    return true;
  }
};

export const generateUniqueUrlName = (baseName: string): string => {
  try {
    let counter = 1;
    let uniqueName = baseName;
    
    while (!isUrlNameAvailable(uniqueName)) {
      counter++;
      uniqueName = `${baseName}-${counter}`;
    }
    
    return uniqueName;
  } catch (error) {
    console.error('Error generating unique URL name:', error);
    return baseName;
  }
};
