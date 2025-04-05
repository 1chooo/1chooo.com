"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

function AnimatedSection({
  children,
  variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  transition = { duration: 0.6 },
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection;
