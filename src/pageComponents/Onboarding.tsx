"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "@/lib/navigation";
import { BusinessCard, FormSection } from "@/types/businessCard";
import { BusinessCardForm } from "@/components/onboarding/BusinessCardForm";
import { BusinessCardPreview } from "@/components/onboarding/BusinessCardPreview";
import { getFullName, createInitialCard } from "@/utils/businessCard";
import { loadBusinessCards } from "@/utils/cardStorage";

// ✅ import Header, Footer, and Modals like in BusinessCardCreator

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";

export default function Onboarding() {
  const [card, setCard] = useState<BusinessCard>(createInitialCard());
  const [currentSection, setCurrentSection] = useState<FormSection>("profile");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // ✅ Modal states
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = Boolean(
    location.state?.editMode && location.state?.cardId
  );

  // Initialize card state for editing
  useEffect(() => {
    if (isEditMode && location.state?.cardId) {
      const cards = loadBusinessCards();
      const cardToEdit = cards.find(
        (c: BusinessCard) => c.metadata.id === location.state.cardId
      );

      if (cardToEdit) {
        setCard(cardToEdit);
      } else {
        // Card not found, redirect to cards page
        navigate("/dashboard/cards");
      }
    }
  }, [isEditMode, location.state?.cardId, navigate]);

  const handleCardUpdate = (updatedCard: BusinessCard) => {
    setCard(updatedCard);
    setHasUnsavedChanges(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: `${card.brandColor}15` }}
    >
      <Header onShowSignIn={() => setIsSignInOpen(true)} />
      {/* ✅ Added Header with sign in trigger */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Form Section */}
            <div>
              <BusinessCardForm
                card={card}
                onUpdate={handleCardUpdate}
                currentSection={currentSection}
                onSectionChange={setCurrentSection}
                isEditMode={isEditMode}
                getFullName={getFullName}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-6 mt-8 lg:mt-0">
              <BusinessCardPreview card={card} />
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />

      {/* ✅ Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onShowSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      {/* ✅ Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onShowSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </div>
  );
}
