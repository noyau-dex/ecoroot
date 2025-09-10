// src/pages/Leaderboard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Leaderboard data with 6 ranks
const leaderboardData = [
  { rank: 1, name: "Manish Singh", points: 980 },
  { rank: 2, name: "Satyajeet Kumar", points: 920 },
  { rank: 3, name: "Yash Gupta", points: 870 },
  { rank: 4, name: "Nikhil", points: 830 },
  { rank: 5, name: "Dhruv", points: 790 },
  { rank: 6, name: "Nishika Dhankhar", points: 750 },
];

// function to return image based on rank
const getImageByRank = (rank) => {
  switch (rank) {
    case 1:
      return "https://img.icons8.com/emoji/96/1st-place-medal-emoji.png"; // gold
    case 2:
      return "https://img.icons8.com/emoji/96/2nd-place-medal-emoji.png"; // silver
    case 3:
      return "https://img.icons8.com/emoji/96/3rd-place-medal-emoji.png"; // bronze
    default:
      return "https://img.icons8.com/color/96/deciduous-tree.png"; // eco/tree icon
  }
};

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-green-800 hover:text-green-600 font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-center text-green-800">
            🌿 Leaderboard 🌿
          </h1>
          <div></div>
        </div>

      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-green-700 text-white text-lg">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Points</th>
              <th className="p-3">Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((student, index) => (
              <motion.tr
                key={index}
                className={`border-b hover:bg-green-100 transition 
                  ${student.rank === 1 ? "bg-yellow-200" : ""} 
                  ${student.rank === 2 ? "bg-gray-300" : ""} 
                  ${student.rank === 3 ? "bg-orange-100" : ""}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <td className="p-4 font-bold text-green-700">{student.rank}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4 text-blue-600 font-semibold">
                  {student.points}
                </td>
                <td className="p-2">
                  <img
                    src={getImageByRank(student.rank)}
                    alt="rank badge"
                    className="h-12 w-12 mx-auto"
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="text-center mt-6">
          <p className="text-green-800 font-semibold">
            🌱 Keep playing, learning, and acting to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
}
