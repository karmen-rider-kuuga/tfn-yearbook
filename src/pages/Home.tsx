"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { Toaster } from "@/components/ui/toaster"
import { motion } from "framer-motion"

export default function Home() {
  const navigate = useNavigate()

  function onRoutePress() {
    navigate("/timeline")
  }

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-deepBlue font-Montserrat">
      {/* 🎨 Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-800 via-deepBlue to-blue-800 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          backgroundSize: "200% 200%",
          animation: "gradientAnimation 15s ease infinite",
        }}
      />

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* 🎉 Heading with Scale-Up Effect */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-2 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome to TrustFinance Yearbook
          </motion.h1>

          {/* ✨ Gradient Text Animation */}
          <motion.h2
            className="text-3xl md:text-5xl font-kanit font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              animation: "gradientTextFlow 4s ease infinite",
              lineHeight: "1.2", // ปรับ line-height แบบ custom
            }}
          >
            Let's Create Memories Together
          </motion.h2>


          {/* 🌟 Subtitle with Fade-In Effect */}
          <motion.p
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Capture and preserve your memories in our digital yearbook platform. Create, manage, and share your school's
            legacy.
          </motion.p>

          <div className="pt-8">
            {/* 🚀 Button with Bounce and Scale Effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut", type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg transition-transform duration-300"
                onClick={onRoutePress}
              >
                Go to Timeline
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <Toaster />
    </main>
  )
}
