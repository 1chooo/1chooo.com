'use client'

import { useEffect } from 'react'

const Hello = () => {
  useEffect(() => {
    console.log(`
 _____                           _____ 
( ___ )-------------------------( ___ )
 |   |  _   _                    |   | 
 |   | | | | |_   _  __ _  ___   |   | 
 |   | | |_| | | | |/ _' |/ _ \  |   | 
 |   | |  _  | |_| | (_| | (_) | |   | 
 |   | |_| |_|\__,_|\__, |\___/  |   | 
 |___|              |___/        |___| 
(_____)-------------------------(_____)
`)
  }, [])

  return null
}

export default Hello