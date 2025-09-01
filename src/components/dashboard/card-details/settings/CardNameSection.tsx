'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BusinessCard } from '@/types/businessCard';
import { saveBusinessCard, isUrlNameAvailable, generateUniqueUrlName } from '@/utils/cardStorage';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface CardNameSectionProps {
  card: BusinessCard;
  onUpdate?: (updatedCard: BusinessCard) => void;
}

export function CardNameSection({ card, onUpdate }: CardNameSectionProps) {
  const [urlName, setUrlName] = useState(card.urlName);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestion, setSuggestion] = useState<string>('');
  const { toast } = useToast();

  // Check availability when urlName changes
  useEffect(() => {
    if (urlName?.trim() && urlName !== card.urlName) {
      const available = isUrlNameAvailable(urlName, card.metadata.id);
      setIsAvailable(available);
      
      if (!available) {
        setSuggestion(generateUniqueUrlName(urlName));
      } else {
        setSuggestion('');
      }
    } else {
      setIsAvailable(null);
      setSuggestion('');
    }
  }, [urlName, card.urlName, card.metadata.id]);

  const handleSave = () => {
    if (!urlName?.trim()) {
      toast({
        title: "Validation Error",
        description: "Card Name is required",
        variant: "destructive"
      });
      return;
    }

    if (!isUrlNameAvailable(urlName, card.metadata.id)) {
      const newSuggestion = generateUniqueUrlName(urlName);
      toast({
        title: "Card Name Already Exists",
        description: `"${urlName}" is already taken. Try "${newSuggestion}" instead.`,
        variant: "destructive"
      });
      return;
    }

    const updatedCard = { ...card, urlName };
    saveBusinessCard(updatedCard);
    
    if (onUpdate) {
      onUpdate(updatedCard);
    }

    toast({
      title: "Success!",
      description: "Card name updated successfully",
    });
  };

  const handleSuggestionClick = () => {
    if (suggestion) {
      setUrlName(suggestion);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Card Name</h3>
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
                placeholder="Enter card name"
                className={`pr-10 ${
                  isAvailable === false ? 'border-destructive' : 
                  isAvailable === true ? 'border-green-500' : ''
                }`}
              />
              {isAvailable !== null && urlName?.trim() && urlName !== card.urlName && (
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
            {isAvailable === true && urlName?.trim() && urlName !== card.urlName && (
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
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave}
              disabled={!urlName?.trim() || isAvailable === false}
            >
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
