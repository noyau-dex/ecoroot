// Default Eco-Points mapping by difficulty
const ECO_POINTS_BY_DIFFICULTY = {
  easy: 10,
  medium: 25,
  hard: 50,
}

// Badge thresholds
const BRONZE = 100
const SILVER = 250
const GOLD = 500

function calculateEcoPoints(challenge) {
  if (!challenge) return 0
  if (typeof challenge.points === 'number') return Math.max(0, challenge.points)
  const mapValue = ECO_POINTS_BY_DIFFICULTY[challenge.difficulty] ?? 0
  return Math.max(0, mapValue)
}

// Apply completion rules and compute awarded Eco-Points.
// - If proof exists and challenge requires proof (simulated rule), award full Eco-Points
// - If no proof, award partial Eco-Points (default 50%)
// Returns a number of Eco-Points to award
function applyCompletionRules(user, challenge, proof, { partialRate = 0.5 } = {}) {
  const base = calculateEcoPoints(challenge)
  // Simulate: hard challenges require proof; others optional
  const requiresProof = (challenge?.difficulty || '').toLowerCase() === 'hard'

  const hasProof = Boolean(proof)
  if (requiresProof) {
    return hasProof ? base : Math.round(base * partialRate)
  }
  return hasProof ? base : Math.round(base * partialRate)
}

export { ECO_POINTS_BY_DIFFICULTY, calculateEcoPoints, applyCompletionRules, BRONZE, SILVER, GOLD }


