"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Share2,
  Copy,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { BusinessCard } from "@/types/businessCard";
import { getFullName } from "@/utils/businessCard";
import { useToast } from "@/hooks/use-toast";

interface CardShareProps {
  card: BusinessCard;
  cardId: string;
  qrCodeUrl: string;
}

export function CardShare({ card, cardId, qrCodeUrl }: CardShareProps) {
  const { toast } = useToast();

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/card/${cardId}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
          title: "Link copied!",
          description: "The card link has been copied to your clipboard.",
        });
      });
    }
  };

  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `${getFullName(card)}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "QR Code downloaded!",
        description: "The QR code has been saved to your device.",
      });
    }
  };

  const handleSocialShare = (platform: string) => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/card/${cardId}`;
      const text = `Check out ${getFullName(card)}'s business card`;

      let url = "";
      switch (platform) {
        case "facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`;
          break;
        case "twitter":
          url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(text)}`;
          break;
        case "linkedin":
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`;
          break;
        case "whatsapp":
          url = `https://wa.me/?text=${encodeURIComponent(
            text + " " + shareUrl
          )}`;
          break;
        case "email":
          url = `mailto:?subject=${encodeURIComponent(
            text
          )}&body=${encodeURIComponent(shareUrl)}`;
          break;
        case "text":
          // For text/SMS sharing - using SMS protocol
          url = `sms:?body=${encodeURIComponent(text + " " + shareUrl)}`;
          break;
      }

      if (url) {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <Card className="lg:col-span-4 border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-lg">Share Your Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* QR Code Section */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col h-full">
            {qrCodeUrl && (
              <div className="text-center space-y-4 flex flex-col h-full">
                <p className="text-sm text-muted-foreground">Scan to share:</p>
                <div className="inline-block p-4 bg-white rounded-lg border border-gray-100 flex-grow flex items-center justify-center">
                  <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-auto"
                  style={{ backgroundColor: card.brandColor, color: "white" }}
                  onClick={handleDownloadQR}
                >
                  Download QR Code
                </Button>
              </div>
            )}
          </div>

          {/* Social Links Section */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Copy the link below to share your card:
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleCopyLink}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>

            <Separator />

            <p className="text-sm text-muted-foreground text-center">
              Or share via
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare("email")}
                className="flex items-center justify-start gap-2 p-3"
              >
                <Mail className="h-4 w-4" />
                <span className="text-xs">Email</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare("text")}
                className="flex items-center justify-start gap-2 p-3"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">Text</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare("facebook")}
                className="flex items-center justify-start gap-2 p-3"
              >
                <Facebook className="h-4 w-4" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare("instagram")}
                className="flex items-center justify-start gap-2 p-3"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-xs">Instagram</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare("linkedin")}
                className="flex items-center justify-start gap-2 p-3"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-xs">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare("twitter")}
                className="flex items-center justify-start gap-2 p-3"
              >
                <Twitter className="h-4 w-4" />
                <span className="text-xs">Twitter/X</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
