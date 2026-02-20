/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Tournaments } from "./pages/Tournaments";
import { Clubs } from "./pages/Clubs";
import { LiveScoring } from "./pages/LiveScoring";
import { Players } from "./pages/Players";
import { ScheduleTimeline } from "./pages/Schedule";
import { CreateTournament } from "./pages/CreateTournament";
import { TournamentDirector } from "./pages/TournamentDirector";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181B',
            color: '#FAFAFA',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="tournaments/create" element={<CreateTournament />} />
          <Route path="tournaments/:tournamentId/director" element={<TournamentDirector />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="players" element={<Players />} />
          <Route path="schedule" element={<ScheduleTimeline />} />
          <Route path="live/:matchId" element={<LiveScoring />} />
          <Route path="*" element={<div className="text-center p-10">Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
