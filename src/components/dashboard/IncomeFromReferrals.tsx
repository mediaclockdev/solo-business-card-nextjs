"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IncomeFromReferrals() {
  const referralData = [
    {
      title: "Total Referrals",
      value: "= 00000",
      subValue: "",
      className: "font-medium"
    },
    {
      title: "Referrals Breakdown",
      value: "Children = 000",
      subValue: "Grandchildren = 00000",
      className: ""
    },
    {
      title: "Paid Referrals",
      value: "00 0%",
      subValue: "000 00%",
      className: ""
    },
    {
      title: "% Earned",
      value: "[10%]",
      subValue: "[50%]",
      className: "text-primary"
    },
    {
      title: "Gross Earnings",
      value: "$00",
      subValue: "$0000",
      className: "text-green-600"
    },
    {
      title: "Net Earnings",
      value: "$00",
      subValue: "$000",
      className: "text-green-600"
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold mb-1">Income From Referrals</h3>
        <p className="text-sm text-muted-foreground">
          Your total referrals and the income generated from the Paying referrals
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {referralData.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className={`text-sm ${item.className}`}>
                {item.value}
              </div>
              {item.subValue && (
                <div className={`text-xs ${item.className}`}>
                  {item.subValue}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}