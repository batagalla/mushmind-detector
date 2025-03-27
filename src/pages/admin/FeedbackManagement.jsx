
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, MessageSquare, Star } from "lucide-react";
import { mockFeedbacks } from "@/models/feedback";
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

const FeedbackManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [feedbackToUpdate, setFeedbackToUpdate] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  
  // Check if current user is admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      toast.error("You don't have permission to access this page");
    }
  }, [user, navigate]);

  const handleStatusToggleClick = (feedbackId) => {
    const feedback = feedbacks.find(f => f.id === feedbackId);
    setFeedbackToUpdate(feedback);
    setShowStatusDialog(true);
  };

  const confirmStatusToggle = () => {
    if (!feedbackToUpdate) return;
    
    setFeedbacks(prevFeedbacks => 
      prevFeedbacks.map(f => 
        f.id === feedbackToUpdate.id 
          ? {...f, status: f.status === 'pending' ? 'reviewed' : 'pending'}
          : f
      )
    );
    toast.success("Feedback status updated");
    setShowStatusDialog(false);
    setFeedbackToUpdate(null);
  };

  const handleDeleteClick = (feedbackId) => {
    const feedback = feedbacks.find(f => f.id === feedbackId);
    setFeedbackToDelete(feedback);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!feedbackToDelete) return;
    
    // In a real app, this would call an API
    setFeedbacks(prevFeedbacks => prevFeedbacks.filter(f => f.id !== feedbackToDelete.id));
    toast.success("Feedback deleted successfully");
    setShowDeleteDialog(false);
    setFeedbackToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mushroom-600 mb-2">Feedback Management</h1>
          <p className="text-gray-600">
            Review and manage user feedback to improve the identification system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-2 bg-green-500"></div>
            <div className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-gray-500 text-sm font-medium">Total Feedback</h3>
              </div>
              <p className="text-3xl font-bold mt-2">{feedbacks.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-2 bg-amber-500"></div>
            <div className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-amber-500 mr-2" />
                <h3 className="text-gray-500 text-sm font-medium">Pending Review</h3>
              </div>
              <p className="text-3xl font-bold mt-2">
                {feedbacks.filter(f => f.status === 'pending').length}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-2 bg-purple-500"></div>
            <div className="p-6">
              <div className="flex items-center">
                <Star className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-gray-500 text-sm font-medium">Average Rating</h3>
              </div>
              <p className="text-3xl font-bold mt-2">
                {(feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mushroom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feedbacks.map(feedback => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{feedback.userName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{feedback.mushroomType || 'Not specified'}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{feedback.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          feedback.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {feedback.status === 'pending' ? 'Pending' : 'Reviewed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(feedback.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`${feedback.status === 'pending' ? 'text-green-600 hover:text-green-900' : 'text-amber-600 hover:text-amber-900'}`}
                        onClick={() => handleStatusToggleClick(feedback.id)}
                      >
                        {feedback.status === 'pending' ? <Check className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClick(feedback.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this feedback?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this feedback from our system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFeedbackToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Feedback Status</AlertDialogTitle>
            <AlertDialogDescription>
              {feedbackToUpdate && (
                <span>
                  Are you sure you want to mark this feedback as{" "}
                  <strong>{feedbackToUpdate.status === "pending" ? "reviewed" : "pending"}</strong>?
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFeedbackToUpdate(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusToggle} className="bg-blue-600 text-white hover:bg-blue-700">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default FeedbackManagement;
