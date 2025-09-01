'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, Copy, Users, TrendingUp, Target, Star, Gift } from "lucide-react";
import { useState } from "react";
//import { WorldMap } from "@/components/ui/WorldMap";
import dynamic from "next/dynamic";
const WorldMap = dynamic(() => import("@/components/ui/WorldMap"), { ssr: false });

export default function Referrals() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // Sample referral data with locations
  const referrals = [
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      level: "Level-2",
      referrals: 125,
      dateJoined: "May 15, 2025",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        city: "New York",
        country: "USA"
      }
    },
    {
      name: "Michael Chen",
      email: "michael@example.com", 
      level: "Level-1",
      referrals: 45,
      dateJoined: "June 2, 2025",
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face",
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
        city: "San Francisco",
        country: "USA"
      }
    },
    {
      name: "Emma Wilson",
      email: "emma@example.com",
      level: "Level-2", 
      referrals: 156,
      dateJoined: "April 20, 2025",
      avatar: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face",
      location: {
        latitude: 51.5074,
        longitude: -0.1278,
        city: "London",
        country: "UK"
      }
    }
  ];
  const stepCards = [
    {
      step: 1,
      title: "Share our cards",
      description: "1st, give-a-way referrer 120+ free business cards",
    },
    {
      step: 2,
      title: "Tell others to share our cards too",
      description: "2nd, get 100 of your recruits to referr 100+ cards",
    },
    {
      step: 3,
      title: "Level-up your account",
      description: "You = Level-2 when you recruit referr 100+ users",
    },
    {
      step: 4,
      title: "Your recruits level-up their account",
      description: "You = Level-3 when 100 of your recruits = Level-2",
    },
    {
      step: 5,
      title: "Earner status",
      description: "Level-3 = Earner, you can earn $2k-$10k/mo",
    },
  ];

  const metrics = [
    { title: "Child Referrals", value: 0, required: 2 },
    { title: "Level-Up Referrals", value: 0, required: 2 },
    { title: "Grand-children Referrals", value: 0, required: 1 },
  ];

  const targetLevels = [
    { level: "Level-1:", description: "< [100] referrals", status: "Starter", progress: 0, monetized: "Not Monetized", color: "bg-gray-400" },
    { level: "Level-2:", description: "≥ [100] Child referrals", status: "Level-Up", progress: 10, monetized: "Not Monetized", color: "bg-blue-400" },
    { level: "Level-3:", description: "≥ [100] of your Child referrals are Level 2", status: "Bronze Earner", progress: 50, monetized: "Monetized", color: "bg-yellow-400" },
    { level: "Level-4:", description: "≥ L3 x [L4-multiplier]", status: "Silver Earner", progress: 50, monetized: "Monetized", color: "bg-green-400" },
    { level: "Level-5:", description: "≥ L3 x [L5-multiplier]", status: "Gold Earner", progress: 50, monetized: "Monetized", color: "bg-purple-400" },
    { level: "Level-6:", description: "≥ L3 x [L6-multiplier]", status: "Platinum Earner", progress: 50, monetized: "Monetized", color: "bg-pink-400" },
  ];

  return (
    <div className="space-y-4">
      {/* Alert Card */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4" />
        <AlertTitle className="text-lg font-semibold">Earn Passive Income with SoloBizCards</AlertTitle>
        <AlertDescription className="text-base mt-2">
          Earning is easy! Get to Level-3. Refer 100+ = Level-2. When your referrals also refer 100+ = Level-3 for you. Start earning at Level-3.
        </AlertDescription>
      </Alert>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stepCards.map((step) => (
          <Card key={step.step} className="relative card-hover cursor-pointer">
            <CardHeader className="pb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-600 font-semibold">{step.step}</span>
              </div>
              <CardTitle className="text-sm font-medium">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Member Level & Metrics - 4 Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="text-sm font-medium border-b pb-2">
              Your Member Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">Starter</div>
              <Badge variant="secondary">Since May 14, 2025</Badge>
            </div>
          </CardContent>
        </Card>
        
        {metrics.map((metric, index) => (
          <Card key={index} className="card-hover cursor-pointer">
            <CardHeader>
              <CardTitle className="text-sm font-medium border-b pb-2">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.required} Required</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Grid: Referrals List & Referral Link */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Your List of Referrals */}
        <Card className="card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg font-semibold">
              <span>Your List of Referrals</span>
              <Button variant="outline" size="sm" onClick={() => setIsMapOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Show Map
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="flex -space-x-6">
                {referrals.map((referral, index) => (
                  <Avatar 
                    key={index}
                    className="w-16 h-16 border-4 border-background cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
                    style={{ zIndex: referrals.length - index }}
                    onClick={() => console.log(`Clicked on ${referral.name}`)}
                  >
                    <AvatarImage src={referral.avatar} alt={referral.name} />
                    <AvatarFallback>{referral.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Referral Link */}
        <Card className="card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Referral Link</CardTitle>
            <CardDescription>
              Copy and share this URL. Anyone who signs up via it becomes your recruit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                value="https://devbizcardnow-coderoad-software.vercel.app/ref/DCKMRH" 
                readOnly 
                className="flex-1"
              />
              <Button size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Suggested Target Levels - Full Width */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Suggested Target Levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4">
            <p className="text-sm mb-1">
              Everyone starts a "Level-1", the goal is to become monetized if earning passive income is your desire.
              <Accordion type="single" collapsible className="mt-2">
                <AccordionItem value="learn-more" className="border-none">
                  <AccordionTrigger className="text-primary p-0 text-sm font-normal hover:no-underline">
                    Learn more...
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pt-2">
                    The first task is to meet and exceed the L2 minimum requirement [100-referrals] by at least 50%. 
                    Next, encourage at least [100] of your referrals to "Level-Up"; they may just do it without your 
                    encouragement because the offer is so good. Your ultimate target is "Level-3", at L3, you are 
                    monetized and can start earning 10% and 50% on your Child-referrals and your Grandchild-referrals, 
                    respectively. When your Child refers someone, that member becomes your Grandchild, you make 50% 
                    of anything your grandchild purchases on the site. Choose your track and start earning passive income now.{" "}
                    <a href="/opportunities" className="text-primary hover:underline">Learn more...</a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </p>
          </div>
          {targetLevels.map((level, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${level.color}`} />
                  <div className="text-sm">
                    <span className="font-semibold">{level.level}</span> {level.description} | <span className={level.status === "Top Earner" ? "text-blue-600" : ""}>{level.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">
                    <span className="font-semibold">{level.progress}%</span> | <span className={level.monetized === "Monetized" ? "text-green-600" : "text-red-600"}>{level.monetized}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Referrals Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle>Referral Locations Map</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full">
            <WorldMap contacts={referrals} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
