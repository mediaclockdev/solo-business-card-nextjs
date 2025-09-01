"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function YourEarnings() {
  return <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground border-b pb-2">
          Your Earnings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$ 0</div>
        <p className="text-xs text-muted-foreground mt-1">total earnings</p>
      </CardContent>
    </Card>;
}