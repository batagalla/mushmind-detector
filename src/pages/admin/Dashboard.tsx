
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { mockFeedbacks } from "@/models/feedback";
import { Button } from "@/components/ui/button";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  // Get stats for dashboard
  const pendingFeedbacks = mockFeedbacks.filter(f => f.status === 'pending').length;
  const totalUsers = 10; // Mocked for demo
  const totalSearches = 45; // Mocked for demo
  const modelAccuracy = 87; // Mocked for demo

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mushroom-600 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user.name}. Here's an overview of your system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Users"
            value={totalUsers.toString()}
            subtitle="Active accounts"
            color="bg-blue-500"
          />
          <DashboardCard
            title="Total Searches"
            value={totalSearches.toString()}
            subtitle="All time"
            color="bg-purple-500"
          />
          <DashboardCard
            title="Pending Feedback"
            value={pendingFeedbacks.toString()}
            subtitle="Needs review"
            color="bg-amber-500"
          />
          <DashboardCard
            title="Model Accuracy"
            value={`${modelAccuracy}%`}
            subtitle="Based on feedback"
            color="bg-green-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                <span className="text-sm text-gray-500">Today, 10:23 AM</span>
                <p className="font-medium">New user registered</p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                <span className="text-sm text-gray-500">Yesterday, 3:45 PM</span>
                <p className="font-medium">5 new mushroom identifications</p>
              </div>
              <div className="p-3 border-l-4 border-amber-500 bg-amber-50 rounded">
                <span className="text-sm text-gray-500">Yesterday, 11:32 AM</span>
                <p className="font-medium">New feedback submitted</p>
              </div>
              <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded">
                <span className="text-sm text-gray-500">2 days ago</span>
                <p className="font-medium">AI model training completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-mushroom-500 hover:bg-mushroom-600"
                onClick={() => navigate('/admin/users')}
              >
                Manage Users
              </Button>
              <Button 
                className="w-full justify-start bg-mushroom-500 hover:bg-mushroom-600"
                onClick={() => navigate('/admin/feedback')}
              >
                Review Feedback
              </Button>
              <Button 
                className="w-full justify-start bg-mushroom-500 hover:bg-mushroom-600"
                onClick={() => navigate('/admin/model')}
              >
                AI Model Settings
              </Button>
              <Button 
                className="w-full justify-start bg-mushroom-500 hover:bg-mushroom-600"
                onClick={() => navigate('/admin/settings')}
              >
                System Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Dashboard card component
interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, subtitle, color }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      <div className="p-6">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
