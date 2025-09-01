"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GitBranch, TrendingUp } from "lucide-react";

const referralData = [
  {
    label: "Child Referrals",
    value: "0",
    icon: Users,
  },
  {
    label: "Grandchild Referrals", 
    value: "0",
    icon: GitBranch,
  },
  {
    label: "Level Up Referrals",
    value: "0", 
    icon: TrendingUp,
  },
];

export function ReferralsLevels() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Referrals Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {referralData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}