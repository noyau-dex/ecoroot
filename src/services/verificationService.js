// Demo AI Verification Service
// This will be replaced with real Express backend + AI later

class VerificationService {
  constructor() {
    this.pendingVerifications = new Map()
    this.verificationResults = new Map()
  }

  // Submit proof for verification
  async submitForVerification(challengeId, proofFile, proofType, userId) {
    const verificationId = `${userId}_${challengeId}_${Date.now()}`
    
    // Store verification data
    const verificationData = {
      id: verificationId,
      challengeId,
      proofFile,
      proofType,
      userId,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      message: 'Verification under process...'
    }
    
    this.pendingVerifications.set(verificationId, verificationData)
    
    // Simulate AI verification process (2-5 seconds delay)
    setTimeout(() => {
      this.processVerification(verificationId)
    }, Math.random() * 3000 + 2000) // 2-5 seconds
    
    return verificationId
  }

  // Process verification with demo AI
  async processVerification(verificationId) {
    const verification = this.pendingVerifications.get(verificationId)
    if (!verification) return

    try {
      // Demo AI verification logic
      const isVerified = await this.demoAIVerification(verification)
      
      const result = {
        ...verification,
        status: isVerified ? 'verified' : 'rejected',
        verifiedAt: new Date().toISOString(),
        message: isVerified 
          ? 'Proof verified successfully! Eco-Points awarded.' 
          : 'Proof rejected. Image may be duplicate or not meet requirements.'
      }
      
      this.verificationResults.set(verificationId, result)
      this.pendingVerifications.delete(verificationId)
      
      return result
    } catch (error) {
      const result = {
        ...verification,
        status: 'error',
        verifiedAt: new Date().toISOString(),
        message: 'Verification failed. Please try again.'
      }
      
      this.verificationResults.set(verificationId, result)
      this.pendingVerifications.delete(verificationId)
      
      return result
    }
  }

  // Enhanced AI verification for real environmental challenges
  async demoAIVerification(verification) {
    const challengeId = verification.challengeId
    
    // Simulate various checks based on challenge type:
    
    // 1. Check if image is too similar to previous submissions (85% chance of passing)
    const isUnique = Math.random() > 0.15
    
    // 2. Check if image meets quality requirements (90% chance of passing)
    const meetsQuality = Math.random() > 0.1
    
    // 3. Check if image appears to be from camera (not stock photo) (80% chance of passing)
    const appearsReal = Math.random() > 0.2
    
    // 4. Challenge-specific verification
    let matchesChallenge = true
    
    switch (challengeId) {
      case 'c1': // Tree Planting & Care
        // Check for sapling and person together, growth progress
        matchesChallenge = Math.random() > 0.15
        break
      case 'c2': // Zero Single-Use Plastic
        // Check for reusable items in different locations
        matchesChallenge = Math.random() > 0.25
        break
      case 'c3': // Energy Conservation
        // Check for meter readings and energy-saving setup
        matchesChallenge = Math.random() > 0.25
        break
      case 'c4': // Community Cleanup
        // Check for before/after photos
        matchesChallenge = Math.random() > 0.2
        break
      case 'c5': // Waste Segregation
        // Check for segregated bins with clear separation
        matchesChallenge = Math.random() > 0.2
        break
      case 'c6': // Water Conservation
        // Check for water-saving techniques
        matchesChallenge = Math.random() > 0.2
        break
      // Festival challenges
      case 'f1': // Diwali Cleanup
        // Check for firecracker waste and cleanup process
        matchesChallenge = Math.random() > 0.2
        break
      case 'f2': // Dussehra Effigy Cleanup
        // Check for effigy remains and cleanup
        matchesChallenge = Math.random() > 0.25
        break
      case 'f3': // Ganesh Chaturthi Eco-Friendly
        // Check for eco-friendly materials and proper disposal
        matchesChallenge = Math.random() > 0.2
        break
      case 'f4': // Holi Color Cleanup
        // Check for color waste and cleanup process
        matchesChallenge = Math.random() > 0.25
        break
      case 'f5': // Navratri Decoration Cleanup
        // Check for decorative materials and cleanup
        matchesChallenge = Math.random() > 0.2
        break
      case 'f6': // Eid-ul-Fitr Green Celebration
        // Check for eco-friendly celebration materials
        matchesChallenge = Math.random() > 0.15
        break
      // Teacher challenges
      case 't1': // Campus Tree Plantation Drive
        // Check for group photos, students, trees being planted
        matchesChallenge = Math.random() > 0.15
        break
      case 't2': // Eco-Awareness Workshop
        // Check for workshop setup, students, presentation materials
        matchesChallenge = Math.random() > 0.2
        break
      case 't3': // Campus Cleanup Campaign
        // Check for cleanup activities, students, waste segregation
        matchesChallenge = Math.random() > 0.18
        break
      default:
        matchesChallenge = Math.random() > 0.1
    }
    
    // 5. Check for face visibility (all challenges are camera-based)
    const hasFace = Math.random() > 0.2
    
    // 6. Check for timestamp consistency (90% chance of passing)
    const hasValidTimestamp = Math.random() > 0.1
    
    // Overall verification (all checks must pass)
    return isUnique && meetsQuality && appearsReal && matchesChallenge && hasFace && hasValidTimestamp
  }

  // Get verification status
  getVerificationStatus(verificationId) {
    return this.verificationResults.get(verificationId) || 
           this.pendingVerifications.get(verificationId)
  }

  // Get all pending verifications for a user
  getPendingVerifications(userId) {
    const pending = []
    for (const [id, verification] of this.pendingVerifications) {
      if (verification.userId === userId) {
        pending.push(verification)
      }
    }
    return pending
  }

  // Get all completed verifications for a user
  getCompletedVerifications(userId) {
    const completed = []
    for (const [id, verification] of this.verificationResults) {
      if (verification.userId === userId) {
        completed.push(verification)
      }
    }
    return completed
  }

  // Check if user has pending verification for a challenge
  hasPendingVerification(userId, challengeId) {
    for (const [id, verification] of this.pendingVerifications) {
      if (verification.userId === userId && verification.challengeId === challengeId) {
        return verification
      }
    }
    return null
  }
}

// Create singleton instance
const verificationService = new VerificationService()

export default verificationService
