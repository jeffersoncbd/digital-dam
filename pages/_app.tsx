import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

import ThemeProvider from '../contexts/ThemeProvider'
import DigitalOceanTokenProvider from '../contexts/DigitalOceanToken'

const Application: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    <DigitalOceanTokenProvider>
      <Component {...pageProps} />
    </DigitalOceanTokenProvider>
  </ThemeProvider>
)

export default Application
