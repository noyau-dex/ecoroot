import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getChallenges as apiGetChallenges, joinChallenge as apiJoinChallenge, completeChallenge as apiCompleteChallenge, redeemReward as apiRedeemReward } from '../services/mockApi.js'

const LOCAL_STORAGE_KEY = 'ecoroot.currentUser'

const defaultUser = {
  id: 'u1',
  name: 'Aarav',
  credits: 120,
  completedChallenges: [],
}

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return defaultUser
    const parsed = JSON.parse(raw)
    return {
      ...defaultUser,
      ...parsed,
    }
  } catch (_) {
    return defaultUser
  }
}

function saveUserToStorage(user) {
  try {
    const minimal = {
      id: user.id,
      name: user.name,
      credits: user.credits,
      completedChallenges: user.completedChallenges || [],
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(minimal))
  } catch (_) {
    // ignore
  }
}

const ChallengesContext = createContext(null)

function ChallengesProvider({ children }) {
  const [challenges, setChallenges] = useState([])
  const [currentUser, setCurrentUser] = useState(loadUserFromStorage)

  useEffect(() => {
    saveUserToStorage(currentUser)
  }, [currentUser.credits, currentUser.completedChallenges])

  const fetchChallenges = async () => {
    const list = await apiGetChallenges()
    setChallenges(list)
    return list
  }

  const joinChallenge = async (challengeId) => {
    const result = await apiJoinChallenge(currentUser.id, challengeId)
    // Optional: could track joined status locally; not required for now
    return result
  }

  const completeChallenge = async (challengeId, proofFile) => {
    let proofUrl = null
    if (proofFile instanceof File) {
      proofUrl = URL.createObjectURL(proofFile)
    } else if (typeof proofFile === 'string') {
      proofUrl = proofFile
    }

    const result = await apiCompleteChallenge(currentUser.id, challengeId, proofUrl)

    setCurrentUser((prev) => {
      const already = (prev.completedChallenges || []).some((c) => c.challengeId === challengeId)
      const updated = {
        ...prev,
        credits: result.newCredits,
        completedChallenges: already
          ? prev.completedChallenges
          : [
              ...prev.completedChallenges,
              { challengeId, proofUrl: proofUrl || null, completedAt: new Date().toISOString() },
            ],
      }
      return updated
    })

    return result
  }

  const redeemReward = async (rewardId, cost) => {
    const res = await apiRedeemReward(currentUser.id, rewardId, cost)
    setCurrentUser((prev) => ({ ...prev, credits: res.newCredits }))
    return res
  }

  const value = useMemo(
    () => ({ challenges, currentUser, fetchChallenges, joinChallenge, completeChallenge, redeemReward }),
    [challenges, currentUser]
  )

  return <ChallengesContext.Provider value={value}>{children}</ChallengesContext.Provider>
}

function useChallenges() {
  const ctx = useContext(ChallengesContext)
  if (!ctx) throw new Error('useChallenges must be used within ChallengesProvider')
  return ctx
}

export { ChallengesContext, ChallengesProvider, useChallenges }
export default ChallengesProvider


