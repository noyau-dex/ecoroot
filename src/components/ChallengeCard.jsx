import { useRef } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

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
  userProgress = { joined: false, progressDays: 0, completed: false },
  onJoin,
  onMarkComplete,
  onUploadProof,
}) {
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file && onUploadProof) onUploadProof(file)
    // reset so selecting same file triggers change again
    e.target.value = ''
  }

  const { id, title, description, difficulty, durationDays, points, image } = challenge
  const { joined, progressDays, completed } = userProgress

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:shadow-md"
      tabIndex={0}
      aria-labelledby={`ch-title-${id}`}
      role="region"
    >
      {image ? (
        <img src={image} alt="Challenge banner" className="h-40 w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.01]" />
      ) : (
        <div className="h-40 w-full bg-gray-100" />
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 id={`ch-title-${id}`} className="text-base font-semibold text-gray-900">
            {title}
          </h3>
          <DifficultyPill level={difficulty} />
        </div>

        <p className="mt-1 line-clamp-3 text-sm text-gray-600">{description}</p>

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
          <div className="flex items-center gap-1" aria-label={`Earn ${points} credits`}>
            <StarIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" />
            <span>{points} credits</span>
          </div>
        </div>

        {joined && !completed && (
          <ProgressBar totalDays={durationDays} progressDays={progressDays} />
        )}

        {/* Action buttons pinned to bottom with mt-auto */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center mt-auto">
          {!joined && (
            <button
              type="button"
              onClick={onJoin}
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-green-700 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
              aria-label={`Join challenge to earn ${points} credits`}
            >
              Join (Earn {points} credits)
            </button>
          )}

          {joined && !completed && (
            <button
              type="button"
              onClick={onMarkComplete}
              className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-emerald-700 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
              aria-label={progressDays + 1 >= durationDays ? 'Mark challenge complete' : 'Mark day complete'}
            >
              {progressDays + 1 >= durationDays ? 'Mark Complete' : 'Mark Day Complete'}
            </button>
          )}

          {joined && completed && (
            <button
              type="button"
              onClick={handleUploadClick}
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-150 hover:bg-gray-50 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
              aria-label="Upload proof for completed challenge"
              aria-controls={`proof-input-${id}`}
            >
              Upload Proof
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="sr-only"
            onChange={handleFileChange}
            aria-label="Proof file input"
            id={`proof-input-${id}`}
          />
        </div>
      </div>
    </article>
  )
}

export default ChallengeCard


