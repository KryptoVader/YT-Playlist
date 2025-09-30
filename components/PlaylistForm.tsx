'use client'

import { useState } from 'react'
import { Clock, Loader2, Play, Video, Sparkles, ArrowRight } from 'lucide-react'

type PlaylistResult = {
  playlistId: string
  title: string
  thumbnail: string
  videoCount: number
  totalSeconds: number
  duration: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

export default function PlaylistForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<PlaylistResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)

    try {
      const response = await fetch('/api/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process playlist')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setUrl('')
    setResult(null)
    setError('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {!result ? (
        <div className="relative animate-fade-in-up">
          <div className="neon-border-wrapper">
            <div className="relative glass-light dark:glass-dark rounded-3xl p-8 md:p-16 overflow-hidden">
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-cyan-500/30 mb-4 md:mb-6 animate-scale-in">
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-cyan-300">
                    Free YouTube Playlist Calculator
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in px-4">
                  <span className="gradient-text dark:gradient-text-dark">
                    Calculate Playlist
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">
                    Duration Instantly
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
                  Get the total watch time of any YouTube playlist in seconds.
                  Perfect for planning your learning journey or binge-watching schedule.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                  <div className="relative">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste your YouTube playlist URL here..."
                      className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-base md:text-lg rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 outline-none transition-all duration-300"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-1">
                  <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">Example: https://www.youtube.com/playlist?list=PLxxxxxx</span>
                </div>

                {error && (
                  <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 animate-scale-in">
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !url}
                  className="group relative w-full py-4 sm:py-5 md:py-6 px-6 sm:px-8 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-base sm:text-lg">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                        <span>Analyzing Playlist...</span>
                      </>
                    ) : (
                      <>
                        <span>Calculate Duration</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800/50 border border-gray-100 dark:border-dark-700/50">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">Instant Results</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Get duration in seconds</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800/50 border border-gray-100 dark:border-dark-700/50">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex-shrink-0">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">Any Playlist</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Works with all public playlists</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-800/50 border border-gray-100 dark:border-dark-700/50">
                  <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">100% Free</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">No signup required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative animate-fade-in-up">
          <div className="neon-border-wrapper">
            <div className="relative glass-light dark:glass-dark rounded-3xl p-8 md:p-12">
              
              {/* Playlist Header - Minimal */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200 dark:border-slate-700/50">
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="w-full sm:w-32 md:w-48 h-auto sm:h-20 md:h-28 object-cover rounded-xl shadow-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0 w-full">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 sm:truncate">
                    {result.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                    <Video className="w-4 h-4" />
                    <span>{result.videoCount} videos</span>
                  </div>
                </div>
              </div>

              {/* Total Duration - Hero Number */}
              <div className="text-center mb-6 md:mb-8 px-4">
                <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2 md:mb-3 font-medium">
                  Total Duration
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-1 md:mb-2 break-all">
                  <span className="gradient-text dark:gradient-text-dark">
                    {result.totalSeconds.toLocaleString()}
                  </span>
                </div>
                <div className="text-base sm:text-lg text-gray-600 dark:text-slate-400 font-medium">
                  seconds
                </div>
              </div>

              {/* Breakdown - Clean Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {result.duration.days}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Days
                  </div>
                </div>

                <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {result.duration.hours}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Hours
                  </div>
                </div>

                <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {result.duration.minutes}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Mins
                  </div>
                </div>

                <div className="text-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {result.duration.seconds}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                    Secs
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 sm:py-4 px-6 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm sm:text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                Calculate Another Playlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}