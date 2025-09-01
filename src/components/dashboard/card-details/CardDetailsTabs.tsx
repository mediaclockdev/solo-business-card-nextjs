"use client";
import { BusinessCard } from '@/types/businessCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardTab } from './tabs/CardTab';
import { EditTab } from './tabs/EditTab';
import { SettingsTab } from './tabs/SettingsTab';
import { ViewTab } from './tabs/ViewTab';

interface CardDetailsTabsProps {
  card: BusinessCard;
  cardId: string;
  qrCodeUrl: string;
  onCardUpdate: (updatedCard: BusinessCard) => void;
  onUpgrade: () => void;
  onLogoChange?: (logoFile: File | null) => void;
  onQRCodeUpdate?: (newQRCodeUrl: string) => void;
}

export function CardDetailsTabs({ 
  card, 
  cardId, 
  qrCodeUrl, 
  onCardUpdate, 
  onUpgrade,
  onLogoChange,
  onQRCodeUpdate
}: CardDetailsTabsProps) {
  return (
    <Tabs defaultValue="card" className="flex-1">
      <TabsList className="inline-flex w-auto">
        <TabsTrigger value="card" className="min-w-[80px]">Card</TabsTrigger>
        <TabsTrigger value="edit" className="min-w-[80px]">Edit</TabsTrigger>
        <TabsTrigger value="settings" className="min-w-[80px]">Settings</TabsTrigger>
        <TabsTrigger value="view" className="min-w-[80px]">View</TabsTrigger>
      </TabsList>
      
      <TabsContent value="card">
        <CardTab 
          card={card} 
          cardId={cardId} 
          qrCodeUrl={qrCodeUrl} 
          onUpgrade={onUpgrade} 
        />
      </TabsContent>
      
      <TabsContent value="edit">
        <EditTab card={card} onUpdate={onCardUpdate} />
      </TabsContent>
      
      <TabsContent value="settings">
        <SettingsTab card={card} cardId={cardId} qrCodeUrl={qrCodeUrl} onLogoChange={onLogoChange} onQRCodeUpdate={onQRCodeUpdate} />
      </TabsContent>
      
      <TabsContent value="view">
        <ViewTab cardId={cardId} />
      </TabsContent>
    </Tabs>
  );
}