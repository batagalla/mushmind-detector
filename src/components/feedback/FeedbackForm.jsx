
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { feedbackAPI } from "@/services/api";
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

const FeedbackForm = ({ imageId, mushroomType, onSubmit }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit feedback");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!imageId) {
      toast.error("No image to provide feedback for");
      return;
    }

    setShowSubmitConfirm(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    setShowSubmitConfirm(false);

    try {
      const response = await feedbackAPI.submitFeedback({
        imageId,
        text: message,
        rating
      });
      
      if (response.data.success) {
        toast.success("Feedback submitted successfully");
        setMessage("");
        setRating(5);
        
        if (onSubmit) onSubmit();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
      
      <form onSubmit={handleSubmitClick} className="space-y-4">
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
      
      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your feedback? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FeedbackForm;
