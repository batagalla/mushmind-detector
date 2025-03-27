
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Database, Settings, LayoutDashboard } from "lucide-react";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is admin
  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="h-5 w-5 mr-2" />,
    },
    {
      name: "Feedback",
      path: "/admin/feedback",
      icon: <MessageSquare className="h-5 w-5 mr-2" />,
    },
    {
      name: "AI Model",
      path: "/admin/model",
      icon: <Database className="h-5 w-5 mr-2" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex">
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-mushroom-600">Admin Panel</h2>
          </div>
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? "bg-mushroom-100 text-mushroom-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-grow p-6">
          <div className="md:hidden mb-6 flex flex-wrap gap-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "outline"}
                className={isActive(item.path) ? "bg-mushroom-500" : ""}
                onClick={() => navigate(item.path)}
                size="sm"
              >
                {item.icon}
                <span className="sr-only md:not-sr-only">{item.name}</span>
              </Button>
            ))}
          </div>
          <main className="max-w-5xl mx-auto">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
