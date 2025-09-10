// Default credit mapping by difficulty
const CREDITS_BY_DIFFICULTY = {
  easy: 10,
  medium: 25,
  hard: 50,
}

// Badge thresholds
const BRONZE = 100
const SILVER = 250
const GOLD = 500

function calculateCredits(challenge) {
  if (!challenge) return 0
  if (typeof challenge.points === 'number') return Math.max(0, challenge.points)
  const mapValue = CREDITS_BY_DIFFICULTY[challenge.difficulty] ?? 0
  return Math.max(0, mapValue)
}

// Apply completion rules and compute awarded credits.
// - If proof exists and challenge requires proof (simulated rule), award full credits
// - If no proof, award partial credits (default 50%)
// Returns a number of credits to award
function applyCompletionRules(user, challenge, proof, { partialRate = 0.5 } = {}) {
  const base = calculateCredits(challenge)
  // Simulate: hard challenges require proof; others optional
  const requiresProof = (challenge?.difficulty || '').toLowerCase() === 'hard'

  const hasProof = Boolean(proof)
  if (requiresProof) {
    return hasProof ? base : Math.round(base * partialRate)
  }
  return hasProof ? base : Math.round(base * partialRate)
}

export { CREDITS_BY_DIFFICULTY, calculateCredits, applyCompletionRules, BRONZE, SILVER, GOLD }


