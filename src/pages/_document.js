import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fa">
        <Head>
          {/* لینک به فونت ایران یکان */}
          <link
            rel="stylesheet"
            href="/fonts/woff2/IRANYekanWebRegular.woff2"
            type="font/woff2"
          />
          <link
            rel="stylesheet"
            href="/fonts/woff2/IRANYekanWebBold.woff2"
            type="font/woff2"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
