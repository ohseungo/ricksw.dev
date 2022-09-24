import "styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "container/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "config/default-seo.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
