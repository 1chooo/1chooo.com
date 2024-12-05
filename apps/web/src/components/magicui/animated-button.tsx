'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { IconType as ReactIconType } from "react-icons"
import type { Icon as OcticonsType } from "@primer/octicons-react"
import { sendGTMEvent } from "@/components/google"

type AnimatedButtonProps = {
  path: string
  bannerText: string
  icon: ReactIconType | OcticonsType
  onClick?: () => void
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ path, bannerText, icon: Icon, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
    sendGTMEvent({
      event: 'animatedButtonClick',
      value: 'GTM-PDJ3NF4Q'
    })
  }

  return (
    <Link href={path} onClick={handleClick} className="block">
      <motion.div
        className="relative overflow-hidden px-6 py-3 bg-border-gradient-onyx text-orange-yellow-crayola font-semibold rounded-xl shadow-lg hover:scale-105 active:scale-95 active:shadow-sm transition-all duration-200 hover:bg-orange-yellow-crayola-dark group"
      >
        <span className="flex items-center justify-center">
          {bannerText}
          <motion.span
            className="ml-2 group-hover:translate-x-1"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icon />
          </motion.span>
        </span>
      </motion.div>
    </Link>
  )
}

export default AnimatedButton
