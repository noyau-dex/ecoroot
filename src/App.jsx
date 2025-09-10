import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import ChallengesPage from './pages/ChallengesPage.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <>
      {/* Other routes */}
      <HomePage />
      <Leaderboard />
    </>
  );
}

export default App;

