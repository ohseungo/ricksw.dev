import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: initTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const initTheme = `(function(){
    ${setInitialColorMode.toString()}
    setInitialColorMode();
})()`;

function setInitialColorMode() {
  function getInitalColorMode() {
    const persistedPreferenceMode = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedPreferenceMode === "string";

    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }

    const prefrence = window.matchMedia("(preference-color-scheme: dark)");
    const hasMediaQueryPreference = typeof prefrence.matches == "boolean";

    if (hasMediaQueryPreference) {
      return prefrence.matches ? "dark" : "light";
    }

    return "light";
  }

  const currentColorMode = getInitalColorMode();
  const element = document.documentElement;
  element.style.setProperty("--initial-color-mode", currentColorMode);

  if (currentColorMode === "dark") element.setAttribute("data-theme", "dark");
}
