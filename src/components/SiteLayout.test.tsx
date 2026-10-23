// @vitest-environment jsdom
import { act, type HTMLAttributes, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SiteLayout } from './SiteLayout'

vi.mock('./ScrollProgress', () => ({ ScrollProgress: () => null }))
vi.mock('./BackToTopButton', () => ({ BackToTopButton: () => null }))
vi.mock('motion/react', async () => {
  const React = await import('react')
  return {
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    motion: {
      div: React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
        ({ children, ...props }, ref) => React.createElement('div', { ...props, ref }, children),
      ),
    },
  }
})

describe('SiteLayout navigation', () => {
  let container: HTMLDivElement
  let root: Root
  let originalMatchMedia: PropertyDescriptor | undefined

  beforeEach(() => {
    ;(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia')
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: query === '(hover: hover)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(() => false),
      })),
    })

    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
    act(() => {
      root.render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<p>Home route content</p>} />
              <Route path="services" element={<p>Services route content</p>} />
            </Route>
          </Routes>
        </MemoryRouter>,
      )
    })
  })

  afterEach(() => {
    act(() => root.unmount())
    container.remove()
    if (originalMatchMedia) Object.defineProperty(window, 'matchMedia', originalMatchMedia)
    else Reflect.deleteProperty(window, 'matchMedia')
  })

  it('opens the desktop menu and closes it after navigating to its overview', () => {
    const servicesButton = Array.from(container.querySelectorAll('nav[aria-label="Main navigation"] button'))
      .find((button) => button.textContent?.trim() === 'Services')
    expect(servicesButton).toBeDefined()

    act(() => servicesButton!.dispatchEvent(new MouseEvent('click', { bubbles: true })))
    expect(servicesButton?.getAttribute('aria-expanded')).toBe('true')

    const overviewLink = Array.from(container.querySelectorAll('a'))
      .find((link) => link.textContent?.trim().startsWith('View services overview'))
    expect(overviewLink).toBeDefined()

    act(() => overviewLink!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
    expect(container.textContent).toContain('Services route content')
    expect(servicesButton?.getAttribute('aria-expanded')).toBe('false')
  })
})
