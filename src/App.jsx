import { Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import HomePage from "./pages/Home.jsx";
import ChallengePage from "./pages/ChallengesPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/challenges" element={<ChallengePage />} />
      </Routes>
    </>
  );
}

export default App;

