import { useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function useScrollAnimation<T extends HTMLElement> () {
  const controls = useAnimation()
  const [ref, setRef] = useState<T | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 }).catch(error => {
            console.error(error)
          })
        }
      },
      { threshold: 0.1 }
    )

    if (ref !== null) {
      observer.observe(ref)
    }

    return () => {
      if (ref !== null) {
        observer.unobserve(ref)
      }
    }
  }, [ref, controls])

  return {
    ref,
    setRef,
    controls
  }
}
