
import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
          <nav className="hidden md:flex space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/guide">Guide</NavLink>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button could go here */}
          </div>
        </div>
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

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <Link
      to={href}
      className="text-foreground hover:text-mushroom-500 transition-colors duration-200 font-medium"
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
