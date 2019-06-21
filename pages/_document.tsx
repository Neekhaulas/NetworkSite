import Document, {
    Head,
    Main,
    NextScript,
    NextDocumentContext
  } from "next/document";
  import { ServerStyleSheet } from "styled-components";
  import fontawesome from '@fortawesome/fontawesome';
import GlobalStyles from "../components/GlobalStyles";
  
  interface DocumentProps {
    styleTags: Array<React.ReactElement<{}>>;
  }
  
  export default class MyDocument extends Document<DocumentProps> {
    static async getInitialProps({ renderPage }: NextDocumentContext) {
      const sheet = new ServerStyleSheet();
  
      const page = renderPage((App) => (props) =>
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
            {this.props.styleTags}
            <style>${fontawesome.dom.css()}</style>
            <GlobalStyles />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
  }