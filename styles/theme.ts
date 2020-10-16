import { theme, DefaultTheme } from '@chakra-ui/core'

export const applicationTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    mono: "'Roboto Mono', monospace"
  }
}
