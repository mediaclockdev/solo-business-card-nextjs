'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from '@/lib/navigation';
import { ArrowLeft } from "lucide-react";
import { BusinessCard } from '@/types/businessCard';
import { loadBusinessCards } from '@/utils/cardStorage';
import { BusinessCardPreview } from '@/components/onboarding/BusinessCardPreview';
import { ProFeatureModal } from '@/components/dashboard/ProFeatureModal';
import { CardDetailsTabs } from './CardDetailsTabs';
import { generateQRCodeWithLogo } from '@/utils/qrCodeGenerator';

export default function CardDetailsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract cardId from pathname since we're using manual routing
  const cardId = location.pathname.split('/').pop();
  
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showProModal, setShowProModal] = useState(false);

  useEffect(() => {
    if (cardId) {
      const cards = loadBusinessCards();
      const foundCard = cards.find(c => c.metadata.id === cardId);
      setCard(foundCard || null);
      
      if (foundCard && typeof window !== 'undefined') {
        // Generate QR code for sharing with brand color
        const shareUrl = `${window.location.origin}/card/${foundCard.metadata.id}`;
        generateQRCodeWithLogo(shareUrl, logoFile, { 
          width: 200,
          color: {
            dark: foundCard.brandColor,
            light: '#FFFFFF'
          }
        })
          .then(url => setQrCodeUrl(url))
          .catch(err => console.error('QR Code generation failed:', err));
      }
    }
  }, [cardId]);

  const handleCardUpdate = (updatedCard: BusinessCard) => {
    setCard(updatedCard);
    
    // Regenerate QR code if needed with updated card's brand color
    if (cardId && typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/card/${cardId}`;
      generateQRCodeWithLogo(shareUrl, logoFile, { 
        width: 200,
        color: {
          dark: updatedCard.brandColor,
          light: '#FFFFFF'
        }
      })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('QR Code generation failed:', err));
    }
  };

  const handleLogoChange = (newLogoFile: File | null) => {
    setLogoFile(newLogoFile);
    
    // Regenerate QR code with new logo
    if (cardId && card && typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/card/${cardId}`;
      generateQRCodeWithLogo(shareUrl, newLogoFile, { 
        width: 200,
        color: {
          dark: card.brandColor,
          light: '#FFFFFF'
        }
      })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('QR Code generation failed:', err));
    }
  };

  const handleQRCodeUpdate = (newQRCodeUrl: string) => {
    setQrCodeUrl(newQRCodeUrl);
  };

  if (!card) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Card not found</h2>
          <p className="text-muted-foreground mb-4">The requested business card could not be found.</p>
          <button 
            onClick={() => navigate('/dashboard/cards')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-full -m-4 md:-m-6 p-4 md:p-6" 
      style={{ backgroundColor: card ? `${card.brandColor}15` : 'transparent' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Card Preview - Left Column */}
        <div className="lg:col-span-3">
          <BusinessCardPreview card={card} />
        </div>

        {/* Tabbed Content Area - Right Column */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <CardDetailsTabs
            card={card}
            cardId={cardId!}
            qrCodeUrl={qrCodeUrl}
            onCardUpdate={handleCardUpdate}
            onUpgrade={() => setShowProModal(true)}
            onLogoChange={handleLogoChange}
            onQRCodeUpdate={handleQRCodeUpdate}
          />
        </div>

        {/* Pro Feature Modal */}
        <ProFeatureModal
          isOpen={showProModal}
          onClose={() => setShowProModal(false)}
          featureName="Analytics"
        />
      </div>
    </div>
  );
}
