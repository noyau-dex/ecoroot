// In-memory mock data for challenges
const challenges = [
  {
    id: 'c1',
    title: 'Tree Planting & Care Challenge',
    description: 'Plant a native tree sapling and care for it for 30 days. Take photos of: 1) You planting the sapling, 2) Daily watering/checking, 3) Growth progress. Must show your face and the sapling.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Sapling clearly visible, 3) Planting process (digging, placing sapling, covering with soil), 4) Daily care (watering, checking), 5) Growth progress over time. Avoid: Blurry photos, sapling not visible, same photo daily.',
    category: 'Environment',
    difficulty: 'medium',
    points: 100,
    durationDays: 30,
    image: '/challenges-images/plant-sapling.png',
    requiresProof: true,
    proofType: 'camera',
  },
  {
    id: 'c2',
    title: 'Zero Single-Use Plastic Week',
    description: 'Avoid all single-use plastic items (bags, bottles, straws, containers) for 7 days. Take daily selfies with reusable alternatives (cloth bags, steel bottles, etc.) in different locations.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Reusable item in hand (cloth bag, steel bottle, etc.), 3) Different location each day (home, office, market, etc.), 4) Good lighting, 5) Show the reusable item being used. Avoid: Same location daily, plastic items visible, blurry photos.',
    category: 'Sustainability',
    difficulty: 'medium',
    points: 80,
    durationDays: 7,
    image: '/challenges-images/no-plastic.png',
    requiresProof: true,
    proofType: 'camera',
  },
  {
    id: 'c3',
    title: 'Energy Conservation Challenge',
    description: 'Reduce electricity consumption by 30% for 14 days. Take daily photos of: 1) Your electricity meter reading, 2) Room with minimal lighting, 3) Unplugged appliances. Must show meter reading clearly.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Electricity meter reading clearly visible, 3) Room with minimal lighting, 4) Unplugged appliances, 5) Different meter readings showing reduction. Avoid: Blurry meter readings, same meter reading daily, poor lighting.',
    category: 'Energy Conservation',
    difficulty: 'hard',
    points: 120,
    durationDays: 14,
    image: '/challenges-images/save-energy.png',
    requiresProof: true,
    proofType: 'camera',
  },
  {
    id: 'c4',
    title: 'Community Cleanup Drive',
    description: 'Organize and participate in a community cleanup (park, beach, street, or public area). Take before-and-after photos showing: 1) The area before cleanup, 2) You cleaning, 3) Collected waste, 4) Clean area after.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Before photo showing dirty area, 3) During cleanup (you cleaning), 4) Collected waste bags/piles, 5) After photo showing clean area. Avoid: Same area for before/after, no visible cleanup progress, blurry photos.',
    category: 'Community',
    difficulty: 'hard',
    points: 90,
    durationDays: 1,
    image: '/challenges-images/cleanup.png',
    requiresProof: true,
    proofType: 'camera',
  },
  {
    id: 'c5',
    title: 'Daily Waste Segregation Challenge',
    description: 'Separate wet and dry waste at home for 7 consecutive days. Take daily photos of your segregated waste bins showing clear separation. Photo must show your face and the bins together.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Two separate bins (wet & dry), 3) Clear labels on bins, 4) Good lighting, 5) Different background each day. Avoid: Blurry photos, same background daily, bins not clearly separated.',
    category: 'Waste Management',
    difficulty: 'easy',
    points: 60,
    durationDays: 7,
    image: '/challenges-images/segregate-waste.png',
    requiresProof: true,
    proofType: 'camera',
  },
  {
    id: 'c6',
    title: 'Water Conservation Mission',
    description: 'Implement water-saving techniques for 21 days. Take photos of: 1) Bucket bathing setup, 2) Rainwater collection, 3) Reusing water for plants, 4) Water meter reading. Must show conservation methods.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Bucket bathing setup, 3) Rainwater collection system, 4) Reusing water for plants, 5) Water meter reading. Avoid: Blurry photos, same setup daily, no visible conservation methods.',
    category: 'Environment',
    difficulty: 'medium',
    points: 85,
    durationDays: 21,
    image: '/challenges-images/water-conservation.png',
    requiresProof: true,
    proofType: 'camera',
  },
]

