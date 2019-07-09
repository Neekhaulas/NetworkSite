import Document, {
    Head,
    Main,
    NextScript
  } from "next/document";
  import { ServerStyleSheet } from "styled-components";
  import fontawesome from '@fortawesome/fontawesome';
  
  interface DocumentProps {
    styleTags: Array<React.ReactElement<{}>>;
  }
  
  export default class MyDocument extends Document<DocumentProps> {
    static async getInitialProps({ renderPage }: any) {
      const sheet = new ServerStyleSheet();
  
      const page = renderPage((App: any) => (props: any) =>
        sheet.collectStyles(<App {...props} />)
      );
  
      const styleTags = sheet.getStyleElement();
  
      return { ...page, styleTags };
    }
  
    render() {
      return (
        <html>
          <Head>
            <link rel="icon" href="/static/favicon.ico" key="favicon" />
            <style>${fontawesome.dom.css()}</style>
            {this.props.styleTags}
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
  }