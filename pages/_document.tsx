import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps
} from 'next/document'

class ApplicationDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ApplicationDocument
