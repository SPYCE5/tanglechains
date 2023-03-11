import Document, { Head, Main, NextScript, Html } from "next/document";
import React from "react";

const LANGUAGES = ["en", "zh"];

class MyDocument extends Document {
  render() {
    const pathPrefix = this.props.__NEXT_DATA__.page.split("/")[1];
    const lang = LANGUAGES.indexOf(pathPrefix) !== -1 ? pathPrefix : LANGUAGES[0];

    return (
      <Html lang={lang}>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="canonical" href="https://tanglechains.org/" />

          <meta
            name="description"
            content="TangleChains is the central hub to discover and list smart contract chains on Shimmer. Find the best chain for your project and explore direct connectivity with other networks without bridges."
            key="desc"
          />
          <meta
            name="keywords"
            content="TangleChains, Shimmer, Smart contract chains, RPC endpoints, Interoperability, Direct connectivity, Bridges, Ecosystem, Decentralized applications, DApps, Blockchain, Cryptocurrency, Development, Deployment"
          />
          <meta name="author" content="SPYCE.5" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta property="og:title" content="List and discover smart contract chains on Shimmer" />
          <meta
            property="og:description"
            content="The central hub to discover and list smart contract chains on Shimmer. Explore direct connectivity with other networks without bridges. Accelerate your project's growth in the Shimmer ecosystem."
          />
          <meta property="og:image" content="https://tanglechains.org/tanglechains.png" />
          <meta property="og:url" content="https://tanglechains.org/" />
          <meta property="og:type" content="website" />

          <meta property="twitter:title" content="List and discover smart contract chains on Shimmer" />
          <meta
            property="twitter:description"
            content="The central hub to discover and list smart contract chains on Shimmer. Explore direct connectivity with other networks without bridges. Accelerate your project's growth in the Shimmer ecosystem."
          />
          <meta property="twitter:image" content="https://tanglechains.org/tanglechains.png" />
          <meta property="twitter:card" content="summary_large_image" />
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
