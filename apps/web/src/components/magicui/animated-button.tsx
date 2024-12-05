"use client"

import { motion } from 'framer-motion'
import Link from 'next/link';
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import { sendGTMEvent } from "@/components/google";

type AnimatedButtonProps = {
  path: string;
  bannerText: string;
  icon: ReactIconType | OcticonsType;
  onclick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ path, bannerText, icon: Icon, onclick }) => {
  return (
    <Link href={path}>
      <motion.button
        className="relative overflow-hidden px-6 py-3 bg-border-gradient-onyx text-orange-yellow-crayola font-semibold group rounded-xl"
        whileHover={{
          scale: 1.1,
          backgroundColor: 'hsl(45, 100%, 10%)',
        }}
        onClick={(e) => {
          e.preventDefault();
          if (onclick) {
            onclick();
          }
          sendGTMEvent({
            event: 'animatedButtonClick',
            value: 'GTM-PDJ3NF4Q'
          });
        }}
      >
        <span className="flex items-center relative z-10">
          {bannerText}
          <motion.span
            className="ml-2 group-hover:translate-x-1"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {<Icon />}
          </motion.span>
        </span>
      </motion.button>
    </Link>
  )
}

export default AnimatedButton;
