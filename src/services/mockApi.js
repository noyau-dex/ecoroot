// In-memory mock data for challenges
const challenges = [
  {
    id: 'c1',
    title: 'Segregate Household Waste for 3 Days',
    description:
      'Separate wet and dry waste at home for 3 consecutive days. Upload daily photos of bins as proof.',
    category: 'Waste Management',
    difficulty: 'easy',
    points: 20,
    durationDays: 3,
    image: '/images/segregate-waste.png',
    requiresProof: true, // students must upload photo proof
  },
  {
    id: 'c2',
    title: 'Carry a Reusable Bottle and Bag',
    description:
      'Use a reusable water bottle and shopping bag for 2 days. Upload photos while using them (e.g., in class, canteen, or shop).',
    category: 'Sustainability',
    difficulty: 'easy',
    points: 15,
    durationDays: 2,
    image: '/images/reusable-bottle.png',
    requiresProof: true,
  },
  {
    id: 'c3',
    title: 'Plant a Sapling',
    description:
      'Plant a tree/sapling in your home, society, or campus. Upload a photo of you with the sapling.',
    category: 'Environment',
    difficulty: 'medium',
    points: 30,
    durationDays: 1,
    image: '/images/plant-sapling.png',
    requiresProof: true,
  },
  {
    id: 'c4',
    title: 'Clean a Nearby Public Area',
    description:
      'Do a cleanup activity (park, street, playground, or society area). Upload a before-and-after photo as proof.',
    category: 'Community',
    difficulty: 'hard',
    points: 40,
    durationDays: 1,
    image: '/images/cleanup.png',
    requiresProof: true,
  },
]

// Minimal local persistence for credits to align with ChallengesContext expectations
const CREDITS_STORAGE_KEY = 'ecoroot.mockApi.credits'

function getStoredCredits() {
  try {
    const raw = localStorage.getItem(CREDITS_STORAGE_KEY)
    const num = Number(raw)
    return Number.isFinite(num) ? num : 120 // default matches defaultUser in context
  } catch (_) {
    return 120
  }
}

function setStoredCredits(value) {
  try {
    localStorage.setItem(CREDITS_STORAGE_KEY, String(value))
  } catch (_) {
    // ignore write errors (e.g., SSR/no storage)
  }
}

// Simulate network latency
function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getChallenges() {
  await delay(150)
  return challenges
}

export async function joinChallenge(userId, challengeId) {
  await delay(150)
  // No-op for now; in a real API, we would persist the join
  return { success: true, userId, challengeId }
}

export async function completeChallenge(userId, challengeId, proofUrl = null) {
  await delay(200)
  const challenge = challenges.find((c) => c.id === challengeId)
  const current = getStoredCredits()
  const earned = challenge ? challenge.points : 0
  const newCredits = current + earned
  setStoredCredits(newCredits)
  return { success: true, userId, challengeId, proofUrl, earned, newCredits }
}

export async function redeemReward(userId, rewardId, cost) {
  await delay(150)
  const current = getStoredCredits()
  const newCredits = Math.max(0, current - Number(cost || 0))
  setStoredCredits(newCredits)
  return { success: true, userId, rewardId, cost, newCredits }
}

export default {
  getChallenges,
  joinChallenge,
  completeChallenge,
  redeemReward,
}
