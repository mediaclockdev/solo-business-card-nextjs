"use client";
import React, { useState, useEffect } from 'react';
import { BusinessCard } from '@/types/businessCard';
import { hasUserInput, getFullName } from '@/utils/businessCard';
import { Calendar, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube, Eye } from 'lucide-react';
import { Lightbox } from '@/components/ui/lightbox';

interface BusinessCardPreviewProps {
  card: BusinessCard;
  className?: string;
}

const DefaultView = () => (
  <div className="business-card-display">
    <img 
      src="/lovable-uploads/74b13cbe-0d2e-4997-8470-12fb69697b68.png" 
      alt="Example business card - Jane Doeington" 
      className="w-full rounded-lg shadow-xl border"
    />
  </div>
);

export function BusinessCardPreview({ card, className = '' }: BusinessCardPreviewProps) {
  const [showTemplate, setShowTemplate] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const fullName = getFullName(card);
  const hasProfileInfo = fullName || card.profile.title || card.profile.company;
  const hasContactInfo = card.business.phone || card.business.email || card.business.website;
  const hasAddress = card.business.address.street || card.business.address.city || card.business.address.state;
  const hasSocialLinks = card.social.linkedin || card.social.twitter || card.social.facebook || 
                        card.social.youtube || card.social.instagram || card.social.tiktok;
  const showCardPreview = hasUserInput(card);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTemplate(!showCardPreview);
    }, 150);
    return () => clearTimeout(timer);
  }, [showCardPreview]);

  if (!showCardPreview) {
    return <DefaultView />;
  }

  return (
    <div className={`business-card-display bg-card rounded-lg shadow-lg overflow-hidden card-preview transition-opacity duration-200 ${
      showTemplate ? 'opacity-0' : 'opacity-100'
    } ${className}`}>
      {/* Header Section - Always show with brand color background */}
      <div className="relative h-48 sm:h-72" style={{ backgroundColor: card.brandColor || '#4299e1' }}>
        {card.profilePhoto ? (
          <img
            loading="lazy"
            src={card.profilePhoto}
            alt={fullName}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl">
              {fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
        )}
      </div>

      {/* Brand Color Banner */}
      <div
        className="h-5"
        style={{ backgroundColor: card.brandColor || '#4299e1' }}
      />

      {/* Profile Section */}
      <div className="px-8 py-5">
        {hasProfileInfo && (
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2 flex-nowrap">
              <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground whitespace-nowrap">
                {fullName}
              </h2>
              {card.profile.accreditations.length > 0 && (
                <div className="text-muted-foreground text-base sm:text-lg font-normal whitespace-nowrap leading-none">
                  {card.profile.accreditations.join(', ')}
                </div>
              )}
            </div>
            <div className="text-lg sm:text-xl text-muted-foreground mt-0.5">
              <p className="mb-1" style={{ color: card.brandColor }}>
                {card.profile.title}
                {card.profile.department && (
                  <span className="ml-2 text-muted-foreground">• {card.profile.department}</span>
                )}
              </p>
              <p className="font-bold text-card-foreground">{card.profile.company}</p>
            </div>
            {card.profile.companySlogan && (
              <p className="text-muted-foreground italic mt-3">"{card.profile.companySlogan}"</p>
            )}
          </div>
        )}

        {/* Unified CTA Button */}
        {card.appointments?.appointmentType && (
          <div className="flex justify-center mt-5">
            {card.appointments.appointmentType === 'booking' && card.appointments.calendlyUrl ? (
              <a
                href={card.appointments.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg transition-colors text-base sm:text-lg font-medium hover:opacity-90"
                style={{ backgroundColor: card.brandColor }}
              >
                <Calendar size={20} />
                {card.appointments.ctaLabel || 'Schedule Meeting'}
              </a>
            ) : card.appointments.appointmentType === 'call-to-action' && card.appointments.ctaLabel && card.appointments.ctaUrl && /^https?:\/\//i.test(card.appointments.ctaUrl) ? (
              <a
                href={card.appointments.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg transition-colors text-base sm:text-lg font-medium hover:opacity-90"
                style={{ backgroundColor: card.brandColor }}
              >
                <Calendar size={20} />
                {card.appointments.ctaLabel}
              </a>
            ) : card.appointments.appointmentType === 'direct-ads' && card.appointments.directAds?.image ? (
              <button
                onClick={() => setShowLightbox(true)}
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg transition-colors text-base sm:text-lg font-medium hover:opacity-90"
                style={{ backgroundColor: card.brandColor }}
              >
                <Eye size={20} />
                {card.appointments.directAds.title || 
                 (card.appointments.directAds.type === 'Product' ? 'View Our Product' :
                  card.appointments.directAds.type === 'Event' ? 'View Our Event' :
                  card.appointments.directAds.type === 'Service' ? 'View Our Service' :
                  `View Our ${card.appointments.directAds.type}`)
                }
              </button>
            ) : null}
          </div>
        )}

        {/* Contact Information */}
        {hasContactInfo && (
          <div className="mt-6 space-y-3">
            {card.business.phone && (
              <a
                href={`tel:${card.business.phone}`}
                className="relative flex items-center gap-4 text-card-foreground group"
                style={{ ['--hover-color' as string]: card.brandColor, ['--hover-bg' as string]: `${card.brandColor}26` }}
              >
                <div className="absolute -inset-y-2 w-[200%] -left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" style={{ backgroundColor: 'var(--hover-bg)' }} />
                <div className="text-white p-3 rounded-full" style={{ backgroundColor: card.brandColor }}>
                  <Phone size={20} />
                </div>
                <div className="flex flex-col relative">
                  <span className="text-card-foreground font-bold group-hover:text-[var(--hover-color)] transition-colors">
                    {card.business.phone}
                  </span>
                  <span className="text-sm text-muted-foreground">Phone</span>
                </div>
              </a>
            )}
            {card.business.email && (
              <a
                href={`mailto:${card.business.email}`}
                className="relative flex items-center gap-4 text-card-foreground group"
                style={{ ['--hover-color' as string]: card.brandColor, ['--hover-bg' as string]: `${card.brandColor}26` }}
              >
                <div className="absolute -inset-y-2 w-[200%] -left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" style={{ backgroundColor: 'var(--hover-bg)' }} />
                <div className="text-white p-3 rounded-full" style={{ backgroundColor: card.brandColor }}>
                  <Mail size={20} />
                </div>
                <div className="flex flex-col relative">
                  <span className="text-card-foreground font-bold group-hover:text-[var(--hover-color)] transition-colors">
                    {card.business.email}
                  </span>
                  <span className="text-sm text-muted-foreground">Email</span>
                </div>
              </a>
            )}
            {card.business.website && (
              <a
                href={card.business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-4 text-card-foreground group"
                style={{ ['--hover-color' as string]: card.brandColor, ['--hover-bg' as string]: `${card.brandColor}26` }}
              >
                <div className="absolute -inset-y-2 w-[200%] -left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" style={{ backgroundColor: 'var(--hover-bg)' }} />
                <div className="text-white p-3 rounded-full" style={{ backgroundColor: card.brandColor }}>
                  <Globe size={20} />
                </div>
                <div className="flex flex-col relative">
                  <span className="text-card-foreground font-bold group-hover:text-[var(--hover-color)] transition-colors">
                    {card.business.website}
                  </span>
                  <span className="text-sm text-muted-foreground">Website</span>
                </div>
              </a>
            )}
            {hasAddress && (
              <div
                className="relative flex items-center gap-4 text-card-foreground group"
                style={{ ['--hover-color' as string]: card.brandColor, ['--hover-bg' as string]: `${card.brandColor}26` }}
              >
                <div className="absolute -inset-y-2 w-[200%] -left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" style={{ backgroundColor: 'var(--hover-bg)' }} />
                <div className="text-white p-3 rounded-full" style={{ backgroundColor: card.brandColor }}>
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col relative">
                  <span className="text-card-foreground font-bold group-hover:text-[var(--hover-color)] transition-colors">
                    {[
                      card.business.address.street,
                      card.business.address.city,
                      card.business.address.state,
                      card.business.address.zip
                    ].filter(Boolean).join(', ')}
                  </span>
                  <span className="text-sm text-muted-foreground">Address</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        {(card.about.bio || hasSocialLinks) && <div className="mt-4 border-t border-border" />}

        {/* About Section */}
        {card.about.bio && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-card-foreground mb-1.5">
              {card.about.sectionTitle || 'About Me'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {card.about.bio}
            </p>
          </div>
        )}

        {/* Social Links */}
        {hasSocialLinks && (
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-5">
            {card.social.linkedin && (
              <a
                href={card.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ 
                  color: card.brandColor,
                  backgroundColor: 'hsl(var(--muted))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${card.brandColor}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                }}
              >
                <Linkedin size={24} />
              </a>
            )}
            {card.social.twitter && (
              <a
                href={card.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ 
                  color: card.brandColor,
                  backgroundColor: 'hsl(var(--muted))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${card.brandColor}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                }}
              >
                <Twitter size={24} />
              </a>
            )}
            {card.social.facebook && (
              <a
                href={card.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ 
                  color: card.brandColor,
                  backgroundColor: 'hsl(var(--muted))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${card.brandColor}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                }}
              >
                <Facebook size={24} />
              </a>
            )}
            {card.social.youtube && (
              <a
                href={card.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ 
                  color: card.brandColor,
                  backgroundColor: 'hsl(var(--muted))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${card.brandColor}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                }}
              >
                <Youtube size={24} />
              </a>
            )}
            {card.social.instagram && (
              <a
                href={card.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ 
                  color: card.brandColor,
                  backgroundColor: 'hsl(var(--muted))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${card.brandColor}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                }}
              >
                <Instagram size={24} />
              </a>
            )}
            {card.social.tiktok && (
              <a
                href={card.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200"
                style={{ 
                  color: card.brandColor,
                  backgroundColor: 'hsl(var(--muted))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${card.brandColor}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                }}
              >
                 <svg 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Lightbox for Direct Ads */}
      {card.appointments?.directAds?.image && (
        <Lightbox
          isOpen={showLightbox}
          onClose={() => setShowLightbox(false)}
          imageSrc={card.appointments.directAds.image}
          title={card.appointments.directAds.title}
          description={card.appointments.directAds.description}
          price={card.appointments.directAds.price}
          url={card.appointments.directAds.url}
          theme={card.brandColor}
        />
      )}
    </div>
  );
}
