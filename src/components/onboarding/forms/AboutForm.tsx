"use client";
import React from 'react';
import { FormComponentProps } from '@/types/businessCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function AboutForm({ card, onUpdate }: FormComponentProps) {
  const handleInputChange = (field: string, value: string) => {
    const updatedCard = {
      ...card,
      about: {
        ...card.about,
        [field]: value
      }
    };
    onUpdate(updatedCard);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-6">
          Tell people about yourself, your experience, and what you do.
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              placeholder="About Me"
              value={card.about.sectionTitle}
              onChange={(e) => handleInputChange('sectionTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Write a brief description about yourself, your experience, and what you do..."
              className="min-h-[120px]"
              value={card.about.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              This will appear on your business card to help people understand what you do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
