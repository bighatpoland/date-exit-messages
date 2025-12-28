import React, { useState, useEffect } from 'react'

const loadingMessages = [
  "Loading emergency exit strategies...",
  "Preparing awkward date excuses...",
  "Calibrating panic button...",
  "Fetching believable lies...",
  "Warming up escape routes...",
  "Syncing with your inner saboteur...",
  "Almost ready to bail...",
]

export default function Landing({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 50) // 5 seconds * 10 updates/sec = 50 steps
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500) // Small delay after 100%
          return 100
        }
        return newProgress
      })
    }, 100)

    // Transition after 3 seconds instead of waiting for full progress
    const transitionTimeout = setTimeout(onComplete, 3000)

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length)
    }, 800) // Change message every 800ms

    return () => {
      clearInterval(interval)
      clearTimeout(transitionTimeout)
      clearInterval(messageInterval)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Oh No, Emergency!</h1>
        <p className="text-lg text-gray-600 mb-8">Your ultimate date escape toolkit</p>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 animate-pulse">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        <div className="text-xs text-gray-400 mt-8">
          Remember: Use responsibly. Don't actually be in real emergencies.
        </div>
      </div>
    </div>
  )
}