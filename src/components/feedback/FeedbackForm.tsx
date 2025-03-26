
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface FeedbackFormProps {
  imageId?: string;
  mushroomType?: string;
  onSubmit?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  imageId, 
  mushroomType,
  onSubmit 
}) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to submit feedback");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    // Mock submission - would connect to backend in a real app
    setTimeout(() => {
      toast.success("Feedback submitted successfully");
      setMessage("");
      setRating(5);
      setIsSubmitting(false);
      if (onSubmit) onSubmit();
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-medium mb-4 text-mushroom-600">Submit Feedback</h3>
      
      {mushroomType && (
        <div className="mb-4 p-3 bg-mushroom-50 rounded-md">
          <p className="text-sm text-gray-600">
            Providing feedback for: <span className="font-medium">{mushroomType}</span>
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts on the identification result..."
            className="w-full min-h-[100px]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  rating >= value 
                    ? "bg-mushroom-500 text-white" 
                    : "bg-gray-100 text-gray-400"
                }`}
                onClick={() => setRating(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        <Button
          type="submit"
          className="bg-mushroom-500 hover:bg-mushroom-600 text-white"
          disabled={isSubmitting || !user}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
        
        {!user && (
          <p className="text-sm text-amber-600 mt-2">
            Please log in to submit feedback
          </p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
