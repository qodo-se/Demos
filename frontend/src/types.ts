export interface Room {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  _count?: {
    messages: number
  }
}

export interface Message {
  id: string
  content: string
  username: string
  roomId: string
  createdAt: string
}
