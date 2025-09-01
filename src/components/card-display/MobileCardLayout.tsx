'use client';

import React, { useState, useEffect } from 'react';
import { BusinessCard } from '@/types/businessCard';
import { BusinessCardPreview } from '@/components/onboarding/BusinessCardPreview';
import { ShareModal } from '@/components/ShareModal';
import { ContactModal } from '@/components/ContactModal';
import { ThankYouPopup } from '@/components/ThankYouPopup';
import { Lightbox } from '@/components/ui/lightbox';
import { getFullName, generateVCard } from '@/utils/businessCard';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Share2, Download, Eye } from 'lucide-react';

interface MobileCardLayoutProps {
  card: BusinessCard;
  onNavigateBack: () => void;
}

export function MobileCardLayout({ card, onNavigateBack }: MobileCardLayoutProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animation states
  const [shareModalAnimateClass, setShareModalAnimateClass] = useState("translate-y-full");
  const [contactModalAnimateClass, setContactModalAnimateClass] = useState("translate-y-full");
  const [thankYouAnimateClass, setThankYouAnimateClass] = useState("translate-y-full");
  
  // Custom message states for thank you popup
  const [customMessage, setCustomMessage] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customButtonText, setCustomButtonText] = useState("");
  
  const { toast } = useToast();

  // Animation effects
  useEffect(() => {
    if (showShareModal) {
      setShareModalAnimateClass("translate-y-full");
      setTimeout(() => {
        setShareModalAnimateClass("translate-y-0");
      }, 50);
    }
  }, [showShareModal]);

  useEffect(() => {
    if (showContactModal) {
      setContactModalAnimateClass("translate-y-full");
      setTimeout(() => {
        setContactModalAnimateClass("translate-y-0");
      }, 50);
    }
  }, [showContactModal]);

  useEffect(() => {
    if (showThankYouModal) {
      setThankYouAnimateClass("translate-y-full");
      setTimeout(() => {
        setThankYouAnimateClass("translate-y-0");
      }, 50);
    }
  }, [showThankYouModal]);

  // Modal sequence handlers
  const handleCloseShareModal = () => {
    setShareModalAnimateClass("translate-y-full");
    setTimeout(() => {
      setShowShareModal(false);
      setTimeout(() => {
        setShowContactModal(true);
        setTimeout(() => {
          setContactModalAnimateClass("translate-y-0");
        }, 500);
      }, 200);
    }, 700);
  };

  const handleCloseContactModal = () => {
    setContactModalAnimateClass("translate-y-full");
    setTimeout(() => {
      setShowContactModal(false);
      setCustomMessage("The first digital business card that turns networking into passive income.");
      setCustomTitle("Free BizCard Offer!!!");
      setCustomButtonText("Get Your Free! BizCard Today");
      setShowThankYouModal(true);
    }, 700);
  };

  const handleDownloadVCard = () => {
    const vCardData = generateVCard(card);
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.urlName || getFullName(card) || 'contact'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show thank you popup after download
    setTimeout(() => {
      setCustomMessage(`${card.profile?.firstName || 'Contact'}'s contact details were downloaded to your phone.`);
      setCustomTitle("Great Job!!!");
      setCustomButtonText("Get a BizCard Free!");
      setShowThankYouModal(true);
    }, 1000);
  };

  const handleContactSubmit = (contactData: any) => {
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual API endpoint
    const submitData = {
      ...contactData,
      cardName: getFullName(card),
      cardLink: window.location.href
    };

    // Mock API call - replace with actual implementation
    setTimeout(() => {
      toast({
        title: "Contact information sent!",
        description: "Your contact details have been shared successfully.",
      });
      setIsSubmitting(false);
      setShowContactModal(false);
      setCustomMessage("The first digital business card that turns networking into passive income.");
      setCustomTitle("Free BizCard Offer!!!");
      setCustomButtonText("Get Your Free! BizCard Today");
      setShowThankYouModal(true);
    }, 2000);
  };

  const handleCloseThankYou = () => {
    setThankYouAnimateClass("translate-y-full");
    setTimeout(() => {
      setShowThankYouModal(false);
      setCustomMessage("");
      setCustomTitle("");
      setCustomButtonText("");
      setThankYouAnimateClass("translate-y-0");
    }, 500);
  };

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 flex flex-col relative"
      style={{ backgroundColor: `${card.brandColor}20` }}
    >
      <div className="business-card-display">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
        <BusinessCardPreview card={card} />
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-md mx-auto w-full px-4 sm:px-0">
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 h-[40px] text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm flex items-center justify-center gap-2"
              style={{ backgroundColor: card.brandColor }}
            >
              <Share2 size={20} />
              Share Card
            </button>
            <button
              onClick={handleDownloadVCard}
              className="px-4 h-[40px] text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm flex items-center justify-center gap-2"
              style={{ backgroundColor: card.brandColor }}
            >
              <Download size={20} />
              Save Contact
            </button>
          </div>
          
          {/* Footer Text */}
          <div 
            className="text-center text-white text-xs h-[20px] flex items-center justify-center px-1 rounded-t-lg"
            style={{ backgroundColor: card.brandColor, lineHeight: '30px' }}
          >
            <span className="italic">Created by: <a href="https://digipromoting.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">https://digipromoting.com</a></span>
          </div>
        </div>
      </div>
      
      {/* Spacer to prevent content from being hidden behind fixed footer */}
      <div className="h-20" />
      
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={handleCloseShareModal}
        url={window.location.href}
        title={`${getFullName(card)}'s Digital Business Card`}
        cardProfile={card.profile}
        cardBusiness={card.business}
        cardBrandColor={card.brandColor}
        animateClass={shareModalAnimateClass}
        cardData={card}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={handleCloseContactModal}
        animateClass={contactModalAnimateClass}
        username={card.profile?.firstName || "user"}
        isSubmitting={isSubmitting}
        cardData={card}
        theme={card.brandColor}
        onSubmitContact={handleContactSubmit}
      />

      {/* Thank You Popup */}
      <ThankYouPopup
        isOpen={showThankYouModal}
        onClose={handleCloseThankYou}
        animateClass={thankYouAnimateClass}
        customTitle={customTitle}
        customMessage={customMessage}
        customButtonText={customButtonText}
        theme={card.brandColor}
        username={card.profile?.firstName}
        profilePhoto={card.profilePhoto}
      />
    </div>
  );
}
