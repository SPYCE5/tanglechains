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
        <title>{`${chain.name} RPC and Chain settings | Chainlist`}</title>
      </Head>

      <Layout lang="en">
        <div className="relative shadow bg-white p-8 rounded-[10px] flex flex-col gap-3 overflow-hidden">
          <Link
            // href={`http://twitter.com/share?url=Check%20out%20chain%20${chain.name}%20on%20@TangleChains.%20Find%20the%20best%20smart%20contract%20chains%20on%20@shimmernet%20and%20explore%20direct%20connectivity%20with%20other%20networks%20without%20bridges.%20&hashtags=#iota%20#shimmer%20#evm%20#tanglechains`}
            href={`http://twitter.com/intent/tweet?
            url=http://localhost:3000/chain/${slugify(chain.shortName, { lower: true })}&text=Check%20out%20chain%20${
              chain.name
            }%20on%20@TangleChains.%20Find%20the%20best%20smart%20contract%20chains%20on%20@shimmernet%20and%20explore%20direct%20connectivity%20with%20other%20networks%20without%20bridges.&hashtags=iota,shimmer,evm,tanglechains`}
            prefetch={false}
            target="_blank"
          >
            <div className="absolute top-3 left-3 py-1 px-4 flex justify-center items-center gap-2 bg-[#1DA1F2] rounded-full">
              <VscTwitter size={20} color={"#FFFFFF"} />
              <span className="text-white font-xs">Tweet</span>
            </div>
          </Link>
          <Link href={"/"} prefetch={false}>
            <div className="absolute top-3 right-3 w-9 h-9 flex justify-center items-center border border-2 border-solid border-[#EAEAEA] rounded-full">
              <VscClose size={14} />
            </div>
          </Link>
          <Link href={`/chain/${chain.chainId}`} prefetch={false} className="flex items-center mx-auto gap-2">
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
