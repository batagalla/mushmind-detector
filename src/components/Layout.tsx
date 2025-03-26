
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 md:px-10 lg:px-16 glass-panel sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-mushroom-400 to-mushroom-300 flex items-center justify-center subtle-shadow transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-medium text-lg">M</span>
            </div>
            <span className="font-semibold text-lg text-foreground transition-colors duration-300 group-hover:text-mushroom-500">
              MushroomID
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink href="/" isActive={location.pathname === "/"}>Home</NavLink>
            <NavLink href="/feedback" isActive={location.pathname === "/feedback"}>Feedback</NavLink>
            
            {user && (
              <NavLink 
                href="/recent-searches" 
                isActive={location.pathname === "/recent-searches"}
              >
                Recent Searches
              </NavLink>
            )}
            
            {user && user.role === 'admin' && (
              <NavLink 
                href="/admin/dashboard" 
                isActive={location.pathname.startsWith("/admin")}
              >
                Admin
              </NavLink>
            )}
          </nav>
          
          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="group">
                  <div className="w-10 h-10 rounded-full bg-mushroom-100 flex items-center justify-center text-mushroom-500 group-hover:bg-mushroom-200 transition-colors">
                    <span className="font-medium">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-mushroom-500 hover:bg-mushroom-600 text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-mushroom-500"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink 
                href="/" 
                isActive={location.pathname === "/"} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <MobileNavLink 
                href="/feedback" 
                isActive={location.pathname === "/feedback"} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Feedback
              </MobileNavLink>
              
              {user && (
                <>
                  <MobileNavLink 
                    href="/recent-searches" 
                    isActive={location.pathname === "/recent-searches"} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Recent Searches
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/profile" 
                    isActive={location.pathname === "/profile"} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </MobileNavLink>
                  
                  {user.role === 'admin' && (
                    <MobileNavLink 
                      href="/admin/dashboard" 
                      isActive={location.pathname.startsWith("/admin")} 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </MobileNavLink>
                  )}
                  
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              )}
              
              {!user && (
                <MobileNavLink 
                  href="/auth" 
                  isActive={location.pathname === "/auth"} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In / Register
                </MobileNavLink>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="w-full py-8 px-6 md:px-10 lg:px-16 bg-mushroom-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="font-semibold text-lg text-mushroom-500">MushroomID</span>
              <p className="text-sm text-muted-foreground mt-1">
                Safe mushroom identification powered by AI
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/feedback">Feedback</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-mushroom-200">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} MushroomID. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode; isActive: boolean }> = ({
  href,
  children,
  isActive,
}) => {
  return (
    <Link
      to={href}
      className={`text-foreground hover:text-mushroom-500 transition-colors duration-200 font-medium ${
        isActive ? "text-mushroom-500" : ""
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<{ 
  href: string; 
  children: React.ReactNode; 
  isActive: boolean;
  onClick: () => void;
}> = ({
  href,
  children,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        isActive 
          ? "bg-mushroom-100 text-mushroom-500" 
          : "text-foreground hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <Link
      to={href}
      className="text-sm text-muted-foreground hover:text-mushroom-500 transition-colors duration-200"
    >
      {children}
    </Link>
  );
};

export default Layout;
