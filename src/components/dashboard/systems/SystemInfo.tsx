"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SystemInfo() {
  return (
    <>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Performance</span>
              <span className="text-sm font-medium text-green-600">Excellent</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Response Time</span>
              <span className="text-sm font-medium text-green-600">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Server Uptime</span>
              <span className="text-sm font-medium text-green-600">99.98%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Signups Today</span>
              <span className="text-sm font-medium">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Cards Created Today</span>
              <span className="text-sm font-medium">183</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Messages Sent Today</span>
              <span className="text-sm font-medium">2,341</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}