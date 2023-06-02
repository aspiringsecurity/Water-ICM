import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { APP_NAME } from "../util/constants";
import { accountUrl, transactionUrl } from "../util";
import { getContractBundleUrl, purchaseContract } from "../contract/thetaContract";
import { useParams } from "react-router-dom";
import { getMetadata } from "../util/stor";


// Discover previously minted NFTs.
// Find information on the owner, play the video,
function Discover(props) {
  const {address} = useParams()
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState()

  useEffect(() => {
    console.log('address', address)
    if (address) {
      findListing(address)
    }
  }, [address])

  const findListing = async (contractAddress) => {
    setResult(undefined)
    setError(undefined)
    if (!contractAddress) {
      setError("Enter a contract address.");
      return
    }

    setLoading(true)

    let bundleUrl
    try {
      bundleUrl = await getContractBundleUrl(contractAddress)
      

      try {
        const {data} = await getMetadata(bundleUrl)
        const res = {
          contract: accountUrl(contractAddress),
          bundleUrl,
          ...data
        }
        console.log('result', res)
        setResult(res);
      } catch (e) {
        console.error('error getting metadata', e)
      }
    } catch(e) {
      console.error('error getting contract', e)
      setError('Not a valid ThetaBundle contract address.')
      return
    } finally {
      setLoading(false)
      if (url != contractAddress) {
        setUrl(contractAddress)
      }
    }
  };

  const payContract = async () => {
    setLoading(true)
    try {
      const res = await purchaseContract(url, result.eth)
      alert('Successfully purchased ' + result.title)
    } catch (e) {
      console.error('e', e)
      setError('Error completing payment: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!address && <div>
      <h1>Discover bundles</h1>
      <br />
      <h3>Enter the address of a {APP_NAME} contract</h3>

      <Input value={url} onChange={(e) => setUrl(e.target.value)} />
      <br />
      <br />

      <Button
        size="large"
        type="primary"
        className="standard-btn"
        loading={loading}
        disabled={loading}
        onClick={() => findListing(url)}
      >
        Search
      </Button>
</div>}


      {result && (
        <div>
          <b className="green">Complete Purchase:</b>
          <hr />
          <p>
            <h1>{result.title}</h1>
          <a href={result.contract} target="_blank">
            View Contract
          </a>
          </p>
          <p>
            <a href={result.bundleUrl} target="_blank">
              View Theta Bundle
            </a>
          </p>
          <p>Payable address: {result.payableAddress}</p>
          <p>Cost (ETH): <b>{result.eth}</b></p>
          <Button 
          type="primary"
          size="large"
           onClick={payContract} disabled={loading}>Purchase</Button>
        </div>
      )}
      <br/>

      {error && <p className="red">{error}</p>}
    </div>
  );
}

Discover.propTypes = {};

export default Discover;
