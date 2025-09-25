import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useChallenges } from '../contexts/ChallengesContext.jsx'
import Navbar from "../components/navbar"
// Certificate Component
function Certificate({ type, cost, onClaim, canClaim, isClaimed, userEcoPoints, userCertificates }) {
  const certificateInfo = {
    basic: {
      title: 'Basic Environmental Certificate',
      description: 'Awarded for demonstrating commitment to environmental conservation',
      color: 'from-green-200 to-green-50 border-green-400',
      icon: '🌱'
    },
    advanced: {
      title: 'Advanced Environmental Certificate',
      description: 'Awarded for significant contributions to environmental sustainability',
      color: 'from-blue-200 to-blue-50 border-blue-400',
      icon: '🌍'
    },
    expert: {
      title: 'Expert Environmental Certificate',
      description: 'Awarded for exceptional leadership in environmental conservation',
      color: 'from-purple-200 to-purple-50 border-purple-400',
      icon: '🏆'
    }
  }

  const info = certificateInfo[type]
  
  // Check if previous certificate is required
  const certificateOrder = ['basic', 'advanced', 'expert']
  const currentIndex = certificateOrder.indexOf(type)
  const requiresPrevious = currentIndex > 0
  const requiredPreviousCert = requiresPrevious ? certificateOrder[currentIndex - 1] : null
  const hasPreviousCert = requiresPrevious ? userCertificates.some(cert => cert.type === requiredPreviousCert) : true
  
  const isDisabled = !canClaim || isClaimed || userEcoPoints < cost || !hasPreviousCert

  return (
    <div className={`relative rounded-2xl border bg-gradient-to-br ${info.color} p-6 shadow-lg`}>
      <div className="text-center">
        <div className="text-4xl mb-2">{info.icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{info.title}</h3>
        <p className="mt-2 text-sm text-gray-700">{info.description}</p>
        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-800">
            Cost: {cost} Eco-Points
          </span>
        </div>
      </div>
      
      <div className="mt-6">
        {isClaimed ? (
          <div className="text-center">
            <div className="text-green-600 text-sm font-medium">✅ Certificate Earned</div>
            <div className="text-xs text-gray-600 mt-1">Claimed successfully!</div>
          </div>
        ) : (
          <button
            onClick={() => onClaim(type)}
            disabled={isDisabled}
            className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {!hasPreviousCert 
              ? `Requires ${requiredPreviousCert} certificate first`
              : userEcoPoints < cost 
                ? `Need ${cost - userEcoPoints} more Eco-Points` 
                : 'Claim Certificate'
            }
          </button>
        )}
      </div>
    </div>
  )
}

// NGO Reward Component
function NGOReward({ reward, onClaim, canClaim, isClaimed, userEcoPoints }) {
  const isDisabled = !canClaim || isClaimed || userEcoPoints < reward.cost

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{reward.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">{reward.cost} Eco-Points</span>
            <span className="text-xs text-gray-500">{reward.ngo}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {isClaimed ? (
          <div className="text-center">
            <div className="text-green-600 text-sm font-medium">✅ Reward Claimed</div>
            <div className="text-xs text-gray-600 mt-1">Contact {reward.ngo} for details</div>
          </div>
        ) : (
          <button
            onClick={() => onClaim(reward.id, reward.cost)}
            disabled={isDisabled}
            className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {userEcoPoints < reward.cost ? `Need ${reward.cost - userEcoPoints} more Eco-Points` : 'Claim Reward'}
          </button>
        )}
      </div>
    </div> 
  )
}

export default function Rewards() {
  const { currentUser, claimCertificate, claimReward } = useChallenges()
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const showMessage = (text, type = 'info') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleClaimCertificate = async (type) => {
    const result = await claimCertificate(type)
    if (result.success) {
      showMessage(result.message, 'success')
    } else {
      showMessage(result.message, 'error')
    }
  }

  const handleClaimReward = async (rewardId, cost) => {
    const result = await claimReward(rewardId, cost)
    if (result.success) {
      showMessage(result.message, 'success')
    } else {
      showMessage(result.message, 'error')
    }
  }

  // Certificate data
  const certificates = [
    { type: 'basic', cost: 1000 },
    { type: 'advanced', cost: 2000 },
    { type: 'expert', cost: 3000 }
  ]

  // NGO Rewards data
  const ngoRewards = [
    {
      id: 'ngo1',
      name: 'Tree Sapling Kit',
      description: 'Get 5 native tree saplings with planting guide',
      cost: 500,
      icon: '🌳',
      ngo: 'Green Earth Foundation'
    },
    {
      id: 'ngo2',
      name: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle with EcoRoot branding',
      cost: 600,
      icon: '🍶',
      ngo: 'Clean Water Initiative'
    },
    {
      id: 'ngo3',
      name: 'Solar Power Bank',
      description: 'Portable solar charger for mobile devices',
      cost: 800,
      icon: '☀️',
      ngo: 'Renewable Energy Society'
    },
    {
      id: 'ngo4',
      name: 'Composting Kit',
      description: 'Home composting bin with starter materials',
      cost: 700,
      icon: '♻️',
      ngo: 'Waste Warriors'
    },
    {
      id: 'ngo5',
      name: 'Bamboo Cutlery Set',
      description: 'Eco-friendly bamboo utensils and straws',
      cost: 400,
      icon: '🥢',
      ngo: 'Plastic-Free India'
    },
    {
      id: 'ngo6',
      name: 'Organic Seeds Pack',
      description: 'Collection of organic vegetable and herb seeds',
      cost: 450,
      icon: '🌱',
      ngo: 'Organic Farmers Association'
    },
    {
      id: 'ngo7',
      name: 'Eco Workshop Invitation',
      description: 'Free entry to environmental conservation workshop',
      cost: 550,
      icon: '🎓',
      ngo: 'Environmental Education Center'
    },
    {
      id: 'ngo8',
      name: 'Recycled Notebook Set',
      description: 'Set of 3 notebooks made from recycled paper',
      cost: 350,
      icon: '📓',
      ngo: 'Paper Recycling Co-op'
    }
  ]

  const userCertificates = currentUser.certificates || []
  const userClaimedRewards = currentUser.claimedRewards || []

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/challenges" className="text-green-700 hover:text-green-600">← Back to Challenges</Link>
          <h1 className="text-3xl font-bold text-green-800">Rewards & Certificates</h1>
          <div />
        </div>

        {/* User Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Current Eco-Points</div>
            <div className="text-2xl font-bold text-green-600">{currentUser.ecoPoints}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Total Score</div>
            <div className="text-2xl font-bold text-blue-600">{currentUser.score}</div>
            <div className="text-xs text-gray-500">For leaderboard ranking</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Certificates Earned</div>
            <div className="text-2xl font-bold text-purple-600">{userCertificates.length}/3</div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' ? 'bg-green-100 text-green-800' : 
            messageType === 'error' ? 'bg-red-100 text-red-800' : 
            'bg-blue-100 text-blue-800'
          }`}>
            {message}
          </div>
        )}

        {/* Certificates Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Environmental Certificates</h2>
          <p className="text-gray-600 mb-4">
            Earn certificates by accumulating Eco-Points. Each certificate resets your Eco-Points to 0 but preserves your total score for leaderboard ranking.
          </p>
          
          {/* Certificate Progress */}
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Certificate Progress</span>
              <span className="text-sm text-gray-600">{userCertificates.length}/3 certificates earned</span>
            </div>
            <div className="flex gap-2">
              {['basic', 'advanced', 'expert'].map((certType, index) => {
                const isEarned = userCertificates.some(cert => cert.type === certType)
                const isAvailable = index === 0 || userCertificates.some(cert => cert.type === ['basic', 'advanced', 'expert'][index - 1])
                return (
                  <div
                    key={certType}
                    className={`flex-1 h-2 rounded-full ${
                      isEarned 
                        ? 'bg-green-500' 
                        : isAvailable 
                          ? 'bg-gray-200' 
                          : 'bg-gray-100'
                    }`}
                    title={`${certType} certificate ${isEarned ? 'earned' : isAvailable ? 'available' : 'locked'}`}
                  />
                )
              })}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Certificates must be earned in order: Basic → Advanced → Expert
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Certificate
                key={cert.type}
                type={cert.type}
                cost={cert.cost}
                onClaim={handleClaimCertificate}
                canClaim={(currentUser.ecoPoints ?? 0) >= cert.cost}
                isClaimed={userCertificates.some(c => c.type === cert.type)}
                userEcoPoints={currentUser.ecoPoints ?? 0}
                userCertificates={userCertificates}
              />
            ))}
          </div>
        </div>

        {/* NGO Rewards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">NGO Collaboration Rewards</h2>
          <p className="text-gray-600 mb-6">
            Exchange your Eco-Points for physical rewards from our partner NGOs. Eco-Points are deducted but your score remains for leaderboard ranking.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ngoRewards.map((reward) => (
              <NGOReward
                key={reward.id}
                reward={reward}
                onClaim={handleClaimReward}
                canClaim={(currentUser.ecoPoints ?? 0) >= reward.cost}
                isClaimed={userClaimedRewards.some(r => r.id === reward.id)}
                userEcoPoints={currentUser.ecoPoints ?? 0}
              />
            ))}
          </div>
        </div>

        {/* Earned Certificates Display */}
        {userCertificates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Earned Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userCertificates.map((cert, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">{cert.type} Certificate</div>
                      <div className="text-sm text-gray-600">
                        Earned on {new Date(cert.claimedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claimed Rewards Display */}
        {userClaimedRewards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Claimed Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userClaimedRewards.map((reward, index) => {
                const rewardInfo = ngoRewards.find(r => r.id === reward.id)
                return (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{rewardInfo?.icon || '🎁'}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{rewardInfo?.name || 'Reward'}</div>
                        <div className="text-sm text-gray-600">
                          Claimed on {new Date(reward.claimedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Contact {rewardInfo?.ngo || 'NGO'} for delivery details
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}