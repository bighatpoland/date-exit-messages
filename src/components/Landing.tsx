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
        const newProgress = prev + (100 / 30) // 3 seconds * 10 updates/sec = 30 steps
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return newProgress
      })
    }, 100)

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length)
    }, 600)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 p-6 animate-fade-in">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8 animate-bounce-gentle">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-float">
            <span className="text-5xl">🚨</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          Oh No, Emergency!
        </h1>
        <p className="text-lg text-gray-700 mb-8 font-medium">Your ultimate date escape toolkit</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white rounded-full h-3 mb-3 shadow-inner overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 animate-pulse min-h-[2rem] flex items-center justify-center">
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 mt-12 bg-white bg-opacity-60 rounded-lg p-3 backdrop-blur-sm">
          <p className="font-medium">⚠️ Disclaimer</p>
          <p className="mt-1">Use responsibly. Not for actual emergencies.</p>
        </div>
      </div>
    </div>
  )
}
