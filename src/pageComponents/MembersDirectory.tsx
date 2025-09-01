'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from '@/lib/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Grid3X3, List, Search } from "lucide-react";
import { BusinessCard } from '@/types/businessCard';
import { CardGrid } from '@/components/dashboard/CardGrid';
import { CardList } from '@/components/dashboard/card-list';
import { loadBusinessCards } from '@/utils/cardStorage';
import { filterPublicCards, searchCards, sortCards, SortOption } from '@/utils/cardFilters';

export default function MembersDirectory() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Load and filter cards on component mount
  useEffect(() => {
    const loadedCards = loadBusinessCards();
    const publicCards = filterPublicCards(loadedCards);
    setCards(publicCards);
  }, []);

  // Filter and sort cards when dependencies change
  useEffect(() => {
    let filtered = cards;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchCards(filtered, searchQuery);
    }
    
    // Apply sorting
    filtered = sortCards(filtered, sortBy);
    
    setFilteredCards(filtered);
  }, [cards, searchQuery, sortBy]);

  const handleCardAction = (action: 'view' | 'preview', card: BusinessCard) => {
    if (action === 'view') {
      navigate(`/dashboard/cards/${card.metadata.id}`);
    } else if (action === 'preview') {
      navigate(`/card/${card.metadata.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Members Directory</h1>
            <p className="text-muted-foreground mt-1">{cards.length} public business cards</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            {filteredCards.length} of {cards.length} cards
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="company">Company A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cards Display */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? 'No cards found' : 'No public cards available'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? 'Try adjusting your search terms or filters.'
                  : 'There are currently no public business cards to display.'
                }
              </p>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <CardGrid
                cards={filteredCards}
                onAction={handleCardAction}
                onToggleFavorite={() => {}} // No favorite functionality for public directory
                showViewOnly={true}
                defaultAction="preview"
              />
            ) : (
              <CardList
                cards={filteredCards}
                onAction={handleCardAction}
                onToggleFavorite={() => {}} // No favorite functionality for public directory
                showViewOnly={true}
                defaultAction="preview"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
