
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, Camera } from "lucide-react";

interface ImageUploadProps {
  onImageSelected: (imageData: string | ArrayBuffer | null) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setPreviewUrl(result as string);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="image-uploader" className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-mushroom-50">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-10 animate-fade-up">
          <h2 className="heading-lg">Upload a Mushroom Photo</h2>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">
            For the most accurate identification, upload a clear photo of the entire mushroom, including the cap, stem, and base.
          </p>
        </div>

        <div className="mt-8 animate-fade-in">
          <div
            className={`
              relative rounded-2xl border-2 border-dashed p-8 transition-all duration-300 
              ${dragActive ? "border-mushroom-400 bg-mushroom-50" : "border-mushroom-200"} 
              ${previewUrl ? "bg-white" : "bg-mushroom-50/50"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
              disabled={isLoading}
            />

            {previewUrl ? (
              <div className="space-y-6">
                <div className="relative w-full max-h-[500px] overflow-hidden rounded-xl subtle-shadow">
                  <img
                    src={previewUrl}
                    alt="Mushroom preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={removeImage}
                    disabled={isLoading}
                    className="rounded-full border-mushroom-300 text-mushroom-600 hover:bg-mushroom-100"
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={triggerFileInput}
                    disabled={isLoading}
                    className="rounded-full bg-mushroom-500 hover:bg-mushroom-600 text-white"
                  >
                    Choose Another
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 py-10">
                <div className="rounded-full bg-mushroom-100 p-4">
                  <Upload className="h-10 w-10 text-mushroom-500" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="heading-sm text-gray-700">Drag & drop or click to upload</h3>
                  <p className="body-sm text-muted-foreground">
                    Supports JPG, PNG or WebP (max 10MB)
                  </p>
                </div>
                <Button
                  onClick={triggerFileInput}
                  disabled={isLoading}
                  className="rounded-full bg-mushroom-500 hover:bg-mushroom-600 text-white mt-4"
                >
                  Select File
                </Button>
                <div className="mt-2 flex items-center">
                  <div className="h-px bg-mushroom-200 w-20"></div>
                  <p className="px-3 text-sm text-muted-foreground">or</p>
                  <div className="h-px bg-mushroom-200 w-20"></div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-mushroom-300 text-mushroom-600 hover:bg-mushroom-100"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="mt-8 text-center">
              <Button
                disabled={isLoading}
                className="rounded-full bg-mushroom-500 hover:bg-mushroom-600 text-white px-8 py-6 h-auto subtle-shadow"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-mushroom-200 border-t-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <span className="text-lg font-medium">Identify Mushroom</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
