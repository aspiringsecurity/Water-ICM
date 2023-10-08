import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, recommendProfiles, getPublications, searchProfiles } from '../../api'
// import { client } from '../apollo.js'
import { AAVE_DEPOSIT }  from '../external/query.js';
import { createClient } from 'urql'

export default function Transaction() {
  const [deposits, setAaveDeposits] = useState([])
  const [profiles, setProfiles] = useState([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    getAaveData()
  }, [])

  async function getAaveData() {
    try {
      const client = new createClient({
        url: "https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic"
      });
      const data = await client.query(AAVE_DEPOSIT, { user: "0xb50685c25485ca8c520f5286bbbf1d3f216d6989", limit: 1 }).toPromise()
      console.log('data: ', data.data.deposits[0]);
      setAaveDeposits(data.data.deposits);
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div style={{margin: '50px'}}>
        <button onClick={getAaveData} >getdata</button>
        {/* <input
          placeholder='Search'
          onChange={e => setSearchString(e.target.value)}
          value={searchString}
        /> */}
        {/* <button onClick={searchForProfile} >SEARCH PROFILES</button> */}
        <hr></hr>
        <Link href={`/profile/upload`}>
          Upload Image To Arweave
        </Link>
        <hr></hr>
        <div style={{margin: '10px'}}>
          {
            deposits.map((deposit, index) => (
              <Link href={`/profile/${deposit.id}`} key={index}>
                <a>
                  <h3>{deposit.id}</h3>
                  <p >{deposit.amount}</p>
                  <p >{deposit.user.id}</p>
                  <p >Reserves:</p>
                  <p >{deposit.reserve.id}</p>
                  <p >{deposit.reserve.symbol}</p>
                  <p >{deposit.reserve.name}</p>
                  <p >{deposit.reserve.decimals}</p>
                  <p >{deposit.reserve.price}</p>
                  <button>Apply for Lens</button>
                  <hr></hr>
                </a>
              </Link>
            ))
          }
        </div>

        {/* <div style={{margin: '10px'}}>
          {
            profiles.map((profile, index) => (
              <Link href={`/profile/${profile.id}`} key={index}>
                <a>
                  {
                    profile.picture &&  profile.picture.original? (
                      <Image
                        src={profile.picture.original && profile.picture.original.url}
                        width="202px"
                        height="202px"
                      />
                      // <h2>Image </h2>
                    ) : <div style={blankPhotoStyle} />
                  }
                  <h3>{profile.handle}</h3>
                  <p >{profile.publication?.metadata.content}</p>
                  <hr></hr>
                </a>
              </Link>
            ))
          }
        </div> */}
    </div>
  )
}

const blankPhotoStyle = {
  width: '52px',
  height: '52px',
  backgroundColor: 'black',
}

// https://media.lenster.xyz/tr:n-avatar,tr:di-placeholder.webp/
// https://lens.infura-ipfs.io/ipfs/bafkreigr5hmushplgadxdj4vcaov6q6vvxhvnrolqoyihvrdcyz4apgguy

