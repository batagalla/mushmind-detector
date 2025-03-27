
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, History, MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Navbar = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    if (auth) {
      auth.logout();
      navigate('/');
    }
    setShowLogoutConfirm(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdmin = auth?.user?.role === "admin";

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-mushroom-600">MushroomID</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`text-base font-medium ${
                isActive("/") ? "text-mushroom-600" : "text-gray-700 hover:text-mushroom-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/feedback"
              className={`text-base font-medium ${
                isActive("/feedback") ? "text-mushroom-600" : "text-gray-700 hover:text-mushroom-500"
              }`}
            >
              Feedback
            </Link>
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className={`text-base font-medium ${
                  location.pathname.startsWith("/admin")
                    ? "text-mushroom-600"
                    : "text-gray-700 hover:text-mushroom-500"
                }`}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* User menu */}
          <div className="flex items-center">
            {auth?.user ? (
              <div className="hidden md:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-mushroom-100 text-mushroom-600 font-bold">
                      {auth.user.name.charAt(0).toUpperCase()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium">{auth.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/recent-searches")}>
                      <History className="mr-2 h-4 w-4" />
                      <span>Recent Searches</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/feedback")}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Feedback</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:block">
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-mushroom-500 hover:bg-mushroom-600 text-white"
                >
                  Log In
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col h-full">
                    <div className="space-y-4 py-4">
                      <div className="px-4 pb-4 border-b border-gray-100">
                        {auth?.user ? (
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-mushroom-100 flex items-center justify-center text-mushroom-600 font-bold">
                              {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{auth.user.name}</p>
                              <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center mb-4">
                            <Button
                              onClick={() => navigate("/auth")}
                              className="w-full bg-mushroom-500 hover:bg-mushroom-600 text-white"
                            >
                              Log In
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <nav className="space-y-2 px-4">
                        <Link
                          to="/"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Home
                        </Link>
                        <Link
                          to="/feedback"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Feedback
                        </Link>
                        {auth?.user && (
                          <>
                            <Link
                              to="/profile"
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                            <Link
                              to="/recent-searches"
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                              Recent Searches
                            </Link>
                          </>
                        )}
                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                      </nav>
                    </div>
                    
                    {auth?.user && (
                      <div className="mt-auto px-4 py-2 border-t">
                        <Button
                          onClick={handleLogout}
                          variant="ghost"
                          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Navbar;
