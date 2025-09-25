// src/pages/Leaderboard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getLeaderboardData, getImageByRank } from "../services/leaderboard";
import Navbar from "../components/navbar"
export default function Leaderboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" | "clubs"
  const [clubFilter, setClubFilter] = useState(null); // "Prakarti MSIT"

  // Apply filter
  let filteredData = getLeaderboardData();
  if (filter === "clubs" && clubFilter === "Prakarti MSIT") {
    filteredData = filteredData.filter(
      (student) => student.club === "Prakarti MSIT"
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back link + title + filter button */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-green-800 hover:text-green-600 font-medium">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-green-800">
            🌿 Leaderboard 🌿
          </h1>

          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
            >
              Filter ⬇
            </button>

            {/* Dropdown */}
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border overflow-hidden z-10"
              >
                <button
                  onClick={() => {
                    setFilter("all");
                    setClubFilter(null);
                    setFilterOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left hover:bg-green-100 ${
                    filter === "all" ? "bg-green-50 font-semibold" : ""
                  }`}
                >
                  All Students
                </button>

                <button
                  onClick={() => setFilter("clubs")}
                  className={`block w-full px-4 py-2 text-left hover:bg-green-100 ${
                    filter === "clubs" ? "bg-green-50 font-semibold" : ""
                  }`}
                >
                  Clubs
                </button>

                {/* Sub-filter for clubs */}
                {filter === "clubs" && (
                  <div className="pl-4 border-t">
                    <button
                      onClick={() => {
                        setClubFilter("Prakarti MSIT");
                        setFilterOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left hover:bg-green-100 ${
                        clubFilter === "Prakarti MSIT"
                          ? "bg-green-50 font-semibold"
                          : ""
                      }`}
                    >
                      Prakarti MSIT
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Leaderboard Table */}
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
              {filteredData.map((student, index) => (
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

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-green-800 font-semibold">
            🌱 Keep playing, learning, and acting to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
    
    </>
  );
}
