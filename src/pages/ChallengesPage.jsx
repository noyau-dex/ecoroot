import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ChallengeCard from '../components/ChallengeCard.jsx'
import { useChallenges } from '../contexts/ChallengesContext.jsx'

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

function ChallengesPage() {
  const { challenges, fetchChallenges, currentUser, completeChallenge, joinChallenge } = useChallenges()
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [search, setSearch] = useState('')
  const [progressById, setProgressById] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { toasts, push } = useToasts()

  // Initial fetch
  useEffect(() => {
    if (!challenges?.length) fetchChallenges()
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
    if (sort === 'Highest points') list.sort((a, b) => b.points - a.points)
    return list
  }, [challenges, category, difficulty, sort, search])

  const getUserProgress = (challengeId, durationDays) => {
    const pr = progressById[challengeId] || { joined: false, progressDays: 0, completed: false }
    // if completed in context, reflect it
    const completed = (currentUser.completedChallenges || []).some((c) => c.challengeId === challengeId)
    const merged = { ...pr, completed }
    if (completed) merged.progressDays = durationDays
    return merged
  }

  const handleJoin = async (challenge) => {
    await joinChallenge(challenge.id)
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: { joined: true, progressDays: 0, completed: false },
    }))
  }

  const handleMarkComplete = async (challenge) => {
    const curr = getUserProgress(challenge.id, challenge.durationDays)
    const nextDays = Math.min(challenge.durationDays, (curr.progressDays || 0) + 1)
    const isFinal = nextDays >= challenge.durationDays
    if (isFinal) {
      const beforeCredits = currentUser.credits
      await completeChallenge(challenge.id)
      const earned = challenge.points
      const gained = Math.max(0, earned)
      if (gained > 0 && currentUser.credits + gained >= beforeCredits) {
        push(`+${gained} credits earned!`)
      } else {
        push('Challenge completed!')
      }
    }
    setProgressById((prev) => ({
      ...prev,
      [challenge.id]: { joined: true, progressDays: nextDays, completed: isFinal || curr.completed },
    }))
  }

  const handleUploadProof = async (challenge, file) => {
    await completeChallenge(challenge.id, file)
    push('Proof uploaded')
  }

  const activeItems = useMemo(() => {
    return Object.entries(progressById)
      .map(([challengeId, pr]) => ({ challengeId, ...pr }))
      .filter((x) => x.joined && !x.completed)
  }, [progressById])

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Eco Challenges</h1>
        <p className="mt-1 text-sm text-gray-600">Join challenges, track your progress, and earn credits for eco-friendly actions.</p>
      </div>

      {/* Filters: stack on mobile, grid on larger screens */}
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
          {/* Cards responsive grid; single-column on small screens */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((ch) => {
              const progress = getUserProgress(ch.id, ch.durationDays)
              return (
                <ChallengeCard
                  key={ch.id}
                  challenge={ch}
                  userProgress={progress}
                  onJoin={() => handleJoin(ch)}
                  onMarkComplete={() => handleMarkComplete(ch)}
                  onUploadProof={(file) => handleUploadProof(ch, file)}
                />
              )
            })}
          </div>
        </div>

        <aside className={`lg:col-span-4 xl:col-span-3 ${sidebarOpen ? '' : 'hidden lg:block'}`}>
          <div className="sticky top-4 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-700">Your credits</h2>
                <button
                  type="button"
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="inline-flex rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{currentUser.credits}</p>
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
                {activeItems.map(({ challengeId, progressDays }) => {
                  const ch = challenges.find((c) => c.id === challengeId)
                  if (!ch) return null
                  const pct = Math.min(100, Math.round(((progressDays || 0) / Math.max(1, ch.durationDays)) * 100))
                  return (
                    <div key={challengeId} className="rounded border border-gray-100 p-3">
                      <p className="text-sm font-medium text-gray-800">{ch.title}</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-green-600" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{progressDays || 0} / {ch.durationDays} days</p>
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
  )
}

export default ChallengesPage


