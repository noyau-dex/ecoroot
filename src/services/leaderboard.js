// Centralized leaderboard data and helpers

const leaderboardData = [
  { rank: 1, name: 'Manish Singh', points: 980, club: 'Prakarti MSIT' },
  { rank: 2, name: 'Satyajeet Kumar', points: 920, club: 'Prakarti MSIT' },
  { rank: 3, name: 'Yash Gupta', points: 870, club: 'Prakarti MSIT' },
  { rank: 4, name: 'Nikhil', points: 830, club: 'Other' },
  { rank: 5, name: 'Dhruv', points: 790, club: 'Other' },
  { rank: 6, name: 'Nishika Dhankhar', points: 750, club: 'Other' },
]

export function getLeaderboardData() {
  return leaderboardData
}

export function getTopThree() {
  return leaderboardData.filter((x) => x.rank >= 1 && x.rank <= 3)
}

export function getImageByRank(rank) {
  switch (rank) {
    case 1:
      return 'https://img.icons8.com/emoji/96/1st-place-medal-emoji.png'
    case 2:
      return 'https://img.icons8.com/emoji/96/2nd-place-medal-emoji.png'
    case 3:
      return 'https://img.icons8.com/emoji/96/3rd-place-medal-emoji.png'
    default:
      return 'https://img.icons8.com/color/96/deciduous-tree.png'
  }
}

export default { getLeaderboardData, getTopThree, getImageByRank }


