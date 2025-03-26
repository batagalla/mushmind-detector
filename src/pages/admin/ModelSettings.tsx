
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Brain, RefreshCcw, BarChart3, Database } from "lucide-react";

interface ModelSettings {
  confidenceThreshold: number;
  enableAutoLearning: boolean;
  datasetSize: number;
  lastTrainingDate: string;
  modelVersion: string;
  accuracyScore: number;
}

const ModelSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock model settings
  const [settings, setSettings] = useState<ModelSettings>({
    confidenceThreshold: 0.85,
    enableAutoLearning: true,
    datasetSize: 12500,
    lastTrainingDate: "2023-06-01T14:30:00Z",
    modelVersion: "v2.3.1",
    accuracyScore: 0.94
  });
  
  const [isTraining, setIsTraining] = useState(false);
  
  // Check if current user is admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      toast.error("You don't have permission to access this page");
    }
  }, [user, navigate]);

  const handleConfidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSettings({...settings, confidenceThreshold: value});
  };

  const handleToggleAutoLearning = () => {
    setSettings({...settings, enableAutoLearning: !settings.enableAutoLearning});
    toast.success(`Auto-learning ${!settings.enableAutoLearning ? 'enabled' : 'disabled'}`);
  };

  const handleStartTraining = () => {
    setIsTraining(true);
    toast.success("AI model training started");
    
    // Simulate training completion after 3 seconds
    setTimeout(() => {
      setIsTraining(false);
      setSettings({
        ...settings,
        lastTrainingDate: new Date().toISOString(),
        modelVersion: "v2.3.2",
        accuracyScore: 0.96
      });
      toast.success("AI model training completed successfully");
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mushroom-600 mb-2">AI Model Settings</h1>
          <p className="text-gray-600">
            Configure and monitor the mushroom identification AI model.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Model Configuration
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confidence Threshold: {settings.confidenceThreshold}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="0.99"
                    step="0.01"
                    value={settings.confidenceThreshold}
                    onChange={handleConfidenceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Less Strict (0.5)</span>
                    <span>More Strict (0.99)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Auto-Learning</h3>
                    <p className="text-xs text-gray-500">
                      Automatically learn from user feedback and corrections
                    </p>
                  </div>
                  <Button 
                    onClick={handleToggleAutoLearning}
                    variant={settings.enableAutoLearning ? "default" : "outline"}
                    className={settings.enableAutoLearning ? "bg-mushroom-500 hover:bg-mushroom-600" : ""}
                  >
                    {settings.enableAutoLearning ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Training</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button 
                      onClick={handleStartTraining}
                      disabled={isTraining}
                      className="bg-mushroom-500 hover:bg-mushroom-600"
                    >
                      {isTraining ? (
                        <>
                          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                          Training...
                        </>
                      ) : (
                        <>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Start Training
                        </>
                      )}
                    </Button>
                    
                    <div className="text-sm text-gray-600">
                      Last trained: <span className="font-medium">{formatDate(settings.lastTrainingDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Performance Metrics
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Accuracy</div>
                  <div className="text-2xl font-bold">{(settings.accuracyScore * 100).toFixed(1)}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${settings.accuracyScore * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">False Positives</div>
                  <div className="text-2xl font-bold">2.1%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: '2.1%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Average Confidence</div>
                  <div className="text-2xl font-bold">89.7%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: '89.7%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Species Coverage</div>
                  <div className="text-2xl font-bold">217</div>
                  <div className="text-xs text-gray-500">Out of 300 known species</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-mushroom-600 mb-4 flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Dataset Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Dataset Size</div>
                  <div className="text-2xl font-bold">{settings.datasetSize.toLocaleString()} images</div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">Species Distribution</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Agaricus bisporus</span>
                        <span>18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-mushroom-500 h-1.5 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Amanita muscaria</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-mushroom-500 h-1.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Cantharellus cibarius</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-mushroom-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Other species</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-mushroom-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">Data Quality</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 p-2 rounded">
                      <div className="text-xs text-green-700">High Quality</div>
                      <div className="text-lg font-semibold">72%</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                      <div className="text-xs text-yellow-700">Medium Quality</div>
                      <div className="text-lg font-semibold">23%</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <div className="text-xs text-red-700">Low Quality</div>
                      <div className="text-lg font-semibold">5%</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="text-xs text-blue-700">Augmented</div>
                      <div className="text-lg font-semibold">35%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-mushroom-600 mb-3">Model Information</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Current Version</div>
                  <div className="text-base font-medium">{settings.modelVersion}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Architecture</div>
                  <div className="text-base font-medium">ConvNeXT + Vision Transformer</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Parameters</div>
                  <div className="text-base font-medium">235M</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Inference Time</div>
                  <div className="text-base font-medium">0.8s average</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModelSettingsPage;
