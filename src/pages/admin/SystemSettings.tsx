
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Settings, Shield, Bell, ExternalLink, 
  Database, HardDrive, CloudCog, Save
} from "lucide-react";

interface SystemSettingsState {
  imageSizeLimit: number;
  retentionPeriod: number;
  enableNotifications: boolean;
  enableAuditLogs: boolean;
  allowAccountDeletion: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  storageProvider: string;
}

const SystemSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock system settings
  const [settings, setSettings] = useState<SystemSettingsState>({
    imageSizeLimit: 10,
    retentionPeriod: 30,
    enableNotifications: true,
    enableAuditLogs: true,
    allowAccountDeletion: false,
    requireEmailVerification: true,
    maintenanceMode: false,
    storageProvider: "cloud"
  });
  
  // Check if current user is admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      toast.error("You don't have permission to access this page");
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would call an API to save settings
    toast.success("System settings saved successfully");
  };

  const toggleMaintenanceMode = () => {
    setSettings({
      ...settings,
      maintenanceMode: !settings.maintenanceMode
    });
    toast.success(`Maintenance mode ${!settings.maintenanceMode ? 'enabled' : 'disabled'}`);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mushroom-600 mb-2">System Settings</h1>
          <p className="text-gray-600">
            Configure global settings for the mushroom identification application.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                General Settings
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="imageSizeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Image Size (MB)
                    </label>
                    <input
                      id="imageSizeLimit"
                      name="imageSizeLimit"
                      type="number"
                      min="1"
                      max="50"
                      value={settings.imageSizeLimit}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-mushroom-500 focus:ring-mushroom-500 border p-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                      Data Retention Period (days)
                    </label>
                    <input
                      id="retentionPeriod"
                      name="retentionPeriod"
                      type="number"
                      min="1"
                      max="365"
                      value={settings.retentionPeriod}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-mushroom-500 focus:ring-mushroom-500 border p-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Maintenance Mode</h3>
                      <p className="text-xs text-gray-500">
                        When enabled, only administrators can access the system
                      </p>
                    </div>
                    <Button 
                      onClick={toggleMaintenanceMode}
                      variant={settings.maintenanceMode ? "default" : "outline"}
                      className={settings.maintenanceMode ? "bg-amber-500 hover:bg-amber-600" : ""}
                    >
                      {settings.maintenanceMode ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Storage Provider</h3>
                      <p className="text-xs text-gray-500">
                        Choose where to store uploaded images
                      </p>
                    </div>
                    <select
                      name="storageProvider"
                      value={settings.storageProvider}
                      onChange={handleSelectChange}
                      className="rounded-md border-gray-300 shadow-sm focus:border-mushroom-500 focus:ring-mushroom-500 border p-2"
                    >
                      <option value="local">Local Storage</option>
                      <option value="cloud">Cloud Storage</option>
                      <option value="hybrid">Hybrid (Local + Cloud)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Verification</h3>
                    <p className="text-xs text-gray-500">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mushroom-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mushroom-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Audit Logs</h3>
                    <p className="text-xs text-gray-500">
                      Keep detailed logs of all admin actions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableAuditLogs"
                      checked={settings.enableAuditLogs}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mushroom-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mushroom-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Account Deletion</h3>
                    <p className="text-xs text-gray-500">
                      Allow users to delete their accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowAccountDeletion"
                      checked={settings.allowAccountDeletion}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mushroom-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mushroom-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <p className="text-xs text-gray-500">
                      Send email notifications for important events
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableNotifications"
                      checked={settings.enableNotifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mushroom-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mushroom-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <CloudCog className="mr-2 h-5 w-5" />
                System Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">API Status</div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Operational
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">Database</div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Operational
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">Storage</div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Operational
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">Background Jobs</div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Operational
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast.info("System diagnostics run")}
                >
                  <HardDrive className="mr-2 h-4 w-4" />
                  Run Diagnostics
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Storage Usage
              </h2>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm text-gray-700">Images (13.2 GB)</div>
                    <div className="text-sm text-gray-500">82.5%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-mushroom-500 h-2 rounded-full" style={{ width: '82.5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm text-gray-700">Database (1.5 GB)</div>
                    <div className="text-sm text-gray-500">9.4%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '9.4%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm text-gray-700">Logs (1.3 GB)</div>
                    <div className="text-sm text-gray-500">8.1%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '8.1%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Total Used</div>
                    <div className="text-lg font-bold">16.0 GB</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-right">Available</div>
                    <div className="text-lg font-bold">9.0 GB</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-mushroom-600 mb-3">Quick Links</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Error Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  API Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Backup & Restore
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            className="bg-mushroom-500 hover:bg-mushroom-600"
          >
            <Save className="mr-2 h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SystemSettingsPage;
