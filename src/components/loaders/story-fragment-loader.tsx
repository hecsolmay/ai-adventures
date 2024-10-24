import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

interface LoadingStoryFragmentProps {
  placeholder?: string
}

export default function LoadingStoryFragment ({
  placeholder = 'Creando tu historia...'
}: LoadingStoryFragmentProps) {
  return (
    <div className='fragment-loader flex flex-col items-center justify-center'>
      <div className='rounded-full p-4 shadow-lg'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 0, 270, 270, 0]
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <Bot className='size-12 text-primary' />
        </motion.div>
      </div>
      <motion.div
        className='mt-4 text-xl font-bold text-secondary'
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity
        }}
      >
        {placeholder}
      </motion.div>
    </div>
  )
}
