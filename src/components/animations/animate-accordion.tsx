'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedAccordionProps {
  show: boolean
  children: React.ReactNode
}

export default function AnimatedAccordion ({
  show,
  children
}: AnimatedAccordionProps) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial='collapsed'
        animate={show ? 'open' : 'collapsed'}
        variants={{
          open: { opacity: 1, height: 'auto', overflow: 'hidden' },
          collapsed: { opacity: 0, height: 0, overflow: 'hidden' }
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ display: 'block' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
