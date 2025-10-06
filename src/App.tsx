import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { LandingPage } from "@/pages/LandingPage";
import { BrowseGames } from "@/pages/BrowseGames";
import { Login } from "@/pages/auth/Login";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProfilePage as UserProfileIndex } from "@/pages/profile/index";

import NotFound from "./pages/NotFound";
import HostGame from "./pages/HostGame";
import HostGamesPage from "./pages/HostGamesPage";
import HostNewGamePage from "./pages/HostNewGamePage";
import HostedGameDetailsPage from "./pages/HostedGameDetailsPage";
import GameDetailsPage from "./pages/GameDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/browse" element={<ProtectedRoute><Layout><BrowseGames /></Layout></ProtectedRoute>} />
            <Route path="/host" element={<ProtectedRoute><Layout><HostGamesPage /></Layout></ProtectedRoute>} />
            <Route path="/host/new" element={<ProtectedRoute><Layout><HostNewGamePage /></Layout></ProtectedRoute>} />
            <Route path="/host/games/:id" element={<ProtectedRoute><Layout><HostedGameDetailsPage /></Layout></ProtectedRoute>} />
            <Route path="/games/:id" element={<ProtectedRoute><Layout><GameDetailsPage /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><UserProfileIndex /></Layout></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
