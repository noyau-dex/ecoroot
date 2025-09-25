import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../components/navbar"
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    college: '',
    department: '',
    year: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  // Load existing users from localStorage on component mount
  useEffect(() => {
    const existingUsers = localStorage.getItem('ecoroot_users')
    if (!existingUsers) {
      localStorage.setItem('ecoroot_users', JSON.stringify([]))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('ecoroot_users') || '[]')

      if (isLogin) {
        // Sign In Logic
        if (!formData.email || !formData.password) {
          throw new Error('Email and password are required')
        }

        // Find user by email
        const user = existingUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase())
        
        if (!user) {
          throw new Error('No account found with this email address')
        }

        // Check password
        if (user.password !== formData.password) {
          throw new Error('Incorrect password')
        }

        // Store current user in localStorage
        localStorage.setItem('ecoroot_current_user', JSON.stringify(user))
        setSuccess('Login successful! Redirecting...')
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Navigate to home page
        navigate('/')
        
      } else {
        // Sign Up Logic
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error('Name, email, and password are required')
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }

        // Check if email already exists
        const emailExists = existingUsers.some(u => u.email.toLowerCase() === formData.email.toLowerCase())
        if (emailExists) {
          throw new Error('An account with this email already exists')
        }

        // Create new user
        const newUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          name: formData.name,
          email: formData.email,
          password: formData.password, // In real app, this would be hashed
          role: formData.role,
          college: formData.college,
          department: formData.department,
          year: formData.year,
          credits: 0,
          score: 0,
          certificates: [],
          claimedRewards: [],
          completedChallenges: [],
          createdAt: new Date().toISOString()
        }

        // Add new user to existing users
        const updatedUsers = [...existingUsers, newUser]
        localStorage.setItem('ecoroot_users', JSON.stringify(updatedUsers))
        
        // Store current user in localStorage
        localStorage.setItem('ecoroot_current_user', JSON.stringify(newUser))
        setSuccess('Account created successfully! Redirecting...')
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Navigate to home page
        navigate('/')
      }
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setSuccess('')
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      college: '',
      department: '',
      year: ''
    })
  }

  return (
    <>
    <Navbar/>
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/logo without background.png" 
              className="h-12 object-cover rounded-lg"
              alt="EcoRoot Logo"
            />
            <h1 className="text-3xl font-bold">
              <span className="text-[rgb(59,139,65)]">ECO</span>
              <span className="text-[rgb(123,58,31)]">ROOT</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back!' : 'Join EcoRoot'}
          </h2>
          <p className="text-white/90 mt-2">
            {isLogin 
              ? 'Sign in to continue your eco-friendly journey' 
              : 'Start your journey towards a sustainable future'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Role Selection (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            )}

            {/* College/Department Fields (Sign Up Only) */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-2">
                    College/Institution
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter your college name"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter your department"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year/Semester
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="e.g., 3rd Year, 1st Semester"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[rgb(123,58,31)] hover:bg-[rgb(103,48,21)] disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-[rgb(59,139,65)] hover:text-[rgb(39,119,45)] font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-white/90 text-sm">
            Join thousands of students and teachers making a difference
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-white/80">
            <span>🌱 Eco Challenges</span>
            <span>🏆 Rewards</span>
            <span>📊 Leaderboard</span>
          </div>
        </div>
      </div>
    </div>
 
    </>
  )
}
