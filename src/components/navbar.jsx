import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-eco-green px-6 py-4" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
          
          <Link to="/">
        <div className="flex items-center gap-3">
          <img 
            src="/logo without background.png" 
            className="h-16 object-cover rounded-lg"
            alt="EcoRoot Logo"
          />
          <h1 className="text-3xl font-bold">
            <span className="text-[rgb(59,139,65)] font-bold">ECO</span>
            <span className="text-[rgb(123,58,31)] font-bold">ROOT</span>
          </h1>
        </div>
          </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:opacity-80 font-medium underline">
            Home
          </Link>
          <Link to="/games" className="text-white hover:opacity-80 font-medium">
            Games
          </Link>
          <Link to="/challenges" className="text-white hover:opacity-80 font-medium">
            Challenges
          </Link>
          <Link to="/leaderboard" className="text-white hover:opacity-80 font-medium">
            Leaderboard
          </Link>
          <Link to="/rewards" className="text-white hover:opacity-80 font-medium">
            Rewards
          </Link>
          {/* 👇 New Community link before About */}
          <Link to="/community" className="text-white hover:opacity-80 font-medium">
            Community
          </Link>
          <Link to="/about" className="text-white hover:opacity-80 font-medium">
            About Us
          </Link>

        </nav>

        {/* Login Button */}
        <button 
          onClick={() => navigate('/auth')}
          className="bg-eco-brown hover:opacity-90 text-white px-8 py-2 rounded-full font-bold transition-opacity"
        >
          LOGIN
        </button>
      </div>
    </header>
  )
}

export default Navbar

