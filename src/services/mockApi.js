// Simple in-memory mock API for development.
// All functions simulate async behavior using setTimeout and return Promises.

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

// --- Sample Data ---
const challenges = [
  {
    id: 'c1',
    title: 'Segregate House Hold Waste for 7 Days',
    description:
      'Separate wet and dry waste daily for a week. Upload a daily photo of bin or final weekly photo.',
    category: 'Waste Management',
    difficulty: 'medium', // easy | medium | hard
    points: 25,
    durationDays: 7,
    image: '/images/segregate-waste.png',
    requiresProof: true,
  },
  {
    id: 'c2',
    title: 'Use Public Transport for 5 Days',
    description:
      'Replace car commutes with public transport or carpooling for at least five days.',
    category: 'Transport',
    difficulty: 'easy',
    points: 15,
    durationDays: 5,
    image: '/images/public-transport.png',
    requiresProof: false,
  },
  {
    id: 'c3',
    title: 'Go Plastic-Free for 3 Days',
    description:
      'Avoid single-use plastics, carry a reusable bottle and bags for three days.',
    category: 'Sustainability',
    difficulty: 'hard',
    points: 40,
    durationDays: 3,
    image: '/images/no-plastic.png',
    requiresProof: false,
  },
]

// Minimal user store with credits and challenge participation state
const users = [
  {
    id: 'u1',
    name: 'Aarav',
    credits: 120,
    joinedChallenges: [
      // { challengeId: 'c2', status: 'in_progress', joinedAt: 'ISO_STRING' }
    ],
    completedChallenges: [
      // { challengeId: 'c1', completedAt: 'ISO_STRING', proofUrl: '...' }
    ],
  },
  {
    id: 'u2',
    name: 'Diya',
    credits: 95,
    joinedChallenges: [],
    completedChallenges: [],
  },
  {
    id: 'u3',
    name: 'Kabir',
    credits: 60,
    joinedChallenges: [],
    completedChallenges: [],
  },
]

// In-memory proof submissions
// { id, userId, challengeId, proofUrl, status: 'pending' | 'approved' | 'rejected', createdAt }
const submissions = []

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function findUser(userId) {
  const user = users.find((u) => u.id === userId)
  if (!user) throw new Error('User not found')
  return user
}

function findChallenge(challengeId) {
  const ch = challenges.find((c) => c.id === challengeId)
  if (!ch) throw new Error('Challenge not found')
  return ch
}

// --- API ---
async function getChallenges() {
  await delay()
  return clone(challenges)
}

async function joinChallenge(userId, challengeId) {
  await delay()
  const user = findUser(userId)
  findChallenge(challengeId)

  const existing = user.joinedChallenges.find((j) => j.challengeId === challengeId)
  if (existing) {
    return clone({ ...existing, userId })
  }

  const joined = {
    challengeId,
    status: 'in_progress',
    joinedAt: new Date().toISOString(),
  }
  user.joinedChallenges.push(joined)
  return clone({ ...joined, userId })
}

async function completeChallenge(userId, challengeId, proofUrl) {
  await delay()
  const user = findUser(userId)
  const ch = findChallenge(challengeId)

  // Must be joined first
  let joined = user.joinedChallenges.find((j) => j.challengeId === challengeId)
  if (!joined) {
    // Auto-join if not joined, then continue
    joined = { challengeId, status: 'in_progress', joinedAt: new Date().toISOString() }
    user.joinedChallenges.push(joined)
  }

  // If already completed, just return current credits
  const alreadyCompleted = user.completedChallenges.some((c) => c.challengeId === challengeId)
  if (!alreadyCompleted) {
    const requiresProof = Boolean(ch.requiresProof)
    if (proofUrl) {
      // Route to verification flow: create a pending submission; don't award credits yet
      const sub = {
        id: `s_${Math.random().toString(36).slice(2, 10)}`,
        userId,
        challengeId,
        proofUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      submissions.push(sub)
    } else if (!requiresProof) {
      // No proof provided and not required: award immediately
      user.credits += ch.points
      user.completedChallenges.push({
        challengeId,
        completedAt: new Date().toISOString(),
        proofUrl: null,
      })
    } else {
      // Proof required but not provided: mark pending proof (no credit yet)
      // Optionally, a placeholder submission could be created; we simply defer awarding.
    }
  }

  // Update joined status
  joined.status = 'completed'
  joined.completedAt = new Date().toISOString()

  return clone({ userId, challengeId, newCredits: user.credits })
}

async function getLeaderboard(limit = 10) {
  await delay()
  const sorted = [...users].sort((a, b) => b.credits - a.credits)
  const top = sorted.slice(0, limit).map((u, rank) => ({
    userId: u.id,
    name: u.name,
    credits: u.credits,
    rank: rank + 1,
  }))
  return clone(top)
}

async function redeemReward(userId, rewardId, cost) {
  await delay()
  const user = findUser(userId)
  if (user.credits < cost) {
    const err = new Error('Not enough credits')
    err.code = 'INSUFFICIENT_CREDITS'
    throw err
  }
  user.credits -= cost
  // Generate a mock voucher code
  const voucher = `ECO-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`
  return clone({ userId, rewardId, newCredits: user.credits, voucher })
}

export { getChallenges, joinChallenge, completeChallenge, getLeaderboard, redeemReward }

async function submitProof(userId, challengeId, proofUrl) {
  await delay()
  findUser(userId)
  findChallenge(challengeId)
  const sub = {
    id: `s_${Math.random().toString(36).slice(2, 10)}`,
    userId,
    challengeId,
    proofUrl,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  submissions.push(sub)
  return clone(sub)
}

async function getPendingSubmissions() {
  await delay()
  return clone(
    submissions
      .filter((s) => s.status === 'pending')
      .map((s) => {
        const user = users.find((u) => u.id === s.userId)
        const ch = challenges.find((c) => c.id === s.challengeId)
        return {
          ...s,
          userName: user?.name || s.userId,
          challengeTitle: ch?.title || s.challengeId,
        }
      })
  )
}

async function approveProof(submissionId, approve = true) {
  await delay()
  const sub = submissions.find((s) => s.id === submissionId)
  if (!sub) throw new Error('Submission not found')
  if (sub.status !== 'pending') return clone(sub)
  const user = findUser(sub.userId)
  const ch = findChallenge(sub.challengeId)
  sub.status = approve ? 'approved' : 'rejected'
  sub.reviewedAt = new Date().toISOString()
  let newCredits = user.credits
  if (approve) {
    const alreadyCredited = user.completedChallenges.some((c) => c.challengeId === sub.challengeId)
    if (!alreadyCredited) {
      user.credits += ch.points
      user.completedChallenges.push({
        challengeId: sub.challengeId,
        completedAt: new Date().toISOString(),
        proofUrl: sub.proofUrl,
      })
      newCredits = user.credits
    }
  }
  return clone({ ...sub, newCredits })
}

export { submitProof, getPendingSubmissions, approveProof }


