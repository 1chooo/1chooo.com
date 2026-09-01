"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { BellOff, Bell } from "lucide-react"

export default function DynamicIsland() {
  const [expansionState, setExpansionState] = useState<"collapsed" | "expanded" | "controls">("collapsed")
  const [isRinging, setIsRinging] = useState(false)
  const [isSilent, setIsSilent] = useState(true)

  const handleRingClick = () => {
    setIsRinging(true)
    setIsSilent(false)

    // Ring flow: show ring effect then collapse
    setExpansionState("expanded")
    setTimeout(() => {
      setExpansionState("collapsed")
    }, 2000) // Show ring effect for 2 seconds then collapse
  }

  const handleIdleClick = () => {
    setIsRinging(false)
    setIsSilent(true)

    // Idle flow: go to mute/expanded state first, then collapse
    setExpansionState("expanded")
    setTimeout(() => {
      setExpansionState("collapsed")
    }, 1500) // Show mute state for 1.5 seconds then collapse
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-6 sm:py-10 sm:px-10 flex flex-col items-center justify-center space-y-6">
      {/* Dynamic Island */}
      <motion.div
        className="bg-black rounded-full relative overflow-hidden"
        layout
        animate={{
          width: expansionState === "collapsed" ? 120 : expansionState === "expanded" ? 200 : 280,
          height: expansionState === "collapsed" ? 36 : 50,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        whileHover={{ scale: expansionState === "collapsed" ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {expansionState === "collapsed" && (
            <motion.div
              key="collapsed"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {expansionState === "expanded" && (
            <motion.div
              key="expanded"
              className="flex items-center justify-between px-4 py-2 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isSilent ? "bg-red-500" : "bg-green-500"
                  }`}
                animate={{
                  backgroundColor: isSilent ? "#ef4444" : "#22c55e",
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  backgroundColor: { duration: 0.3 },
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }
                }}
              >
                <motion.div
                  animate={
                    !isSilent ? {
                      rotate: [-5, 5, -5, 5, 0],
                      x: [-1, 1, -1, 1, 0],
                    } : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat: !isSilent ? Infinity : 0,
                    repeatDelay: 0.3,
                  }}
                >
                  {isSilent ? (
                    <BellOff className="w-4 h-4 text-white" />
                  ) : (
                    <Bell className="w-4 h-4 text-white" />
                  )}
                </motion.div>
              </motion.div>
              <span className="text-white font-medium text-sm">
                {isSilent ? "Silent" : "Ring"}
              </span>
            </motion.div>
          )}

          {expansionState === "controls" && (
            <motion.div
              key="controls"
              className="flex items-center justify-between px-6 py-2 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isSilent ? "bg-red-500" : "bg-green-500"
                  }`}
                animate={{
                  backgroundColor: isSilent ? "#ef4444" : "#22c55e",
                  scale: isSilent ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  backgroundColor: { duration: 0.3 },
                  scale: {
                    duration: 0.6,
                    repeat: isSilent ? Infinity : 0,
                    repeatDelay: 1
                  },
                }}
              >
                <AnimatePresence mode="wait">
                  {isSilent ? (
                    <motion.div
                      key="silent"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BellOff className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ring"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        x: [-1, 1, -1, 1, 0],
                      }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{
                        duration: 0.2,
                        x: {
                          duration: 0.4,
                          repeat: Infinity,
                          repeatDelay: 0.3,
                        }
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [-5, 5, -5, 5, 0],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          repeatDelay: 0.3,
                        }}
                      >
                        <Bell className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className="text-white font-medium text-sm">
                {isSilent ? "Silent" : "Ring"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Control Buttons - Always visible */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={!isRinging ? "default" : "outline"}
            className={`rounded-full px-8 transition-all duration-300 ${!isRinging
              ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
              : "hover:bg-gray-100"
              }`}
            onClick={handleIdleClick}
          >
            <motion.span
              animate={{
                color: !isRinging ? "#ffffff" : "#374151",
              }}
              transition={{ duration: 0.2 }}
            >
              Idle
            </motion.span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={isRinging ? "default" : "outline"}
            className={`rounded-full px-8 transition-all duration-300 ${isRinging
              ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
              : "hover:bg-gray-100"
              }`}
            onClick={handleRingClick}
          >
            <motion.span
              animate={{
                color: isRinging ? "#ffffff" : "#374151",
              }}
              transition={{ duration: 0.2 }}
            >
              Ring
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
