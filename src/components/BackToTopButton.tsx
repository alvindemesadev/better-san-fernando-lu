import { useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const visibilityThreshold = 480

export function BackToTopButton() {
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > visibilityThreshold)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!visible) return null

  function scrollToTop() {
    if (lenis) {
      lenis.scrollTo(0, { immediate: Boolean(reduceMotion) })
      return
    }

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] right-[calc(env(safe-area-inset-right,0px)+1rem)] z-40 inline-flex size-12 items-center justify-center rounded-full border border-line bg-white text-ink-700 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:bottom-7 sm:right-7"
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  )
}
