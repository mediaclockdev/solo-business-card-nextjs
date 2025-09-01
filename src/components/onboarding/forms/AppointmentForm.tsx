"use client";
import React, { useState } from 'react';
import { FormComponentProps } from '@/types/businessCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Upload, Lock } from 'lucide-react';

export function AppointmentForm({ card, onUpdate }: FormComponentProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const updatedCard = {
      ...card,
      appointments: {
        ...card.appointments,
        [field]: value
      }
    };
    onUpdate(updatedCard);
  };

  const handleDirectAdsChange = (field: string, value: string) => {
    const updatedCard = {
      ...card,
      appointments: {
        ...card.appointments,
        directAds: {
          ...card.appointments.directAds,
          [field]: value
        }
      }
    };
    onUpdate(updatedCard);
  };

  const handleAppointmentTypeChange = (value: 'booking' | 'call-to-action' | 'direct-ads') => {
    const updatedCard = {
      ...card,
      appointments: {
        ...card.appointments,
        appointmentType: value
      }
    };
    onUpdate(updatedCard);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      handleDirectAdsChange('image', result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const appointmentType = card.appointments?.appointmentType || 'booking';

  return (
    <div className="space-y-6">
      {/* Appointment Type Selection */}
      <div>
        <Label className="text-base font-medium mb-4 block">Appointment Type</Label>
        <p className="text-sm text-blue-600 mb-4">
          You must log in to use Pro Features. Sign-up is Free!
        </p>
        
        <div className="space-y-3">
          {/* Booking Link */}
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="booking"
              name="appointmentType"
              value="booking"
              checked={appointmentType === 'booking'}
              onChange={(e) => handleAppointmentTypeChange(e.target.value as 'booking')}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="booking" className="flex items-center gap-2">
              Booking Link
            </label>
          </div>

          {/* Call-to-Action */}
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="call-to-action"
              name="appointmentType"
              value="call-to-action"
              checked={appointmentType === 'call-to-action'}
              onChange={(e) => handleAppointmentTypeChange(e.target.value as 'call-to-action')}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="call-to-action" className="flex items-center gap-2">
              Call-to-Action
              <Lock className="h-4 w-4 text-orange-500" />
            </label>
          </div>

          {/* Direct Ads */}
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="direct-ads"
              name="appointmentType"
              value="direct-ads"
              checked={appointmentType === 'direct-ads'}
              onChange={(e) => handleAppointmentTypeChange(e.target.value as 'direct-ads')}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="direct-ads" className="flex items-center gap-2">
              Direct Ads
              <Lock className="h-4 w-4 text-orange-500" />
            </label>
          </div>
        </div>
      </div>

      {/* Booking Link Fields */}
      {appointmentType === 'booking' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calendlyUrl" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendly or Google Calendar URL (Meeting Scheduler)
            </Label>
            <Input
              id="calendlyUrl"
              type="url"
              placeholder="https://calendly.com/your-username or Google Calendar link"
              value={card.appointments.calendlyUrl || ''}
              onChange={(e) => handleInputChange('calendlyUrl', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              If you have a Calendly or Google Calendar scheduling link, paste it here.
            </p>
          </div>
        </div>
      )}

      {/* Call-to-Action Fields */}
      {appointmentType === 'call-to-action' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ctaLabel">Custom Button Text</Label>
            <Input
              id="ctaLabel"
              placeholder="Schedule Meeting, Get Quote, Contact Me"
              value={card.appointments.ctaLabel || ''}
              onChange={(e) => handleInputChange('ctaLabel', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaUrl">Custom Button URL</Label>
            <Input
              id="ctaUrl"
              type="url"
              placeholder="https://example.com/contact"
              value={card.appointments.ctaUrl || ''}
              onChange={(e) => handleInputChange('ctaUrl', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Direct Ads Fields */}
      {appointmentType === 'direct-ads' && (
        <div className="space-y-4">
          {/* Direct Ads Type */}
          <div className="space-y-2">
            <Label>Direct Ads Type</Label>
            <Select
              value={card.appointments.directAds?.type || ''}
              onValueChange={(value) => handleDirectAdsChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select One" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>
              {card.appointments.directAds?.type || 'Product'} Image
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {card.appointments.directAds?.image ? (
                <div className="space-y-2">
                  <img
                    src={card.appointments.directAds.image}
                    alt="Uploaded"
                    className="max-w-full h-32 object-contain mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600">Image uploaded successfully</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                      Change image
                    </span>
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF (max. 5MB)</p>
                  <p className="text-xs text-gray-500">
                    For optimal results, please use dimensions up to 8.5" x 11".
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                      Browse files
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
