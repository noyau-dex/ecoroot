import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ChallengeCard from '../components/ChallengeCard.jsx'
import { useChallenges } from '../contexts/ChallengesContext.jsx'
import Navbar from "../components/navbar"

// Lightweight toast system for ephemeral notifications
function useToasts() {
  const [toasts, setToasts] = useState([])
  const push = (message) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2500)
  }
  return { toasts, push }
}

// Duplicate of ChallengesPage but with timeout-based verification and local reset
function ChallengesSimple() {
  const { challenges, fetchChallenges, currentUser, joinChallenge, login } = useChallenges()
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [search, setSearch] = useState('')
  const [progressById, setProgressById] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const { toasts, push } = useToasts()

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        if (!challenges?.length) {
          await fetchChallenges()
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const categories = useMemo(() => {
    const set = new Set(challenges.map((c) => c.category))
    return ['All', ...Array.from(set)]
  }, [challenges])

  const filtered = useMemo(() => {
    let list = [...challenges]
    if (category !== 'All') list = list.filter((c) => c.category === category)
    if (difficulty !== 'All') list = list.filter((c) => c.difficulty === difficulty.toLowerCase())
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((c) => c.title.toLowerCase().includes(q))
    }
    list.sort((a, b) => {
      const aIsFestival = a.festival ? 1 : 0
      const bIsFestival = b.festival ? 1 : 0
      if (aIsFestival !== bIsFestival) return aIsFestival - bIsFestival
      if (sort === 'Highest points') return b.points - a.points
      return 0
    })
    return list
  }, [challenges, category, difficulty, sort, search])

  const getUserProgress = (challengeId, durationDays) => {
    const pr = progressById[challengeId] || { joined: false, progressDays: 0, completed: false }
    return pr
  }

  const handleJoin = async (challenge) => {
    await joinChallenge(challenge.id)
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: { joined: true, progressDays: 0, completed: false, dailyProofs: {}, lastMarkTime: null },
    }))
  }

  // Local helper to award eco-points and reset challenge accessibility
  const awardAndReset = async (challenge) => {
    const newEcoPoints = (currentUser.ecoPoints ?? currentUser.credits) + challenge.points
    const newScore = (currentUser.score || 0) + challenge.points
    await login({
      id: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
      ecoPoints: newEcoPoints,
      score: newScore,
      credits: newEcoPoints,
      certificates: currentUser.certificates,
      claimedRewards: currentUser.claimedRewards,
    })
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: { joined: false, progressDays: 0, completed: false, dailyProofs: {}, lastMarkTime: null },
    }))
  }

  // Handle daily proof submission (camera)
  const handleDailyProof = async (challenge, file, dayNumber, timestamp) => {
    const proofUrl = URL.createObjectURL(file)
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: {
        ...prev[challenge.id],
        dailyProofs: {
          ...prev[challenge.id]?.dailyProofs,
          [dayNumber]: { proofUrl, submittedAt: new Date().toISOString(), timestamp: timestamp || new Date().toISOString() },
        },
      },
    }))
    push(`Day ${dayNumber} proof submitted successfully!`)
  }

  // Mark day complete with simple 24h cooldown logic (no AI verification)
  const handleMarkComplete = async (challenge) => {
    const currentProgress = progressById[challenge.id] || {
      joined: true,
      progressDays: 0,
      completed: false,
      dailyProofs: {},
      lastMarkTime: null,
    }
    if (currentProgress.progressDays >= challenge.durationDays) {
      push('Challenge already completed!')
      return
    }
    const now = new Date()
    const lastMarkTime = currentProgress.lastMarkTime ? new Date(currentProgress.lastMarkTime) : null
    if (lastMarkTime) {
      const hoursDiff = (now.getTime() - lastMarkTime.getTime()) / (1000 * 60 * 60)
      if (hoursDiff < 24) {
        const remainingHours = Math.ceil(24 - hoursDiff)
        push(`Please wait ${remainingHours} more hours before marking the next day complete.`)
        return
      }
    }
    const currentDay = currentProgress.progressDays + 1
    const hasCurrentDayProof = currentProgress.dailyProofs?.[currentDay]
    if (!hasCurrentDayProof) {
      push(challenge.durationDays > 1 
        ? `Please submit proof for day ${currentDay} before marking it complete.`
        : 'Please submit proof before marking this challenge complete.'
      )
      return
    }
    const newProgressDays = currentProgress.progressDays + 1
    const isCompleted = newProgressDays >= challenge.durationDays
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: {
        ...prev[challenge.id],
        joined: true,
        progressDays: newProgressDays,
        completed: isCompleted,
        lastMarkTime: now.toISOString(),
      },
    }))
    if (isCompleted) {
      // Mark as pending verification in local state so the card can show the status
      setProgressById((prev) => ({
        ...prev,
        [challenge.id]: {
          ...prev[challenge.id],
          verificationPending: true,
        },
      }))
      push('Submitting for verification...')
      // Keep an under-process state visible for at least 5 seconds
      setTimeout(() => {
        push('Verification under process...')
      }, 2500)
      setTimeout(async () => {
        push('Verification complete! Eco-Points awarded.')
        await awardAndReset(challenge)
      }, 5000)
    } else {
      push(`Day ${newProgressDays} completed! Submit proof for day ${newProgressDays + 1} to continue.`)
    }
  }

  // Single-shot upload proof (camera or certificate) -> simulate verification then award
  const handleUploadProof = async (challenge, file) => {
    // Mark as pending verification immediately for upload flow
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: {
        ...prev[challenge.id],
        joined: true,
        completed: true,
        verificationPending: true,
      },
    }))
    push('Uploading proof...')
    // Keep an under-process state visible for at least 5 seconds
    setTimeout(() => {
      push('Verification under process...')
    }, 2500)
    setTimeout(async () => {
      push('Verification complete! Eco-Points awarded.')
      await awardAndReset(challenge)
    }, 5000)
  }

  const activeItems = useMemo(() => {
    return Object.entries(progressById)
      .map(([challengeId, pr]) => ({ challengeId, ...pr }))
      .filter((x) => x.joined && !x.completed)
  }, [progressById])

  return (
    <>
      <Navbar/>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            to="/"
            className="text-green-800 hover:text-green-600 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Eco Challenges (Simple)</h1>
              <p className="mt-1 text-sm text-gray-600">
                This version fakes verification with a short delay. No AI service used.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Logged in as:</span> {currentUser.name} ({currentUser.role})
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => login({ id: 'u1', name: 'Aarav', role: 'student', ecoPoints: currentUser.ecoPoints ?? 120, score: currentUser.score ?? 120, certificates: currentUser.certificates ?? [], claimedRewards: currentUser.claimedRewards ?? [] })}
                  className={`px-3 py-1 text-xs rounded-full ${
                    currentUser.role === 'student' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => login({ id: 't1', name: 'Dr. Priya', role: 'teacher', ecoPoints: currentUser.ecoPoints ?? 500, score: currentUser.score ?? 500, certificates: currentUser.certificates ?? [], claimedRewards: currentUser.claimedRewards ?? [] })}
                  className={`px-3 py-1 text-xs rounded-full ${
                    currentUser.role === 'teacher' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Teacher
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600">
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Difficulty</span>
            <div className="mt-1 inline-flex overflow-hidden rounded-md border border-gray-300">
              {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-2 text-sm ${difficulty === d ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  aria-pressed={difficulty === d}
                  aria-label={`Filter difficulty ${d}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600">
              {['Newest', 'Highest points'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search challenges" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="space-y-8">
              {currentUser.role !== 'teacher' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Environmental Challenges</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {loading && (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-pulse">
                          <div className="h-40 w-full rounded bg-gray-200" />
                          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                          <div className="mt-2 h-3 w-full rounded bg-gray-200" />
                          <div className="mt-2 h-3 w-5/6 rounded bg-gray-200" />
                          <div className="mt-4 flex gap-2">
                            <div className="h-6 w-20 rounded bg-gray-200" />
                            <div className="h-6 w-24 rounded bg-gray-200" />
                          </div>
                        </div>
                      ))
                    )}
                    {filtered.filter(ch => !ch.festival && !ch.teacherRole).map((ch) => {
                      const progress = getUserProgress(ch.id, ch.durationDays)
                      return (
                        <ChallengeCard
                          key={ch.id}
                          challenge={ch}
                          userProgress={progress}
                          onJoin={() => handleJoin(ch)}
                          onMarkComplete={() => handleMarkComplete(ch)}
                          onUploadProof={(file) => handleUploadProof(ch, file)}
                          onDailyProof={(challenge, file, dayNumber) => handleDailyProof(challenge, file, dayNumber)}
                          proofType={ch.proofType}
                          userRole={currentUser.role}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              {!loading && currentUser.role !== 'teacher' && filtered.filter(ch => ch.festival).length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Festival Challenges</h2>
                  <p className="text-sm text-gray-600 mb-4">Special challenges available during Indian festivals</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.filter(ch => ch.festival).map((ch) => {
                      const progress = getUserProgress(ch.id, ch.durationDays)
                      return (
                        <ChallengeCard
                          key={ch.id}
                          challenge={ch}
                          userProgress={progress}
                          onJoin={() => handleJoin(ch)}
                          onMarkComplete={() => handleMarkComplete(ch)}
                          onUploadProof={(file) => handleUploadProof(ch, file)}
                          onDailyProof={(challenge, file, dayNumber) => handleDailyProof(challenge, file, dayNumber)}
                          proofType={ch.proofType}
                          userRole={currentUser.role}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              {!loading && currentUser.role === 'teacher' && filtered.filter(ch => ch.teacherRole).length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher-Led Challenges</h2>
                  <p className="text-sm text-gray-600 mb-4">Assign these challenges to your students and upload proof of their participation</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.filter(ch => ch.teacherRole).map((ch) => {
                      const progress = getUserProgress(ch.id, ch.durationDays)
                      return (
                        <ChallengeCard
                          key={ch.id}
                          challenge={ch}
                          userProgress={progress}
                          onJoin={() => handleJoin(ch)}
                          onMarkComplete={() => handleMarkComplete(ch)}
                          onUploadProof={(file) => handleUploadProof(ch, file)}
                          onDailyProof={(challenge, file, dayNumber) => handleDailyProof(challenge, file, dayNumber)}
                          proofType={ch.proofType}
                          userRole={currentUser.role}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className={`lg:col-span-4 xl:col-span-3 ${sidebarOpen ? '' : 'hidden lg:block'}`}>
            <div className="sticky top-4 space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-700">Your Eco-Points</h2>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen((v) => !v)}
                    className="inline-flex rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                    aria-label="Toggle sidebar"
                  >
                    {sidebarOpen ? 'Hide' : 'Show'}
                  </button>
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{currentUser.ecoPoints}</p>
                <Link to="/rewards" className="mt-4 inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600">
                  Go to Rewards Shop
                </Link>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700">Active progress</h3>
                <div className="mt-3 space-y-3">
                  {activeItems.length === 0 && (
                    <p className="text-sm text-gray-500">No active challenges yet.</p>
                  )}
                  {activeItems.map(({ challengeId }) => {
                    const ch = challenges.find((c) => c.id === challengeId)
                    if (!ch) return null
                    return (
                      <div key={challengeId} className="rounded border border-gray-100 p-3">
                        <p className="text-sm font-medium text-gray-800">{ch.title}</p>
                        <p className="mt-1 text-xs text-gray-500">Proof required for completion</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Toasts */}
        <div className="pointer-events-none fixed bottom-4 right-4 z-50 space-y-2">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto rounded-md bg-gray-900/90 px-4 py-2 text-sm text-white shadow-lg transition-opacity">
              {t.message}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ChallengesSimple


