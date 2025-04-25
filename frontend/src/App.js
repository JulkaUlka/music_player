import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackManager from "./pages/TrackManager/TrackManager";
import { AppContainer } from "./App.styled";
import { AudioProvider } from "./context/AudioContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <Router>
          <AppContainer>
            <Routes>
              <Route path="/tracks" element={<TrackManager />} />
              <Route path="/" element={<Navigate to="/tracks" replace />} />
            </Routes>
            <ToastContainer position="bottom-right" />
          </AppContainer>
        </Router>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
