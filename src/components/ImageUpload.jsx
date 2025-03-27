
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { imageAPI } from "@/services/api";
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

const ImageUpload = ({ onImageSelected, isLoading, onIdentify }) => {
  const { user, isAuthenticated } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    
    // Validate file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file (JPEG, PNG, etc.)");
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    // If not authenticated, show preview without uploading
    if (!isAuthenticated) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        onImageSelected(e.target.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    
    // If authenticated, prepare for upload
    setSelectedFile(file);
    setShowUploadConfirm(true);
  };

  const confirmUpload = async () => {
    if (!selectedFile || !isAuthenticated) return;

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Generate preview for immediate display
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);

      // Upload to server
      const response = await imageAPI.uploadImage(formData);
      
      if (response.data.success) {
        setUploadedImage(response.data.image);
        onImageSelected(response.data.image);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setShowUploadConfirm(false);
      setSelectedFile(null);
    }
  };

  const handleCameraCapture = () => {
    // Simple check if camera is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Camera access is not supported by your browser");
      return;
    }
    
    // Create file input and click it
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'environment';
    fileInput.onchange = (e) => handleFileChange(e);
    fileInput.click();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setUploadedImage(null);
    onImageSelected(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <section id="image-uploader" className="w-full py-16 bg-white">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="heading-lg mb-3">Upload a Mushroom Photo</h2>
          <p className="body-md text-muted-foreground max-w-lg mx-auto">
            Take a clear photo of the mushroom you want to identify. For best results, ensure good lighting and include the cap, stem, and gills if possible.
          </p>
          
          {!isAuthenticated && (
            <p className="text-amber-600 mt-4 text-sm">
              You're not logged in. You can upload and identify mushrooms, but your results won't be saved.
              <br />
              <a href="/auth" className="underline font-medium">
                Log in or register
              </a> to save your identification history.
            </p>
          )}
        </div>

        <div 
          className={`
            border-2 border-dashed rounded-xl p-6 transition-all duration-200
            ${dragActive ? 'border-mushroom-500 bg-mushroom-50' : 'border-gray-300 hover:border-mushroom-400'}
            ${imagePreview ? 'bg-gray-50' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleFileDrop}
        >
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="mb-4 rounded-full bg-mushroom-100 p-3">
                <Upload className="h-6 w-6 text-mushroom-600" />
              </div>
              <p className="mb-2 text-sm font-medium">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mb-6">
                Supports: JPEG, PNG, GIF, WEBP (Max 5MB)
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload').click()}
                  className="text-sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCameraCapture}
                  className="text-sm"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative mb-4 max-w-md">
                <img
                  src={imagePreview}
                  alt="Mushroom to identify"
                  className="w-full rounded-lg max-h-[400px] object-contain"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Button 
                onClick={onIdentify}
                disabled={isLoading}
                className="bg-mushroom-500 hover:bg-mushroom-600 text-white min-w-[200px]"
              >
                {isLoading ? "Identifying..." : "Identify Mushroom"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Confirmation Dialog */}
      <AlertDialog open={showUploadConfirm} onOpenChange={setShowUploadConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Mushroom Image</AlertDialogTitle>
            <AlertDialogDescription>
              This image will be uploaded to our servers for identification. 
              Continue with upload?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUpload}>Upload</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ImageUpload;
