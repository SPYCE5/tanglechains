import { fetcher, populateChain } from "../../../utils/fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const { chain: chainIdOrName } = req.query;
  if (req.method === "GET") {
    const [chains, extraRpcs] = await Promise.all([fetcher(`${API_URL}/api/chains`), fetcher(`${API_URL}/api/rpcs`)]);

    let chain = chains.find((chain) => chain.chainId.toString() === chainIdOrName || chain.shortName === chainIdOrName);
    if (!chain) {
      return res.status(404).json({ message: "chain not found" });
    }

    chain = populateChain(chain, extraRpcs);

    return res.status(200).json(chain);
  }
}
