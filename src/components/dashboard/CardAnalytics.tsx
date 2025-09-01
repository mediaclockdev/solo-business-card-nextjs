'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, Download, Share, Users, MousePointer, Monitor, AreaChart as AreaChartIcon, BarChart3, Crown } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CardAnalyticsProps {
  onUpgrade: () => void;
}

type TimeRange = "7d" | "30d" | "90d" | "1y";

const chartData = {
  "7d": [
    { name: 'Mon', views: 45, saves: 20, shares: 15, clicks: 35, adViews: 60, leads: 8 },
    { name: 'Tue', views: 52, saves: 25, shares: 18, clicks: 42, adViews: 72, leads: 12 },
    { name: 'Wed', views: 48, saves: 22, shares: 16, clicks: 38, adViews: 65, leads: 10 },
    { name: 'Thu', views: 61, saves: 30, shares: 22, clicks: 48, adViews: 85, leads: 15 },
    { name: 'Fri', views: 55, saves: 28, shares: 20, clicks: 45, adViews: 78, leads: 13 },
    { name: 'Sat', views: 67, saves: 35, shares: 25, clicks: 52, adViews: 92, leads: 18 },
    { name: 'Sun', views: 59, saves: 32, shares: 23, clicks: 49, adViews: 82, leads: 16 },
  ],
  "30d": [
    { name: 'Week 1', views: 320, saves: 140, shares: 95, clicks: 250, adViews: 450, leads: 65 },
    { name: 'Week 2', views: 450, saves: 190, shares: 130, clicks: 340, adViews: 620, leads: 85 },
    { name: 'Week 3', views: 380, saves: 165, shares: 110, clicks: 290, adViews: 520, leads: 72 },
    { name: 'Week 4', views: 520, saves: 220, shares: 155, clicks: 390, adViews: 710, leads: 98 },
  ],
  "90d": [
    { name: 'Month 1', views: 1650, saves: 715, shares: 485, clicks: 1270, adViews: 2300, leads: 320 },
    { name: 'Month 2', views: 1890, saves: 820, shares: 560, clicks: 1450, adViews: 2650, leads: 380 },
    { name: 'Month 3', views: 2100, saves: 910, shares: 620, clicks: 1600, adViews: 2900, leads: 420 },
  ],
  "1y": [
    { name: 'Q1', views: 5640, saves: 2445, shares: 1665, clicks: 4320, adViews: 7850, leads: 1120 },
    { name: 'Q2', views: 6200, saves: 2690, shares: 1830, clicks: 4750, adViews: 8640, leads: 1250 },
    { name: 'Q3', views: 5980, saves: 2590, shares: 1760, clicks: 4580, adViews: 8320, leads: 1180 },
    { name: 'Q4', views: 6850, saves: 2970, shares: 2020, clicks: 5240, adViews: 9540, leads: 1380 },
  ],
};

const referralLevels = [
  { label: 'Child', count: 25, color: 'bg-green-500' },
  { label: 'Grandchild', count: 155, color: 'bg-yellow-500' },
  { label: 'Leveled-Up', count: 3, color: 'bg-pink-500' },
  { label: 'Leveled-Up %', count: '12%', color: 'bg-blue-500' },
];

export function CardAnalytics({ onUpgrade }: CardAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  const currentData = chartData[timeRange];

  return (
    <div className="space-y-4">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <p className="text-xs text-muted-foreground">Card Views</p>
              </div>
              <hr className="w-full border-gray-200" />
              <div className="text-left">
                <p className="text-lg font-semibold">2,543</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4 text-green-500" />
                <p className="text-xs text-muted-foreground">Card Saves</p>
              </div>
              <hr className="w-full border-gray-200" />
              <div className="text-left">
                <p className="text-lg font-semibold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Share className="h-4 w-4 text-orange-500" />
                <p className="text-xs text-muted-foreground">Card Shares</p>
              </div>
              <hr className="w-full border-gray-200" />
              <div className="text-left">
                <p className="text-lg font-semibold">987</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <MousePointer className="h-4 w-4 text-red-500" />
                <p className="text-xs text-muted-foreground">Link Clicks</p>
              </div>
              <hr className="w-full border-gray-200" />
              <div className="text-left">
                <p className="text-lg font-semibold">1,876</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-pink-500" />
                <p className="text-xs text-muted-foreground">Ad Views</p>
                <Crown size={12} className="text-yellow-500" />
              </div>
              <hr className="w-full border-gray-200" />
              <div className="text-left">
                <p className="text-lg font-semibold">3,421</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <p className="text-xs text-muted-foreground">Leads</p>
                <Crown size={12} className="text-yellow-500" />
              </div>
              <hr className="w-full border-gray-200" />
              <div className="text-left">
                <p className="text-lg font-semibold">456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Referrals Levels */}
        <Card className="lg:col-span-1 border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Referrals Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referralLevels.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                    <span className="text-sm font-medium">{level.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{level.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card Analytics Chart */}
        <Card className="lg:col-span-3 border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Card Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track your card performance across all metrics
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant={chartType === "area" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setChartType("area")}
                  className="rounded-r-none border-r"
                >
                  <AreaChartIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                  className="rounded-l-none"
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center border rounded-md">
                <Button
                  variant={timeRange === "7d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("7d")}
                  className="rounded-r-none border-r text-xs px-2"
                >
                  7d
                </Button>
                <Button
                  variant={timeRange === "30d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("30d")}
                  className="rounded-none border-r text-xs px-2"
                >
                  30d
                </Button>
                <Button
                  variant={timeRange === "90d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("90d")}
                  className="rounded-none border-r text-xs px-2"
                >
                  90d
                </Button>
                <Button
                  variant={timeRange === "1y" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange("1y")}
                  className="rounded-l-none text-xs px-2"
                >
                  1y
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="saves"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Saves"
                    />
                    <Area
                      type="monotone"
                      dataKey="shares"
                      stackId="1"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.6}
                      name="Shares"
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                      name="Clicks"
                    />
                    <Area
                      type="monotone"
                      dataKey="adViews"
                      stackId="1"
                      stroke="#ec4899"
                      fill="#ec4899"
                      fillOpacity={0.6}
                      name="Ad Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      name="Leads"
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="views" fill="#3b82f6" name="Views" />
                    <Bar dataKey="saves" fill="#10b981" name="Saves" />
                    <Bar dataKey="shares" fill="#f97316" name="Shares" />
                    <Bar dataKey="clicks" fill="#ef4444" name="Clicks" />
                    <Bar dataKey="adViews" fill="#ec4899" name="Ad Views" />
                    <Bar dataKey="leads" fill="#8b5cf6" name="Leads" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
