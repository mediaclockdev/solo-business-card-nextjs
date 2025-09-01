"use client";

import { 
  ArrowUpRight,
  Crown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
};

export function StatCard({ title, value, icon, change, trend, className }: StatCardProps) {
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground border-b pb-2 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="flex items-center gap-1 mt-1 text-xs">
            {trend === "up" ? (
              <>
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{change}</span>
              </>
            ) : trend === "down" ? (
              <>
                <ArrowUpRight className="h-3 w-3 rotate-90 text-red-500" />
                <span className="text-red-500">{change}</span>
              </>
            ) : (
              <>
                <span className="h-3 w-3" />
                <span className="text-muted-foreground">{change}</span>
              </>
            )}
            <span className="text-muted-foreground ml-1">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <StatCard
        title="Card Views"
        value="0"
        icon={null}
        change="0%"
        trend="neutral"
      />
      <StatCard
        title="Card Shares"
        value="0"
        icon={null}
        change="0%"
        trend="neutral"
      />
      <StatCard
        title="Leads Generated"
        value="0"
        icon={<Crown size={12} className="text-yellow-500" />}
        change="5.2%"
        trend="up"
      />
      <StatCard
        title="Link Clicks"
        value="0"
        icon={null}
        change="0%"
        trend="neutral"
      />
      <StatCard
        title="Ad Views"
        value="0"
        icon={<Crown size={12} className="text-yellow-500" />}
        change="2.1%"
        trend="up"
      />
      <StatCard
        title="Contact Saves"
        value="0"
        icon={null}
        change="0%"
        trend="neutral"
      />
    </div>
  );
}
