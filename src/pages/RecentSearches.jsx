
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { mockSearchHistory } from "@/models/search";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const RecentSearches = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [showReidentifyConfirm, setShowReidentifyConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Simulate fetching data from API
    setSearchHistory(mockSearchHistory.filter(item => item.userId === user.id));
  }, [user, navigate]);

  const handleReidentifyClick = (search) => {
    setSelectedSearch(search);
    setShowReidentifyConfirm(true);
  };
  
  const confirmReidentify = () => {
    // Navigate to home page to reidentify the mushroom
    navigate('/');
    setShowReidentifyConfirm(false);
  };

  const handleDeleteClick = (search) => {
    setSelectedSearch(search);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Delete the search history item
    setSearchHistory(searchHistory.filter(item => item.id !== selectedSearch.id));
    setShowDeleteConfirm(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mushroom-600 mb-4">Recent Searches</h1>
          <p className="text-gray-600">
            View your mushroom identification history.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {searchHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Mushroom Type</TableHead>
                    <TableHead>Safety</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={item.imageUrl}
                            alt={item.mushroomType}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.mushroomType}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.isSafe 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {item.isSafe ? "Safe" : "Toxic"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                item.isSafe ? "bg-green-500" : "bg-red-500"
                              }`}
                              style={{ width: `${item.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{Math.round(item.confidence * 100)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-mushroom-500"
                            onClick={() => handleReidentifyClick(item)}
                          >
                            Reidentify
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteClick(item)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>You haven't made any searches yet.</p>
              <Button 
                onClick={() => navigate('/')} 
                className="mt-4 bg-mushroom-500 hover:bg-mushroom-600 text-white"
              >
                Try Identifying a Mushroom
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Reidentify Confirmation Dialog */}
      <AlertDialog open={showReidentifyConfirm} onOpenChange={setShowReidentifyConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reidentify Mushroom</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSearch && (
                <span>
                  Would you like to reidentify this {selectedSearch.mushroomType}? This will take you to the identification page.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReidentify}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Search History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this search from your history? This action cannot be undone.
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

export default RecentSearches;
