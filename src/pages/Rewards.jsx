import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getTopThree } from '../services/leaderboard'

function Certificate({ rank, name, points, onDownloadClick }) {
  const color = rank === 1 ? 'from-yellow-200 to-yellow-50 border-yellow-400' : rank === 2 ? 'from-gray-200 to-gray-50 border-gray-400' : 'from-amber-200 to-amber-50 border-amber-400'
  const title = rank === 1 ? 'Gold Award' : rank === 2 ? 'Silver Award' : 'Bronze Award'
  return (
    <div className={`relative mx-auto w-full max-w-xl rounded-2xl border bg-gradient-to-br ${color} p-6 shadow`}> 
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Certificate of Excellence</h2>
        <p className="mt-1 text-sm text-gray-600">Awarded for outstanding eco-friendly achievements</p>
      </div>
      <div className="mt-6 rounded-xl bg-white/70 p-6">
        <p className="text-sm text-gray-600">This is to certify that</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{name}</p>
        <p className="mt-2 text-sm text-gray-700">has achieved</p>
        <p className="mt-1 text-xl font-medium text-gray-800">Rank #{rank} • {title}</p>
        <p className="mt-1 text-sm text-gray-700">with {points} points on the EcoRoot Leaderboard</p>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-left text-xs text-gray-600">
            <p>Ecoroot Council</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p>Signature</p>
            <p>EcoRoot Team</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onDownloadClick}
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        >
          Download Certificate
        </button>
      </div>
    </div>
  )
}

export default function Rewards() {
  const winners = useMemo(() => getTopThree(), [])
  const refs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  }

  const handleDownload = (rank) => {
    const node = refs[rank]?.current
    if (!node) return
    // Simple print-to-PDF flow as a baseline. Users can Save as PDF.
    const html = node.outerHTML
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`<!doctype html><html><head><title>Certificate Rank ${rank}</title><style>body{display:flex;justify-content:center;align-items:center;padding:24px;background:#f8fafc;font-family:ui-sans-serif,system-ui;}</style></head><body>${html}</body></html>`) 
    win.document.close()
    win.focus()
    win.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/leaderboard" className="text-green-700 hover:text-green-600">← Back to Leaderboard</Link>
          <h1 className="text-3xl font-bold text-green-800">Rewards & Certificates</h1>
          <div />
        </div>

        <p className="mx-auto mb-6 max-w-2xl text-center text-gray-700">Top three students on the leaderboard receive an EcoRoot Certificate. Download your certificate below.</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {winners.map((w) => (
            <div key={w.rank} ref={refs[w.rank]}> 
              <Certificate
                rank={w.rank}
                name={w.name}
                points={w.points}
                onDownloadClick={() => handleDownload(w.rank)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


