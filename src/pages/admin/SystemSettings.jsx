
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";

const SystemSettingsPage = () => {
  // General settings
  const [siteName, setSiteName] = useState("MushroomID");
  const [siteDescription, setSiteDescription] = useState(
    "AI-powered mushroom identification application"
  );
  const [contactEmail, setContactEmail] = useState("support@mushroomid.com");
  
  // Notification settings
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true);
  const [enableAdminAlerts, setEnableAdminAlerts] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState(
    "Hello {user}, Thank you for using MushroomID. {message}"
  );
  
  // Privacy settings
  const [dataRetentionDays, setDataRetentionDays] = useState(90);
  const [collectAnalytics, setCollectAnalytics] = useState(true);
  const [publicProfiles, setPublicProfiles] = useState(false);
  
  // Track changes
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [changesDetected, setChangesDetected] = useState(false);

  // Function to track changes
  const trackChanges = () => {
    setChangesDetected(true);
  };

  const handleSaveClick = () => {
    setShowSaveConfirm(true);
  };

  const confirmSave = () => {
    // Would save to backend in real implementation
    toast.success("System settings saved successfully");
    setChangesDetected(false);
    setShowSaveConfirm(false);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-mushroom-600">System Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure general system settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic configuration for the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Name</label>
                <Input
                  value={siteName}
                  onChange={(e) => {
                    setSiteName(e.target.value);
                    trackChanges();
                  }}
                  placeholder="Application Name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Description</label>
                <Textarea
                  value={siteDescription}
                  onChange={(e) => {
                    setSiteDescription(e.target.value);
                    trackChanges();
                  }}
                  placeholder="Brief description of the application"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => {
                    setContactEmail(e.target.value);
                    trackChanges();
                  }}
                  placeholder="support@example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-gray-500">
                    Send email notifications to users
                  </p>
                </div>
                <Switch 
                  checked={enableEmailNotifications} 
                  onCheckedChange={(checked) => {
                    setEnableEmailNotifications(checked);
                    trackChanges();
                  }} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Admin Alerts</p>
                  <p className="text-xs text-gray-500">
                    Send alerts to administrators for important events
                  </p>
                </div>
                <Switch 
                  checked={enableAdminAlerts} 
                  onCheckedChange={(checked) => {
                    setEnableAdminAlerts(checked);
                    trackChanges();
                  }} 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Template</label>
                <Textarea
                  value={emailTemplate}
                  onChange={(e) => {
                    setEmailTemplate(e.target.value);
                    trackChanges();
                  }}
                  placeholder="Email notification template"
                  rows={4}
                />
                <p className="text-xs text-gray-500">
                  Use placeholders like {"{user}"} and {"{message}"} in your template
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Configure data retention and privacy policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Retention Period (days)</label>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={dataRetentionDays}
                  onChange={(e) => {
                    setDataRetentionDays(parseInt(e.target.value));
                    trackChanges();
                  }}
                />
                <p className="text-xs text-gray-500">
                  Number of days to keep user data before automatic deletion
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Collect Analytics</p>
                  <p className="text-xs text-gray-500">
                    Collect anonymous usage data to improve the application
                  </p>
                </div>
                <Switch 
                  checked={collectAnalytics} 
                  onCheckedChange={(checked) => {
                    setCollectAnalytics(checked);
                    trackChanges();
                  }} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Public User Profiles</p>
                  <p className="text-xs text-gray-500">
                    Allow user profiles to be publicly viewable
                  </p>
                </div>
                <Switch 
                  checked={publicProfiles} 
                  onCheckedChange={(checked) => {
                    setPublicProfiles(checked);
                    trackChanges();
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSaveClick}
          className="bg-mushroom-500 hover:bg-mushroom-600"
          disabled={!changesDetected}
        >
          Save Changes
        </Button>
      </div>
      
      {/* Save Confirmation Dialog */}
      <AlertDialog open={showSaveConfirm} onOpenChange={setShowSaveConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save System Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to apply these changes to the system?
              Some changes may require a system restart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default SystemSettingsPage;
