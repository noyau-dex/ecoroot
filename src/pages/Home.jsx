// import { Link } from "react-router-dom"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="bg-eco-green px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-eco-brown rounded-full flex items-center justify-center">
//               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
//                 <path d="M12 16C12 16 8 18 8 22H16C16 18 12 16 12 16Z" />
//               </svg>
//             </div>
//             <h1 className="text-3xl text-white">
//               ECO<span className="font-bold text-eco-brown">ROOT</span>
//             </h1>
//           </div>

//           <nav className="hidden md:flex items-center gap-8">
//             <Link to="/" className="text-white hover:opacity-80 font-medium underline">
//               Home
//             </Link>
//             <a href="#" className="text-white hover:opacity-80 font-medium">
//               Games
//             </a>
//             <Link to="/challenges" className="text-white hover:opacity-80 font-medium">
//               Challenges
//             </Link>
//             <Link to="/leaderboard" className="text-white hover:opacity-80 font-medium">
//               Leaderboard
//             </Link>
//             <a href="#" className="text-white hover:opacity-80 font-medium">
//               Rewards
//             </a>
//             <a href="#" className="text-white hover:opacity-80 font-medium">
//               About Us
//             </a>
//           </nav>

//           <button className="bg-eco-brown hover:opacity-90 text-white px-8 py-2 rounded-full font-bold">LOGIN</button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section
//         className="relative h-64 bg-cover bg-center flex items-center justify-center"
//         style={{
//           backgroundImage: "url('/beautiful-rolling-green-hills-landscape-with-blue-.jpg')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/20"></div>
//         <h2 className="relative text-5xl md:text-6xl font-bold text-white text-center px-4 text-balance">
//           The Beginning of Eco-Friendly Future
//         </h2>
//       </section>

//       {/* Play Learn Act Section */}
//       <section className="bg-eco-brown px-6 py-12">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
//           <div className="flex flex-col items-start gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 bg-eco-green rounded-lg flex items-center justify-center">
//                 <svg className="w-10 h-10 text-eco-brown" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M7 6V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V6H19C19.55 6 20 6.45 20 7S19.55 8 19 8H5C4.45 8 4 7.55 4 7S4.45 6 5 6H7ZM16 3H8V6H16V3ZM19 9H5L6 20H18L19 9Z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-4xl font-bold text-white">PLAY LEARN ACT</h3>
//                 <p className="text-white/90 text-lg">interactive games + real world challenges</p>
//               </div>
//             </div>

//             <button className="bg-eco-cyan hover:opacity-90 text-white px-8 py-3 rounded-full font-bold text-lg mt-2">
//               EXPLORE NOW {">>"}
//             </button>
//           </div>

//           <div className="flex justify-center md:justify-end">
//             <div className="bg-eco-cream rounded-[40px] px-10 py-8 text-center min-w-[520px]">
//               <h4 className="font-extrabold text-black text-2xl tracking-wide mb-2">QUICK TIP :</h4>
//               <p className="text-eco-green-strong font-extrabold text-3xl leading-tight mb-2">Take this week’s challenge :</p>
//               <p className="text-black text-2xl">segregate household waste for 7 days</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Statistics Section */}
//       <section className="bg-eco-cyan-soft px-6 py-12">
//         <div className="max-w-7xl mx-auto flex justify-center gap-8">
//           <div className="bg-white rounded-3xl px-8 py-6 flex items-center gap-4 min-w-80 shadow">
//             <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center">
//               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
//               </svg>
//             </div>
//             <div>
//               <div className="text-4xl font-black text-gray-900">1000+</div>
//               <div className="text-gray-600 text-lg">Trees Planted</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-3xl px-8 py-6 flex items-center gap-4 min-w-80 shadow">
//             <div className="w-12 h-12 bg-eco-cyan rounded-full flex items-center justify-center">
//               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4Z" />
//               </svg>
//             </div>
//             <div>
//               <div className="text-4xl font-black text-gray-900">50+</div>
//               <div className="text-gray-600 text-lg">Students Enrolled</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-3xl px-8 py-6 flex items-center gap-4 min-w-80 shadow">
//             <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center">
//               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
//                 <path d="M7 14L9 16L15 10" />
//               </svg>
//             </div>
//             <div>
//               <div className="text-4xl font-black text-gray-900">100kg</div>
//               <div className="text-gray-600 text-lg">Waste Saved</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Plant Tree Section */}
//       <section className="bg-eco-green px-6 py-12">
//         <div className="max-w-7xl mx-auto text-center">
//           <h3 className="text-5xl font-extrabold text-eco-brown mb-6">PLANT A TREE AND EARN REWARD POINTS</h3>
//           <button className="inline-block bg-eco-brown hover:opacity-90 text-white px-8 py-3 rounded-full font-bold text-lg">
//             REWARD SECTION{">>"}
//           </button>
//         </div>
//       </section>
//     </div>
//   )
// }

