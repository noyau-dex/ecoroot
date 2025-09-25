import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

function CountUp({ end, duration = 1500, suffix = "" }) {
  const [value, setValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const start = performance.now()
    const startValue = 0
    const endValue = end

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (endValue - startValue) * eased)
      setValue(current)
      if (progress < 1) requestAnimationFrame(animate)
    }

    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [hasStarted, end, duration])

  const formatted = value.toLocaleString()
  return (
    <span ref={ref}>{formatted}{suffix}</span>
  )
}

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
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                <img src="/doodle-images/tree.png" alt="Trees doodle" className="object-contain" />
              </div>
              <h4 className="text-4xl font-extrabold text-green-600 mb-2">
                <CountUp end={2500} suffix="+" />
              </h4>
              <p className="text-gray-600 font-semibold text-lg">Trees Planted</p>
              <p className="text-gray-500 text-sm mt-2">Through EcoRoot Rewards</p>
            </div>
            
            <div className="bg-white rounded-3xl px-8 py-10 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                <img src="/doodle-images/user.png" alt="Users doodle" className="object-contain" />
              </div>
              <h4 className="text-4xl font-extrabold text-blue-600 mb-2">
                <CountUp end={1200} suffix="+" />
              </h4>
              <p className="text-gray-600 font-semibold text-lg">Active Users</p>
              <p className="text-gray-500 text-sm mt-2">Students & Teachers</p>
            </div>
            
            <div className="bg-white rounded-3xl px-8 py-10 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                <img src="/doodle-images/recycle.png" alt="Recycling doodle" className="w-12 h-12 object-contain" />
              </div>
              <h4 className="text-4xl font-extrabold text-purple-600 mb-2">
                <CountUp end={5000} suffix="kg" />
              </h4>
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
      <Footer/>
    </div>
  )
}
