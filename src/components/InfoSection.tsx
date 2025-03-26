
import React from "react";
import { Button } from "@/components/ui/button";

const InfoSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-mushroom-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <h2 className="heading-lg mb-4">Identifying Mushrooms Safely</h2>
          <p className="body-md text-muted-foreground">
            Our AI-powered tool helps you identify mushrooms, but always follow these safety guidelines
            when foraging for wild mushrooms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            title="AI Analysis"
            description="Our advanced image recognition system can identify thousands of mushroom species with high accuracy."
            icon={
              <div className="rounded-full bg-gradient-to-br from-mushroom-300 to-mushroom-400 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
                  <path d="m8 16 2 2 4-4" />
                </svg>
              </div>
            }
          />
          <FeatureCard
            title="Expert Verification"
            description="Always verify identification with multiple sources including field guides and expert opinion."
            icon={
              <div className="rounded-full bg-gradient-to-br from-nature-300 to-nature-400 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            }
          />
          <FeatureCard
            title="Safety First"
            description="Never consume wild mushrooms without absolute certainty about their identity and edibility."
            icon={
              <div className="rounded-full bg-gradient-to-br from-red-400 to-red-500 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            }
          />
        </div>

        <div className="flex justify-center">
          <div className="glass-panel rounded-2xl p-8 max-w-3xl mx-auto text-center animate-fade-in">
            <h3 className="heading-md mb-4">Ready to safely identify your mushrooms?</h3>
            <p className="body-md text-muted-foreground mb-6">
              Upload a photo and get instant AI-powered identification to help determine if your mushroom is edible or toxic.
            </p>
            <Button
              className="rounded-full bg-mushroom-500 hover:bg-mushroom-600 text-white px-8"
              onClick={() => {
                const uploaderElement = document.getElementById("image-uploader");
                if (uploaderElement) {
                  uploaderElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 hover:shadow-md transition-all duration-300 animate-fade-up">
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left md:items-center md:text-center gap-4">
        <div className="mb-2">{icon}</div>
        <h3 className="heading-sm text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default InfoSection;
