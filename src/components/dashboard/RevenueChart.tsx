
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", views: 2543, shares: 987, adViews: 3421 },
  { name: "Feb", views: 2890, shares: 1200, adViews: 3800 },
  { name: "Mar", views: 3120, shares: 1456, adViews: 4200 },
  { name: "Apr", views: 2780, shares: 1100, adViews: 3900 },
  { name: "May", views: 3456, shares: 1578, adViews: 4500 },
  { name: "Jun", views: 3890, shares: 1890, adViews: 5100 },
  { name: "Jul", views: 4200, shares: 2100, adViews: 5600 },
  { name: "Aug", views: 4500, shares: 2300, adViews: 6000 },
  { name: "Sep", views: 4800, shares: 2456, adViews: 6300 },
  { name: "Oct", views: 5200, shares: 2700, adViews: 6800 },
  { name: "Nov", views: 5600, shares: 2900, adViews: 7200 },
  { name: "Dec", views: 6000, shares: 3100, adViews: 7800 },
];

type TimeRange = "7d" | "30d" | "90d" | "1y";

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-col">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-semibold">Card Activities</CardTitle>
          <CardDescription>
            Statistics for your business cards
          </CardDescription>
        </div>
        
        <div className="mt-4 flex flex-row space-x-2 md:ml-auto">
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType("area")}
              className={cn(
                "rounded-sm",
                chartType === "area" && "bg-background shadow-sm"
              )}
            >
              Area
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType("bar")}
              className={cn(
                "rounded-sm",
                chartType === "bar" && "bg-background shadow-sm"
              )}
            >
              Bar
            </Button>
          </div>
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("7d")}
              className={cn(
                "rounded-sm",
                timeRange === "7d" && "bg-background shadow-sm"
              )}
            >
              7d
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("30d")}
              className={cn(
                "rounded-sm",
                timeRange === "30d" && "bg-background shadow-sm"
              )}
            >
              30d
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("90d")}
              className={cn(
                "rounded-sm",
                timeRange === "90d" && "bg-background shadow-sm"
              )}
            >
              90d
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange("1y")}
              className={cn(
                "rounded-sm",
                timeRange === "1y" && "bg-background shadow-sm"
              )}
            >
              1y
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={
                  timeRange === "7d"
                    ? data.slice(0, 7)
                    : timeRange === "30d"
                    ? data.slice(0, 6)
                    : timeRange === "90d"
                    ? data.slice(0, 9)
                    : data
                }
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4263eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4263eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38d9a9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38d9a9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAdViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#4263eb"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="shares"
                  stroke="#38d9a9"
                  fillOpacity={1}
                  fill="url(#colorShares)"
                />
                <Area
                  type="monotone"
                  dataKey="adViews"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorAdViews)"
                />
              </AreaChart>
            ) : (
              <BarChart
                data={
                  timeRange === "7d"
                    ? data.slice(0, 7)
                    : timeRange === "30d"
                    ? data.slice(0, 6)
                    : timeRange === "90d"
                    ? data.slice(0, 9)
                    : data
                }
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#4263eb" />
                <Bar dataKey="shares" fill="#38d9a9" />
                <Bar dataKey="adViews" fill="#f59e0b" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
