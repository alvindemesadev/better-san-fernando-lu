import { useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        if (lenis) {
          lenis.scrollTo(target)
        } else {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
        }
        return
      }
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash, lenis, reduceMotion])

  return null
}
