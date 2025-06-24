import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Home, Dices, TrendingUp, Coins, Clock, MessageSquare, Gift, Crown, Settings, LogOut, Menu, X, User2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/game-utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import logo from "../../logo.png";

interface MainLayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ href, icon, label, onClick }: NavItemProps) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      onClick={onClick}
      aria-label={label}>
      {icon}
      {label}
    </Link>
  );
}

function BottomNavigation({
  mobilePrimaryNav,
  location,
  user,
  isAdmin,
  handleLogout,
}: {
  mobilePrimaryNav: NavItemProps[];
  location: string;
  user: { username?: string; balance?: number } | null;
  isAdmin: boolean;
  handleLogout: () => void;
}) {
  const gameItems = [
    {
      href: "/slots",
      label: "Slots",
      icon: <Dices size={24} className="mb-2" />,
    },
    {
      href: "/dice",
      label: "Dice",
      icon: <Dices size={24} className="mb-2" />,
    },
    {
      href: "/crash",
      label: "Crash",
      icon: <TrendingUp size={24} className="mb-2" />,
    },
    {
      href: "/roulette",
      label: "Roulette",
      icon: <Dices size={24} className="mb-2" />,
    },
    {
      href: "/blackjack",
      label: "Blackjack",
      icon: <Dices size={24} className="mb-2" />,
    },
    {
      href: "/plinko",
      label: "Plinko",
      icon: <Dices size={24} className="mb-2" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t py-3 px-4 md:hidden shadow-lg">
      <div className="flex justify-around items-center">
        {mobilePrimaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn("flex flex-col items-center px-3 py-2 rounded-md transition-colors", location === item.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground")}
            aria-label={item.label}>
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}

        <Sheet>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center px-3 py-2 rounded-md transition-colors",
                location.startsWith("/slots") ||
                  location.startsWith("/dice") ||
                  location.startsWith("/crash") ||
                  location.startsWith("/roulette") ||
                  location.startsWith("/blackjack") ||
                  location.startsWith("/plinko")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Games Menu">
              <Dices size={18} />
              <span className="text-xs mt-1 font-medium">Games</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[50vh] overflow-y-auto bg-background">
            <div className="grid grid-cols-3 gap-4 pt-4 px-4">
              {gameItems.map((game) => (
                <Link
                  key={game.href}
                  href={game.href}
                  className={cn("flex flex-col items-center p-3 rounded-md border hover:bg-muted transition-colors", location === game.href ? "bg-muted text-primary" : "")}
                  aria-label={game.label}>
                  {game.icon}
                  <span className="text-sm font-medium">{game.label}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center px-3 py-2 rounded-md transition-colors",
                location === "/history" || location === "/subscriptions" || location === "/support" || location === "/admin"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Account Menu">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-xs">{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1 font-medium">Account</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{user?.username || "Guest"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/history" className="flex items-center w-full">
                <Clock size={16} className="mr-2" />
                History
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link href="/subscriptions" className="flex items-center w-full">
                <Crown size={16} className="mr-2" />
                VIP
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Link href="/support" className="flex items-center w-full">
                <MessageSquare size={16} className="mr-2" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center w-full">
                <User2 size={16} className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin" className="flex items-center w-full">
                  <Settings size={16} className="mr-2" />
                  Admin
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center">
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, logoutMutation } = useAuth();
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const isAdmin = user?.isAdmin || user?.isOwner;

  const navigationItems = [
    { href: "/home", icon: <Home size={18} />, label: "Home" },
    // { href: "/slots", icon: <Dices size={18} />, label: "Slots" },
    // { href: "/dice", icon: <Dices size={18} />, label: "Dice" },
    // { href: "/crash", icon: <TrendingUp size={18} />, label: "Crash" },
    // { href: "/roulette", icon: <Dices size={18} />, label: "Roulette" },
    // { href: "/blackjack", icon: <Dices size={18} />, label: "Blackjack" },
    // { href: "/plinko", icon: <Dices size={18} />, label: "Plinko" },
    { href: "/purchase", icon: <Coins size={18} />, label: "Buy Coins" },
    { href: "/history", icon: <Clock size={18} />, label: "History" },
    // { href: "/subscriptions", icon: <Crown size={18} />, label: "VIP" },
    { href: "/profile", icon: <User2 size={18} />, label: "Profile" },
    { href: "/support", icon: <MessageSquare size={18} />, label: "Support" },
  ];

  const mobilePrimaryNav = [
    { href: "/home", icon: <Home size={18} />, label: "Home" },
    { href: "/purchase", icon: <Coins size={18} />, label: "Buy" },
    // { href: "/rewards", icon: <Gift size={18} />, label: "Rewards" },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBanner />

      {/* Mobile Layout */}
      {isMobile && (
        <>
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <img className="w-24 xl:w-28" src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="flex items-center gap-2">
                {user && <div className="text-sm font-medium">{formatCurrency(user.balance)}</div>}
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open Menu">
                      <Menu size={20} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between py-2">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} aria-label="Close Menu">
                          <X size={18} />
                        </Button>
                      </div>
                      {user && (
                        <div className="border rounded-md p-3 mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.username}</div>
                              <div className="text-sm text-muted-foreground">Balance: {formatCurrency(user.balance)}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      <nav className="flex-1 overflow-auto py-2">
                        <div className="flex flex-col gap-1">
                          {navigationItems.map((item) => (
                            <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} onClick={() => setSidebarOpen(false)} />
                          ))}
                          {isAdmin && <NavItem href="/admin" icon={<Settings size={18} />} label="Admin" onClick={() => setSidebarOpen(false)} />}
                        </div>
                      </nav>
                      <div className="py-4 border-t">
                        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                          <LogOut size={18} className="mr-2" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          <BottomNavigation mobilePrimaryNav={mobilePrimaryNav} location={location} user={user} isAdmin={isAdmin} handleLogout={handleLogout} />
          <main className="flex-1 p-4 pb-20">{children}</main>
        </>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex-1 flex">
          <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 border-r bg-background">
            <div className="flex h-14 items-center border-b px-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <img className="w-24 xl:w-28" src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-0 pt-3 px-2">
              <nav className="flex-1 flex flex-col gap-1">
                {navigationItems.map((item) => (
                  <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
                ))}
                {isAdmin && <NavItem href="/admin" icon={<Settings size={18} />} label="Admin" />}
              </nav>
              {user && (
                <div className="border-t py-4 mt-auto">
                  <div className="flex items-center justify-between mb-4 px-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{user.username}</div>
                        {/* <div className="text-xs text-muted-foreground">{user.subscriptionTier ? `VIP ${user.subscriptionTier}` : "Free User"}</div> */}
                      </div>
                    </div>
                    <div className="text-xs font-medium">{formatCurrency(user.balance)}</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </aside>
          <div className="flex-1 lg:pl-64">
            <header className="sticky top-0 z-40 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center px-4">
                <Link href="/" className="lg:hidden flex items-center space-x-2">
                  <span className="font-bold text-xl">99wiwi</span>
                </Link>
                <div className="ml-auto flex items-center gap-2">{user && <div className="text-sm font-medium">{formatCurrency(user.balance)}</div>}</div>
              </div>
            </header>
            <main className="flex-1 p-4 lg:p-6">{children}</main>
          </div>
        </div>
      )}
    </div>
  );
}
