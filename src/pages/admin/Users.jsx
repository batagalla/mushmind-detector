
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Edit, Trash, UserCheck, UserX } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Mock user data
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2023-06-15T09:24:32Z' },
  { id: '2', name: 'Regular User', email: 'user@example.com', role: 'user', status: 'active', lastLogin: '2023-06-10T14:12:09Z' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2023-06-08T08:45:21Z' },
  { id: '4', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'inactive', lastLogin: '2023-05-20T16:30:45Z' },
  { id: '5', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active', lastLogin: '2023-06-12T11:09:18Z' }
];

const UsersManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  
  // Check if current user is admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      toast.error("You don't have permission to access this page");
    }
  }, [user, navigate]);

  const handleStatusToggle = (userId) => {
    const userToUpdate = users.find(u => u.id === userId);
    setUserToEdit(userToUpdate);
    setShowStatusDialog(true);
  };

  const confirmStatusToggle = () => {
    if (!userToEdit) return;
    
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userToEdit.id 
          ? {...u, status: u.status === 'active' ? 'inactive' : 'active'}
          : u
      )
    );
    toast.success("User status updated successfully");
    setShowStatusDialog(false);
    setUserToEdit(null);
  };

  const handleRoleToggle = (userId) => {
    const userToUpdate = users.find(u => u.id === userId);
    setUserToEdit(userToUpdate);
    setShowRoleDialog(true);
  };

  const confirmRoleToggle = () => {
    if (!userToEdit) return;
    
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userToEdit.id 
          ? {...u, role: u.role === 'admin' ? 'user' : 'admin'}
          : u
      )
    );
    toast.success("User role updated successfully");
    setShowRoleDialog(false);
    setUserToEdit(null);
  };

  const handleDeleteClick = (userId) => {
    const userToRemove = users.find(u => u.id === userId);
    setUserToDelete(userToRemove);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    
    // In a real app, this would call an API
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
    toast.success("User deleted successfully");
    setShowDeleteDialog(false);
    setUserToDelete(null);
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-mushroom-600 mb-2">User Management</h1>
            <p className="text-gray-600">Manage users, roles, and permissions</p>
          </div>
          <Button className="bg-mushroom-500 hover:bg-mushroom-600">
            <User className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-mushroom-100 rounded-full flex items-center justify-center">
                          <span className="text-mushroom-600 font-semibold">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-amber-600 hover:text-amber-900"
                        onClick={() => handleRoleToggle(user.id)}
                      >
                        {user.role === 'admin' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClick(user.id)}
                        disabled={user.id === '1'} // Prevent deleting main admin
                      >
                        <Trash className="h-4 w-4" />
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
            <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              account and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Role Change Confirmation Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              {userToEdit && (
                <span>
                  Are you sure you want to change {userToEdit.name}'s role from{" "}
                  <strong>{userToEdit.role}</strong> to{" "}
                  <strong>{userToEdit.role === "admin" ? "user" : "admin"}</strong>?
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRoleToggle} className="bg-amber-600 hover:bg-amber-700">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Confirmation Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User Status</DialogTitle>
            <DialogDescription>
              {userToEdit && (
                <span>
                  Are you sure you want to change {userToEdit.name}'s status from{" "}
                  <strong>{userToEdit.status}</strong> to{" "}
                  <strong>{userToEdit.status === "active" ? "inactive" : "active"}</strong>?
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmStatusToggle} className="bg-blue-600 hover:bg-blue-700">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default UsersManagement;
