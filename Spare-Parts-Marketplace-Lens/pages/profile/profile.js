import { useState, useEffect, useContext } from 'react'
import { MainContext } from '../../context.js'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

export default function Profile() {
  const { bundlrInstance, token, address, connect, login, router, userLensId } = useContext(MainContext)

  async function changePageHome() {
    router.push('/', '/', { shallow: true })
  }

  async function changePageGraph() {
    router.push('/graphdata/graphfeed', '/graphdata/graphfeed', { shallow: true })
  }

  async function changePageProfile() {
    router.push('/profile/profile', '/profile/profile', { shallow: true })
  }

    function getAmount(amount, decimals) {
        return BigNumber(amount).dividedBy(BigNumber(10).pow(decimals)).toString();
    }

  return (
    <div style={{margin: '50px'}}>
        <div style={{marginBottom: '10px'}}>
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
    </div>
  )
}

const blankPhotoStyle = {
  width: '52px',
  height: '52px',
  backgroundColor: 'black',
}
