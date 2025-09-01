"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MemberLevelCountProps = {
  l2Child: string;
};

export function MemberLevelCount({ l2Child }: MemberLevelCountProps) {
  console.log("MemberLevelCount received l2Child:", l2Child);
  return (
    <Card className="lg:col-span-3 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Member Count By Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">1.</span>
              <span className="text-sm">Level -1: &lt; {l2Child || '100'} referrals | <span className="font-medium">Starter member</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">80%</span>
              <span className="text-sm font-medium">24,888</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">2.</span>
              <span className="text-sm">Level -2: = {l2Child || '100'} Child referrals | <span className="font-medium">Level-Up member</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">15%</span>
              <span className="text-sm font-medium">4,667</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">3.</span>
              <span className="text-sm">Level -3: =&gt; {l2Child || '100'} Child referrals who are Level-2 | <span className="font-medium">Bronze Earner member</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">5%</span>
              <span className="text-sm font-medium">1,554</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">4.</span>
              <span className="text-sm">Level -4: =&gt; L3 x L4-multiplier | <span className="font-medium">Silver Earner member</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">0%</span>
              <span className="text-sm font-medium">0</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">5.</span>
              <span className="text-sm">Level -5: =&gt; L3 x L5-multiplier | <span className="font-medium">Gold Earner member</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">0%</span>
              <span className="text-sm font-medium">0</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">6.</span>
              <span className="text-sm">Level -6: =&gt; L3 x L6-multiplier | <span className="font-medium">Platinum Earner member</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">0%</span>
              <span className="text-sm font-medium">0</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}