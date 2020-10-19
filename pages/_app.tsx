import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

import ThemeProvider from '../contexts/ThemeProvider'
import DigitalOceanTokenProvider from '../contexts/DigitalOceanToken'
import { Head } from 'next/document'

const Application: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    <DigitalOceanTokenProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Automação para DigitalOcean" />
        <meta name="keywords" content="digitalocean, automacao, vscodeweb" />
        <title>DigitalDam</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </DigitalOceanTokenProvider>
  </ThemeProvider>
)

export default Application
