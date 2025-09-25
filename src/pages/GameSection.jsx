import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/navbar"
export default function GameSection() {
  const games = [
    {
      id: "game-quiz",
      title: "Carbon Clash",
      description: "Test your environmental awareness with fun challenges.",
      image: "https://img.icons8.com/color/160/earth-planet.png",
    },
    {
      id: "waste-quiz",
      title: "Bin It Right",
      description: "Learn to sort waste correctly while having fun!",
      image: "https://media.istockphoto.com/id/962933762/vector/ecology-and-waste-global-eco-friendly-plastic.jpg?s=612x612&w=0&k=20&c=RdbOw__qI_Vc0W8pU0dEiO9--Unfs-iXUEqQOCP-1HE=",
    },
  ];

  return (
    <>
     <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="text-green-800 hover:text-green-600 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-green-800 text-center">
            🎮 Eco Games Hub
          </h1>
          <div></div>
        </div>

        {/* Game Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center p-6 text-center"
            >
              <img
                src={game.image}
                alt={game.title}
                className="h-32 w-32 object-contain mb-4"
              />
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                {game.title}
              </h2>
              <p className="text-gray-600 mb-6">{game.description}</p>
              <Link
                to={`/${game.id}`}
                className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition shadow-md"
              >
                Play Now →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
   
    </>
  );
}
