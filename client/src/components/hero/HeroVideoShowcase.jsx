import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Code2, 
  Server, 
  Terminal, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  Laptop
} from 'lucide-react'

// Curated high-definition IT & Software Engineering video streams
const VIDEO_CHANNELS = [
  {
    id: 'coding',
    label: 'Software Engineering',
    tag: '4K Code Reel',
    icon: Code2,
    // High-resolution seamless loop: 4K Modern Developer Coding & Architecture Reel
    youtubeId: 'joiyb6c_Ry4',
    title: 'Full-Stack Software Architecture & Live Code Compilation',
    description: 'React, Node.js, Flutter, and high-concurrency microservices development.'
  },
  {
    id: 'cyber',
    label: 'Cloud & Systems',
    tag: 'Cloud Infra',
    icon: Server,
    // Cyber datacenter and high-tech system architecture loop
    youtubeId: 'H7m-J1q2t3E',
    title: 'Enterprise Cloud Clusters & Scalable Database Infrastructure',
    description: 'Automated CI/CD pipelines, Docker/Kubernetes orchestration, and MySQL/Postgres clusters.'
  },
  {
    id: 'terminal',
    label: 'Live Terminal',
    tag: 'Engine CLI',
    icon: Terminal,
    // Terminal visual mode with live telemetry
    isTerminal: true,
    title: 'Yatharth IT Solutions Production Engine Telemetry',
    description: 'Live sprint telemetry, REST API throughput, and Flutter mobile synchronization.'
  }
]

export default function HeroVideoShowcase() {
  const [activeChannel, setActiveChannel] = useState(VIDEO_CHANNELS[0])
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControlsHint, setShowControlsHint] = useState(false)
  const containerRef = useRef(null)

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#0D1527] text-white flex flex-col justify-between overflow-hidden select-none group"
      onMouseEnter={() => setShowControlsHint(true)}
      onMouseLeave={() => setShowControlsHint(false)}
    >
      {/* Ambient backdrop glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2457D6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5C542]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Channel Bar: Switch between IT Video Channels */}
      <div className="relative z-20 flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#101B35]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {VIDEO_CHANNELS.map((ch) => {
            const Icon = ch.icon
            const isActive = activeChannel.id === ch.id
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  setActiveChannel(ch)
                  setIsPlaying(true)
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#2457D6] text-white shadow-sm' 
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ch.label}</span>
              </button>
            )
          })}
        </div>

        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[10px] font-mono text-[#10B981] whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="font-bold">4K 60FPS REEL</span>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative flex-1 w-full h-full min-h-[280px] sm:min-h-[320px] bg-black overflow-hidden flex items-center justify-center">
        {activeChannel.isTerminal ? (
          /* =========================================================================
             LIVE INTERACTIVE TERMINAL VISUALIZER MODE
             ========================================================================= */
          <div className="w-full h-full p-4 sm:p-5 font-mono text-xs text-slate-200 bg-[#0A0F1D] flex flex-col justify-between overflow-y-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10 text-[11px]">
                <span>yatharth-it-cluster: v4.8.0 [x86_64-linux-prod]</span>
                <span className="text-[#10B981] flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse" />
                  <span>ALL SERVICES OPERATIONAL</span>
                </span>
              </div>

              <div className="text-[#F5C542] pt-1">
                $ yatharth deploy --target=production --cluster=asia-south1
              </div>
              <div className="text-slate-300">
                [OK] Compiled 2,601 frontend modules (Vite + React) in 1.4s
              </div>
              <div className="text-slate-300">
                [OK] Flutter engine initialized (Android APK &amp; iOS build ready)
              </div>
              <div className="text-slate-300">
                [OK] Enterprise ERP database connected: MySQL 8.0 cluster (14.2ms latency)
              </div>
              <div className="text-slate-300">
                [OK] EMS GPS geo-fence tracking daemon active on 1,240 endpoints
              </div>
              <div className="text-[#10B981] font-bold">
                ✓ 100% Verified Production Pipeline: Ready for client launch.
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Stack: Flutter • React • Node • PHP/Laravel • MySQL</span>
              <span className="text-[#2457D6] font-bold">Build #8492-STABLE</span>
            </div>
          </div>
        ) : (
          /* =========================================================================
             HIGH-DEFINITION 4K IT & SOFTWARE CODING VIDEO STREAM
             ========================================================================= */
          <div className="relative w-full h-full aspect-[16/10] overflow-hidden bg-black">
            {/* Embedded YouTube 4K Tech Video with Autoplay & Loop */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeChannel.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${activeChannel.youtubeId}&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              title={activeChannel.title}
              className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Subtle Gradient Overlays for contrast */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D1527] to-transparent pointer-events-none" />
          </div>
        )}

        {/* Floating Quick Controls Bar on Hover */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center space-x-2 bg-[#101B35]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
          {/* Mute/Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            className="text-white hover:text-[#F5C542] transition-colors p-1"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Video Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="text-white hover:text-[#2457D6] transition-colors p-1"
            title="Expand Fullscreen"
            aria-label="Expand Video Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Information Caption */}
      <div className="relative z-20 px-4 py-2.5 bg-[#101B35] border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#2457D6] shrink-0" />
          <span className="font-bold text-white truncate">
            {activeChannel.title}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono shrink-0">
          ● Yatharth IT Solutions Showreel
        </div>
      </div>
    </div>
  )
}

