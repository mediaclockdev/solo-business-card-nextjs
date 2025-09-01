"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, DollarSign } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IncomeFromReferrals } from "@/components/dashboard/IncomeFromReferrals";

const Earnings = () => {
  const paymentSchedule = [
    { month: "May 2025", label: "[current]", amount: "$1,230.00", dueDate: "30th", status: "current" },
    { month: "Jun. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Jul. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Aug. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Sept. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Oct. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Nov. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Dec. 2025", amount: "$1,230.00", dueDate: "30th" },
    { month: "Jan. 2026", amount: "$1,230.00", dueDate: "30th" },
    { month: "Feb. 2026", amount: "$350.00", dueDate: "28th" },
    { month: "Mar. 2026", amount: "$100.00", dueDate: "30th" },
    { month: "Apr. 2026", amount: "$0.00", dueDate: "30th" }
  ];

  const recentActivities = [
    { amount: "$23.40", description: "for 50% yearly service pmt." },
    { amount: "$4.68", description: "for 10% yearly service pmt." },
    { amount: "$2.47", description: "for 50% monthly service pmt." },
    { amount: "$0.49", description: "for 10% monthly service pmt." }
  ];

  const payoutHistory = [
    { amount: "$1,230.00", date: "Apr. 2025" },
    { amount: "$850.00", date: "Mar. 2025" },
    { amount: "$1,130.00", date: "Feb. 2025" },
    { amount: "$1,130.00", date: "Jan. 2025" }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-4">
      {/* Monetization Status */}
      <Alert className="border-green-200 bg-green-50">
        <AlertTitle className="text-base font-semibold">Monetization Status</AlertTitle>
        <AlertDescription className="text-base mt-2">
          <span className="font-medium text-green-600">Active</span> - since January 15, 2025
        </AlertDescription>
      </Alert>
      
      {/* Income From Referrals */}
      <IncomeFromReferrals />

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-base font-semibold mb-4">Earnings Summary</h2>
          <p className="text-sm text-muted-foreground">Track your pending and completed earnings from referrals.</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg lg:col-span-1 lg:col-start-6 border border-blue-300 hover:border-blue-500 card-hover cursor-pointer">
          <div className="text-sm text-muted-foreground mb-1">12-Month Total</div>
          <div className="text-2xl font-bold text-blue-600">$11,520.00</div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div>
        <h2 className="text-base font-semibold mb-4">Payment Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {paymentSchedule.map((payment, index) => (
            <Card 
              key={index} 
              className={`card-hover cursor-pointer ${payment.status === "current" ? "bg-blue-50 border-blue-200 hover:border-blue-400" : "hover:border-gray-400"}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2 pb-2 border-b border-gray-200">
                  {payment.month}
                  {payment.label && (
                    <Badge variant="secondary" className="text-xs">
                      {payment.label}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 py-3">
                <div className="text-xs text-muted-foreground">
                  {payment.amount === "$0.00" ? "Total Amount Due" : "Total Due"}
                </div>
                <div className="text-lg font-bold">{payment.amount}</div>
                <div className="text-xs text-muted-foreground">
                  Due Date: {payment.dueDate}.
                </div>
                <button className="text-xs text-blue-600 hover:underline pt-1">
                  Details here &gt;
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activities and Payout History */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 hover:border-gray-400 card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              Recent Activities
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p>NOTE: Any income earned in this month</p>
                    <p>will be paid after the following 3-months,</p>
                    <p>and at the end of the 4th. month.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-blue-600 hover:underline cursor-pointer mb-4">
              Last 30 days payments &gt;
            </div>
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">{activity.amount}</span>
                <span className="text-sm text-muted-foreground">{activity.description}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card className="lg:col-span-2 hover:border-gray-400 card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              Payout History
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-blue-600 hover:underline cursor-pointer mb-4">
              Recent Payouts &gt;
            </div>
            {payoutHistory.map((payout, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">{payout.amount}</span>
                <span className="text-sm text-muted-foreground">{payout.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      </div>
    </TooltipProvider>
  );
};

export default Earnings;