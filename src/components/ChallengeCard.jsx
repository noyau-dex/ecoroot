import { useRef, useState, useEffect } from 'react'
import { StarIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import ProofUpload from './ProofUpload.jsx'
import { useChallenges } from '../contexts/ChallengesContext'

// Card shows a single challenge with progress and actions.
// Tailwind-first, mobile-first. Focus states and subtle micro-interactions included.

function DifficultyPill({ level = 'easy' }) {
  const color =
    level === 'hard'
      ? 'bg-red-100 text-red-700'
      : level === 'medium'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-green-100 text-green-700'
  const label = level.charAt(0).toUpperCase() + level.slice(1)
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
      aria-label={`Difficulty: ${label}`}
    >
      {label}
    </span>
  )
}

function ProgressBar({ totalDays = 1, progressDays = 0 }) {
  const pct = Math.min(100, Math.round(((progressDays || 0) / Math.max(1, totalDays)) * 100))
  return (
    <div className="mt-2" aria-label={`Progress: ${pct}%`}>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-green-600" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-gray-500">{progressDays || 0} / {totalDays} days</p>
    </div>
  )
}

function ChallengeCard({
  challenge,
  userProgress = { joined: false, progressDays: 0, completed: false, dailyProofs: {} },
  onJoin,
  onMarkComplete,
  onUploadProof,
  onDailyProof,
  proofType = 'camera',
  userRole = 'student',
}) {
  const { checkVerificationStatus } = useChallenges()
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [isCheckingVerification, setIsCheckingVerification] = useState(false)
  const [showGuidelines, setShowGuidelines] = useState(false)

  const { id, title, description, photoGuidelines, difficulty, durationDays, points, image, festival, isActive, teacherRole, targetAudience, maxStudents } = challenge
  const { joined, progressDays, completed, lastMarkTime } = userProgress

  // Check verification status for challenges submitted for verification
  useEffect(() => {
    if (userProgress.verificationId) {
      const checkStatus = async () => {
        setIsCheckingVerification(true)
        try {
          const result = await checkVerificationStatus(userProgress.verificationId)
          setVerificationStatus(result)
        } catch (error) {
          console.error('Failed to check verification status:', error)
        } finally {
          setIsCheckingVerification(false)
        }
      }
      
      checkStatus()
      // Check every 3 seconds if still pending
      const interval = setInterval(checkStatus, 3000)
      return () => clearInterval(interval)
    }
  }, [completed, userProgress.verificationId, checkVerificationStatus])

  // Calculate cooldown status
  const isOnCooldown = () => {
    if (!lastMarkTime) return false
    const now = new Date()
    const lastMark = new Date(lastMarkTime)
    const timeDiff = now.getTime() - lastMark.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)
    return hoursDiff < 24
  }

  const getRemainingHours = () => {
    if (!lastMarkTime) return 0
    const now = new Date()
    const lastMark = new Date(lastMarkTime)
    const timeDiff = now.getTime() - lastMark.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)
    return Math.ceil(24 - hoursDiff)
  }

  const cooldownActive = isOnCooldown()
  const remainingHours = getRemainingHours()

  return (
    <article
      className="group flex flex-col self-start overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md"
      tabIndex={0}
      aria-labelledby={`ch-title-${id}`}
      role="region"
    >
      {image ? (
        <img src={image} alt="Challenge banner" className="height-50 width-50 object-cover transition-transform duration-200 ease-out group-hover:scale-[1.01]" />
      ) : (
        <div className="h-40 w-full bg-gray-100" />
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 id={`ch-title-${id}`} className="text-base font-semibold text-gray-900">
              {title}
            </h3>
            {festival && (
              <div className="mt-1 flex items-center gap-1">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                  🎉 {festival} Special
                </span>
                {isActive && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    🔥 Active Now
                  </span>
                )}
              </div>
            )}
            
            {teacherRole && (
              <div className="mt-1 flex items-center gap-1">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  👨‍🏫 Teacher Led
                </span>
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                  👥 For {targetAudience}
                </span>
                {maxStudents && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                    Max {maxStudents} students
                  </span>
                )}
              </div>
            )}
          </div>
          <DifficultyPill level={difficulty} />
        </div>

        <p className="mt-1 line-clamp-3 text-sm text-gray-600">{description}</p>

        {/* Photo Guidelines (collapsible) */}
        {photoGuidelines && (
          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-start gap-2">
              <svg className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-blue-800">Photo Guidelines for Verification</p>
                  <button
                    type="button"
                    onClick={() => setShowGuidelines((v) => !v)}
                    className="text-[11px] font-medium text-blue-700 hover:text-blue-800 focus:outline-none"
                    aria-expanded={showGuidelines}
                    aria-controls={`guidelines-${id}`}
                  >
                    {showGuidelines ? 'Read less' : 'Read more'}
                  </button>
                </div>
                <div
                  id={`guidelines-${id}`}
                  className={`mt-1 text-xs text-blue-700 overflow-hidden transition-all duration-1000 ease-in-out ${showGuidelines ? 'max-h-[1000px]' : 'max-h-10'}`}
                  aria-hidden={!showGuidelines}
                >
                  <p className={`${showGuidelines ? '' : 'line-clamp-2'}`}>{photoGuidelines}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1" aria-label={`Duration ${durationDays} days`}>
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{durationDays} days</span>
          </div>
          <div className="flex items-center gap-1" aria-label={`Earn ${points} Eco-Points`}>
            <StarIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" />
            <span>{points} Eco-Points</span>
          </div>
        </div>

        {joined && !completed && proofType === 'camera' && (
          <ProgressBar totalDays={durationDays} progressDays={progressDays} />
        )}

        {/* Local simple mode: show under-process panel when verificationPending */}
        {userProgress.verificationPending && (
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-yellow-600 mr-2 animate-spin" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Verification Under Process</p>
                <p className="text-xs text-yellow-600">Please wait while we verify your proof...</p>
              </div>
            </div>
          </div>
        )}

        {/* Proof Submission for Camera-based Challenges */}
        {joined && !completed && proofType === 'camera' && progressDays < durationDays && !userProgress.verificationId && !userProgress.verificationPending && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-blue-800">
                  {durationDays > 1 ? `Day ${progressDays + 1} Proof Required` : 'Proof Required'}
                </h4>
                <p className="text-xs text-blue-600">
                  {durationDays > 1 
                    ? `Take a live photo for day ${progressDays + 1}. Multiple photos will update day ${progressDays + 1} only.`
                    : 'Take a live photo to complete this challenge'
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={cooldownActive}
                  onClick={() => {
                    if (cooldownActive) return
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.capture = 'environment'
                    // Force camera only - no gallery access
                    input.setAttribute('capture', 'environment')
                    input.setAttribute('data-camera', 'true')
                    input.onchange = (e) => {
                      const file = e.target.files?.[0]
                      if (file && onDailyProof) {
                        // Add timestamp to ensure it's a fresh photo
                        const timestamp = new Date().toISOString()
                        onDailyProof(challenge, file, progressDays + 1, timestamp)
                      }
                    }
                    input.click()
                  }}
                  className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    cooldownActive
                      ? 'bg-gray-400 cursor-not-allowed'
                      : userProgress.dailyProofs?.[progressDays + 1] 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {cooldownActive 
                    ? `Wait ${remainingHours}h`
                    : userProgress.dailyProofs?.[progressDays + 1] 
                      ? 'Retake Photo' 
                      : 'Take Live Photo'
                  }
                </button>
              </div>
            </div>
            
            {/* Show proof status for current day */}
            {userProgress.dailyProofs?.[progressDays + 1] && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-green-600">
                    <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    {durationDays > 1 
                      ? `Proof submitted for day ${progressDays + 1}`
                      : 'Proof submitted'
                    }
                  </div>
                  <div className="text-xs text-gray-500">
                    Click "Retake Photo" to update
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  📸 Previous photos are saved for verification
                </div>
              </div>
            )}
            
            {/* Show cooldown status */}
            {cooldownActive && (
              <div className="mt-2 flex items-center text-xs text-orange-600">
                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                Next day available in {remainingHours} hours
              </div>
            )}

            {/* Show previous day photos */}
            {userProgress.dailyProofs && Object.keys(userProgress.dailyProofs).length > 0 && (
              <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-xs font-medium text-gray-700">Saved Photos for Verification</span>
                </div>
                <div className="space-y-1">
                  {Object.entries(userProgress.dailyProofs)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([day, proof]) => (
                      <div key={day} className="flex items-center justify-between text-xs text-gray-600">
                        <span>Day {day}: {new Date(proof.submittedAt).toLocaleDateString()}</span>
                        <span className="text-green-600">✓ Saved</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certificate Upload for Certificate-based Challenges */}
        {joined && !completed && proofType === 'upload' && !userProgress.verificationPending && (
          <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-purple-800">
                  Certificate Required
                </h4>
                <p className="text-xs text-purple-600">
                  Upload your certificate or proof to complete this challenge
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*,application/pdf'
                    input.onchange = (e) => {
                      const file = e.target.files?.[0]
                      if (file && onUploadProof) {
                        onUploadProof(file)
                      }
                    }
                    input.click()
                  }}
                  className="inline-flex items-center rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons pinned to bottom with mt-auto */}
        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
          {!joined && (
            <button
              type="button"
              onClick={onJoin}
              disabled={festival && !isActive}
              className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto ${
                festival && !isActive
                  ? 'bg-gray-400 cursor-not-allowed'
                  : teacherRole && userRole === 'teacher'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : teacherRole && userRole === 'student'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              aria-label={
                festival && !isActive
                  ? `Festival challenge - Available during ${festival}`
                  : teacherRole && userRole === 'teacher'
                  ? `Assign challenge to students (Earn ${points} Eco-Points)`
                  : teacherRole && userRole === 'student'
                  ? `Teacher-led challenge - Only teachers can assign`
                  : `Join challenge to earn ${points} Eco-Points`
              }
            >
              {festival && !isActive
                ? `Available during ${festival}`
                : teacherRole && userRole === 'teacher'
                ? `Assign to Students (${points} Eco-Points)`
                : teacherRole && userRole === 'student'
                ? `Teacher Assignment Only`
                : `Join (Earn ${points} Eco-Points)`
              }
            </button>
          )}

          {joined && !completed && progressDays < durationDays && proofType === 'camera' && !userProgress.verificationPending && (
            <button
              type="button"
              onClick={onMarkComplete}
              disabled={
                !userProgress.dailyProofs?.[progressDays + 1] || 
                cooldownActive
              }
              className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto ${
                !userProgress.dailyProofs?.[progressDays + 1] || cooldownActive
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
              aria-label={progressDays + 1 >= durationDays ? 'Mark challenge complete' : 'Mark day complete'}
            >
              {cooldownActive
                ? `Wait ${remainingHours}h`
                : !userProgress.dailyProofs?.[progressDays + 1]
                  ? 'Submit Proof First'
                  : progressDays + 1 >= durationDays 
                    ? 'Mark Complete' 
                    : 'Mark Day Complete'
              }
            </button>
          )}

          {joined && completed && proofType === 'upload' && (
            <div className="w-full">
              <ProofUpload 
                uploadProof={onUploadProof} 
                proofType={proofType}
              />
            </div>
          )}

          {/* Verification Status Display */}
          {userProgress.verificationId && verificationStatus && (
            <div className="mt-4 w-full">
              {verificationStatus.verified ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Verification Complete!</p>
                      <p className="text-xs text-green-600">
                        {verificationStatus.creditsAwarded && `+${verificationStatus.creditsAwarded} Eco-Points awarded!`}
                      </p>
                    </div>
                  </div>
                </div>
              ) : verificationStatus.message === 'Verification still pending...' ? (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-yellow-600 mr-2 animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Verification Under Process</p>
                      <p className="text-xs text-yellow-600">
                        AI is analyzing your proof. This may take a few minutes...
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Verification Failed</p>
                      <p className="text-xs text-red-600">{verificationStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {joined && completed && proofType === 'camera' && !userProgress.verificationPending && (
            <div className="w-full rounded-lg border border-gray-200 bg-green-50 p-4">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-green-800">Camera Proof Required</h3>
                <p className="mt-1 text-xs text-green-600">
                  This challenge requires a live photo taken with your camera. Camera only - no gallery uploads allowed.
                </p>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Create a file input for camera capture only
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'image/*'
                      input.capture = 'environment'
                      // Force camera only - no gallery access
                      input.setAttribute('capture', 'environment')
                      input.setAttribute('data-camera', 'true')
                      input.onchange = (e) => {
                        const file = e.target.files?.[0]
                        if (file && onUploadProof) {
                          onUploadProof(file)
                        }
                      }
                      input.click()
                    }}
                    className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Take Live Photo
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </article>
  )
}

export default ChallengeCard


