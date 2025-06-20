"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Heart, Sparkles, Star, Gift, Cake, Crown, Play, Pause, Volume2 } from "lucide-react"
import AudioScroller from "@/components/AudioScroller"

export default function BinetaBirthday() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  const [isPlaying, setIsPlaying] = useState(false)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const poemLines = [
    "Joyeux anniversaire ma polytechnicienne hors pair.",
    "",
    "Quand le 20 juin revoit le jour,",
    "Les trompettes et les tambours,",
    "Se battent pour Bineta Wade, cette duchesse,",
    "Que je présente ici, avec allégresse.",
    "",
    "Ô que cette date est unique,",
    "Remémorant l'anniversaire d'une fille magnifique,",
    "Une polytechnicienne pas comme les autres,",
    "Que l'on doit célébrer comme un apôtre.",
    "",
    "En ces petits vers, que je juge insuffisants, je te souhaite,",
    "Un joyeux anniversaire, Ô une belle fête,",
    "Accompagnée d'une santé de fer suivi d'une longue vie,",
    "Ainsi que la satisfaction de toutes tes envies.",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial="initial"
            animate="animate"
          >
            {i % 4 === 0 ? (
              <Heart className="w-6 h-6 text-pink-300 fill-current opacity-70" />
            ) : i % 4 === 1 ? (
              <Sparkles className="w-5 h-5 text-yellow-300 opacity-60" />
            ) : i % 4 === 2 ? (
              <Star className="w-4 h-4 text-purple-300 fill-current opacity-80" />
            ) : (
              <Gift className="w-5 h-5 text-rose-300 opacity-70" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Geometric background shapes */}
      <motion.div className="fixed inset-0 pointer-events-none" style={{ rotate }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-rose-500/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Hero Section */}
      <motion.div className="relative h-screen flex items-center justify-center" style={{ y }}>
        <motion.div
          className="text-center text-white px-4 z-10"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
          }}
        >
          {/* Crown animation */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Crown className="w-20 h-20 text-yellow-300 fill-current" />
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Joyeux
          </motion.h1>

          <motion.h2
            className="text-5xl md:text-7xl font-semibold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Anniversaire
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="text-4xl md:text-5xl font-bold text-white"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Bineta Wade
            </motion.div>
            <div className="text-xl md:text-2xl text-pink-200 font-light">Ma polytechnicienne hors pair</div>

            {/* Animated cake */}
            <motion.div
              className="flex justify-center mt-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Cake className="w-16 h-16 text-pink-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Date highlight section */}
      <motion.div
        className="relative py-20 bg-gradient-to-r from-pink-600/30 to-purple-600/30 backdrop-blur-sm"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            animate={{
              scale: [1, 1.1, 1],
              color: ["#ffffff", "#fbbf24", "#ec4899", "#ffffff"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            20 JUIN
          </motion.div>
          <motion.div
            className="text-2xl md:text-3xl text-pink-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Une date magique pour une personne exceptionnelle ✨
          </motion.div>
        </div>
      </motion.div>

      {/* Portrait Section */}
      <motion.div
        className="relative py-20 bg-gradient-to-r from-rose-500/20 to-purple-500/20 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="relative inline-block mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image src="/bineta-portrait.jpg" alt="Bineta Wade - Portrait" fill className="object-cover" priority />
              </div>
            </motion.div>

            <motion.h3
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Notre Duchesse Polytechnicienne
            </motion.h3>

            <motion.p
              className="text-xl md:text-2xl text-pink-100 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Élégante, brillante, exceptionnelle ✨
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Poem Section */}
      <motion.div
        id="poem-section"
        className="relative min-h-screen bg-gradient-to-b from-white/95 to-pink-50/95 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        ref={contentRef}
      >
        <div className="container mx-auto px-4 py-20">
          {/* Audio Control */}

          <AudioScroller
            audioSrc="/bineta.wav"
            title="🎤 Récité par Bakar avec amour"
            scrollTargetRef={contentRef as React.RefObject<HTMLElement>}
            description="Cliquez pour écouter"
          />

          <motion.div className="max-w-4xl mx-auto text-center mb-20" >
            <motion.p
              className="text-sm text-gray-600 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🎤 Récité par Bakar avec amour
            </motion.p>
          </motion.div>
          <motion.div className="max-w-4xl mx-auto text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Un poème pour toi
            </h3>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {poemLines.map((line, index) => (
              <motion.div
                key={index}
                variants={lineVariants}
                className={`text-center ${line === "" ? "h-6" : "text-xl md:text-2xl leading-relaxed text-gray-800 font-medium"
                  }`}
                whileHover={{
                  scale: 1.05,
                  color: "#ec4899",
                  transition: { duration: 0.2 },
                }}
              >
                {line && (
                  <motion.span
                    className="inline-block px-4 py-2 rounded-lg hover:bg-pink-100/50 transition-colors duration-300"
                    whileHover={{
                      rotate: [0, -1, 1, 0],
                      boxShadow: "0 10px 25px rgba(236, 72, 153, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {line}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-20" variants={lineVariants}>
            <motion.div
              className="text-3xl md:text-4xl font-bold text-pink-600 mb-6"
              animate={{
                textShadow: [
                  "0 0 10px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(236, 72, 153, 0.8)",
                  "0 0 10px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              💝 Bakar, le barhamien 💝
            </motion.div>
            <motion.div
              className="inline-flex items-center space-x-3 text-xl text-gray-700 bg-white/70 px-6 py-3 rounded-full backdrop-blur-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <span className="font-medium">Avec tout mon amour</span>
              <Heart className="w-6 h-6 text-red-500 fill-current" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Final celebration section */}
      <motion.div
        className="relative h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated celebration elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, 50, -50],
                x: [-30, 30, -30],
                rotate: [0, 360],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <div className="text-4xl">{["🎉", "🎊", "✨", "🎈", "🌟"][Math.floor(Math.random() * 5)]}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center text-white px-4 z-10"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="text-8xl md:text-9xl mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            🎉
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Que cette nouvelle année</h2>
          <h3 className="text-3xl md:text-5xl font-light mb-8">t'apporte joie et bonheur !</h3>
          <motion.div
            className="flex justify-center space-x-4 text-6xl"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              ✨
            </motion.span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              🌟
            </motion.span>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              💫
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
