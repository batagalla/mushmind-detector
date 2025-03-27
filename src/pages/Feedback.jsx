
import React, { useState } from "react";
import Layout from "@/components/Layout";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { useAuth } from "@/context/AuthContext";
import { mockFeedbacks } from "@/models/feedback";
import { Button } from "@/components/ui/button";
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

const FeedbackPage = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Filter feedbacks based on current user
  const filteredFeedbacks = showOnlyMine && user
    ? feedbacks.filter(f => f.userId === user.id)
    : feedbacks;

  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (feedbackToDelete) {
      setFeedbacks(feedbacks.filter(f => f.id !== feedbackToDelete.id));
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mushroom-600 mb-4">Feedback</h1>
          <p className="text-gray-600">
            Help us improve our mushroom identification system by providing feedback.
            Your input is valuable for enhancing the accuracy of our AI model.
          </p>
        </div>
        
        <FeedbackForm />
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-mushroom-600">Community Feedback</h2>
            
            {user && (
              <Button
                variant="outline"
                onClick={() => setShowOnlyMine(!showOnlyMine)}
                className="text-sm"
              >
                {showOnlyMine ? "Show All Feedback" : "Show Only My Feedback"}
              </Button>
            )}
          </div>
          
          {filteredFeedbacks.length > 0 ? (
            <div className="space-y-6">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-mushroom-200 flex items-center justify-center text-mushroom-600 font-semibold">
                          {feedback.userName.charAt(0)}
                        </div>
                        <span className="font-medium">{feedback.userName}</span>
                      </div>
                      <p className="mt-2 text-gray-700">{feedback.message}</p>
                      
                      {feedback.mushroomType && (
                        <div className="mt-2 text-sm text-gray-500">
                          Mushroom: <span className="font-medium">{feedback.mushroomType}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="inline-flex items-center px-2 py-1 bg-mushroom-100 text-mushroom-600 rounded">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-lg ${i < feedback.rating ? "text-yellow-500" : "text-gray-300"}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                      {feedback.status === 'pending' && (
                        <div className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded mt-1 inline-block">
                          Pending review
                        </div>
                      )}
                      
                      {/* Allow users to delete their own feedback or admin to delete any */}
                      {(user && (user.id === feedback.userId || user.role === 'admin')) && (
                        <div className="mt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClick(feedback)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              {showOnlyMine ? "You haven't submitted any feedback yet." : "No feedback available yet."}
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this feedback? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default FeedbackPage;
