'use client';

import { Bell, ChevronDown, Menu, User, CreditCard, Trophy, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { cn } from '@/lib/utils';
import { useLocation } from '@/lib/navigation';
import { NextLink } from '@/components/ui/NextLink';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { loadBusinessCards } from '@/utils/cardStorage';
import { getFullName } from '@/utils/businessCard';
import { loadUserData, hasUserAccount } from '@/utils/userStorage';
import { useState, useEffect } from 'react';
export function Navbar({
  collapsed,
  setMobileOpen
}: {
  collapsed: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const location = useLocation();
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  // User data state
  const [userDisplayName, setUserDisplayName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [userInitials, setUserInitials] = useState('U');

  // Load user data on component mount
  useEffect(() => {
    const loadUserInfo = () => {
      if (hasUserAccount()) {
        const userData = loadUserData();
        if (userData) {
          setUserDisplayName(userData.firstName);
          setUserEmail(userData.email);
          setUserInitials(userData.firstName.charAt(0).toUpperCase());
        }
      } else {
        // Fallback to business card data if no user account
        const cards = loadBusinessCards();
        if (cards.length > 0) {
          const firstCard = cards[0];
          const fullName = getFullName(firstCard);
          setUserDisplayName(fullName);
          setUserEmail(firstCard.business?.email || 'user@example.com');
          setUserInitials(firstCard.profile.firstName.charAt(0).toUpperCase() + (firstCard.profile.lastName?.charAt(0).toUpperCase() || ''));
        }
      }
    };

    loadUserInfo();
  }, []);

  // Page title mapping
  const getPageTitle = () => {
    if (path === "/dashboard" || path === "/dashboard/") return "Dashboard";
    if (path === "/dashboard/cards") return "Cards";
    if (path === "/dashboard/settings") return "Settings";
    if (path === "/dashboard/referrals") return "Referrals";
    if (path === "/dashboard/contacts") return "Contacts";
    if (path === "/dashboard/earnings") return "Earnings";
    if (path === "/dashboard/accessories") return "Accessories";
    if (path === "/dashboard/support") return "Support";
    if (path === "/dashboard/systems") return "Systems";
    if (path === "/dashboard/get-started") return "Create Business Card";
    return "Dashboard";
  };

  // Check if we're on a card details page
  const isCardDetailsPage = path.startsWith('/dashboard/cards/');
  const cardId = isCardDetailsPage ? path.split('/').pop() : null;
  
  // Get card info for breadcrumb
  const getCardInfo = () => {
    if (!cardId) return null;
    const cards = loadBusinessCards();
    return cards.find(c => c.metadata.id === cardId);
  };
  
  const cardInfo = isCardDetailsPage ? getCardInfo() : null;

  // Breadcrumb logic for Settings page
  const getSettingsSubpage = () => {
    if (tab === "subscriptions") return "Subscriptions";
    if (tab === "appearance") return "Appearance";
    if (tab === "notifications") return "Notifications";
    return "Account";
  };
  const isSettingsPage = path === "/dashboard/settings";
  const pageTitle = getPageTitle();
  return <header className={cn("h-[80px] border-b fixed top-0 right-0 z-20 flex items-center px-4 md:px-6 transition-all duration-300 left-0 md:left-auto", collapsed ? "md:left-20" : "md:left-64", "bg-sidebar text-sidebar-foreground md:bg-white md:text-foreground")}>
      <div className="flex items-center gap-2 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        {isSettingsPage ? (
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="font-semibold">
                  <NextLink to="/dashboard/settings">Settings</NextLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="px-0 py-0" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">{getSettingsSubpage()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : isCardDetailsPage && cardInfo ? (
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="font-semibold">
                  <NextLink to="/dashboard/cards">Cards</NextLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="px-0 py-0" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">{cardInfo.urlName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto h-[48px]"> {/* Added explicit height with 20% increase */}
        <ModeToggle />

        <Button variant="ghost" size="icon" className="relative hidden sm:flex h-full" /* Made button inherit full height */>
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 border border-border rounded-md p-1 sm:p-2 h-full" /* Made button inherit full height */>
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{userDisplayName}</span>
                <span className="text-xs text-muted-foreground">{userEmail}</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-0 md:ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full min-w-[200px]">
            <DropdownMenuItem asChild>
              <NextLink to="/dashboard/settings" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </NextLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NextLink to="/dashboard/settings?tab=subscriptions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Subscriptions
              </NextLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NextLink to="/pricing" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Upgrade to PRO
              </NextLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
}
