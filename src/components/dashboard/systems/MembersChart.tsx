"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const chartData = {
  '7d': [
    { name: 'Day 1', free: 2400, paid: 1200, churned: 300 },
    { name: 'Day 2', free: 2600, paid: 1300, churned: 280 },
    { name: 'Day 3', free: 2800, paid: 1400, churned: 250 },
    { name: 'Day 4', free: 3100, paid: 1500, churned: 220 },
    { name: 'Day 5', free: 3300, paid: 1600, churned: 200 },
    { name: 'Day 6', free: 3500, paid: 1700, churned: 180 },
    { name: 'Day 7', free: 3800, paid: 1800, churned: 160 },
  ],
  '30d': [
    { name: 'Week 1', free: 2400, paid: 1200, churned: 300 },
    { name: 'Week 2', free: 2800, paid: 1400, churned: 250 },
    { name: 'Week 3', free: 3200, paid: 1600, churned: 200 },
    { name: 'Week 4', free: 3800, paid: 1800, churned: 160 },
  ],
  '90d': [
    { name: 'Jan', free: 2400, paid: 1200, churned: 300 },
    { name: 'Feb', free: 2800, paid: 1400, churned: 250 },
    { name: 'Mar', free: 3200, paid: 1600, churned: 200 },
    { name: 'Apr', free: 3600, paid: 1700, churned: 180 },
    { name: 'May', free: 4000, paid: 1900, churned: 150 },
    { name: 'Jun', free: 4200, paid: 2100, churned: 120 },
    { name: 'Jul', free: 4500, paid: 2300, churned: 100 },
    { name: 'Aug', free: 4800, paid: 2500, churned: 90 },
    { name: 'Sep', free: 5100, paid: 2700, churned: 80 },
  ],
  '1yr': [
    { name: 'Q1', free: 2800, paid: 1400, churned: 250 },
    { name: 'Q2', free: 3600, paid: 1800, churned: 180 },
    { name: 'Q3', free: 4800, paid: 2400, churned: 120 },
    { name: 'Q4', free: 5200, paid: 2600, churned: 100 },
  ],
};

type ChartType = 'area' | 'bar';
type TimePeriod = '7d' | '30d' | '90d' | '1yr';

export function MembersChart() {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('90d');

  const data = chartData[timePeriod];

  const formatTooltip = (value: number, name: string, props: any) => {
    const { payload } = props;
    if (!payload) return [value, name];
    
    const total = payload.free + payload.paid + payload.churned;
    const percentage = ((value / total) * 100).toFixed(1);
    
    return [`${value.toLocaleString()} (${percentage}%)`, name];
  };

  return (
    <Card className="lg:col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Members</CardTitle>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Free, paid and churned over time.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {/* Chart Type Toggle */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <Button
                variant={chartType === 'area' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('area')}
                className="h-8 px-3 text-xs"
              >
                Area
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="h-8 px-3 text-xs"
              >
                Bar
              </Button>
            </div>

            {/* Time Period Toggle */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              {(['7d', '30d', '90d', '1yr'] as TimePeriod[]).map((period) => (
                <Button
                  key={period}
                  variant={timePeriod === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimePeriod(period)}
                  className="h-8 px-3 text-xs"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="free"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Free"
                  animationBegin={0}
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="paid"
                  stackId="1"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                  name="Paid"
                  animationBegin={300}
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="churned"
                  stackId="1"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                  name="Churned"
                  animationBegin={600}
                  animationDuration={1500}
                />
              </AreaChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-xs fill-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Bar
                  dataKey="free"
                  fill="hsl(var(--primary))"
                  name="Free"
                  animationBegin={0}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="paid"
                  fill="hsl(var(--chart-2))"
                  name="Paid"
                  animationBegin={300}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="churned"
                  fill="hsl(var(--destructive))"
                  name="Churned"
                  animationBegin={600}
                  animationDuration={1500}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}