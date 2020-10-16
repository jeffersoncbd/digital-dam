import { NextPage } from 'next'
import { AppProps } from 'next/app'
import ThemeProvider from '../contexts/ThemeProvider'

const Application: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default Application
