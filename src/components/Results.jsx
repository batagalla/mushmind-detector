
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check } from "lucide-react";

const Results = ({ isVisible, result, onReset }) => {
  if (!isVisible || !result) return null;

  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div
          className={`
            rounded-3xl overflow-hidden shadow-xl transition-all duration-500 transform
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
          `}
        >
          <div className="relative">
            <div
              className={`absolute inset-0 ${
                result.isSafe
                  ? "bg-gradient-to-r from-nature-400/90 to-nature-500/90"
                  : "bg-gradient-to-r from-red-500/90 to-red-600/90"
              }`}
            ></div>

            <div className="relative px-8 py-10 flex flex-col items-center text-white">
              <div
                className={`rounded-full p-4 mb-4 ${
                  result.isSafe
                    ? "bg-nature-100 text-nature-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {result.isSafe ? (
                  <Check className="h-8 w-8" />
                ) : (
                  <AlertTriangle className="h-8 w-8" />
                )}
              </div>
              <h2 className="heading-lg text-white text-center">
                {result.isSafe ? "Edible Mushroom" : "Potentially Toxic"}
              </h2>
              <p className="mt-2 text-white/80 text-center max-w-md">
                {result.isSafe
                  ? "This appears to be safe for consumption, but always verify with multiple sources."
                  : "This mushroom may be poisonous. Do NOT consume based solely on this identification."}
              </p>
            </div>
          </div>

          <div className="bg-white px-8 py-10">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-mushroom-100">
                <div>
                  <p className="text-sm text-muted-foreground">Identified as</p>
                  <h3 className="heading-md text-mushroom-600">{result.mushroomType}</h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-mushroom-50 border border-mushroom-100">
                  <p className="text-sm font-medium text-mushroom-600">
                    {confidencePercent}% confidence
                  </p>
                </div>
              </div>

              <div>
                <h4 className="heading-sm mb-3">About this mushroom</h4>
                <p className="body-md text-muted-foreground">{result.description}</p>
              </div>

              <div className="rounded-xl bg-red-50 p-6 border border-red-100">
                <h4 className="heading-sm text-red-600 mb-2">Important Disclaimer</h4>
                <p className="body-sm text-red-700">
                  This is an AI-based identification and should not be your only source for determining edibility. 
                  Always consult multiple expert sources and field guides before consuming any wild mushroom.
                  When in doubt, throw it out.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <Button
                  onClick={onReset}
                  className="rounded-full bg-mushroom-500 hover:bg-mushroom-600 text-white px-8"
                >
                  Identify Another
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-mushroom-300 text-mushroom-600 hover:bg-mushroom-100 px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
