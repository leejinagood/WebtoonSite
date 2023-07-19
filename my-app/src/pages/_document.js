import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <title>AVATOON</title>
        <link rel="manifest" href="/manifest.json" />

          {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
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
