import '../styles/globals.css'
import '../styles/index.css'
import '../styles/graphcard.css'
import { WebBundlr } from "@bundlr-network/client"
import { MainContext } from '../context'
import { useState, useRef } from 'react'
import { providers, utils, ethers } from 'ethers'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { client, DefaultProfile } from './external/api.js'
import BigNumber from 'bignumber.js'
import { ApolloProvider } from '@apollo/client';

const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`

const authenticate = gql`
  mutation Authenticate(
    $address: EthereumAddress!
    $signature: Signature!
  ) {
    authenticate(request: {
      address: $address,
      signature: $signature
    }) {
      accessToken
      refreshToken
    }
  }
`

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [bundlrInstance, setBundlrInstance] = useState()
  const [balance, setBalance] = useState()
  const [address, setAddress] = useState('')
  const [token, setToken] = useState()
  const [userLensId, setUserLensId] = useState()
  const [userLensIdHex, setUserLensIdHex] = useState()
  const bundlrRef = useRef()
  
  async function initialiseBundlr() {
    await window.ethereum.enable();
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready();
    const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
    await bundlr.ready();
    setBundlrInstance(bundlr);
    bundlrRef.current = bundlr;
    fetchBalance();
  }

  async function fetchBalance() {
    const bal = await bundlrRef.current.getLoadedBalance()
    setBalance(utils.formatEther(bal.toString()))
  }

  async function connect() {
    /* this allows the user to connect their wallet */
    const account = await window.ethereum.send('eth_requestAccounts')
    console.log('account: ', account.result[0]);
    if (account.result.length) {
      setAddress(account.result[0])
    }
  }

  async function login() {
    try {
      /* first request the challenge from the API server */
      console.log('addresss: ', address);
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address }
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const { data: { authenticate: { accessToken, refreshToken }}} = authData
      console.log({ accessToken })
      setToken(accessToken)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      initialiseBundlr()
      userLensProfileID()
    } catch (err) {
      console.log('Error signing in: ', err)
    }
  }

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    })
    console.log('accounts: ', accounts)
    accounts[0]
    setAccount(account)
  }

  function getSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider.getSigner();
  }

  async function userLensProfileID() {
    try {
      console.log('userLensProfileIDL ', address);
      const response = await client.query({
       query:  DefaultProfile,
       variables: {
        request: {
          ethereumAddress: "0xb50685c25485CA8C520F5286Bbbf1d3F216D6989"
        }
       }
      })
      setUserLensId(BigNumber(response.data.defaultProfile.id).toNumber());
      setUserLensIdHex(response.data.defaultProfile.id);
    } catch (err) {
      console.log('error searching profiles...', err)
    }
  }

  return (
    <div style={containerStyle}>
      <ApolloProvider client={client}>
      <MainContext.Provider value={{
        initialiseBundlr,
        bundlrInstance,
        balance,
        fetchBalance,
        token,
        address,
        connect,
        login,
        router,
        userLensProfileID,
        userLensId,
        userLensIdHex
      }}>
        <Component {...pageProps} />
      </MainContext.Provider>
      </ApolloProvider>
    </div>
  )
}

const containerStyle = {
  padding: '50px'
}

export default MyApp
