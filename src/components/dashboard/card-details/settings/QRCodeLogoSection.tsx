"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { BusinessCard } from "@/types/businessCard";
import { generateQRCodeWithLogo } from "@/utils/qrCodeGenerator";

interface QRCodeLogoSectionProps {
  card: BusinessCard;
  qrCodeUrl: string;
  onLogoChange?: (logoFile: File | null) => void;
  onQRCodeUpdate?: (newQRCodeUrl: string) => void;
}

export function QRCodeLogoSection({
  card,
  qrCodeUrl,
  onLogoChange,
  onQRCodeUpdate,
}: QRCodeLogoSectionProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [colorSource, setColorSource] = useState<"brand" | "custom">("brand");
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [isRegeneratingQR, setIsRegeneratingQR] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedColor = colorSource === "brand" ? card.brandColor : customColor;

  const regenerateQRCode = useCallback(async () => {
    console.log("Regenerating QR code with color:", selectedColor);
    setIsRegeneratingQR(true);
    try {
      if (typeof window !== "undefined") {
        const cardUrl = `${window.location.origin}/card/${card.metadata.id}`;
        console.log("QR Code URL:", cardUrl);
        console.log("QR Code options:", {
          width: 200,
          margin: 2,
          color: {
            dark: selectedColor,
            light: "#FFFFFF",
          },
        });
        const newQRCodeUrl = await generateQRCodeWithLogo(cardUrl, logoFile, {
          width: 200,
          margin: 2,
          color: {
            dark: selectedColor,
            light: "#FFFFFF",
          },
        });
        console.log(
          "Generated QR code URL:",
          newQRCodeUrl.substring(0, 50) + "..."
        );
        onQRCodeUpdate?.(newQRCodeUrl);
      }
    } catch (error) {
      console.error("Failed to regenerate QR code:", error);
    } finally {
      setIsRegeneratingQR(false);
    }
  }, [card.metadata.id, logoFile, selectedColor, onQRCodeUpdate]);

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    setIsProcessing(true);

    // Clean up previous URL
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }

    // Create new preview URL
    const previewUrl = URL.createObjectURL(file);
    setLogoFile(file);
    setLogoPreviewUrl(previewUrl);
    setIsProcessing(false);

    // Notify parent component
    onLogoChange?.(file);
  };

  const handleRemoveLogo = async () => {
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }
    setLogoFile(null);
    setLogoPreviewUrl("");

    // Notify parent component
    onLogoChange?.(null);
  };

  const handleColorChange = (source: "brand" | "custom", color?: string) => {
    setColorSource(source);
    if (source === "custom" && color) {
      setCustomColor(color);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Add save logic here - for now just simulate saving
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("QR Code settings saved:", {
        colorSource,
        selectedColor,
        logoFile,
      });
    } catch (error) {
      console.error("Failed to save QR code settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Regenerate QR code when color changes
  useEffect(() => {
    regenerateQRCode();
  }, [regenerateQRCode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
    };
  }, [logoPreviewUrl]);
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">QR Code Logo</h3>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Choose Color:</Label>
            <RadioGroup
              value={colorSource}
              onValueChange={(value: "brand" | "custom") =>
                handleColorChange(value)
              }
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="brand" id="brand" />
                <Label htmlFor="brand" className="cursor-pointer">
                  Brand Color
                </Label>
                <div
                  className="w-8 h-8 rounded border-2 border-border"
                  style={{ backgroundColor: card.brandColor }}
                />
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer">
                  Custom Color
                </Label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => handleColorChange("custom", e.target.value)}
                  className="w-8 h-8 rounded border border-border cursor-pointer"
                  disabled={colorSource !== "custom"}
                />
                <Input
                  type="text"
                  value={customColor}
                  onChange={(e) => handleColorChange("custom", e.target.value)}
                  className="w-24 font-mono text-sm"
                  placeholder="#000000"
                  disabled={colorSource !== "custom"}
                />
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-6">
            {/* Logo Upload Section */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 border border-dashed border-muted-foreground rounded-lg flex items-center justify-center bg-muted/20 overflow-hidden">
                {logoPreviewUrl ? (
                  <>
                    <img
                      src={logoPreviewUrl}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/90"
                    >
                      <X className="w-2 h-2" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {isProcessing ? "..." : "Logo"}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="logo-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleLogoUpload(file);
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                  disabled={isProcessing}
                >
                  {logoPreviewUrl ? "Change Logo" : "Upload Logo"}
                </Button>
                {logoFile && (
                  <p className="text-xs text-muted-foreground">
                    {logoFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* QR Code Preview */}
            <div className="relative">
              {qrCodeUrl && (
                <div className="relative">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-32 h-32 border border-border rounded-lg"
                  />
                  {isRegeneratingQR && (
                    <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        Updating...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="min-w-24"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
