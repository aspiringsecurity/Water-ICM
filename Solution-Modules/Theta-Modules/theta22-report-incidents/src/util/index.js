import { ACTIVE_NETWORK } from "./constants";

export const formatMoney = (m) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(m);
};

export function getAverage(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

export const getListingUrl = (address) => {
  return `${window.location.origin}/${address}`
}

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return (s.charAt(0).toUpperCase() + s.slice(1)).replace("-", " ");
};
export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

export const ipfsUrl = (cid) => `https://ipfs.io/ipfs/${cid}`;

export const transactionUrl = (tx) => `${ACTIVE_NETWORK.url}/tx/${tx}`;
export const accountUrl = (account) =>
  `${ACTIVE_NETWORK.url}/account/${account}`;

  