
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from '@/lib/navigation';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, List, User } from "lucide-react";
import { BusinessCard } from '@/types/businessCard';
import { CardGrid } from '@/components/dashboard/CardGrid';
import { CardList } from '@/components/dashboard/card-list';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { loadBusinessCards, deleteBusinessCard, toggleCardFavorite } from '@/utils/cardStorage';
import { filterFavorites, filterPublicCards } from '@/utils/cardFilters';
import { hasUserAccount, loadUserData } from '@/utils/userStorage';
import { CreateCardPromptModal } from '@/components/dashboard/CreateCardPromptModal';
import { WelcomeModal } from '@/components/onboarding/WelcomeModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Cards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('local');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<BusinessCard | null>(null);
  
  // Access control states
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeFirstName, setWelcomeFirstName] = useState('');
  const [isAccessControlChecked, setIsAccessControlChecked] = useState(false);

  // Load cards on component mount
  useEffect(() => {
    const loadedCards = loadBusinessCards();
    setCards(loadedCards);
  }, []);

  // Access control logic
  useEffect(() => {
    const checkAccess = () => {
      const loadedCards = loadBusinessCards();
      const userHasAccount = hasUserAccount();
      
      console.log('Access control check:', { 
        cardsCount: loadedCards.length, 
        hasAccount: userHasAccount 
      });

      // Scenario A: No business cards + No user data
      if (loadedCards.length === 0 && !userHasAccount) {
        setShowCreateCardModal(true);
        setIsAccessControlChecked(true);
        return;
      }

      // Scenario B: Business cards exist + No user data
      if (loadedCards.length > 0 && !userHasAccount) {
        // Get the first name from the first card for the welcome modal
        const firstName = loadedCards[0]?.profile?.firstName || 'User';
        setWelcomeFirstName(firstName);
        setShowWelcomeModal(true);
        setIsAccessControlChecked(true);
        return;
      }

      // Scenario C: Both exist - allow normal access
      setIsAccessControlChecked(true);
    };

    checkAccess();
  }, []);

  // Filter cards when dependencies change
  useEffect(() => {
    let filtered = cards;
    
    // Apply tab filter
    if (activeTab === 'favorites') {
      filtered = filterFavorites(filtered);
    }
    
    setFilteredCards(filtered);
  }, [cards, activeTab]);

  const handleCardAction = (action: 'edit' | 'delete' | 'share' | 'view' | 'analytics' | 'preview', card: BusinessCard) => {
    switch (action) {
      case 'edit':
        // Store the card data for editing and navigate to onboarding
        localStorage.setItem('edit_card_data', JSON.stringify(card));
        navigate('/onboarding');
        break;
      case 'delete':
        setCardToDelete(card);
        setShowDeleteDialog(true);
        break;
      case 'view':
        // Navigate to card details view
        navigate(`/dashboard/cards/${card.metadata.id}`);
        break;
      case 'preview':
        // Navigate to local card preview
        navigate(`/card/${card.metadata.id}`);
        break;
      case 'share':
        // Implement share functionality
        console.log('Share card:', card);
        break;
      case 'analytics':
        // Handle analytics (pro feature)
        console.log('Analytics for card:', card);
        break;
    }
  };

  const handleToggleFavorite = (cardId: string) => {
    toggleCardFavorite(cardId);
    setCards(loadBusinessCards());
  };

  const handleCreateCard = () => {
    localStorage.removeItem('edit_card_data');
    navigate('/');
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      deleteBusinessCard(cardToDelete.metadata.id);
      setCards(loadBusinessCards());
    }
    setShowDeleteDialog(false);
    setCardToDelete(null);
  };

  // Don't render main content until access control is checked
  if (!isAccessControlChecked) {
    return (
      <>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
        
        {/* Access Control Modals */}
        <CreateCardPromptModal 
          isOpen={showCreateCardModal} 
          onClose={() => setShowCreateCardModal(false)} 
        />
        
        <WelcomeModal 
          isOpen={showWelcomeModal} 
          onClose={() => setShowWelcomeModal(false)}
          firstName={welcomeFirstName}
        />
      </>
    );
  }

  // Show EmptyState only if access control passed and no cards exist
  if (cards.length === 0 && !showCreateCardModal && !showWelcomeModal) {
    return <EmptyState onCreateCard={handleCreateCard} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="local">Local Cards ({cards.length})</TabsTrigger>
              <TabsTrigger value="favorites">My Cards ({filterFavorites(cards).length})</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            variant="outline" 
            onClick={() => navigate('/members')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Members Directory ({filterPublicCards(cards).length})
          </Button>
        </div>
        
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

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="local" className="mt-6">
          {viewMode === 'grid' ? (
            <CardGrid
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          ) : (
            <CardList
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          {viewMode === 'grid' ? (
            <CardGrid
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          ) : (
            <CardList
              cards={filteredCards}
              onAction={handleCardAction}
              onToggleFavorite={handleToggleFavorite}
              onCreateCard={handleCreateCard}
              defaultAction="view"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Business Card</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{cardToDelete ? `${cardToDelete.profile.firstName} ${cardToDelete.profile.lastName}` : 'this card'}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Access Control Modals */}
      <CreateCardPromptModal 
        isOpen={showCreateCardModal} 
        onClose={() => setShowCreateCardModal(false)} 
      />
      
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)}
        firstName={welcomeFirstName}
      />
    </div>
  );
}
