
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToUploader = () => {
    const uploaderElement = document.getElementById("image-uploader");
    if (uploaderElement) {
      uploaderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-10 md:py-16 bg-gradient-to-b from-mushroom-50/50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 animate-fade-up">
            <div className="inline-block rounded-lg bg-mushroom-100 px-3 py-1 text-sm text-mushroom-600">
              AI-Powered Identification
            </div>
            <h1 className="heading-xl text-balance">
              <span className="text-mushroom-600">Identify</span> Mushrooms <br />
              with Confidence
            </h1>
            <p className="body-lg text-muted-foreground max-w-[600px]">
              Upload a photo and instantly discover whether a mushroom is safe to eat or potentially dangerous. Our advanced AI helps you forage with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={scrollToUploader}
                className="bg-mushroom-500 hover:bg-mushroom-600 text-white rounded-full px-8 h-12 transition-all duration-300 hover:shadow-md"
              >
                Upload Photo Now
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-nature-300/30 to-mushroom-300/30 backdrop-blur-sm shadow-xl transform rotate-3 scale-90"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-mushroom-200 to-mushroom-300 shadow-xl transform -rotate-2"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-full bg-mushroom-100 flex items-center justify-center p-8">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-mushroom-400/80 to-mushroom-500/90 flex items-center justify-center">
                    <span className="text-white heading-lg">Safe or Toxic?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
