import React from 'react'
import { ThemeProvider as ChakraThemeProvider, CSSReset } from '@chakra-ui/core'
import { applicationTheme } from '../styles/theme'

const ThemeProvider: React.FC = ({ children }) => (
  <ChakraThemeProvider theme={applicationTheme}>
    <CSSReset />
    {children}
  </ChakraThemeProvider>
)

export default ThemeProvider
