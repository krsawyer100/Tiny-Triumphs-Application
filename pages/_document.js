import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
          <Head>
            <meta charSet="UTF-8" />
            <meta name='description' content='Tiny Triumphs was created with one goal in mind: to make self-care feel manageable and meaningful — especially for those who often feel overwhelmed by it. This app is designed for neurodivergent, mentally ill, and chronically ill individuals who want support with building daily routines that match their real energy levels. Whether you are having a low, medium, or high energy day, Tiny Triumphs offers flexible routines to help you care for yourself without pressure or guilt.'/>
            <meta name="robots" content="index, follow" />
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