import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
          <Head>
            <meta charSet="UTF-8" />
            {/* FavIcons */}
            <link rel="icon" type='image/x-icon' href="/images/favicon-orange.png"/>
            <link rel="icon" type='image/x-icon' media="(prefers-color-scheme: light)" href="/images/favicon-orange.png"/>
            <link rel="icon" type='image/x-icon' media="(prefers-color-scheme: dark)" href="/images/favicon-blue.png"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
}