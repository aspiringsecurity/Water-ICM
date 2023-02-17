/**
 * A helper function to replace the network params to the selected network
 * EX: `http://localhost:8080/#/shiden/assets` -> `http://localhost:8080/#/astar/assets`
 * @param network networkAlias in providerEndpoints
 * @returns URL
 */
export const buildNetworkUrl = (network: string) => {
  const href = window.location.href;
  const hrefArray = href.split('/');
  const networkIndex = hrefArray.findIndex((it) => it === '#') + 1;

  return hrefArray
    .slice(0, hrefArray.length)
    .map((it: string, index: number) => (index === networkIndex ? network : it))
    .join('/');
};