import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-eco-green px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
          <img 
            src="/logo without background.png" 
            className="h-16 object-cover rounded-lg"
          />
            <h1 className="text-3xl font-bold">
              <span className="text-[rgb(59,139,65)] font-bold">ECO</span>
              <span className="text-[rgb(123,58,31)] font-bold">ROOT</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:opacity-80 font-medium underline">
              Home
            </Link>
            <a href="/games" className="text-white hover:opacity-80 font-medium">
              Games
            </a>
            <a href="/challenges" className="text-white hover:opacity-80 font-medium">
              Challenges
            </a>
            <Link to="/leaderboard" className="text-white hover:opacity-80 font-medium">
              Leaderboard
            </Link>
            <Link to="/rewards" className="text-white hover:opacity-80 font-medium">
              Rewards
            </Link>
            <a href="#" className="text-white hover:opacity-80 font-medium">
              About Us
            </a>
          </nav>

          <button 
            onClick={() => navigate('/auth')}
            className="bg-eco-brown hover:opacity-90 text-white px-8 py-2 rounded-full font-bold transition-opacity"
          >
            LOGIN
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/beautiful-rolling-green-hills-landscape-with-blue-.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 leading-tight">
              The Beginning of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-100">
                Eco-Friendly Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students and teachers in making a real difference for our planet through interactive challenges and meaningful actions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[rgb(59,139,65)] to-[rgb(39,119,45)] hover:from-[rgb(39,119,45)] hover:to-[rgb(29,99,35)] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </button>
              <button 
                onClick={() => navigate('/challenges')}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                View Challenges
              </button>
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-green-400/20 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed">
          <div className="w-12 h-12 bg-green-300/30 rounded-full backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Play Learn Act Section */}
      <section className="bg-gradient-to-br from-[rgb(123,58,31)] via-[rgb(143,68,41)] to-[rgb(103,48,21)] px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-white/5"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16 relative z-10">
          <div className="flex flex-col items-start gap-6">
            <div className="space-y-4">
              <h3 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                <span className="block">PLAY</span>
                <span className="block">LEARN</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-100">ACT</span>
              </h3>
              <p className="text-white/90 text-xl leading-relaxed">Interactive games + real world challenges that make sustainability fun and engaging</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                onClick={() => navigate('/games')}
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🎮 EXPLORE GAMES
              </button>
              <button 
                onClick={() => navigate('/challenges')}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                🌱 VIEW CHALLENGES
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end items-center gap-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-6 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-extrabold text-gray-800 text-xl tracking-wide mb-2">QUICK TIP</h4>
              <p className="text-green-600 font-extrabold text-2xl leading-tight mb-2">Take this week's challenge</p>
              <p className="text-gray-700 text-lg">Segregate household waste for 7 days</p>
              <button 
                onClick={() => navigate('/challenges')}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
              >
                Join Challenge
              </button>
            </div>
            
            <div className="relative">
              <img 
                src="/planting trees 2.png" 
                className="w-80 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                alt="Planting trees"
              />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🌱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-green-50 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Making a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Real Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing community of eco-warriors making a difference every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl px-8 py-10 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🌳</span>
              </div>
              <h4 className="text-4xl font-extrabold text-green-600 mb-2">2,500+</h4>
              <p className="text-gray-600 font-semibold text-lg">Trees Planted</p>
              <p className="text-gray-500 text-sm mt-2">Through EcoRoot Rewards</p>
            </div>
            
            <div className="bg-white rounded-3xl px-8 py-10 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h4 className="text-4xl font-extrabold text-blue-600 mb-2">1,200+</h4>
              <p className="text-gray-600 font-semibold text-lg">Active Users</p>
              <p className="text-gray-500 text-sm mt-2">Students & Teachers</p>
            </div>
            
            <div className="bg-white rounded-3xl px-8 py-10 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">♻️</span>
              </div>
              <h4 className="text-4xl font-extrabold text-purple-600 mb-2">5,000kg</h4>
              <p className="text-gray-600 font-semibold text-lg">Waste Saved</p>
              <p className="text-gray-500 text-sm mt-2">Through Challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Tree Section */}
      <section className="bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-green-500/10"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Plant Trees</span>
              <br />
              <span className="text-gray-700">Earn Rewards</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every eco-action you take helps plant real trees and earn amazing rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="relative mb-6">
                <img 
                  src="/Plant___Earn_Rewards-removebg-preview.png" 
                  className="w-48 h-32 object-cover rounded-2xl shadow-lg mx-auto transform hover:scale-105 transition-all duration-300"
                  alt="Plant and earn"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Challenges</h3>
              <p className="text-gray-600">Earn points for every eco-friendly action</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌳</span>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Plant Real Trees</h3>
                <p className="text-gray-600 mb-6">Your points directly fund tree planting projects worldwide</p>
                <button 
                  onClick={() => navigate('/rewards')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🌟 VIEW REWARDS
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6">
                <img 
                  src="/after_plant_and_earn_on_other_side-removebg-preview.png" 
                  className="w-48 h-48 object-cover rounded-full shadow-lg mx-auto transform hover:scale-105 transition-all duration-300"
                  alt="Reward badge"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🏆</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Earn Certificates</h3>
              <p className="text-gray-600">Get recognized for your environmental impact</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



