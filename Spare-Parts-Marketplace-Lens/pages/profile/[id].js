import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Image from 'next/image'
import { client, getPublications, getProfiles } from '../../api'
import ABI from '../../abi.json'
import Arweave from 'arweave';

// Or to specify a gateway when running from NodeJS you might use
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

const CONTRACT_ADDRESS = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

export default function Profile() {
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState([])
  const [account, setAccount] = useState('')
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])

  async function fetchProfile() {
    try {
      const returnedProfile = await client.query(getProfiles, { id }).toPromise();
      const profileData = returnedProfile.data.profiles.items[0]
      setProfile(profileData)
      const pubs = await client.query(getPublications, { id, limit: 50 }).toPromise()
      setPublications(pubs.data.publications.items)
    } catch (err) {
      console.log('error fetching profile...', err)
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

  async function followUser() {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      getSigner()
    )

    try {
      const tx = await contract.follow([id], [0x0])
      await tx.wait()
      console.log(`successfully followed ... ${profile.handle}`)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  // for arweave
  // async function createWallet() {
  //   arweave.wallets.generate().then((key) => {
  //     console.log('key: ', key);
  //     arweave.wallets.jwkToAddress(key).then((address) => {
  //       console.log('address: ', address);
  //       //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
  //     });
  //     // {
  //     //     "kty": "RSA",
  //     //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
  //     //     "e": ...
  //   });
  // }

  async function post() {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      getSigner()
    )

    try {
      const tx = await contract.post({
        profileId: "8973",
        contentURI: "https://arweave.net/kd1_TezRuhFlxxchvA8Sfa0TVFjXUxRjy2d6-MjItmI",
        collectModule: "0x23b9467334bEb345aAa6fd1545538F3d54436e96",
        collectModuleInitData: "0x0000000000000000000000000000000000000000000000000000000000000000",
        referenceModule: "0x081a84ABF515302a276D98Dc551E69f3CC33A833",
        referenceModuleInitData: "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"
      })
      await tx.wait()
      console.log(`successfully followed ... ${profile.handle}`)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  if (!profile) return null

  return (
    <div>
      <div style={profileContainerStyle}>
        <button onClick={connectWallet}>Sign In</button>
        <Image
          width="200px"
          height="200px"
          src={'http://arweave.net/5L23Rusv24Ch5v5qhcFIMgh-E6bV7mG24hadUujqUTY'}
        />
        <p>{profile.handle}</p>
        <button onClick={followUser}>Follow User</button>
        <button onClick={post}>Post</button>
        {/* <button onClick={createWallet}>Create Wallet</button> */}
        {
            publications.map((pub, index) => (
              <div key={index}>
                <p>{pub.metadata.content}</p>
              </div>
            ))
        }
      </div>
    </div>
  )
}

const profileContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}