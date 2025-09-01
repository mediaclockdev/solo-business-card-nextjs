'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", leads: 12 },
  { month: "Feb", leads: 19 },
  { month: "Mar", leads: 8 },
  { month: "Apr", leads: 23 },
  { month: "May", leads: 15 },
  { month: "Jun", leads: 31 },
];

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--primary))",
  },
};

export function LeadsGenerated() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Leads Generated
          <Crown size={16} className="text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="var(--color-leads)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillLeads)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
