"use client";
import { BusinessCard } from '@/types/businessCard';
import { CardNameSection } from '../settings/CardNameSection';
import { QRCodeLogoSection } from '../settings/QRCodeLogoSection';
import { EmailSignatureSection } from '../settings/EmailSignatureSection';
import { RenewLinkSection } from '../settings/RenewLinkSection';
import { TrackingCodeSection } from '../settings/TrackingCodeSection';
import { DeleteCardSection } from '../settings/DeleteCardSection';

interface SettingsTabProps {
  card: BusinessCard;
  cardId: string;
  qrCodeUrl: string;
  onLogoChange?: (logoFile: File | null) => void;
  onQRCodeUpdate?: (newQRCodeUrl: string) => void;
}

export function SettingsTab({ card, cardId, qrCodeUrl, onLogoChange, onQRCodeUpdate }: SettingsTabProps) {
  return (
    <div className="space-y-4">
      <CardNameSection card={card} />
      <QRCodeLogoSection 
        card={card} 
        qrCodeUrl={qrCodeUrl} 
        onLogoChange={onLogoChange}
        onQRCodeUpdate={onQRCodeUpdate}
      />
      <EmailSignatureSection card={card} />
      <RenewLinkSection cardId={cardId} />
      <TrackingCodeSection />
      <DeleteCardSection />
    </div>
  );
}