import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/static/favicons/faviconD.png" />
                <meta name="msapplication-TileColor" content="#e1dfdd" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <body>
                <a href="#content" className="u-sr-only">Skip to content</a>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}