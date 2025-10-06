import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Home, Plus, Search, User, LogOut } from "lucide-react";
import { mockUsers } from "@/lib/mockData";
import { set } from "date-fns";
import { fetchLoggedInUser } from "@/lib/api";
import type { User as UserType } from "@/lib/mockData";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  useEffect(() => {
    // Fetch current user info if signed in
    const fetchCurrentUser = async () => {
      try {
        if (!isSignedIn) {
          setCurrentUser(null);
          setLoading(false);
          return;
        }
        const user = await fetchLoggedInUser();
        setCurrentUser(user);
      } catch {
        setIsSignedIn(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [isSignedIn]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/browse", label: "Browse Games", icon: Search },
    { href: "/host", label: "My Games", icon: Calendar },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-white font-bold">
              PP
            </div>
            <span className="hidden font-bold text-xl sm:inline-block">
              Play Plus
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link to="/host/new">
                  <Button className="hidden sm:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    Host Game
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-accent">
                    3
                  </Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={""} alt={currentUser?.username} />
                        <AvatarFallback>
                          {currentUser ? currentUser.name.split(" ").map((n) => n[0]).join("") : ""}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{currentUser ? currentUser.name : ""}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser ? currentUser.email : ""}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile?tab=requests" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        My Requests
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button>Log In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
