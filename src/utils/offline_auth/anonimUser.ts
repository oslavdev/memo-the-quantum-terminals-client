type GameMemoType = {
  score: number
  strike: number
  mistakes: number
  userId: string
  id: string
  level: number
  totalScore: number
}

type UserType = {
  id: string
  username: string
  email: string
  created_at: Date
  firstName?: string
  secondName?: string
  password?: string
}

/** Create local user without registration */
export function createAnonimUser(ip: string, username = 'anonim') {
  const today = new Date()

  const User: UserType = {
    id: '1',
    username,
    created_at: today,
    email: 'anonim@memo.com',
  }

  const Game: GameMemoType = {
    score: 0,
    totalScore: 0,
    mistakes: 0,
    strike: 0,
    userId: '1',
    id: '1',
    level: 1,
  }

  localStorage.setItem('user', JSON.stringify(User))
  localStorage.setItem('game', JSON.stringify(Game))
}

export function deleteAnonimUser() {
  localStorage.clear()
}
