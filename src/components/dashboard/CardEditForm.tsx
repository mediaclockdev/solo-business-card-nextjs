'use client';

import React, { useState } from 'react';
import { BusinessCard, FormSection } from '@/types/businessCard';
import { Button } from '@/components/ui/button';
import { ProfileForm } from '@/components/onboarding/forms/ProfileForm';
import { BusinessForm } from '@/components/onboarding/forms/BusinessForm';
import { SocialForm } from '@/components/onboarding/forms/SocialForm';
import { AboutForm } from '@/components/onboarding/forms/AboutForm';
import { AppointmentForm } from '@/components/onboarding/forms/AppointmentForm';
import { saveBusinessCard, isUrlNameAvailable, generateUniqueUrlName } from '@/utils/cardStorage';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const sections = ['profile', 'business', 'social', 'about', 'cta'] as const;

interface CardEditFormProps {
  card: BusinessCard;
  onUpdate: (card: BusinessCard) => void;
}

export function CardEditForm({ card, onUpdate }: CardEditFormProps) {
  const [currentSection, setCurrentSection] = useState<FormSection>('profile');
  const { toast } = useToast();

  const handleSave = () => {
    // Validate required fields
    if (!card.urlName?.trim()) {
      toast({
        title: "Validation Error",
        description: "Card Name is required",
        variant: "destructive"
      });
      setCurrentSection('profile');
      return;
    }

    // Check URL name uniqueness (excluding current card)
    if (!isUrlNameAvailable(card.urlName, card.metadata.id)) {
      const suggestion = generateUniqueUrlName(card.urlName);
      toast({
        title: "Card Name Already Exists",
        description: `"${card.urlName}" is already taken. Try "${suggestion}" instead.`,
        variant: "destructive"
      });
      setCurrentSection('profile');
      return;
    }

    if (!card.profile.firstName?.trim() || !card.profile.lastName?.trim()) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required",
        variant: "destructive"
      });
      setCurrentSection('business');
      return;
    }

    // Save using consistent storage utility
    saveBusinessCard(card);
    
    toast({
      title: "Success!",
      description: "Card updated successfully",
    });
  };

  return (
    <div className="space-y-6 bg-background p-6 rounded-lg border shadow-sm">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <Button
            key={section}
            variant={currentSection === section ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentSection(section)}
            className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0"
          >
            {section === 'cta' ? 'CTA' : section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </div>

      {/* Form Sections */}
      <div className="space-y-4">
        {currentSection === 'profile' && <ProfileForm card={card} onUpdate={onUpdate} isEditMode={true} />}
        {currentSection === 'business' && <BusinessForm card={card} onUpdate={onUpdate} isEditMode={true} />}
        {currentSection === 'social' && <SocialForm card={card} onUpdate={onUpdate} isEditMode={true} />}
        {currentSection === 'about' && <AboutForm card={card} onUpdate={onUpdate} isEditMode={true} />}
        {currentSection === 'cta' && <AppointmentForm card={card} onUpdate={onUpdate} isEditMode={true} />}
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t">
        <Button onClick={handleSave} className="w-full flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
