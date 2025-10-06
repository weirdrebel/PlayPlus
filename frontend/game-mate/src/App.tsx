import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LandingPage } from "@/pages/LandingPage";
import { BrowseGames } from "@/pages/BrowseGames";

import NotFound from "./pages/NotFound";
import HostGame from "./pages/HostGame";
import HostGamesPage from "./pages/HostGamesPage";
import HostNewGamePage from "./pages/HostNewGamePage";
import HostedGameDetailsPage from "./pages/HostedGameDetailsPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LoggedInProfilePage from "@/pages/profile/index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/browse" element={<Layout><BrowseGames /></Layout>} />
          <Route path="/host" element={<Layout><HostGamesPage /></Layout>} />
          <Route path="/host/new" element={<Layout><HostNewGamePage /></Layout>} />
          <Route path="/host/games/:id" element={<Layout><HostedGameDetailsPage /></Layout>} />
          <Route path="/games/:id" element={<Layout><GameDetailsPage /></Layout>} />
          <Route path="/profile/:userId" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/profile" element={<Layout><LoggedInProfilePage /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
