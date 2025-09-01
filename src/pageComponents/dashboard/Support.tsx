"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExternalLink, ArrowRight } from "lucide-react";
export default function Support() {
  return <div className="space-y-8 bg-white min-h-screen p-6">
      {/* Top section with two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Have a question?</h3>
                <p className="text-sm text-gray-600">Check out our Help Center!</p>
              </div>
              <Button variant="default" size="sm" className="flex items-center gap-2">
                Visit Help Center
                <ExternalLink size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Want to get the most out of DigiPro?</h3>
                <p className="text-sm text-gray-600">Explore helpful tips and tricks in our blog</p>
              </div>
              <Button variant="default" size="sm" className="flex items-center gap-2">
                Visit Our Blog
                <ExternalLink size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Support Articles Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Top Support Articles</h2>
        <p className="text-sm text-gray-600 mb-6">Check out our quick start articles to get started fast.</p>

        {/* First row - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="hover:border-gray-400 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium border-b border-border pb-2">Dashboard Platform</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">How to navigate the Dashboard as a Free or Paid card member.</p>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1">
                View Article
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-gray-400 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium border-b border-border pb-2">Create a card 101</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">You create a basic card initially, then after login, you can change templates and card designs, add more photos and even a company logo and more.</p>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1">
                View Article
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-gray-400 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium border-b border-border pb-2">Other Features</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">You can also add a custom URL, free QR code, add a logo to your QR code, and an email signature to your card.</p>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1">
                View Article
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-gray-400 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium border-b border-border pb-2">Accessories & Orders</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">Other paid accessories are available to enhance your card features even further, like NFC cards. </p>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1">
                View Article
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Second row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:border-gray-400 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium border-b border-border pb-2">Referral System 101</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">All your members are automatically granted affiliate status, no additional step require. No special signup required, no additional work required, just continue doing what you were already doing... sharing your BizCard with others. If someone signs up from your affiliate link, you get credit, if they purchase something on the website, you get up to 50% recurring passive income from their purchase for as long as the service is active.</p>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1">
                View Article
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-gray-400 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium border-b border-border pb-2">How SoloPro Works</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">SoloBizCards is a business marketing community. We offer a free digital business card to all our members. Members can purchase additional services if they choose to. Our members makes up to 50% on purchases made by the members associated with their account. Our digital marketing assist group enable members to reach/market to targeted groups via social media. Participants are automatically entered into our weekly bonus jackpot and could win 20%, 50% or 100% of the allocated cash prize.</p>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center gap-1">
                View Article
                <ArrowRight size={14} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Request Support Form */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Submit an Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <Input id="userName" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">User Email</Label>
                <Input id="userEmail" type="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDescription">Description</Label>
              <Textarea id="issueDescription" placeholder="For bugs, suggestions, feedback, and other problems you encounter." rows={4} />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
}