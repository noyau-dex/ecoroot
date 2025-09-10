// src/pages/Game.jsx
import React, { useState, useEffect } from "react";

export default function Game() {
  const [gameState, setGameState] = useState("welcome"); // welcome | playing | results
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [itemsDropped, setItemsDropped] = useState(0);
  const totalItems = 10;

  useEffect(() => {
    if (gameState === "playing" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameState("results");
    }
  }, [gameState, timer]);

  const allItems = [
    { id: "1", name: "Recycling bottles", category: "good", icon: "♻️" },
    { id: "2", name: "Driving a gas car", category: "bad", icon: "🚗" },
    { id: "3", name: "Eating a plant-based meal", category: "good", icon: "🥗" },
    { id: "4", name: "Using plastic bags", category: "bad", icon: "🛍️" },
    { id: "5", name: "Using a reusable water bottle", category: "good", icon: "💧" },
    { id: "6", name: "Leaving lights on", category: "bad", icon: "💡" },
    { id: "7", name: "Taking a short flight", category: "bad", icon: "✈️" },
    { id: "8", name: "Biking to school", category: "good", icon: "🚲" },
    { id: "9", name: "Composting food waste", category: "good", icon: "🍎" },
    { id: "10", name: "Buying fast fashion", category: "bad", icon: "👕" },
  ];

  const startGame = () => {
    setItems([...allItems].sort(() => Math.random() - 0.5));
    setScore(0);
    setTimer(60);
    setItemsDropped(0);
    setGameState("playing");
  };

  const handleDrop = (item, zone) => {
    let newScore = score;
    if (item.category === zone) {
      newScore += 10;
    } else {
      newScore -= 5;
    }
    setScore(newScore);
    setItems(items.filter((i) => i.id !== item.id));
    setItemsDropped(itemsDropped + 1);
    if (itemsDropped + 1 === totalItems) {
      setGameState("results");
    }
  };

  const getResultText = () => {
    if (score >= 80) return "🌟 Excellent! You’re a carbon-conscious superstar.";
    if (score >= 50) return "💚 Great job! You’re doing well. Keep improving!";
    if (score >= 20) return "🙂 Good start! Small changes can make a big difference.";
    return "⚠️ Time to make some eco-friendly changes!";
  };

  return (
    <div className="w-full h-screen min-h-screen flex justify-center items-center bg-gradient-to-b from-green-200 to-green-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 overflow-y-auto">
        {gameState === "welcome" && (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-green-800">
              🌿 Carbon Footprint Quest
            </h1>
            <p className="text-gray-600">
              Drag and drop actions into the correct category. +10 points for
              correct, -5 for wrong. You have 60 seconds!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all"
            >
              Start Quest
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="font-bold text-green-800">
                Score: <span className="text-blue-600">{score}</span>
              </span>
              <span className="font-bold text-green-800">
                Time: <span className="text-blue-600">{timer}s</span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 transition-all"
                style={{
                  width: `${(itemsDropped / totalItems) * 100}%`,
                }}
              ></div>
            </div>

            {/* Items */}
            <div className="flex flex-wrap justify-center bg-gray-50 p-4 rounded-lg shadow-inner">
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("item", JSON.stringify(item))
                  }
                  className="draggable bg-white m-2 px-4 py-2 rounded-lg shadow-md cursor-grab hover:scale-105 transition-transform flex items-center"
                >
                  <span className="mr-2">{item.icon}</span> {item.name}
                </div>
              ))}
            </div>

            {/* Dropzones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["good", "bad"].map((zone) => (
                <div
                  key={zone}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const item = JSON.parse(e.dataTransfer.getData("item"));
                    handleDrop(item, zone);
                  }}
                  className={`dropzone border-4 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all ${
                    zone === "good"
                      ? "border-green-400 bg-green-50 text-green-700"
                      : "border-red-400 bg-red-50 text-red-700"
                  }`}
                >
                  <h3 className="text-xl font-bold capitalize">
                    {zone === "good" ? "Good for the Planet" : "Bad for the Planet"}
                  </h3>
                  <p className="text-sm opacity-75">
                    {zone === "good"
                      ? "Drag sustainable actions here!"
                      : "Drag polluting actions here!"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === "results" && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-green-800">Your Results</h1>
            <p className="text-6xl font-extrabold text-blue-600">{score}</p>
            <p className="text-lg">{getResultText()}</p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
