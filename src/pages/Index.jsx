
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ImageUpload from "@/components/ImageUpload";
import Results from "@/components/Results";
import InfoSection from "@/components/InfoSection";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { imageAPI } from "@/services/api";

const Index = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageSelected = (data) => {
    setImageData(data);
    // Reset results when new image is selected
    setResult(null);
    setShowResults(false);
  };

  const handleIdentify = async () => {
    if (!imageData) {
      toast.error("Please upload an image first");
      return;
    }

    setIsLoading(true);
    try {
      let identificationResult;
      
      // If user is authenticated and we have an uploaded image (not just a preview)
      if (auth?.isAuthenticated && typeof imageData === 'object' && imageData._id) {
        // Use actual API to classify the image
        const response = await imageAPI.classifyImage(imageData._id);
        identificationResult = response.data.result;
      } else {
        // Mock result for unauthenticated users or local preview
        // This would be replaced with an actual API call in production
        identificationResult = await mockIdentifyMushroom();
      }
      
      setResult(identificationResult);
      setShowResults(true);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        const resultsElement = document.getElementById("results-section");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      
    } catch (error) {
      console.error("Error identifying mushroom:", error);
      toast.error("Failed to identify mushroom. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function for mushroom identification when user is not authenticated
  const mockIdentifyMushroom = () => {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // For demo purposes, randomly decide if mushroom is safe
        const isSafe = Math.random() > 0.5;
        
        // Mock result object
        resolve({
          isSafe,
          classificationType: isSafe ? "Agaricus bisporus (Button Mushroom)" : "Amanita phalloides (Death Cap)",
          confidence: 0.85 + Math.random() * 0.1,
          description: isSafe 
            ? "The button mushroom is one of the most commonly cultivated mushrooms worldwide. It has a mild flavor and is safe to eat both raw and cooked."
            : "The death cap is one of the most poisonous mushrooms known. Consumption can lead to severe liver damage and can be fatal. It contains amatoxins that are not destroyed by cooking."
        });
      }, 2000);
    });
  };

  const resetIdentification = () => {
    setImageData(null);
    setResult(null);
    setShowResults(false);
    
    // Scroll to upload section
    const uploaderElement = document.getElementById("image-uploader");
    if (uploaderElement) {
      uploaderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeedbackSubmitted = () => {
    toast.success("Thank you for your feedback!");
  };

  return (
    <Layout>
      <Hero />
      <ImageUpload
        onImageSelected={handleImageSelected}
        isLoading={isLoading}
        onIdentify={handleIdentify}
      />
      <div id="results-section">
        <Results
          isVisible={showResults}
          result={result}
          onReset={resetIdentification}
        />
        
        {showResults && result && auth?.isAuthenticated && (
          <div className="max-w-3xl mx-auto px-4 mb-16">
            <FeedbackForm 
              mushroomType={result.classificationType} 
              imageId={imageData._id}
              onSubmit={handleFeedbackSubmitted}
            />
          </div>
        )}
      </div>
      <InfoSection />
    </Layout>
  );
};

export default Index;
