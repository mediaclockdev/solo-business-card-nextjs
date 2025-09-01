"use client";
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploadCardProps = {
  title: string;
  description?: string;
  multiple?: boolean;
  onImagesChange?: (images: string[]) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  className?: string;
};

export function ImageUploadCard({ 
  title, 
  description, 
  multiple = false, 
  onImagesChange,
  acceptedTypes = "image/*",
  maxSize = 5,
  className 
}: ImageUploadCardProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);
    const newImages: string[] = [];

    Array.from(files).forEach((file, index) => {
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        console.error(`File ${file.name} is too large. Max size: ${maxSize}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          
          // If this is the last file, update state
          if (newImages.length === Math.min(files.length, multiple ? 10 : 1)) {
            setTimeout(() => {
              const updatedImages = multiple ? [...images, ...newImages] : newImages;
              setImages(updatedImages);
              onImagesChange?.(updatedImages);
              setIsUploading(false);
            }, 500); // Small delay for better UX
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={cn("card-hover animate-fade-in", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground border-b pb-2 flex items-center gap-2">
          <Image className="h-4 w-4" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer hover:border-primary/50 hover:bg-muted/50",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            isUploading && "pointer-events-none opacity-50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">
                  {acceptedTypes.includes('image') ? 'PNG, JPG, WEBP' : 'Files'} up to {maxSize}MB
                  {multiple && ' (multiple files allowed)'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Preview</h4>
            <div className={cn(
              "grid gap-3",
              multiple ? "grid-cols-2" : "grid-cols-1"
            )}>
              {images.map((image, index) => (
                <div key={index} className="relative group animate-scale-in">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {images.length === 0 && !isUploading && (
          <Button variant="outline" className="w-full" onClick={openFileDialog}>
            <Upload className="mr-2 h-4 w-4" />
            Choose {multiple ? 'Files' : 'File'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}