import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

import ThemeProvider from '../contexts/ThemeProvider'
import DigitalOceanTokenProvider from '../contexts/DigitalOceanToken'
import UserDropletsProvider from '../contexts/UserDroplets'

const Application: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    <DigitalOceanTokenProvider>
      <UserDropletsProvider>
        <Component {...pageProps} />
      </UserDropletsProvider>
    </DigitalOceanTokenProvider>
  </ThemeProvider>
)

export default Application
