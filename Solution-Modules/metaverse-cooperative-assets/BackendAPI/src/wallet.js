
require('dotenv').config();
const {RouterProtocol}  =require("@routerprotocol/router-js-sdk"); 
const {ethers}  =require( "ethers");

const user= require("./user.js")
let SDK_ID = 24 // get your unique sdk id by contacting us on Telegram
let chainId = 137
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com", chainId)
const rout = new RouterProtocol(SDK_ID, chainId, provider);


const routerprotocol = new RouterProtocol(process.env.SDK_ID_HERE, chainId, provider)


const fetch = require("node-fetch");
const getwalletbalance = async function (walletaddress,chain) {
const resp = await fetch(
  `https://api.tatum.io/v3/${chain}/account/balance/${walletaddress}`,
  {
    method: 'GET',
    headers: {
      'x-api-key':process.env.TATUM_KEY
    }
  }
);

const data = await resp.json();
console.log(data);
return data.balance;

   
    
};


const getprivatekey = async function (address) {
    return user.findjson("./src/wallet.json",address);  
};


module.exports = {
   getwalletbalance,getprivatekey
}