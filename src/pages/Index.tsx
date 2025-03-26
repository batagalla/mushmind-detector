
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ImageUpload from "@/components/ImageUpload";
import Results from "@/components/Results";
import InfoSection from "@/components/InfoSection";
import { toast } from "sonner";

// Mock function for mushroom identification
// This would be replaced with actual API call to your backend
const identifyMushroom = async (imageData: string): Promise<any> => {
  // Simulating API call
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // For demo purposes, randomly decide if mushroom is safe
      const isSafe = Math.random() > 0.5;
      
      // Mock result object
      resolve({
        isSafe,
        mushroomType: isSafe ? "Agaricus bisporus (Button Mushroom)" : "Amanita phalloides (Death Cap)",
        confidence: 0.85 + Math.random() * 0.1,
        description: isSafe 
          ? "The button mushroom is one of the most commonly cultivated mushrooms worldwide. It has a mild flavor and is safe to eat both raw and cooked."
          : "The death cap is one of the most poisonous mushrooms known. Consumption can lead to severe liver damage and can be fatal. It contains amatoxins that are not destroyed by cooking."
      });
    }, 2000);
  });
};

const Index: React.FC = () => {
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageSelected = (data: string | ArrayBuffer | null) => {
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
      const identificationResult = await identifyMushroom(imageData as string);
      setResult(identificationResult);
      setShowResults(true);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
      
    } catch (error) {
      console.error("Error identifying mushroom:", error);
      toast.error("Failed to identify mushroom. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  return (
    <Layout>
      <Hero />
      <ImageUpload
        onImageSelected={handleImageSelected}
        isLoading={isLoading}
      />
      {imageData && !isLoading && !result && (
        <div className="w-full py-6 flex justify-center">
          <button
            onClick={handleIdentify}
            className="rounded-full bg-mushroom-500 hover:bg-mushroom-600 text-white px-8 py-3 font-medium transition-all duration-300 hover:shadow-md"
          >
            Identify Mushroom
          </button>
        </div>
      )}
      <Results
        isVisible={showResults}
        result={result}
        onReset={resetIdentification}
      />
      <InfoSection />
    </Layout>
  );
};

export default Index;
