"use client";
import React from 'react';
import { BusinessCard } from '@/types/businessCard';
import { Edit2, Eye, BarChart2, Crown, Smartphone, Trash2 } from 'lucide-react';

interface CardListActionsProps {
  card: BusinessCard;
  onAction: (action: 'edit' | 'delete' | 'share' | 'view' | 'analytics' | 'preview', card: BusinessCard) => void;
  onProFeatureClick: (featureName: string) => void;
}

export function CardListActions({ card, onAction, onProFeatureClick }: CardListActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAction('view', card);
        }}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
        title="View Details"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAction('preview', card);
        }}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
        title="Preview Card"
      >
        <Smartphone size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAction('edit', card);
        }}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
      >
        <Edit2 size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onProFeatureClick('Analytics');
        }}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
      >
        <div className="relative">
          <BarChart2 size={18} />
          <Crown 
            size={12} 
            className="text-yellow-500 absolute -top-1 -right-1 tooltip-trigger inline-flex"
            data-tooltip="Pro Feature, Upgrade Now!"
          />
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAction('delete', card);
        }}
        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}