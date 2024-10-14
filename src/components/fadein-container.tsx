'use client'

import useScrollAnimation from '@/app/hooks/useScrollAnimation'
import { motion, type HTMLMotionProps } from 'framer-motion'

type FadeInContainerProps = HTMLMotionProps<'section'>

export default function FadeInContainer ({
  children,
  ...props
}: FadeInContainerProps) {
  const { controls, setRef } = useScrollAnimation()

  return (
    <motion.section
      ref={setRef as any}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.section>
  )
}