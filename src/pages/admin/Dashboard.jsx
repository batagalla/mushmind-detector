
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Settings, Database } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const adminMenuItems = [
    {
      title: "Manage Users",
      description: "View and manage application users",
      icon: <Users className="h-6 w-6" />,
      path: "/admin/users",
      color: "bg-blue-500",
    },
    {
      title: "Review Feedback",
      description: "Manage user feedback and suggestions",
      icon: <MessageSquare className="h-6 w-6" />,
      path: "/admin/feedback",
      color: "bg-purple-500",
    },
    {
      title: "AI Model Settings",
      description: "Update and configure the AI model",
      icon: <Database className="h-6 w-6" />,
      path: "/admin/model",
      color: "bg-amber-500",
    },
    {
      title: "System Settings",
      description: "Manage application settings and configurations",
      icon: <Settings className="h-6 w-6" />,
      path: "/admin/settings",
      color: "bg-green-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-mushroom-600">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user.name}. Manage and oversee all aspects of the MushroomID platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {adminMenuItems.map((item) => (
          <Card 
            key={item.title} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(item.path)}
          >
            <CardHeader className="pb-2 space-y-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                <div className={`${item.color} p-2 rounded-md text-white`}>
                  {item.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System activity for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-sm">New Users</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-sm">Identifications</span>
                  <span className="font-medium">247</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-sm">Feedback Received</span>
                  <span className="font-medium">18</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm">Error Reports</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current platform performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-sm">API Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Operational</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-sm">AI Model</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Running</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between">
                  <span className="text-sm">Database</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm">Storage Usage</span>
                  <span className="font-medium">42%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
