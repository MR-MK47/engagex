import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthLayout } from './components/layout/AuthLayout';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MissionBriefing from "./pages/MissionBriefing";
import LearningMission from "./pages/LearningMission";
import KnowledgeMap from "./pages/KnowledgeMap";
import HallOfFame from "./pages/HallOfFame";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected App Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mission-briefing" element={<MissionBriefing />} />
            <Route path="/mission/:missionId" element={<LearningMission />} />
            <Route path="/knowledge-map" element={<KnowledgeMap />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
