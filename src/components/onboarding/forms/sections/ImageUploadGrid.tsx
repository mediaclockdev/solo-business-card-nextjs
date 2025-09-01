"use client";
import React from 'react';
import { FormComponentProps } from '@/types/businessCard';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Camera } from 'lucide-react';

export function ImageUploadGrid({ card, onUpdate, isEditMode }: FormComponentProps) {
  const isDisabled = !isEditMode;
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, imageType: 'profile' | 'cover' | 'logo') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const updatedCard = { ...card };
        
        switch (imageType) {
          case 'profile':
            updatedCard.profilePhoto = result;
            break;
          case 'cover':
            updatedCard.coverImage = result;
            break;
          case 'logo':
            updatedCard.companyLogo = result;
            break;
        }
        
        onUpdate(updatedCard);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TooltipProvider>
      {/* Add Images Section */}
      <div className="mt-6">
        <Label className="text-sm font-medium text-foreground">
          Add Images {!isEditMode && <span className="italic font-normal">[Profile Image upload only]</span>}
        </Label>
      </div>
      
      {/* Three Column Image Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Cover Image */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Upload Cover Image</Label>
          {isDisabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <label className={`block ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <div className={`w-full h-24 bg-muted border border-border rounded-lg flex flex-col items-center justify-center transition-colors ${isDisabled ? 'opacity-50' : 'hover:bg-muted/80'}`}>
                    {card.coverImage ? (
                      <img
                        src={card.coverImage}
                        alt="Cover"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground font-medium">Add Cover</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => !isDisabled && handleFileUpload(e, 'cover')}
                    disabled={isDisabled}
                  />
                </label>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Available when editing a card only.</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <label className={`block ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <div className={`w-full h-24 bg-muted border border-border rounded-lg flex flex-col items-center justify-center transition-colors ${isDisabled ? 'opacity-50' : 'hover:bg-muted/80'}`}>
                {card.coverImage ? (
                  <img
                    src={card.coverImage}
                    alt="Cover"
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground font-medium">Add Cover</span>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => !isDisabled && handleFileUpload(e, 'cover')}
                disabled={isDisabled}
              />
            </label>
          )}
        </div>

        {/* Upload Profile Image */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Upload Profile Image</Label>
          <label className="cursor-pointer block">
            <div className="w-full h-24 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-muted border border-border flex flex-col items-center justify-center hover:bg-muted/80 transition-colors">
                {card.profilePhoto ? (
                  <img
                    src={card.profilePhoto}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <>
                    <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground font-medium">Add Photo</span>
                  </>
                )}
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'profile')}
            />
          </label>
        </div>

        {/* Upload Company Logo */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Upload Company Logo</Label>
          {isDisabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <label className={`block ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <div className={`w-full h-24 bg-muted border border-border rounded-lg flex flex-col items-center justify-center transition-colors ${isDisabled ? 'opacity-50' : 'hover:bg-muted/80'}`}>
                    {card.companyLogo ? (
                      <img
                        src={card.companyLogo}
                        alt="Company Logo"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground font-medium">Add Logo</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => !isDisabled && handleFileUpload(e, 'logo')}
                    disabled={isDisabled}
                  />
                </label>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Available when editing a card only.</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <label className={`block ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <div className={`w-full h-24 bg-muted border border-border rounded-lg flex flex-col items-center justify-center transition-colors ${isDisabled ? 'opacity-50' : 'hover:bg-muted/80'}`}>
                {card.companyLogo ? (
                  <img
                    src={card.companyLogo}
                    alt="Company Logo"
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground font-medium">Add Logo</span>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => !isDisabled && handleFileUpload(e, 'logo')}
                disabled={isDisabled}
              />
            </label>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Click to add/change images (JPG, PNG, WEBP, max. 5MB)
      </p>
    </TooltipProvider>
  );
}