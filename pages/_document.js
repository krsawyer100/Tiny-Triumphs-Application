import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap" rel="stylesheet"/>
            {/* FavIcons */}
            <link rel="icon" type='image/x-icon' href="/images/favicon-orange.png"/>
            <link rel="icon" type='image/x-icon' media="(prefers-color-scheme: light)" href="/images/favicon-orange.png"/>
            <link rel="icon" type='image/x-icon' media="(prefers-color-scheme: dark)" href="/images/favicon-green.png"/>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
}