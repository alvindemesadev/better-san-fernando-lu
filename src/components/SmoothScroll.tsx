import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import 'lenis/dist/lenis.css'

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <>{children}</>

  return (
    <ReactLenis root options={{ anchors: true, lerp: 0.1, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  )
}
