import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getChallenges as apiGetChallenges, joinChallenge as apiJoinChallenge, completeChallenge as apiCompleteChallenge, redeemReward as apiRedeemReward } from '../services/mockApi.js'
import verificationService from '../services/verificationService.js'

const LOCAL_STORAGE_KEY = 'ecoroot.currentUser'

const defaultUser = {
  id: 'u1',
  name: 'Aarav',
  credits: 120, // legacy field maintained for compatibility/UI where needed
  ecoPoints: 120,
  completedChallenges: [],
  role: 'student', // Default role - will be set during login
  score: 120, // Total score for leaderboard (never decreases)
  certificates: [], // Array of earned certificates
  claimedRewards: [], // Array of claimed physical rewards
}

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return defaultUser
    const parsed = JSON.parse(raw)
    return {
      ...defaultUser,
      ...parsed,
      ecoPoints: parsed.ecoPoints ?? parsed.credits ?? defaultUser.ecoPoints,
      credits: parsed.credits ?? parsed.ecoPoints ?? defaultUser.credits,
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
      credits: user.credits, // keep writing legacy for compatibility
      ecoPoints: user.ecoPoints,
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

  const fetchChallenges = async (roleOverride) => {
    const roleToUse = roleOverride || currentUser.role
    const list = await apiGetChallenges(roleToUse)
    setChallenges(list)
    return list
  }

  const joinChallenge = async (challengeId) => {
    const result = await apiJoinChallenge(currentUser.id, challengeId)
    // Optional: could track joined status locally; not required for now
    return result
  }

  const completeChallenge = async (challengeId, proofFile, proofType = 'camera') => {
    let proofUrl = null
    if (proofFile instanceof File) {
      proofUrl = URL.createObjectURL(proofFile)
    } else if (typeof proofFile === 'string') {
      proofUrl = proofFile
    }

    // Submit for verification first
    const verificationId = await verificationService.submitForVerification(
      challengeId, 
      proofFile, 
      proofType, 
      currentUser.id
    )

    // Store challenge as pending verification
    setCurrentUser((prev) => {
      const already = (prev.completedChallenges || []).some((c) => c.challengeId === challengeId)
      const updated = {
        ...prev,
        completedChallenges: already
          ? prev.completedChallenges
          : [
              ...prev.completedChallenges,
              { 
                challengeId, 
                proofUrl: proofUrl || null, 
                proofType, 
                completedAt: new Date().toISOString(),
                verificationId,
                verificationStatus: 'pending'
              },
            ],
      }
      return updated
    })

    // Return verification info instead of immediate completion
    return {
      verificationId,
      status: 'pending',
      message: 'Proof submitted for verification. Credits will be awarded after verification.'
    }
  }

  const redeemReward = async (rewardId, cost) => {
    const res = await apiRedeemReward(currentUser.id, rewardId, cost)
    setCurrentUser((prev) => ({ ...prev, credits: res.newCredits ?? res.newEcoPoints, ecoPoints: res.newEcoPoints ?? res.newCredits }))
    return res
  }

  // Check verification status and award credits if verified
  const checkVerificationStatus = async (verificationId) => {
    const verification = verificationService.getVerificationStatus(verificationId)
    
    if (verification && verification.status !== 'pending') {
      // Update the challenge status
      setCurrentUser((prev) => ({
        ...prev,
        completedChallenges: prev.completedChallenges.map(challenge => 
          challenge.verificationId === verificationId 
            ? { ...challenge, verificationStatus: verification.status }
            : challenge
        )
      }))

      // Award credits if verified (only once)
      if (verification.status === 'verified') {
        const challenge = challenges.find(c => c.id === verification.challengeId)
        if (challenge) {
          // Check if credits were already awarded for this verification
          const alreadyAwarded = currentUser.completedChallenges?.some(c => 
            c.challengeId === verification.challengeId && 
            c.verificationId === verificationId && 
            c.verificationStatus === 'verified'
          )
          
          if (!alreadyAwarded) {
            const newCredits = (currentUser.ecoPoints ?? currentUser.credits) + challenge.points
            const newScore = currentUser.score + challenge.points
            setCurrentUser((prev) => ({ 
              ...prev, 
              credits: newCredits,
              ecoPoints: newCredits,
              score: newScore 
            }))
            return {
              verified: true,
              creditsAwarded: challenge.points, // legacy name retained for UI compatibility
              newCredits, // legacy
              newEcoPoints: newCredits,
              newScore,
              message: verification.message
            }
          } else {
            return {
              verified: true,
              creditsAwarded: 0,
              newCredits: currentUser.credits,
              newEcoPoints: currentUser.ecoPoints ?? currentUser.credits,
              message: verification.message
            }
          }
        }
      }
      
      return {
        verified: false,
        message: verification.message
      }
    }
    
    return {
      verified: false,
      message: 'Verification still pending...'
    }
  }

  const login = async (userData) => {
    const newUser = {
      ...defaultUser,
      ...userData,
      role: userData.role || 'student', // Ensure role is set
      ecoPoints: userData.ecoPoints ?? userData.credits ?? defaultUser.ecoPoints,
      credits: userData.credits ?? userData.ecoPoints ?? defaultUser.credits,
      score: userData.score || userData.credits || userData.ecoPoints || 0, // Preserve score
    }
    setCurrentUser(newUser)
    // Refetch challenges with the new role immediately
    await fetchChallenges(newUser.role)
    return newUser
  }

  const claimCertificate = async (certificateType) => {
    const certificateOrder = ['basic', 'advanced', 'expert']
    const certificateCosts = {
      'basic': 1000,
      'advanced': 2000,
      'expert': 3000
    }
    
    const cost = certificateCosts[certificateType]
    if (!cost || (currentUser.ecoPoints ?? currentUser.credits) < cost) {
      return { success: false, message: 'Insufficient credits' }
    }
    
    // Check if user already has this certificate
    const hasCertificate = currentUser.certificates?.some(cert => cert.type === certificateType)
    if (hasCertificate) {
      return { success: false, message: 'Certificate already claimed' }
    }
    
    // Check if user has reached max certificates (3)
    if (currentUser.certificates?.length >= 3) {
      return { success: false, message: 'Maximum certificates reached (3)' }
    }
    
    // Check if user has the required previous certificates
    const currentIndex = certificateOrder.indexOf(certificateType)
    if (currentIndex > 0) {
      const requiredPreviousCert = certificateOrder[currentIndex - 1]
      const hasPreviousCert = currentUser.certificates?.some(cert => cert.type === requiredPreviousCert)
      if (!hasPreviousCert) {
        return { 
          success: false, 
          message: `You must first earn the ${requiredPreviousCert} certificate before claiming the ${certificateType} certificate` 
        }
      }
    }
    
    const newCertificate = {
      type: certificateType,
      claimedAt: new Date().toISOString(),
      cost: cost
    }
    
    setCurrentUser(prev => ({
      ...prev,
      credits: 0, // legacy reset
      ecoPoints: 0, // Reset Eco-Points to 0
      certificates: [...(prev.certificates || []), newCertificate]
    }))
    
    return { success: true, message: `${certificateType} certificate claimed! Credits reset to 0.` }
  }

  const claimReward = async (rewardId, rewardCost) => {
    if ((currentUser.ecoPoints ?? currentUser.credits) < rewardCost) {
      return { success: false, message: 'Insufficient credits' }
    }
    
    // Check if user already claimed this reward
    const hasReward = currentUser.claimedRewards?.some(reward => reward.id === rewardId)
    if (hasReward) {
      return { success: false, message: 'Reward already claimed' }
    }
    
    const newReward = {
      id: rewardId,
      claimedAt: new Date().toISOString(),
      cost: rewardCost
    }
    
    setCurrentUser(prev => ({
      ...prev,
      credits: prev.credits - rewardCost, // legacy
      ecoPoints: (prev.ecoPoints ?? prev.credits) - rewardCost, // Deduct Eco-Points
      claimedRewards: [...(prev.claimedRewards || []), newReward]
    }))
    
    return { success: true, message: `Reward claimed! ${rewardCost} credits deducted.` }
  }

  const value = useMemo(
    () => ({ challenges, currentUser, fetchChallenges, joinChallenge, completeChallenge, redeemReward, checkVerificationStatus, login }),
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


