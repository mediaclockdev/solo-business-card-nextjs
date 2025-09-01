"use client";
import React, { useState } from 'react';
import { BusinessCard } from '@/types/businessCard';
import { Edit2, Eye, MoreVertical, Share2, Star, Trash2, Save, BarChart2, Crown, Plus, Smartphone, Calendar, Mail, Phone, RefreshCw } from 'lucide-react';
import { ProFeatureModal } from './ProFeatureModal';
import { getFullName } from '@/utils/businessCard';
import { format } from 'date-fns';

interface CardGridProps {
  cards: BusinessCard[];
  onAction: (action: 'edit' | 'delete' | 'share' | 'view' | 'analytics' | 'preview', card: BusinessCard) => void;
  onToggleFavorite: (cardId: string) => void;
  showSaveButton?: boolean;
  onSaveCard?: (card: BusinessCard) => void;
  showViewOnly?: boolean;
  onCreateCard?: () => void;
  defaultAction?: 'view' | 'preview';
}

export function CardGrid({ cards, onAction, onToggleFavorite, showSaveButton, onSaveCard, showViewOnly, onCreateCard, defaultAction = 'preview' }: CardGridProps) {
  const [showProFeatureModal, setShowProFeatureModal] = useState(false);
  const [proFeatureName, setProFeatureName] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {(cards || []).filter(card => card?.profile).map((card) => (
          <div 
            key={card.metadata?.id} 
            className={`bg-card rounded-lg shadow-sm border border-border p-2 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer`}
            onClick={() => onAction(defaultAction, card)}
          >
            {/* Header with Image - Always show with brand color background */}
            <div className="relative h-32" style={{ backgroundColor: card.brandColor }}>
              {card.profilePhoto ? (
                <img
                  src={card.profilePhoto}
                  alt={getFullName(card)}
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: '128px' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    {getFullName(card).split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                </div>
              )}
              {/* Brand Color Bar */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: card.brandColor }}
              />
              
              {/* Quick Actions - only show when not in view-only mode */}
              {!showViewOnly && (
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  {/* Public/Private Label */}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    card.metadata?.isPublic
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {card.metadata?.isPublic ? 'Public' : 'Private'}
                  </span>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === card.metadata?.id ? null : card.metadata?.id || null);
                      }}
                      className="p-1.5 rounded-full bg-background/90 text-muted-foreground hover:bg-background transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    <div className={`absolute right-0 mt-1 w-36 bg-popover rounded-lg shadow-lg border border-border py-1 z-20 ${openDropdownId === card.metadata?.id ? 'visible' : 'invisible'}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction('view', card);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                      >
                        <Eye size={14} />
                        Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction('preview', card);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                      >
                        <Smartphone size={14} />
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle sync action - you can add this action to your onAction callback
                          console.log('Sync action for card:', card.metadata?.id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center gap-2"
                      >
                        <RefreshCw size={14} />
                        Sync
                      </button>
                      {showSaveButton && onSaveCard && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSaveCard(card);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-accent flex items-center gap-2"
                          role="menuitem"
                        >
                          <Save size={14} />
                          Save to Local
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction('delete', card);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Brand Color Banner */}
            <div className="h-1" style={{ backgroundColor: card.brandColor }} />

            {/* Content */}
            <div className="p-2">
              <h3 className="font-semibold text-foreground">
                {getFullName(card)}
              </h3>
              <div>
                <p className="text-sm mt-1">
                  <span style={{ color: card.brandColor }}>{card.profile?.title}</span>
                  {card.profile.company && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="font-medium">{card.profile?.company}</span>
                    </>
                  )}
                </p>
              </div>

              {/* Contact Info */}
              <div className="mt-4 space-y-2 text-sm">
                {card.business?.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={14} style={{ color: card.brandColor }} />
                    <span className="truncate">{card.business?.email}</span>
                  </div>
                )}
                {card.business?.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={14} style={{ color: card.brandColor }} />
                    <span>{card.business?.phone}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {card.metadata?.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.metadata.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{card.urlName || 'Untitled Card'}</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{format(new Date(card.metadata?.createdAt || ''), 'MMM d, yyyy').toUpperCase()}</span>
                  </div>
                </div>
                {card.metadata?.lastInteraction && (
                  <span className="block mt-1">
                    Last interaction: {new Date(card.metadata.lastInteraction).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Card Button */}
        {onCreateCard && (
          <div 
            onClick={onCreateCard}
            className="bg-card rounded-lg shadow-sm border border-border border-dashed p-6 hover:shadow-md transition-shadow group cursor-pointer hover:border-primary/30"
          >
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[200px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Add Card</h3>
              <p className="text-sm text-muted-foreground">Click here to add new card</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Pro Feature Modal */}
      <ProFeatureModal
        isOpen={showProFeatureModal}
        onClose={() => setShowProFeatureModal(false)}
        featureName={proFeatureName}
      />
    </>
  );
}