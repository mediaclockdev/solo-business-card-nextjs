'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CreditCard, Mail, User, Camera, Building2, Calendar, Crown, Shield, Clock, Download } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  //const [searchParams, setSearchParams] = useSearchParams();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const tabFromParams = searchParams.get("tab");
  
  // Set default tab based on URL parameter if present
  const currentTab = tabFromParams === "subscriptions" || 
                    tabFromParams === "appearance" || 
                    tabFromParams === "notifications" 
                    ? tabFromParams : "account";

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === "account") {
      newParams.delete("tab");
    } else {
      newParams.set("tab", value);
    }

    router.push(`?${newParams.toString()}`);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-[400px]">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="account" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Profile
                </CardTitle>
                <CardDescription>
                  Manage your profile information and account settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:bg-primary/90 transition-colors">
                        <Camera className="h-3 w-3" />
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('avatar-upload')?.click()}>
                      Change Photo
                    </Button>
                  </div>

                  {/* Account Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">January 15, 2024</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">Account Status</Label>
                      <Badge variant="secondary" className="w-fit">
                        <Shield className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
                      <Badge variant="default" className="w-fit">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro Member
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">Billing Status</Label>
                      <Badge variant="outline" className="w-fit text-green-600 border-green-200">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself"
                    defaultValue="Digital marketing professional with 5+ years of experience"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button className="w-full sm:w-auto">Save changes</Button>
              </CardFooter>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Manage your business details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Digital Solutions Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-category">Business Category</Label>
                  <Select defaultValue="marketing">
                    <SelectTrigger>
                      <SelectValue placeholder="Select business category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance & Accounting</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="legal">Legal Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leads-preference">Leads Preference</Label>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all-leads" />
                      <Label htmlFor="all-leads">Accept all leads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="filtered" id="filtered-leads" />
                      <Label htmlFor="filtered-leads">Local leads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="no-leads" />
                      <Label htmlFor="no-leads">Non-Local leads</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button className="w-full sm:w-auto">Save changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password associated with your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input id="confirm" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Subscription Plans */}
              <div className="lg:col-span-2 space-y-4">
                {/* FREE Plan */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">FREE!! - SoloBizCards Membership</h3>
                          <p className="text-sm text-muted-foreground">No Billing</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                          Upgrade
                        </Badge>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Upgrade
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PAID Plan - Current */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">PAID!! - SoloBizCards PRO Membership</h3>
                          <p className="text-sm text-muted-foreground">Pro Upgrade + Lead Billing History</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                          Current
                        </Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PAID Plan - Past Due */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">PAID!! - SoloBizCards PRO Membership</h3>
                          <p className="text-sm text-muted-foreground">Pro Upgrade, No Billing</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                          Past Due
                        </Badge>
                        <Button size="sm" variant="outline">
                          Renew
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Account Details */}
              <div className="space-y-4">
                {/* Current Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold">PRO Upgrade Plan</h3>
                      <p className="text-sm text-muted-foreground">$3.95/month</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Change Plan
                    </Button>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                    <CardDescription>Manage your payment details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/24</p>
                      </div>
                    </div>
                    <Button size="sm" variant="link" className="p-0 h-auto text-primary">
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                {/* Billing History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Billing History</CardTitle>
                    <CardDescription>Recent payments.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">February 28, 2025</p>
                          <p className="text-xs text-muted-foreground">$3.95</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">January 30, 2025</p>
                          <p className="text-xs text-muted-foreground">$3.95</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">December 30, 2024</p>
                          <p className="text-xs text-muted-foreground">$3.95</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the appearance of the app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Dark Mode</Label>
                    <Switch id="theme" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Turn on dark mode to reduce eye strain and save battery.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="density">Compact Mode</Label>
                    <Switch id="density" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Make the UI more compact to fit more content on the screen.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label htmlFor="email-notifs">Email Notifications</Label>
                    </div>
                    <Switch id="email-notifs" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <Label htmlFor="order-updates">Order Updates</Label>
                    </div>
                    <Switch id="order-updates" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your orders.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <Label htmlFor="marketing">Marketing emails</Label>
                    </div>
                    <Switch id="marketing" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products and features.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
