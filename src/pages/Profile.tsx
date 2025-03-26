
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render if not authenticated
  }

  const handleSaveProfile = () => {
    // Simulate saving profile (would connect to backend in real app)
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info("You have been logged out");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-mushroom-600">Your Profile</h1>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-mushroom-200 flex items-center justify-center text-mushroom-600 text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm bg-mushroom-100 text-mushroom-700 px-2 py-1 rounded mt-2 inline-block">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-mushroom-500"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                      disabled
                    />
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-mushroom-500 hover:bg-mushroom-600 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-500">Name</p>
                    <p className="col-span-2">{user.name}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-500">Email</p>
                    <p className="col-span-2">{user.email}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-500">Account Type</p>
                    <p className="col-span-2 capitalize">{user.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
