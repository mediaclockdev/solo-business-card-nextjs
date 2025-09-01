"use client";
export interface BusinessCard {
  urlName: string;
  profilePhoto: string;
  coverImage: string;
  companyLogo: string;
  cardImage?: string;
  brandColor: string;
  cardLayout?: 'standard' | 'extended' | 'centered' | 'portrait' | 'align-right' | 'align-left' | 'slides';
  templateType?: 'classic' | 'modern' | 'traditional';
  profile: {
    firstName: string;
    lastName: string;
    title: string;
    businessCategory?: string;
    department: string;
    company: string;
    accreditations: string[];
    companySlogan: string;
  };
  business: {
    phone: string;
    email: string;
    website: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube?: string;
    tiktok?: string;
  };
  about: {
    bio: string;
    sectionTitle: string;
    skills: string[];
  };
  appointments: {
    appointmentType: 'booking' | 'call-to-action' | 'direct-ads';
    calendlyUrl: string;
    ctaLabel: string;
    ctaUrl: string;
    directAds?: {
      type: 'Product' | 'Event' | 'Service';
      image: string;
      title?: string;
      description?: string;
      price?: string;
      url?: string;
    };
  };
  metadata: {
    id: string;
    createdAt: string;
    isPublic: boolean;
    slug: string;
    favorite: boolean;
    tags: string[];
    lastInteraction?: string;
  };
}

export type FormSection = 'profile' | 'business' | 'social' | 'about' | 'cta';

export interface BusinessCardFormProps {
  card: BusinessCard;
  onUpdate: (card: BusinessCard) => void;
  isEditMode: boolean;
  currentSection: FormSection;
  onSectionChange: (section: FormSection) => void;
  getFullName: (card: BusinessCard) => string;
  hasUnsavedChanges: boolean;
}

export interface FormComponentProps {
  card: BusinessCard;
  onUpdate: (card: BusinessCard) => void;
  isEditMode?: boolean;
}
