import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { ethers, utils, Wallet } from 'ethers';
import { omit } from './helpers';

function getSigner() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  return provider.getSigner();
}
export const getAddressFromSigner = () => {
  return getSigner().address;
};

export const signedTypeData = (
  domain,
  types,
  value
) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  );
};

export const splitSignature = (signature) => {
  return utils.splitSignature(signature);
};

export const sendTx = (
  transaction
) => {
  const signer = getSigner();
  return signer.sendTransaction(transaction);
};

export const signText = (text) => {
  return getSigner().signMessage(text);
};
