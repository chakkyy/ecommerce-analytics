import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='es'>
        <Head>
          <link rel='preload' href='/fonts/Montserrat/Montserrat-Bold.ttf' as='font' type='font/ttf' crossOrigin='' />
          <link
            rel='preload'
            href='/fonts/Montserrat/Montserrat-Regular.ttf'
            as='font'
            type='font/ttf'
            crossOrigin=''
          />
          <link rel='preload' href='/fonts/Roboto/Roboto-Bold.ttf' as='font' type='font/ttf' crossOrigin='' />
          <link rel='preload' href='/fonts/Roboto/Roboto-Light.ttf' as='font' type='font/ttf' crossOrigin='' />
          <link rel='preload' href='/fonts/Roboto/Roboto-LightItalic.ttf' as='font' type='font/ttf' crossOrigin='' />
          <link rel='preload' href='/fonts/Roboto/Roboto-Regular.ttf' as='font' type='font/ttf' crossOrigin='' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
