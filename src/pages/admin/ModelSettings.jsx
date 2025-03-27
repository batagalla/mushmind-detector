
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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

const ModelSettingsPage = () => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [modelVersion, setModelVersion] = useState("1.2.0");
  const [apiKey, setApiKey] = useState("sk_test_ajd83hd9sjad9h");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [changesDetected, setChangesDetected] = useState(false);

  // Function to track changes
  const trackChanges = () => {
    setChangesDetected(true);
  };

  const handleConfidenceChange = (value) => {
    setConfidenceThreshold(value[0]);
    trackChanges();
  };

  const handleAutoUpdateChange = (checked) => {
    setAutoUpdate(checked);
    trackChanges();
  };

  const handleModelVersionChange = (e) => {
    setModelVersion(e.target.value);
    trackChanges();
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    trackChanges();
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    // Reset to default values
    setConfidenceThreshold(0.7);
    setAutoUpdate(true);
    setModelVersion("1.2.0");
    setApiKey("sk_test_ajd83hd9sjad9h");
    setChangesDetected(false);
    toast.success("Model settings reset to defaults");
    setShowResetConfirm(false);
  };

  const handleSaveClick = () => {
    setShowSaveConfirm(true);
  };

  const confirmSave = () => {
    // Would save to backend in real implementation
    toast.success("AI model settings saved successfully");
    setChangesDetected(false);
    setShowSaveConfirm(false);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-mushroom-600">AI Model Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure and manage the AI identification model.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
            <CardDescription>
              Adjust settings to fine-tune the AI model performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">
                  Confidence Threshold
                </label>
                <span className="text-sm text-gray-500">
                  {Math.round(confidenceThreshold * 100)}%
                </span>
              </div>
              <Slider
                defaultValue={[confidenceThreshold]}
                max={1}
                step={0.01}
                value={[confidenceThreshold]}
                onValueChange={handleConfidenceChange}
              />
              <p className="text-xs text-gray-500">
                Minimum confidence level required for a positive identification
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto Update Model</label>
                <p className="text-xs text-gray-500">
                  Automatically update the model when new versions are available
                </p>
              </div>
              <Switch checked={autoUpdate} onCheckedChange={handleAutoUpdateChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Model Version</label>
              <Input
                value={modelVersion}
                onChange={handleModelVersionChange}
                placeholder="e.g., 1.2.0"
              />
              <p className="text-xs text-gray-500">
                Current version of the AI identification model
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                value={apiKey}
                onChange={handleApiKeyChange}
                type="password"
                placeholder="sk_test_xxxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-500">
                API key for external model service (if applicable)
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={handleResetClick}
                disabled={!changesDetected}
              >
                Reset to Default
              </Button>
              <Button 
                onClick={handleSaveClick}
                className="bg-mushroom-500 hover:bg-mushroom-600"
                disabled={!changesDetected}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Health</CardTitle>
            <CardDescription>
              Current status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium flex items-center">
                <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
                Operational
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Average Response Time</p>
              <p className="font-medium">1.2 seconds</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Accuracy Rate</p>
              <p className="font-medium">87%</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">2023-07-15</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Supported Species</p>
              <p className="font-medium">1,250+</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Default Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset all model settings to their default values? 
              This will discard all your changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Save Confirmation Dialog */}
      <AlertDialog open={showSaveConfirm} onOpenChange={setShowSaveConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Model Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to apply these changes to the AI model? 
              This may affect identification performance.
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

export default ModelSettingsPage;