// Festival-based challenges that are only available during specific dates
const festivalChallenges = [
  {
    id: 'f1',
    title: 'Diwali Cleanup Challenge',
    description: 'Clean up firecracker waste and decorations from your neighborhood after Diwali celebrations. Take before-and-after photos showing the cleanup process and collected waste.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Before photo showing firecracker waste/decorations, 3) During cleanup process, 4) Collected waste bags, 5) Clean area after cleanup. Avoid: Same area for before/after, no visible cleanup progress, blurry photos.',
    category: 'Festival Cleanup',
    difficulty: 'medium',
    points: 100,
    durationDays: 3,
    image: '/challenges-images/diwali-cleanup.png',
    requiresProof: true,
    proofType: 'camera',
    festival: 'Diwali',
    startDate: '2024-10-31', // Diwali 2024
    endDate: '2024-11-05',
    isActive: false
  },
  {
    id: 'f2',
    title: 'Dussehra Effigy Cleanup',
    description: 'Clean up Ravana effigy remains and celebration waste after Dussehra. Document the cleanup process with photos showing the collected materials.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Effigy remains visible, 3) Cleanup process in action, 4) Collected waste materials, 5) Clean ground after cleanup. Avoid: Blurry photos, no visible effigy remains, same location daily.',
    category: 'Festival Cleanup',
    difficulty: 'hard',
    points: 120,
    durationDays: 2,
    image: '/challenges-images/dussehra-cleanup.png',
    requiresProof: true,
    proofType: 'camera',
    festival: 'Dussehra',
    startDate: '2024-10-12', // Dussehra 2024
    endDate: '2024-10-14',
    isActive: false
  },
  {
    id: 'f3',
    title: 'Ganesh Chaturthi Eco-Friendly Celebration',
    description: 'Use eco-friendly Ganesh idols and decorations, then properly dispose of them after immersion. Take photos of your eco-friendly setup and proper disposal process.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Eco-friendly idol and decorations, 3) Immersion process, 4) Proper disposal of materials, 5) Clean celebration area. Avoid: Non-eco-friendly materials, improper disposal, blurry photos.',
    category: 'Festival Sustainability',
    difficulty: 'medium',
    points: 90,
    durationDays: 5,
    image: '/challenges-images/Ganesh_Chaturthi-cleanup.png',
    requiresProof: true,
    proofType: 'camera',
    festival: 'Ganesh Chaturthi',
    startDate: '2024-09-07', // Ganesh Chaturthi 2024
    endDate: '2024-09-11',
    isActive: false
  },
  {
    id: 'f4',
    title: 'Holi Color Cleanup Mission',
    description: 'Clean up synthetic Holi colors and plastic waste from your area after Holi celebrations. Focus on removing harmful chemical colors and plastic packets.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Color-stained areas before cleanup, 3) Cleanup process in action, 4) Collected color waste and plastic, 5) Clean area after cleanup. Avoid: Same area for before/after, no visible color waste, blurry photos.',
    category: 'Festival Cleanup',
    difficulty: 'hard',
    points: 110,
    durationDays: 2,
    image: '/challenges-images/holi-cleanup.png',
    requiresProof: true,
    proofType: 'camera',
    festival: 'Holi',
    startDate: '2025-03-14', // Holi 2025
    endDate: '2025-03-16',
    isActive: false
  },
  {
    id: 'f5',
    title: 'Navratri Decoration Cleanup',
    description: 'Clean up decorative materials, flowers, and festival waste after Navratri celebrations. Organize proper disposal and recycling of materials.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Decorative materials before cleanup, 3) Cleanup and sorting process, 4) Recycled materials separated, 5) Clean celebration area. Avoid: Blurry photos, no visible decorations, same setup daily.',
    category: 'Festival Cleanup',
    difficulty: 'medium',
    points: 85,
    durationDays: 3,
    image: '/challenges-images/navratri-cleanup.png',
    requiresProof: true,
    proofType: 'camera',
    festival: 'Navratri',
    startDate: '2024-10-03', // Navratri 2024
    endDate: '2024-10-12',
    isActive: false
  },
  {
    id: 'f6',
    title: 'Eid-ul-Fitr Green Celebration',
    description: 'Celebrate Eid with eco-friendly practices - use biodegradable plates, avoid plastic decorations, and properly dispose of celebration waste.',
    photoGuidelines: '📸 Photo Requirements: 1) Your face clearly visible, 2) Eco-friendly celebration setup, 3) Biodegradable materials in use, 4) Proper waste disposal, 5) Clean celebration area. Avoid: Plastic materials, improper disposal, blurry photos.',
    category: 'Festival Sustainability',
    difficulty: 'easy',
    points: 70,
    durationDays: 2,
    image: '/challenges-images/eid-cleanup.png',
    requiresProof: true,
    proofType: 'camera',
    festival: 'Eid-ul-Fitr',
    startDate: '2025-03-30', // Eid-ul-Fitr 2025
    endDate: '2025-04-01',
    isActive: false
  }
]

