import Navbar from "../components/navbar"


export default function About() {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
        <header className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">About EcoRoot</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            A platform to gamify sustainability for students and institutions across India.
          </p>
        </header>

        {/* Problem + Vision */}
        <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The Problem</h2>
            <p className="text-gray-700 leading-relaxed">
              Environmental awareness often stays theoretical. Students rarely get a structured, rewarding path to adopt
              sustainable habits in daily life. Institutions lack an engaging, trackable way to drive large-scale
              participation and measure real impact.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              Build India’s largest student-led sustainability movement by combining games, weekly challenges, verifiable
              impact and tangible rewards — motivating long-term eco-friendly behavior at scale.
            </p>
          </div>
        </section>

        {/* Solution pillars */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">What We Built</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4 text-2xl">🎮</div>
              <h3 className="text-xl font-bold mb-2">Play</h3>
              <p className="text-gray-700">Snackable games to learn sustainability concepts in minutes.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4 text-2xl">🌱</div>
              <h3 className="text-xl font-bold mb-2">Act</h3>
              <p className="text-gray-700">Weekly challenges with proof uploads and teacher verification.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mb-4 text-2xl">🏆</div>
              <h3 className="text-xl font-bold mb-2">Earn</h3>
              <p className="text-gray-700">Eco-Points redeemable for certificates and NGO-backed rewards.</p>
            </div>
          </div>
        </section>

        {/* Impact goals */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact Goals (2025–26)</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <li className="p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="text-3xl font-extrabold text-green-700">100k+</div>
                <div className="text-gray-700">Students engaged</div>
              </li>
              <li className="p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="text-3xl font-extrabold text-green-700">1M+</div>
                <div className="text-gray-700">Kg waste diverted</div>
              </li>
              <li className="p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="text-3xl font-extrabold text-green-700">50k+</div>
                <div className="text-gray-700">Trees planted</div>
              </li>
              <li className="p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="text-3xl font-extrabold text-green-700">500+</div>
                <div className="text-gray-700">Institutions onboarded</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Why it works */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Why It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-lg font-bold mb-2">Scalable</h3>
              <p className="text-gray-700">Lightweight web stack with mock services, ready for API integration and multi-institution rollout.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-lg font-bold mb-2">Measurable</h3>
              <p className="text-gray-700">Built-in leaderboards, verifications and counters to quantify real-world impact.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-lg font-bold mb-2">Inclusive</h3>
              <p className="text-gray-700">Designed for students, teachers and clubs, across devices and bandwidth conditions.</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Team & Collaboration</h2>
            <p className="text-gray-700">
              We are a student-led team passionate about climate action, product design, and engineering. We actively
              seek partnerships with universities, NGOs and local bodies for on-ground campaigns and reward programs.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-extrabold">Join the movement</h3>
            <p className="mt-2 opacity-90">Onboard your campus, sponsor rewards, or collaborate on challenges.</p>
            <a href="#" className="inline-block mt-4 px-6 py-3 rounded-full bg-white text-green-700 font-semibold hover:bg-green-50">
              Contact Us
            </a>
          </div>
        </section>
      </div>
  
    </>
  )
}


