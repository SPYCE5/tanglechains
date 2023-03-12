import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import Chain from "../components/chain";
import { generateChainData } from "../utils/fetch";
import Header from "../components/header";

export async function getStaticProps() {
  const chains = await generateChainData();

  return {
    props: {
      chains,
      // messages: (await import(`../translations/${locale}.json`)).default,
    },
    revalidate: 3600,
  };
}

function Home({ chains }) {
  const router = useRouter();
  const { testnets, testnet, search: _search } = router.query;

  const [search, setSearch] = React.useState(_search);

  const includeTestnets =
    (typeof testnets === "string" && testnets === "true") || (typeof testnet === "string" && testnet === "true");

  const sortedChains = !includeTestnets
    ? chains.filter((item) => {
        const testnet =
          item.name?.toLowerCase().includes("test") ||
          item.title?.toLowerCase().includes("test") ||
          item.network?.toLowerCase().includes("test");
        const devnet =
          item.name?.toLowerCase().includes("devnet") ||
          item.title?.toLowerCase().includes("devnet") ||
          item.network?.toLowerCase().includes("devnet");
        return !testnet && !devnet;
      })
    : chains;

  const filteredChains =
    !search || typeof search !== "string" || search === ""
      ? sortedChains
      : sortedChains.filter((chain) => {
          return (
            chain.chain.toLowerCase().includes(search.toLowerCase()) ||
            chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
            chain.name.toLowerCase().includes(search.toLowerCase()) ||
            (chain.nativeCurrency ? chain.nativeCurrency.symbol : "").toLowerCase().includes(search.toLowerCase())
          );
        });

  return (
    <>
      <Head>
        <title>{"TangleChains - List and discover smart contract chains on Shimmer"}</title>

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
        <meta property="twitter:site" content="https://www.tanglechains.org/" />
        <meta property="twitter:creator" content="@tanglechains" />
      </Head>
      <Layout>
        <React.Suspense fallback={<div className="h-screen"></div>}>
          <Header search={search} setSearch={setSearch} includeTestnets={includeTestnets} />
          <div className="grid gap-5 grid-cols-1 place-content-between pb-4 sm:pb-10 sm:grid-cols-[repeat(auto-fit,_calc(50%_-_15px))] 3xl:grid-cols-[repeat(auto-fit,_calc(33%_-_20px))] isolate grid-flow-dense">
            {filteredChains.map((chain, i) => (
              <Chain chain={chain} key={chain.name} lang="en" />
            ))}
          </div>
        </React.Suspense>
      </Layout>
    </>
  );
}

export default Home;
