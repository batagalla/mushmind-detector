
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster as Sonner } from "sonner";
import theme from './theme/mui-theme';

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import RecentSearches from "./pages/RecentSearches";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersManagement from "./pages/admin/Users";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import ModelSettingsPage from "./pages/admin/ModelSettings";
import SystemSettingsPage from "./pages/admin/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Sonner position="top-center" />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/recent-searches" element={<RecentSearches />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersManagement />} />
            <Route path="/admin/feedback" element={<FeedbackManagement />} />
            <Route path="/admin/model" element={<ModelSettingsPage />} />
            <Route path="/admin/settings" element={<SystemSettingsPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
