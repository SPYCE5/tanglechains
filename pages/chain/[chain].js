import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import slugify from "slugify";
import { VscClose, VscTwitter } from "react-icons/vsc";

// import { useTranslations } from "next-intl";
import { notTranslation as useTranslations } from "../../utils";
import { populateChain, fetcher } from "../../utils/fetch";
import AddNetwork from "../../components/chain";
import Layout from "../../components/Layout";
import RPCList from "../../components/RPCList";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStaticProps({ params }) {
  const [chains, extraRpcs] = await Promise.all([fetcher(`${API_URL}/api/chains`), fetcher(`${API_URL}/api/rpcs`)]);

  const chain = chains.find(
    (chain) =>
      chain.chainId?.toString() === params.chain ||
      slugify(chain.shortName, { lower: true }) === slugify(params.chain, { lower: true }),
  );

  if (!chain) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chain: chain ? populateChain(chain, extraRpcs) : null,
      // messages: (await import(`../../translations/${locale}.json`)).default,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const chains = await fetcher(`${API_URL}/api/chains`);

  const paths = chains
    .map((chain) => [
      {
        params: {
          chain: chain.chainId.toString(),
        },
      },
      {
        params: {
          chain: slugify(chain.shortName, { lower: true }),
        },
      },
    ])
    .flat();

  return { paths, fallback: false };
}

function Chain({ chain }) {
  const t = useTranslations("Common", "en");

  return (
    <>
      <Head>
        <title>{`TangleChains - Smart Contract Chain ${chain.name}`}</title>

        <link rel="canonical" href={`https://tanglechains.org/chain/${slugify(chain.shortName, { lower: true })}`} />

        <meta
          name="description"
          content={`Check out chain ${chain.name} on TangleChains. Find the best smart contract chains on Shimmer and explore direct connectivity with other networks without bridges.`}
          key="desc"
        />
        <meta
          name="keywords"
          content="TangleChains, Shimmer, Smart contract chains, RPC endpoints, Interoperability, Direct connectivity, Bridges, Ecosystem, Decentralized applications, DApps, Blockchain, Cryptocurrency, Development, Deployment"
        />
        <meta name="author" content="SPYCE.5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content={`TangleChains - Smart Contract Chain ${chain.name}`} />
        <meta
          property="og:description"
          content={`Check out chain ${chain.name} on TangleChains. Find the best smart contract chains on Shimmer and explore direct connectivity with other networks without bridges.`}
        />
        <meta property="og:image" content="https://tanglechains.org/tanglechains.png" />
        <meta
          property="og:url"
          content={`https://tanglechains.org/chain/${slugify(chain.shortName, { lower: true })}`}
        />
        <meta property="og:type" content="website" />

        <meta property="twitter:title" content={`TangleChains - Smart Contract Chain ${chain.name}`} />
        <meta
          property="twitter:description"
          content={`Check out chain ${chain.name} on TangleChains. Find the best smart contract chains on Shimmer and explore direct connectivity with other networks without bridges.`}
        />
        <meta property="twitter:image" content="https://tanglechains.org/tanglechains.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:site"
          content={`https://tanglechains.org/chain/${slugify(chain.shortName, { lower: true })}`}
        />
        <meta property="twitter:creator" content="@tanglechains" />
      </Head>

      <Layout lang="en">
        <div className="relative shadow bg-white p-8 rounded-[10px] flex flex-col gap-3 overflow-hidden">
          <Link
            href={`http://twitter.com/intent/tweet?
            url=http://localhost:3000/chain/${slugify(chain.shortName, { lower: true })}&text=Check%20out%20chain%20${
              chain.name
            }%20on%20@TangleChains.%20Find%20the%20best%20smart%20contract%20chains%20on%20@shimmernet%20and%20explore%20direct%20connectivity%20with%20other%20networks%20without%20bridges.&hashtags=iota,shimmer,evm,tanglechains`}
            prefetch={false}
            target="_blank"
          >
            <div className="absolute top-3 left-3 py-1 px-3 flex justify-center items-center gap-1 bg-[#1DA1F2] rounded-full">
              <VscTwitter size={16} color={"#FFFFFF"} />
              <span className="text-white text-[12px]">Tweet</span>
            </div>
          </Link>
          <Link href={"/"} prefetch={false}>
            <div className="absolute top-3 right-3 w-9 h-9 flex justify-center items-center border border-2 border-solid border-[#EAEAEA] rounded-full">
              <VscClose size={14} />
            </div>
          </Link>
          <Link href={`/chain/${chain.chainId}`} prefetch={false} className="flex items-center mx-auto gap-2 mt-4">
            <img
              src={chain.icon}
              width={26}
              height={26}
              className="rounded-full flex-shrink-0 flex relative"
              alt={chain.name + " logo"}
            />
            <span className="text-xl font-semibold overflow-hidden text-ellipsis relative top-[1px]">{chain.name}</span>
          </Link>
          <table>
            <thead>
              <tr>
                <th className="font-normal text-gray-500">ChainID</th>
                <th className="font-normal text-gray-500">{t("currency")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center font-bold px-4">{chain.chainId}</td>
                <td className="text-center font-bold px-4">
                  {chain.nativeCurrency ? chain.nativeCurrency.symbol : "none"}
                </td>
              </tr>
            </tbody>
          </table>

          <AddNetwork chain={chain} buttonOnly lang="en" />
        </div>

        <RPCList chain={chain} lang="en" />
      </Layout>
    </>
  );
}

export default Chain;