// Teacher-based challenges (for teachers to assign to students)
const teacherChallenges = [
  {
    id: 't1',
    title: 'Campus Tree Plantation Drive',
    description: 'Organize a tree plantation drive on campus with students. Plant native trees and create awareness about environmental conservation. Teacher uploads proof of student participation and planted trees.',
    photoGuidelines: '📸 Teacher Upload Requirements: 1) Students participating in plantation, 2) Trees being planted, 3) Group photo with students, 4) Before/after photos of plantation area, 5) Students with planted saplings. Include: Student count, location, date, tree species.',
    category: 'Teacher Led',
    difficulty: 'medium',
    points: 200,
    durationDays: 1,
    image: '/challenges-images/campus-tree.png',
    requiresProof: true,
    proofType: 'upload',
    targetAudience: 'students',
    teacherRole: true,
    maxStudents: 50
  },
  {
    id: 't2',
    title: 'Eco-Awareness Workshop',
    description: 'Conduct an environmental awareness workshop for students. Cover topics like climate change, waste management, and sustainable living. Teacher uploads proof of workshop and student engagement.',
    photoGuidelines: '📸 Teacher Upload Requirements: 1) Workshop in progress with students, 2) Presentation slides visible, 3) Students taking notes/participating, 4) Interactive activities, 5) Group photo with all participants. Include: Student attendance, workshop duration, topics covered.',
    category: 'Teacher Led',
    difficulty: 'easy',
    points: 150,
    durationDays: 1,
    image: '/challenges-images/digital-certificate.png',
    requiresProof: true,
    proofType: 'upload',
    targetAudience: 'students',
    teacherRole: true,
    maxStudents: 100
  },
  {
    id: 't3',
    title: 'Campus Cleanup Campaign',
    description: 'Lead a comprehensive campus cleanup campaign with students. Segregate waste, clean different areas, and educate about proper waste disposal. Teacher uploads proof of cleanup and student participation.',
    photoGuidelines: '📸 Teacher Upload Requirements: 1) Students cleaning different campus areas, 2) Waste segregation in progress, 3) Before/after photos of cleaned areas, 4) Students with collected waste, 5) Educational session about waste management. Include: Areas cleaned, waste collected, student count.',
    category: 'Teacher Led',
    difficulty: 'hard',
    points: 250,
    durationDays: 1,
    image: '/challenges-images/segregate-waste.png',
    requiresProof: true,
    proofType: 'upload',
    targetAudience: 'students',
    teacherRole: true,
    maxStudents: 75
  }
]

// Function to check if a festival challenge should be active
function isFestivalActive(challenge) {
  const today = new Date()
  const startDate = new Date(challenge.startDate)
  const endDate = new Date(challenge.endDate)
  
  return today >= startDate && today <= endDate
}

// Function to get all challenges (regular + all festival challenges + teacher challenges)
function getAllChallenges() {
  const allFestivalChallenges = festivalChallenges.map(challenge => ({
    ...challenge,
    isActive: isFestivalActive(challenge)
  }))
  
  return [...challenges, ...allFestivalChallenges, ...teacherChallenges]
}


// Minimal local persistence for Eco-Points (backwards compatible with legacy 'credits')
const ECO_POINTS_STORAGE_KEY = 'ecoroot.mockApi.ecoPoints'
const LEGACY_CREDITS_STORAGE_KEY = 'ecoroot.mockApi.credits'

function getStoredEcoPoints() {
  try {
    const raw = localStorage.getItem(ECO_POINTS_STORAGE_KEY) ?? localStorage.getItem(LEGACY_CREDITS_STORAGE_KEY)
    const num = Number(raw)
    return Number.isFinite(num) ? num : 120 // default matches defaultUser in context
  } catch (_) {
    return 120
  }
}

function setStoredEcoPoints(value) {
  try {
    localStorage.setItem(ECO_POINTS_STORAGE_KEY, String(value))
  } catch (_) {
    // ignore write errors (e.g., SSR/no storage)
  }
}

// Backwards compatibility wrappers (do not remove until full migration)
function getStoredCredits() {
  return getStoredEcoPoints()
}
function setStoredCredits(value) {
  return setStoredEcoPoints(value)
}

// Simulate network latency
function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getChallenges(userRole = 'student') {
  await delay(150)
  const allChallenges = getAllChallenges()
  
  // Filter challenges based on user role
  if (userRole === 'teacher') {
    // Teachers see all challenges but teacher challenges are prioritized
    return allChallenges.sort((a, b) => {
      const aIsTeacher = a.teacherRole ? 1 : 0
      const bIsTeacher = b.teacherRole ? 1 : 0
      return bIsTeacher - aIsTeacher // Teacher challenges first
    })
  } else {
    // Students see regular and festival challenges only
    return allChallenges.filter(challenge => !challenge.teacherRole)
  }
}

export async function joinChallenge(userId, challengeId) {
  await delay(150)
  // No-op for now; in a real API, we would persist the join
  return { success: true, userId, challengeId }
}

export async function completeChallenge(userId, challengeId, proofUrl = null) {
  await delay(200)
  const challenge = challenges.find((c) => c.id === challengeId)
  const current = getStoredEcoPoints()
  const earned = challenge ? challenge.points : 0
  const newEcoPoints = current + earned
  setStoredEcoPoints(newEcoPoints)
  // Include legacy fields for compatibility
  return { success: true, userId, challengeId, proofUrl, ecoPointsEarned: earned, newEcoPoints, earned, newCredits: newEcoPoints }
}

export async function redeemReward(userId, rewardId, cost) {
  await delay(150)
  const current = getStoredEcoPoints()
  const newEcoPoints = Math.max(0, current - Number(cost || 0))
  setStoredEcoPoints(newEcoPoints)
  // Include legacy field for compatibility
  return { success: true, userId, rewardId, cost, newEcoPoints, newCredits: newEcoPoints }
}

export default {
  getChallenges,
  joinChallenge,
  completeChallenge,
  redeemReward,
}
