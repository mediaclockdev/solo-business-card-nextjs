"use client";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVideoSettings } from "@/hooks/use-video-settings";

export function SoloCardsInAction() {
  const { settings, updateSettings } = useVideoSettings();
  const { toast } = useToast();

  const handleSave = () => {
    updateSettings({
      title: settings.title,
      subtitle: settings.subtitle,
      videoLink: settings.videoLink
    });
    toast({
      title: "Video Settings Saved",
      description: "Video title, subtitle, and link have been saved successfully.",
    });
  };

  return (
    <Card className="lg:col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">See SoloCards in Action</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure the video displayed on the landing page
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm">Title</span>
              <Input
                type="text"
                value={settings.title}
                onChange={(e) => updateSettings({ ...settings, title: e.target.value })}
                className="w-full h-8 text-xs ml-4"
                placeholder="Enter video title..."
              />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm">Subtitle</span>
              <Input
                type="text"
                value={settings.subtitle}
                onChange={(e) => updateSettings({ ...settings, subtitle: e.target.value })}
                className="w-full h-8 text-xs ml-4"
                placeholder="Enter video subtitle..."
              />
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm">Video Link</span>
              <Input
                type="text"
                value={settings.videoLink}
                onChange={(e) => updateSettings({ ...settings, videoLink: e.target.value })}
                className="w-full h-8 text-xs ml-4"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-border mt-4">
            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}