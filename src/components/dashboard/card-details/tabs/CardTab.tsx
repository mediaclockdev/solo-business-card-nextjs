"use client";
import { BusinessCard } from '@/types/businessCard';
import { CardAnalytics } from '@/components/dashboard/CardAnalytics';
import { CardShare } from '@/components/dashboard/CardShare';

interface CardTabProps {
  card: BusinessCard;
  cardId: string;
  qrCodeUrl: string;
  onUpgrade: () => void;
}

export function CardTab({ card, cardId, qrCodeUrl, onUpgrade }: CardTabProps) {
  return (
    <div className="space-y-4">
      <CardAnalytics onUpgrade={onUpgrade} />
      <CardShare card={card} cardId={cardId} qrCodeUrl={qrCodeUrl} />
    </div>
  );
}