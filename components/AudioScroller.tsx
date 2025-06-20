import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioScrollerProps {
  audioSrc: string
  title?: string
  scrollTargetRef: React.RefObject<HTMLElement | HTMLDivElement>
  description?: string
}

export default function AudioScroller({ audioSrc, title = "Écouter l'histoire", scrollTargetRef, description }: AudioScrollerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
        setIsLoading(false)
      }
    }
    const handleEnded = () => {
      setIsPlaying(false)
      // window.scrollTo({ top: 0, behavior: 'smooth' }) // Désactivé pour ne plus ramener à 0
    }
    const handleLoadedData = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
        setIsLoading(false)
      }
    }
    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
        setIsLoading(false)
      }
    }
    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
        setIsLoading(false)
      }
    }
    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
    }
    const handleLoadStart = () => {
      setIsLoading(true)
      setHasError(false)
    }

    // Fallback pour la durée
    const forceLoadDuration = () => {
      if (audio.readyState >= 1) {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration)
          setIsLoading(false)
        }
      }
    }
    const durationTimeout = setTimeout(() => {
      forceLoadDuration()
    }, 2000)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.load()

    return () => {
      clearTimeout(durationTimeout)
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('durationchange', handleDurationChange)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        if (!duration || duration === 0) {
          audioRef.current.load()
          setTimeout(() => {
            if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
              setDuration(audioRef.current.duration)
              setIsLoading(false)
            }
          }, 500)
        }
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-pink-200 min-w-[300px] max-w-[400px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-bold text-pink-600 text-sm">{title}</h3>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="text-pink-500 hover:text-pink-700 active:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300/40 rounded-full transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        crossOrigin="anonymous"
      />
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={togglePlay}
          className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 text-white p-2 rounded-full shadow-md hover:from-pink-500 hover:to-rose-500 focus:outline-none focus:ring-2 focus:ring-pink-300/40 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <span className="text-xs text-pink-600 min-w-[40px] font-medium">
          {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : (isLoading ? '...' : '--:--')}
        </span>
      </div>
      <div className="text-xs text-pink-400">
        {hasError ? "Erreur de chargement de l'audio" :
         isLoading ? "Chargement de l'audio..." :
         duration === 0 ? "Audio non disponible" :
         isPlaying ? "Lecture en cours" : description || "Cliquez pour écouter"}
      </div>
      <style jsx>{`
        .slider {
          background: linear-gradient(to right, #ec4899 0%, #ec4899 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #fce7f3 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #fce7f3 100%);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: 2px solid #fff1f2;
          box-shadow: 0 2px 4px rgba(236,72,153,0.2);
        }
        .slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: 2px solid #fff1f2;
          box-shadow: 0 2px 4px rgba(236,72,153,0.2);
        }
        .slider::-webkit-slider-track {
          background: #fce7f3;
          border-radius: 8px;
          height: 8px;
        }
        .slider::-moz-range-track {
          background: #fce7f3;
          border-radius: 8px;
          height: 8px;
          border: none;
        }
      `}</style>
    </div>
  )
} 