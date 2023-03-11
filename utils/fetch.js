import fetch from "node-fetch";
import slugify from "slugify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

function removeEndingSlashObject(rpc) {
  if (typeof rpc === "string") {
    return {
      url: removeEndingSlash(rpc),
    };
  } else {
    return {
      ...rpc,
      url: removeEndingSlash(rpc.url),
    };
  }
}

function removeEndingSlash(rpc) {
  return rpc.endsWith("/") ? rpc.substr(0, rpc.length - 1) : rpc;
}

export function populateChain(chain, allExtraRpcs) {
  const extraRpcs = allExtraRpcs[chain.chainId]?.rpcs;

  if (extraRpcs !== undefined) {
    const rpcs = extraRpcs.map(removeEndingSlashObject);

    chain.rpc
      .filter((rpc) => !rpc.includes("${INFURA_API_KEY}"))
      .forEach((rpc) => {
        const rpcObj = removeEndingSlashObject(rpc);
        if (rpcs.find((r) => r.url === rpcObj.url) === undefined) {
          rpcs.push(rpcObj);
        }
      });

    chain.rpc = rpcs;
  } else {
    chain.rpc = chain.rpc.map(removeEndingSlashObject);
  }

  return { ...chain, slug: slugify(chain.shortName, { lower: true }) };
}

export function mergeDeep(target, source) {
  const newTarget = { ...target };
  const isObject = (obj) => obj && typeof obj === "object";

  if (!isObject(newTarget) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = newTarget[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      newTarget[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      newTarget[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      newTarget[key] = sourceValue;
    }
  });

  return newTarget;
}

export function arrayMove(array, fromIndex, toIndex) {
  const newArray = [...array];
  const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < newArray.length) {
    const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex;
    const [item] = newArray.splice(fromIndex, 1);

    newArray.splice(endIndex, 0, item);
  }

  return newArray;
}

export async function generateChainData() {
  const [chains, extraRpcs] = await Promise.all([fetcher(`${API_URL}/api/chains`), fetcher(`${API_URL}/api/rpcs`)]);

  return chains.map((chain) => populateChain(chain, extraRpcs));
}
