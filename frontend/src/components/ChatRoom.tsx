import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Room, Message } from '../types'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'

interface ChatRoomProps {
  room: Room
  username: string
}

function ChatRoom({ room, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Connect to socket
    const newSocket = io(SOCKET_URL)
    setSocket(newSocket)

    // Handle connection errors
    newSocket.on('connect_error', () => {
      setConnectionError('Failed to connect to chat server')
      setIsLoading(false)
    })

    // Join room
    newSocket.emit('joinRoom', { roomId: room.id, username })

    // Listen for room history
    newSocket.on('roomHistory', (data: { messages: Message[] }) => {
      if (data.messages) {
        setMessages(data.messages)
      }
      setIsLoading(false)
    })

    // Listen for new messages
    newSocket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    // Listen for user joined
    newSocket.on('userJoined', (data: { username: string }) => {
      console.log(`${data.username} joined the room`)
    })

    // Listen for user left
    newSocket.on('userLeft', (data: { username: string }) => {
      console.log(`${data.username} left the room`)
    })

    // Listen for typing indicators
    newSocket.on('userTyping', (data: { username: string; isTyping: boolean }) => {
      setIsTyping((prev) => ({
        ...prev,
        [data.username]: data.isTyping,
      }))
    })

    // Cleanup
    return () => {
      newSocket.emit('leaveRoom', { roomId: room.id, username })
      newSocket.close()
    }
  }, [room.id, username])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && socket) {
      socket.emit('sendMessage', {
        roomId: room.id,
        username,
        content: newMessage,
      })
      setNewMessage('')
      
      // Stop typing indicator
      socket.emit('typing', {
        roomId: room.id,
        username,
        isTyping: false,
      })
    }
  }

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)

    if (!socket) return

    // Send typing indicator
    socket.emit('typing', {
      roomId: room.id,
      username,
      isTyping: true,
    })

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', {
        roomId: room.id,
        username,
        isTyping: false,
      })
    }, 1000)
  }

  const typingUsers = Object.entries(isTyping)
    .filter(([user, typing]) => typing && user !== username)
    .map(([user]) => user)

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-800">{room.name}</h2>
        <p className="text-sm text-gray-500">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : connectionError ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-2 text-sm font-semibold">{connectionError}</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="mt-2 text-sm">No messages yet</p>
              <p className="text-xs text-gray-400">Be the first to send a message!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.username === username ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.username === username
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                {message.username !== username && (
                  <p className="text-xs font-semibold mb-1">{message.username}</p>
                )}
                <p className="break-words">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.username === username ? 'text-indigo-200' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="px-4 py-2 text-sm text-gray-500">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
