"use client";
import React, { useState, useEffect } from 'react';
import { FormComponentProps } from '@/types/businessCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isUrlNameAvailable, generateUniqueUrlName } from '@/utils/cardStorage';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export function CardNameSection({ card, onUpdate }: FormComponentProps) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestion, setSuggestion] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    const keys = field.split('.');
    const updatedCard = { ...card };
    
    if (keys.length === 1) {
      (updatedCard as any)[keys[0]] = value;
    } else if (keys.length === 2) {
      (updatedCard as any)[keys[0]][keys[1]] = value;
    }
    
    onUpdate(updatedCard);
  };

  // Check availability when urlName changes
  useEffect(() => {
    if (card.urlName?.trim()) {
      const available = isUrlNameAvailable(card.urlName, card.metadata?.id);
      setIsAvailable(available);
      
      if (!available) {
        setSuggestion(generateUniqueUrlName(card.urlName));
      } else {
        setSuggestion('');
      }
    } else {
      setIsAvailable(null);
      setSuggestion('');
    }
  }, [card.urlName, card.metadata?.id]);

  const handleSuggestionClick = () => {
    if (suggestion) {
      handleInputChange('urlName', suggestion);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="urlName" className="text-sm font-medium text-foreground">
        Card Name <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Input
          id="urlName"
          placeholder="e.g., john-smith-business-card"
          value={card.urlName}
          onChange={(e) => handleInputChange('urlName', e.target.value)}
          className={`w-full pr-10 ${
            isAvailable === false ? 'border-destructive' : 
            isAvailable === true ? 'border-green-500' : ''
          }`}
        />
        {isAvailable !== null && card.urlName?.trim() && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isAvailable ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>
      
      {/* Status messages */}
      {isAvailable === true && card.urlName?.trim() && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          This name is available!
        </p>
      )}
      
      {isAvailable === false && suggestion && (
        <div className="space-y-2">
          <p className="text-sm text-destructive flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            This name is already taken
          </p>
          <button
            type="button"
            onClick={handleSuggestionClick}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 underline"
          >
            <Lightbulb className="h-3 w-3" />
            Try "{suggestion}" instead
          </button>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground">A unique identifier for your card's URL</p>
    </div>
  );
}