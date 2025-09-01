'use client';

import { useState, useEffect } from "react";
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  BarChart3,
  ArrowUpRight
} from "lucide-react";
import {
  SystemStatCard,
  MembersChart,
  MemberLevelCount,
  ReferralsRequirements,
  PricingCalculations,
  SystemInfo,
  CardPreviewUpload,
  CardBackupUpload,
  SliderImagesUpload,
  OGWebsiteImageUpload,
  ReferralEarningRate,
  SoloCardsInAction,
  SocialMediaShare,
} from "@/components/dashboard/systems";

export default function Systems() {
  const [l2Child, setL2Child] = useState("");
  const [l3LeveledUps, setL3LeveledUps] = useState("");
  const [l4Multiplier, setL4Multiplier] = useState("");
  const [l5Multiplier, setL5Multiplier] = useState("");
  const [l6Multiplier, setL6Multiplier] = useState("");
  
  // Auto-populate L3 from L2 value
  useEffect(() => {
    setL3LeveledUps(l2Child);
  }, [l2Child]);
  
  const [proUpgradeMonthly, setProUpgradeMonthly] = useState("");
  const [addOneCardMonthly, setAddOneCardMonthly] = useState("");
  const [addFiveCardsMonthly, setAddFiveCardsMonthly] = useState("");
  const [discount, setDiscount] = useState("");
  const [freeTrialPeriod, setFreeTrialPeriod] = useState("");

  // Calculations for Referrals Requirements
  const l3Total = l2Child ? (parseInt(l2Child) * parseInt(l2Child)) : 0;
  const l4Total = l3Total && l4Multiplier ? 
    (l3Total * parseInt(l4Multiplier)) : 0;
  const l5Total = l3Total && l5Multiplier ? 
    (l3Total * parseInt(l5Multiplier)) : 0;
  const l6Total = l3Total && l6Multiplier ? 
    (l3Total * parseInt(l6Multiplier)) : 0;

  // Calculations for Pricing
  const discountPercent = parseFloat(discount) || 0;
  
  // Pro Upgrade calculations
  const proUpgradeAmount = parseFloat(proUpgradeMonthly) || 0;
  const proUpgradePerYear = proUpgradeAmount * 12;
  const proUpgradeYearlyWithDiscount = proUpgradePerYear * (1 - discountPercent / 100);
  const proUpgradeMonthlyEquivalent = proUpgradeYearlyWithDiscount / 12;
  
  // Add 1 Card calculations
  const addOneCardAmount = parseFloat(addOneCardMonthly) || 0;
  const addOneCardPerYear = addOneCardAmount * 12;
  const addOneCardYearlyWithDiscount = addOneCardPerYear * (1 - discountPercent / 100);
  const addOneCardMonthlyEquivalent = addOneCardYearlyWithDiscount / 12;
  
  // Add 5 Cards calculations
  const addFiveCardsAmount = parseFloat(addFiveCardsMonthly) || 0;
  const addFiveCardsPerYear = addFiveCardsAmount * 12;
  const addFiveCardsYearlyWithDiscount = addFiveCardsPerYear * (1 - discountPercent / 100);
  const addFiveCardsMonthlyEquivalent = addFiveCardsYearlyWithDiscount / 12;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-x-4 gap-y-4">
        <SystemStatCard
          title="Accounts"
          icon={<Users className="h-4 w-4" />}
          totalValue={2547}
          metrics={[
            {
              label: "Free",
              value: 1893,
              percentage: 74,
              color: "bg-blue-100 text-blue-700"
            },
            {
              label: "Paid", 
              value: 654,
              percentage: 26,
              color: "bg-green-100 text-green-700"
            }
          ]}
        />

        <SystemStatCard
          title="Cards"
          icon={<CreditCard className="h-4 w-4" />}
          totalValue={8932}
          metrics={[
            {
              label: "Free",
              value: 5647,
              percentage: 63,
              color: "bg-blue-100 text-blue-700"
            },
            {
              label: "Paid",
              value: 3285,
              percentage: 37,
              color: "bg-green-100 text-green-700"
            }
          ]}
        />

        <SystemStatCard
          title="Messages"
          icon={<MessageSquare className="h-4 w-4" />}
          totalValue={156234}
          metrics={[
            {
              label: "Members",
              value: 98542,
              percentage: 63,
              color: "bg-purple-100 text-purple-700"
            },
            {
              label: "Public",
              value: 57692,
              percentage: 37,
              color: "bg-orange-100 text-orange-700"
            }
          ]}
        />

        <SystemStatCard
          title="Analytics"
          icon={<BarChart3 className="h-4 w-4" />}
          totalValue={425678}
          metrics={[
            {
              label: "Total Views",
              value: 298432,
              percentage: 70,
              color: "bg-indigo-100 text-indigo-700"
            },
            {
              label: "Interactions",
              value: 127246,
              percentage: 30,
              color: "bg-yellow-100 text-yellow-700"
            }
          ]}
        />

        <SystemStatCard
          title="Referrals"
          icon={<ArrowUpRight className="h-4 w-4" />}
          totalValue={15432}
          metrics={[
            {
              label: "Admin",
              value: 3086,
              percentage: 20,
              color: "bg-red-100 text-red-700"
            },
            {
              label: "Members",
              value: 12346,
              percentage: 80,
              color: "bg-green-100 text-green-700"
            }
          ]}
        />
      </div>

      {/* Members Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
        <MembersChart />
      </div>

      {/* Member Level Count */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-4">
        <MemberLevelCount l2Child={l2Child} />
        <ReferralEarningRate />
        <SoloCardsInAction />
      </div>

      {/* Referrals Requirements and Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-4">
        <ReferralsRequirements
          l2Child={l2Child}
          setL2Child={setL2Child}
          l3LeveledUps={l3LeveledUps}
          setL3LeveledUps={setL3LeveledUps}
          l4Multiplier={l4Multiplier}
          setL4Multiplier={setL4Multiplier}
          l5Multiplier={l5Multiplier}
          setL5Multiplier={setL5Multiplier}
          l6Multiplier={l6Multiplier}
          setL6Multiplier={setL6Multiplier}
          l3Total={l3Total}
          l4Total={l4Total}
          l5Total={l5Total}
          l6Total={l6Total}
        />

        <PricingCalculations
          proUpgradeMonthly={proUpgradeMonthly}
          setProUpgradeMonthly={setProUpgradeMonthly}
          addOneCardMonthly={addOneCardMonthly}
          setAddOneCardMonthly={setAddOneCardMonthly}
          addFiveCardsMonthly={addFiveCardsMonthly}
          setAddFiveCardsMonthly={setAddFiveCardsMonthly}
          discount={discount}
          setDiscount={setDiscount}
          freeTrialPeriod={freeTrialPeriod}
          setFreeTrialPeriod={setFreeTrialPeriod}
          proUpgradePerYear={proUpgradePerYear}
          proUpgradeYearlyWithDiscount={proUpgradeYearlyWithDiscount}
          proUpgradeMonthlyEquivalent={proUpgradeMonthlyEquivalent}
          addOneCardPerYear={addOneCardPerYear}
          addOneCardYearlyWithDiscount={addOneCardYearlyWithDiscount}
          addOneCardMonthlyEquivalent={addOneCardMonthlyEquivalent}
          addFiveCardsPerYear={addFiveCardsPerYear}
          addFiveCardsYearlyWithDiscount={addFiveCardsYearlyWithDiscount}
          addFiveCardsMonthlyEquivalent={addFiveCardsMonthlyEquivalent}
        />
      </div>

      {/* Image Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4">
        <CardPreviewUpload />
        <CardBackupUpload />
        <SliderImagesUpload />
        <OGWebsiteImageUpload />
      </div>

      {/* System Health and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
        <SystemInfo />
        <SocialMediaShare />
      </div>
    </div>
  );
}
