// import { Routes, Route } from "react-router-dom";
// import Leaderboard from "./pages/Leaderboard";
// import HomePage from "./pages/Home.jsx";
// import ChallengePage from "./pages/ChallengesPage.jsx";
// import GameSection from "./pages/GameSection";
// import Game from "./pages/Game";
// import WasteQuiz from "./pages/WasteQuiz";
// import Rewards from "./pages/Rewards.jsx";
// import Auth from "./pages/Auth.jsx";


// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/leaderboard" element={<Leaderboard />} />
//         <Route path="/challenges" element={<ChallengePage />} />
//         <Route path="/games" element={<GameSection />} />
//         <Route path="/game-quiz" element={<Game />} />
//         <Route path="/waste-quiz" element={<WasteQuiz />} />
//         <Route path="/rewards" element={<Rewards />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";
// import Leaderboard from "./pages/Leaderboard";
// import HomePage from "./pages/Home.jsx";
// import ChallengePage from "./pages/ChallengesPage.jsx";
// import GameSection from "./pages/GameSection";
// import Game from "./pages/Game";
// import WasteQuiz from "./pages/WasteQuiz";
// import Rewards from "./pages/Rewards.jsx";
// import Auth from "./pages/Auth.jsx";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/auth" element={<Auth />} />
//       <Route path="/leaderboard" element={<Leaderboard />} />
//       <Route path="/challenges" element={<ChallengePage />} />
//       <Route path="/games" element={<GameSection />} />
//       <Route path="/game-quiz" element={<Game />} />
//       <Route path="/waste-quiz" element={<WasteQuiz />} />
//       <Route path="/rewards" element={<Rewards />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import HomePage from "./pages/Home.jsx";
import ChallengePage from "./pages/ChallengesPage.jsx";
import GameSection from "./pages/GameSection";
import Game from "./pages/Game";
import WasteQuiz from "./pages/WasteQuiz";
import Rewards from "./pages/Rewards.jsx";
import Auth from "./pages/Auth.jsx";
import Community from "./pages/Community.jsx"; // 👈 Import Community page

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/challenges" element={<ChallengePage />} />
      <Route path="/games" element={<GameSection />} />
      <Route path="/game-quiz" element={<Game />} />
      <Route path="/waste-quiz" element={<WasteQuiz />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/community" element={<Community />} /> {/* 👈 New route */}
    </Routes>
  );
}

export default App;



