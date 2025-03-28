
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress, 
  Alert 
} from '@mui/material';
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
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageSelected = (data) => {
    setImageData(data);
    // Reset results when new image is selected
    setResult(null);
    setError(null);
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
      if (isAuthenticated && typeof imageData === 'object' && imageData._id) {
        // Use actual API to classify the image
        const response = await imageAPI.classifyImage(imageData._id);
        identificationResult = response.data.result;
        
        // Save this search to the user's recent searches
        // This is handled by the server automatically when classifying
        console.log("Image classification saved to user history");
      } else {
        // Mock result for unauthenticated users or local preview
        identificationResult = await mockIdentifyMushroom();
        
        if (isAuthenticated && imageData) {
          // If authenticated but image is just a preview (not yet uploaded),
          // we need to upload it first
          try {
            const formData = new FormData();
            formData.append("image", imageData);
            const uploadResponse = await imageAPI.uploadImage(formData);
            const uploadedImage = uploadResponse.data.image;
            
            // Then classify the uploaded image
            const classifyResponse = await imageAPI.classifyImage(uploadedImage._id);
            identificationResult = classifyResponse.data.result;
          } catch (uploadError) {
            console.error("Error uploading and classifying image:", uploadError);
            // Continue with mock result if upload fails
          }
        }
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
      setError("Failed to identify mushroom. Please try again.");
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
    setError(null);
    setShowResults(false);
    
    // Scroll to upload section
    const uploaderElement = document.getElementById("image-uploader");
    if (uploaderElement) {
      uploaderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeedbackSubmitted = async () => {
    toast.success("Thank you for your feedback!");
    // You could refresh recent searches here if needed
  };

  return (
    <Layout>
      <Hero />
      <ImageUpload
        onImageSelected={handleImageSelected}
        isLoading={isLoading}
        onIdentify={handleIdentify}
      />
      
      {error && (
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      )}
      
      <div id="results-section">
        <Results
          isVisible={showResults}
          result={result}
          onReset={resetIdentification}
        />
        
        {showResults && result && isAuthenticated && (
          <Container maxWidth="md" sx={{ mb: 8 }}>
            <FeedbackForm 
              mushroomType={result.classificationType} 
              imageId={imageData._id}
              onSubmit={handleFeedbackSubmitted}
            />
          </Container>
        )}
      </div>
      <InfoSection />
    </Layout>
  );
};

export default Index;
