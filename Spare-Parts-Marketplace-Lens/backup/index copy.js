// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { client, recommendProfiles, getPublications, searchProfiles } from '../api'
// import { AAVE_DEPOSIT }  from './external/query.js';
// import { createClient } from 'urql'

// export default function Home() {
//   const [account, setAccount] = useState('')
//   const [deposits, setAaveDeposits] = useState([])
//   const [profiles, setProfiles] = useState([])
//   const [searchString, setSearchString] = useState('')

//   useEffect(() => {
//     fetchProfiles()
//     getAaveData()
//   }, [])

//   async function connectWallet() {
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts"
//     })
//     console.log('accounts: ', accounts)
//     accounts[0]
//     setAccount(account)
//   }

//   function getSigner() {
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     return provider.getSigner();
//   }

//   async function getAaveData() {
//     try {
//       const client = new createClient({
//         url: "https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic"
//       });
//       const data = await client.query(AAVE_DEPOSIT, { user: "0xb50685c25485ca8c520f5286bbbf1d3f216d6989", limit: 1 }).toPromise()
//       console.log('data: ', data.data.deposits[0]);
//       setAaveDeposits(data.data.deposits);
//     } catch(e) {
//       console.log(e)
//     }
//   }

//   //   async function post() {
//   //   const contract = new ethers.Contract(
//   //     CONTRACT_ADDRESS,
//   //     ABI,
//   //     getSigner()
//   //   )

//   //   try {
//   //     const tx = await contract.post({
//   //       profileId: "8973",
//   //       contentURI: "https://arweave.net/kd1_TezRuhFlxxchvA8Sfa0TVFjXUxRjy2d6-MjItmI",
//   //       collectModule: "0x23b9467334bEb345aAa6fd1545538F3d54436e96",
//   //       collectModuleInitData: "0x0000000000000000000000000000000000000000000000000000000000000000",
//   //       referenceModule: "0x081a84ABF515302a276D98Dc551E69f3CC33A833",
//   //       referenceModuleInitData: "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"
//   //     })
//   //     await tx.wait()
//   //     console.log(`successfully followed ... ${profile.handle}`)
//   //   } catch (err) {
//   //     console.log('error: ', err)
//   //   }
//   // }


//   async function fetchProfiles() {
//     try {
//       const response = await client.query(recommendProfiles).toPromise()
//       const profileData = await Promise.all(response.data.recommendedProfiles.map(async profile => {
//         const pub = await client.query(getPublications, { id: profile.id, limit: 1 }).toPromise()
//         profile.publication = pub.data.publications.items[0]
//         return profile
//       }))
//       console.log('AllProfiles: ', profileData);
//       for (var i = 0; i < profileData.length; i++) {
//         if (profileData[i].picture != null && profileData[i].picture.original) {
//           if (profileData[i].picture.original.url.split("//")[0] == "ipfs:") {
//             profileData[i].picture.original.url = 'https://media.lenster.xyz/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/'+profileData[i].picture.original.url.split("//")[1];
//           }
//         }
//       }
//       setProfiles(profileData)
//     } catch (err) {
//       console.log('error fetching recommended profiles: ', err)
//     }
//   }

//   async function searchForProfile() {
//     try {
//       const response = await client.query(searchProfiles, {
//         query: searchString, type: 'PROFILE'
//       }).toPromise()
//       const profileData = await Promise.all(response.data.search.items.map(async profile => {
//         const pub = await client.query(getPublications, { id: profile.profileId, limit: 1 }).toPromise()
//         profile.id = profile.profileId
//         profile.publication = pub.data.publications.items[0]
//         return profile
//       }))
//       setProfiles(profileData)
//     } catch (err) {
//       console.log('error searching profiles...', err)
//     }
//   }
  

//   return (
//     <div>
//       <div style={profileContainerStyle}>
//         <button onClick={connectWallet}>Sign In With Lens</button>
//         <ul>
//           <li style>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/graphdata/graphfeed">Graph</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//     // <div style={{margin: '50px'}}>
//     //     <button onClick={getAaveData} >getdata</button>
//     //     <input
//     //       placeholder='Search'
//     //       onChange={e => setSearchString(e.target.value)}
//     //       value={searchString}
//     //     />

//     //     <button onClick={searchForProfile} >SEARCH PROFILES</button>
//     //     <hr></hr>

//     //     <Link href={`/profile/upload`}>
//     //       Upload Image To Arweave
//     //     </Link>
//     //     <hr></hr>

//     //     <div style={{margin: '10px'}}>
//     //       {
//     //         deposits.map((deposit, index) => (
//     //           // <Link href={`/profile/${deposit.id}`} key={index}>
//     //             <a>
//     //               {/* {
//     //                 profile.picture &&  profile.picture.original? (
//     //                   <Image
//     //                     src={profile.picture.original && profile.picture.original.url}
//     //                     width="202px"
//     //                     height="202px"
//     //                   />
//     //                   // <h2>Image </h2>
//     //                 ) : <div style={blankPhotoStyle} />
//     //               } */}
//     //               <h3>{deposit.id}</h3>
//     //               <p >{deposit.amount}</p>
//     //               <p >{deposit.user.id}</p>
//     //               <p >{deposit.reserve.id}</p>
//     //               <p >{deposit.reserve.symbol}</p>
//     //               <p >{deposit.reserve.name}</p>
//     //               <p >{deposit.reserve.decimals}</p>
//     //               <p >{deposit.reserve.price}</p>
//     //               <button>Apply for Lens</button>
//     //               <hr></hr>
//     //             </a>
//     //           // </Link>
//     //         ))
//     //       }
//     //     </div>

//     //     {/* <div style={{margin: '10px'}}>
//     //       {
//     //         profiles.map((profile, index) => (
//     //           <Link href={`/profile/${profile.id}`} key={index}>
//     //             <a>
//     //               {
//     //                 profile.picture &&  profile.picture.original? (
//     //                   <Image
//     //                     src={profile.picture.original && profile.picture.original.url}
//     //                     width="202px"
//     //                     height="202px"
//     //                   />
//     //                   // <h2>Image </h2>
//     //                 ) : <div style={blankPhotoStyle} />
//     //               }
//     //               <h3>{profile.handle}</h3>
//     //               <p >{profile.publication?.metadata.content}</p>
//     //               <hr></hr>
//     //             </a>
//     //           </Link>
//     //         ))
//     //       }
//     //     </div> */}
//     // </div>
//   )
// }

// const blankPhotoStyle = {
//   width: '52px',
//   height: '52px',
//   backgroundColor: 'black',
// }

// const profileContainerStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start'
// }


// // https://media.lenster.xyz/tr:n-avatar,tr:di-placeholder.webp/
// // https://lens.infura-ipfs.io/ipfs/bafkreigr5hmushplgadxdj4vcaov6q6vvxhvnrolqoyihvrdcyz4apgguy

