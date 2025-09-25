import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/navbar"

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar/>
   

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
      {/* Footer */}
      <footer className="bg-eco-green px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo without background.png" 
                  className="h-12 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold">
                  <span className="text-[rgb(59,139,65)] font-bold">ECO</span>
                  <span className="text-[rgb(123,58,31)] font-bold">ROOT</span>
                </h3>
              </div>
              <p className="text-white/90 text-lg mb-4 max-w-md">
                Empowering the next generation to create a sustainable future through interactive games and real-world environmental challenges.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/GameSection" className="text-white/80 hover:text-white transition-colors">Games</Link></li>
                <li><Link to="/Challenges" className="text-white/80 hover:text-white transition-colors">Challenges</Link></li>
                <li><Link to="/leaderboard" className="text-white/80 hover:text-white transition-colors">Leaderboard</Link></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Rewards</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © 2024 EcoRoot. All rights reserved.
            </p>
            <p className="text-white/70 text-sm mt-2 md:mt-0">
              Making the world greener, one step at a time 🌱
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
