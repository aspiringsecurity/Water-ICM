import { useState, useEffect, useContext } from 'react'
import { client, getPublications, getProfiles } from './external/api'
import { AAVE_DEPOSIT }  from './external/query.js';
import { createClient } from 'urql'
import { MainContext } from '../context';
import { API_URL, IPFS_URL, AAVE_V2_MATIC_SUBGRAPH } from './constants';

export default function Home() {
  const [profile, setProfile] = useState()
  const [publications, setPublications] = useState([])
  const [account, setAccount] = useState('')
  const [deposits, setAaveDeposits] = useState([])
  const [profiles, setProfiles] = useState([])
  const [searchString, setSearchString] = useState('')
  const { token, address, connect, login, router, userLensId, userLensProfileID, userLensIdHex } = useContext(MainContext)

  useEffect(() => {
    fetchUserPublications()
    getAaveData()
  }, [userLensId])

  async function getAaveData() {
    try {
      const client = new createClient({
        url: AAVE_V2_MATIC_SUBGRAPH
      });
      const data = await client.query(AAVE_DEPOSIT, { user: address, limit: 1 }).toPromise()
      setAaveDeposits(data.data.deposits);
    } catch(e) {
      console.log(e)
    }
  }

  async function fetchUserPublications() {
    console.log('fetchUserPublications', userLensIdHex);
    try {
      // const returnedProfile = await client.query(
      //   getProfiles, 
      //   { id: userLensIdHex }
      // ).toPromise();

      const returnedProfile = await client.query({
        query: getProfiles,
        variables: {request: {
          profileIds: userLensIdHex
        }}
      });

      const profileData = returnedProfile.data.profiles.items[0]
        if (profileData.picture != null && profileData.picture.original) {
          if (profileData.picture.original.url.split("//")[0] == "ipfs:") {
            profileData.picture.original.url = IPFS_URL+profileData.picture.original.url.split("//")[1];
          }
        }

        const pubs = await client.query({
          query: getPublications,
          variables: {request: {
            profileIds: userLensIdHex,
            publicationTypes: ['POST'],
            limit: 50,
            sources: "defilens"
          }}
        });
  

      // const pubs = await client.query(getPublications, { id: userLensIdHex, limit: 50 }).toPromise()

      setProfile(profileData)
      setPublications(pubs.data.publications.items)
      console.log('pubs+++++++', pubs.data.publications.items[0].metadata.attributes[0].value);

      console.log('Address: ', address);
      console.log('profileData: ', profileData);
      console.log('Publications: ', pubs);
    } catch (err) {
      console.log('error fetchUserPublications profiles: ', err)
    }
  }

  async function changePageHome() {
    router.push('/', '/', { shallow: true })
  }

  async function changePageGraph() {
    router.push('/graphdata/graphfeed', '/graphdata/graphfeed', { shallow: true })
  }

  async function changePageProfile() {
    router.push('/profile/profile', '/profile/profile', { shallow: true })
  }

  // async function fetchProfiles() {
  //   try {
  //     const response = await client.query(recommendProfiles).toPromise()
  //     const profileData = await Promise.all(response.data.recommendedProfiles.map(async profile => {
  //       const pub = await client.query(getPublications, { id: profile.id, limit: 1 }).toPromise()
  //       profile.publication = pub.data.publications.items[0]
  //       return profile
  //     }))
  //     console.log('AllProfiles: ', profileData);
  //     for (var i = 0; i < profileData.length; i++) {
  //       if (profileData[i].picture != null && profileData[i].picture.original) {
  //         if (profileData[i].picture.original.url.split("//")[0] == "ipfs:") {
  //           profileData[i].picture.original.url = 'https://media.lenster.xyz/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/'+profileData[i].picture.original.url.split("//")[1];
  //         }
  //       }
  //     }
  //     setProfiles(profileData)
  //   } catch (err) {
  //     console.log('error fetching recommended profiles: ', err)
  //   }
  // }

  // async function searchForProfile() {
  //   try {
  //     const response = await client.query(searchProfiles, {
  //       query: searchString, type: 'PROFILE'
  //     }).toPromise()
  //     const profileData = await Promise.all(response.data.search.items.map(async profile => {
  //       const pub = await client.query(getPublications, { id: profile.profileId, limit: 1 }).toPromise()
  //       profile.id = profile.profileId
  //       profile.publication = pub.data.publications.items[0]
  //       return profile
  //     }))
  //     setProfiles(profileData)
  //   } catch (err) {
  //     console.log('error searching profiles...', err)
  //   }
  // }

  // function getSigner() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   return provider.getSigner();
  // }

  // async function post() {
  //   const contract = new ethers.Contract(
  //     CONTRACT_ADDRESS,
  //     ABI,
  //     getSigner()
  //   )

  //   try {
  //     const tx = await contract.post({
  //       profileId: "8973",
  //       contentURI: "https://arweave.net/kd1_TezRuhFlxxchvA8Sfa0TVFjXUxRjy2d6-MjItmI",
  //       collectModule: "0x23b9467334bEb345aAa6fd1545538F3d54436e96",
  //       collectModuleInitData: "0x0000000000000000000000000000000000000000000000000000000000000000",
  //       referenceModule: "0x081a84ABF515302a276D98Dc551E69f3CC33A833",
  //       referenceModuleInitData: "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"
  //     })
  //     await tx.wait()
  //     console.log(`successfully followed ... ${profile.handle}`)
  //   } catch (err) {
  //     console.log('error: ', err)
  //   }
  // }

  return (
    <div>
      <div>
        <ul>
          <li><div onClick={changePageHome}><b>DefiLens</b></div></li>
          <li><div onClick={changePageHome}>Home</div></li>
          <li><div onClick={changePageGraph}>Graph Data</div></li>
          <li><div onClick={changePageProfile}>Profile</div></li>
          <li style={{"float":"right"}}> 
            {
            !address && <button onClick={connect}>Connect to Wallet</button>
            }
            {
              address && !token && (
                <div onClick={login}>
                  <button style={{margin: "1rem", color: "white", backgroundColor: "blue"}}>Login</button>
                </div>
              )
            }
            {
              address && token && <p style={{color: "white", backgroundColor:"blue", padding: "10px", marginRight: "10px"}}>Successfully signed in!</p>
            }
          </li>
        </ul>
      </div>

      <div style={{margin: '10px'}}>
           {
             publications.map((publication, index) => (
              //  <Link href={`/profile/${profile.id}`} key={index}>
              
                <div>
                  <h3>{publication.metadata.attributes[0].value}</h3>
                  {/* <p >{publication.metadata.attributes[1].value}</p>
                  <p >{publication.metadata.attributes[2].value}</p>
                  <p >{publication.metadata.attributes[3].value}</p>
                  <p >{publication.metadata.attributes[4].value}</p>
                  <p >{publication.metadata.attributes[5].value}</p> */}
                  <button>Apply for Lens</button>
                </div>
              
             ))
           }
     </div> 

    </div>
    // <div style={{margin: '50px'}}>
    //     <button onClick={getAaveData} >getdata</button>
    //     <input
    //       placeholder='Search'
    //       onChange={e => setSearchString(e.target.value)}
    //       value={searchString}
    //     />

    //     <button onClick={searchForProfile} >SEARCH PROFILES</button>
    //     <hr></hr>

    //     <Link href={`/profile/upload`}>
    //       Upload Image To Arweave
    //     </Link>
    //     <hr></hr>

    //     <div style={{margin: '10px'}}>
    //       {
    //         deposits.map((deposit, index) => (
    //           // <Link href={`/profile/${deposit.id}`} key={index}>
    //             <a>
    //               {/* {
    //                 profile.picture &&  profile.picture.original? (
    //                   <Image
    //                     src={profile.picture.original && profile.picture.original.url}
    //                     width="202px"
    //                     height="202px"
    //                   />
    //                   // <h2>Image </h2>
    //                 ) : <div style={blankPhotoStyle} />
    //               } */}
                  // <h3>{deposit.id}</h3>
                  // <p >{deposit.amount}</p>
                  // <p >{deposit.user.id}</p>
                  // <p >{deposit.reserve.id}</p>
                  // <p >{deposit.reserve.symbol}</p>
                  // <p >{deposit.reserve.name}</p>
                  // <p >{deposit.reserve.decimals}</p>
                  // <p >{deposit.reserve.price}</p>
                  // <button>Apply for Lens</button>
    //               <hr></hr>
    //             </a>
    //           // </Link>
    //         ))
    //       }
    //     </div>

    //   <div style={{margin: '10px'}}>
    //       {
    //         profiles.map((profile, index) => (
    //           <Link href={`/profile/${profile.id}`} key={index}>
    //             <a>
    //               {
    //                 profile.picture &&  profile.picture.original? (
    //                   <Image
    //                     src={profile.picture.original && profile.picture.original.url}
    //                     width="202px"
    //                     height="202px"
    //                   />
    //                   // <h2>Image </h2>
    //                 ) : <div style={blankPhotoStyle} />
    //               }
    //               <h3>{profile.handle}</h3>
    //               <p >{profile.publication?.metadata.content}</p>
    //               <hr></hr>
    //             </a>
    //           </Link>
    //         ))
    //       }
    // </div> 
    // </div>
  )
}

const blankPhotoStyle = {
  width: '52px',
  height: '52px',
  backgroundColor: 'black',
}

const profileContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}


// https://media.lenster.xyz/tr:n-avatar,tr:di-placeholder.webp/
// https://lens.infura-ipfs.io/ipfs/bafkreigr5hmushplgadxdj4vcaov6q6vvxhvnrolqoyihvrdcyz4apgguy

