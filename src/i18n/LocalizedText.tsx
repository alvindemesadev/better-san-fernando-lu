import type { ReactNode } from 'react'
import { useLanguage } from './language'

interface LocalizedTextProps {
  text: string
  leadingSpace?: boolean
  trailingSpace?: boolean
}

export function LocalizedText({ text, leadingSpace = false, trailingSpace = false }: LocalizedTextProps): ReactNode {
  const { language, translate, hasTranslation } = useLanguage()

  return <span lang={hasTranslation(text) ? language : 'en'}>{leadingSpace && ' '}{translate(text)}{trailingSpace && ' '}</span>
}
