"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, Users, CreditCard, DollarSign } from "lucide-react";

const memberData = [
  {
    label: "Member Since",
    value: "January 2024",
    icon: Clock,
  },
  {
    label: "Membership Status",
    value: "Free",
    icon: User,
  },
  {
    label: "Member Level",
    value: "Starter",
    icon: Users,
  },
  {
    label: "Card Free/Paid Status",
    value: "2-Free",
    icon: CreditCard,
  },
];

export function MemberStatus() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Member Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {memberData.map((item, index) => (
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