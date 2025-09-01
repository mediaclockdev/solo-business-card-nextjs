"use client";
import React from 'react';
import { FormComponentProps } from '@/types/businessCard';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

export function CardDesignSelection({ card, onUpdate, isEditMode }: FormComponentProps) {
  const currentTemplate = card.templateType || 'classic';
  const isDisabled = !isEditMode;

  const renderClassicDesigns = () => (
    <>
      {/* Standard */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'standard' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'standard' || (!card.cardLayout && currentTemplate === 'classic')
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-8 w-full bg-white flex items-center justify-center">
                    <div className="absolute top-6 left-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="space-y-0.5 mt-2">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                      <div className="w-4 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Standard</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'standard' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'standard' || (!card.cardLayout && currentTemplate === 'classic')
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-16 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-8 w-full bg-white flex items-center justify-center">
                <div className="absolute top-6 left-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="space-y-0.5 mt-2">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                  <div className="w-4 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Standard</span>
          </div>
        </button>
      )}

      {/* Extended */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'extended' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'extended' 
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-8 w-full bg-white flex items-center justify-center">
                    <div className="absolute top-4 right-2 w-1.5 h-1 bg-white/80 rounded-sm"></div>
                    <div className="absolute top-6 right-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="space-y-0.5 mt-2">
                      <div className="w-7 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-6 h-0.5 bg-foreground/40 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Extended</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'extended' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'extended' 
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-16 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-8 w-full bg-white flex items-center justify-center">
                <div className="absolute top-4 right-2 w-1.5 h-1 bg-white/80 rounded-sm"></div>
                <div className="absolute top-6 right-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="space-y-0.5 mt-2">
                  <div className="w-7 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-6 h-0.5 bg-foreground/40 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Extended</span>
          </div>
        </button>
      )}

      {/* Centered */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'centered' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'centered' 
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-8 w-full bg-white flex flex-col items-center justify-center">
                    <div className="absolute top-5 w-2 h-2 bg-white rounded-full"></div>
                    <div className="space-y-0.5 mt-3 flex flex-col items-center">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                      <div className="w-4 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Centered</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'centered' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'centered' 
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-16 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-8 w-full bg-white flex flex-col items-center justify-center">
                <div className="absolute top-5 w-2 h-2 bg-white rounded-full"></div>
                <div className="space-y-0.5 mt-3 flex flex-col items-center">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                  <div className="w-4 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Centered</span>
          </div>
        </button>
      )}

      {/* Portrait */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'portrait' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'portrait'
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-9 h-12 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-4 w-full bg-white flex flex-col items-center justify-center">
                    <div className="space-y-0.5">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Portrait</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'portrait' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'portrait'
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-9 h-12 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-4 w-full bg-white flex flex-col items-center justify-center">
                <div className="space-y-0.5">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Portrait</span>
          </div>
        </button>
      )}
    </>
  );

  const renderTraditionalDesigns = () => (
    <>
      {/* Align Right */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'align-right' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'align-right' || (!card.cardLayout && currentTemplate === 'traditional')
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-8 w-full bg-white flex items-center justify-center">
                    <div className="absolute top-4 right-2 w-3 h-1 bg-white/80 rounded-sm"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="space-y-0.5 mt-2 ml-1">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Align Right</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'align-right' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'align-right' || (!card.cardLayout && currentTemplate === 'traditional')
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-16 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-8 w-full bg-white flex items-center justify-center">
                <div className="absolute top-4 right-2 w-3 h-1 bg-white/80 rounded-sm"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="space-y-0.5 mt-2 ml-1">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Align Right</span>
          </div>
        </button>
      )}

      {/* Align Left */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'align-left' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'align-left' 
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-8 w-full bg-white flex items-center justify-center">
                    <div className="absolute top-4 left-2 w-3 h-1 bg-white/80 rounded-sm"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="space-y-0.5 mt-2 mr-1">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Align Left</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'align-left' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'align-left' 
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-16 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-8 w-full bg-white flex items-center justify-center">
                <div className="absolute top-4 left-2 w-3 h-1 bg-white/80 rounded-sm"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="space-y-0.5 mt-2 mr-1">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Align Left</span>
          </div>
        </button>
      )}

      {/* Portrait */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'portrait' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'portrait'
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-9 h-12 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-4 w-full bg-white flex flex-col items-center justify-center">
                    <div className="space-y-0.5">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Portrait</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'portrait' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'portrait'
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-9 h-12 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-4 w-full bg-white flex flex-col items-center justify-center">
                <div className="space-y-0.5">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Portrait</span>
          </div>
        </button>
      )}

      {/* Slides */}
      {isDisabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'slides' })}
              disabled={isDisabled}
              className={`p-3 rounded-lg border-2 transition-all ${
                card.cardLayout === 'slides' 
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
                  : 'border-border hover:border-muted-foreground'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-16 rounded overflow-hidden relative">
                  <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
                  <div className="h-8 w-full bg-white flex items-center justify-center">
                    <div className="absolute top-5 left-2 flex space-x-0.5">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                    </div>
                    <div className="absolute top-6 right-2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="space-y-0.5 mt-2">
                      <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                      <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium">Slides</span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Available when editing a card only.</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <button
          onClick={() => !isDisabled && onUpdate({ ...card, cardLayout: 'slides' })}
          disabled={isDisabled}
          className={`p-3 rounded-lg border-2 transition-all ${
            card.cardLayout === 'slides' 
              ? 'border-[var(--primary)] bg-[var(--primary)]/10' 
              : 'border-border hover:border-muted-foreground'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-16 rounded overflow-hidden relative">
              <div className="h-8 w-full" style={{ backgroundColor: card.brandColor }}></div>
              <div className="h-8 w-full bg-white flex items-center justify-center">
                <div className="absolute top-5 left-2 flex space-x-0.5">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                </div>
                <div className="absolute top-6 right-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="space-y-0.5 mt-2">
                  <div className="w-6 h-0.5 bg-foreground/60 rounded-sm"></div>
                  <div className="w-5 h-0.5 bg-foreground/40 rounded-sm"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium">Slides</span>
          </div>
        </button>
      )}
    </>
  );

  return (
    <TooltipProvider>
      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Card Design</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currentTemplate === 'classic' ? renderClassicDesigns() : renderTraditionalDesigns()}
        </div>
      </div>
    </TooltipProvider>
  );
}