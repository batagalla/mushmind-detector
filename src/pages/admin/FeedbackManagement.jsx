
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { mockFeedbacks } from "@/models/feedback";
import { toast } from "sonner";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedbackToReview, setFeedbackToReview] = useState(null);
  const [showReviewConfirm, setShowReviewConfirm] = useState(false);

  // Filter feedbacks based on search term and status
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      (feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.mushroomType.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || feedback.status === statusFilter)
  );

  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (feedbackToDelete) {
      setFeedbacks(feedbacks.filter((f) => f.id !== feedbackToDelete.id));
      toast.success("Feedback deleted successfully");
      setShowDeleteConfirm(false);
    }
  };

  const handleReviewClick = (feedback) => {
    setFeedbackToReview(feedback);
    setShowReviewConfirm(true);
  };

  const confirmReview = () => {
    if (feedbackToReview) {
      const updatedFeedbacks = feedbacks.map((f) =>
        f.id === feedbackToReview.id ? { ...f, status: "reviewed" } : f
      );
      setFeedbacks(updatedFeedbacks);
      toast.success("Feedback marked as reviewed");
      setShowReviewConfirm(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-mushroom-600">Manage Feedback</h1>
        <p className="text-gray-600 mt-1">
          Review and manage user feedback submissions.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="pl-10 w-full"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              className="border rounded p-2 text-sm w-full sm:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Mushroom</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div className="font-medium">{feedback.userName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{feedback.message}</div>
                  </TableCell>
                  <TableCell>{feedback.mushroomType}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < feedback.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.status === "reviewed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {feedback.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {feedback.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-500"
                          onClick={() => handleReviewClick(feedback)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDeleteClick(feedback)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this feedback from{" "}
              <span className="font-semibold">{feedbackToDelete?.userName}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Review Confirmation Dialog */}
      <AlertDialog open={showReviewConfirm} onOpenChange={setShowReviewConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Reviewed</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this feedback as reviewed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReview}>
              Mark as Reviewed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default FeedbackManagement;
