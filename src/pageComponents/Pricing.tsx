'use client';

import { useState } from "react";
import { Check, Palette, Share2, Radio, Smartphone, QrCode, UserPlus, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started",
      features: [
        "Professional digital business card",
        "Basic contact sharing",
        "QR code generation",
        "Mobile responsive design",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: { monthly: 4.99, annual: 3.92 },
      description: "Everything you need to grow. \n Everyone gets 14-days Free! Pro Trial",
      features: [
        "Everything in Free",
        "Custom branding & colors",
        "Advanced analytics",
        "Lead capture forms",
        "Social media integration",
        "Custom domains",
        "Priority support",
        "Unlimited sharing"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Add 1 Pro Card",
      price: { monthly: 6.00, annual: 4.80 },
      description: "Additional professional card",
      features: [
        "All Pro features",
        "Additional team member",
        "Shared team analytics",
        "Team management tools",
        "Bulk contact export"
      ],
      cta: "Add Card",
      popular: false
    },
    {
      name: "Add 5 Pro Cards",
      price: { monthly: 24.50, annual: 19.60 },
      description: "Best for growing teams",
      features: [
        "All Pro features",
        "5 additional team members",
        "Advanced team analytics",
        "Team collaboration tools",
        "Bulk operations",
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Scale Team",
      popular: false
    }
  ];

  const benefits = [
    {
      title: "You control the design",
      description: "A user-friendly editing panel is provided for personalizing and branding a digital business card.",
      icon: "Palette"
    },
    {
      title: "Unlimited sharing",
      description: "There is no limit to how many times a digital business card can be shared.",
      icon: "Share2"
    },
    {
      title: "Up to date",
      description: "Any changes made to a digital business card will be updated in real time to all shared links.",
      icon: "Radio"
    },
    {
      title: "Completely app free",
      description: "No app is required to create, send or to receive a digital business card.",
      icon: "Smartphone"
    },
    {
      title: "Quick scanning",
      description: "Receive a QR Code for scanning with a smartphone's camera.",
      icon: "QrCode"
    },
    {
      title: "Save to contacts",
      description: "Your information can be directly 'saved to contacts.'",
      icon: "UserPlus"
    },
    {
      title: "Dedicated link",
      description: "Receive a dedicated sharable link to your business card.",
      icon: "Globe"
    },
    {
      title: "Personal support",
      description: "We are always here to help you, whenever you need us.",
      icon: "Users"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the best plan for your business
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everyone gets <span className="text-primary font-semibold">14-days Free! Pro Trial</span>. Start free and upgrade as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative hover:shadow-lg transition-shadow ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
                >
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span> 
                  <span className="text-muted-foreground">/month</span> 
                  {plan.price.monthly === 0 ? (
                    <div className="text-sm text-muted-foreground mt-1">
                      No credit card required
                     <div>No bill</div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-muted-foreground mt-1">
                        (${isAnnual ? (plan.price.annual * 12).toFixed(2) : (plan.price.monthly * 12).toFixed(2)}/year)
                        {isAnnual && (
                          <span className="text-green-600 ml-1">
                            [Save ${((plan.price.monthly * 12) - (plan.price.annual * 12)).toFixed(2)}]
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isAnnual ? "Billed annually" : "Billed monthly"}
                      </div>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why choose our digital business cards?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Modern networking made simple and professional
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = {
                Palette,
                Share2,
                Radio,
                Smartphone,
                QrCode,
                UserPlus,
                Globe,
                Users
              }[benefit.icon];

              return (
                <Card key={index} className="text-center p-6 bg-card hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to make your business card earn income?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of professionals already using digital business cards
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => window.location.href = '/opportunities'}
          >
            Earnings Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
