// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CustomSelect } from './CustomSelect'

describe('CustomSelect keyboard interaction', () => {
  let container: HTMLDivElement
  let root: Root
  let originalScrollIntoView: PropertyDescriptor | undefined

  beforeEach(() => {
    ;(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() })

    container = document.createElement('div')
    document.body.append(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => root.unmount())
    container.remove()
    if (originalScrollIntoView) {
      Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScrollIntoView)
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
    }
  })

  it('opens, moves through options, and selects with the keyboard', () => {
    const onChange = vi.fn()
    act(() => {
      root.render(
        <CustomSelect
          ariaLabel="Sort services"
          options={[
            { value: 'name', label: 'Name' },
            { value: 'recent', label: 'Recently updated' },
          ]}
          value="name"
          onChange={onChange}
        />,
      )
    })

    const combobox = container.querySelector('[role="combobox"]')
    expect(combobox).not.toBeNull()

    act(() => combobox?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })))
    expect(combobox?.getAttribute('aria-expanded')).toBe('true')

    act(() => combobox?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })))
    act(() => combobox?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })))

    expect(onChange).toHaveBeenCalledWith('recent')
    expect(combobox?.getAttribute('aria-expanded')).toBe('false')
  })
})
