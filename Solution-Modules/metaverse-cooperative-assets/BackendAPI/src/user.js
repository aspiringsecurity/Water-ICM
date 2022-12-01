
const https = require('https');
const fs = require('fs');
const fetch = require("node-fetch");
const { json } = require('express');
require('dotenv').config();


const createwallet = async function (chain) {
    const resp = await fetch(
        `https://api.tatum.io/v3/${chain}/wallet`,
        {
          method: 'GET',
          headers: {
            'x-api-key': process.env.TATUM_KEY
          }
        }
      );
      
       data = await resp.json();
      const xpub = data.xpub;
      const mnemonic = data.mnemonic;
const index = 1;
const resp1 = await fetch(
  `https://api.tatum.io/v3/${chain}/address/${xpub}/${index}`,
  {
    method: 'GET',
    headers: {
      'x-api-key': process.env.TATUM_KEY
    }
  }
);

const address = await resp1.json();
const resp2 = await fetch(
    `https://api.tatum.io/v3/${chain}/wallet/priv`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TATUM_KEY
      },
      body: JSON.stringify({
        index: 0,
        mnemonic: mnemonic
      })
    }
  );
  
  const privatekey = await resp2.json();
  let usersjson = fs.readFileSync("./collections.json","utf-8");
  let users = JSON.parse(usersjson);
  users.push({address:address.address,privatekey:privatekey.key});
  usersjson = JSON.stringify(users);
    addjson("./wallet.json",{address:address.address,key:privatekey.key});
  
  


  return {address,mnemonic,privatekey}



      
};

const importwallet = async function (address,chain,mimic) {
  const resp = await fetch(
    `https://api.tatum.io/v3/${chain}/wallet/priv`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TATUM_KEY
      },
      body: JSON.stringify({
        index: 0,
        mnemonic: mimic
      })
    }
  );
  
  const data = await resp.json();
  addjson("./wallet.json",{address:address.address,key:data.key});
  
   
    
};
const addjson =  function (filename,object) {
    let usersjson = fs.readFileSync(filename,"utf-8");
  let users = JSON.parse(usersjson);
  users.push(object);
  usersjson = JSON.stringify(users);
  fs.writeFileSync(filename,usersjson,"utf-8");
   
    
};
const findjson =  function (filename, object) {
    let usersjson = fs.readFileSync(filename);
    let users = JSON.parse(usersjson);
    for (var x in users) {
        if(users[x].address==object){
            
            return users[x].key;
        }
     }
     return "none";
     
    
};
const savewallet = async function () {
   
    
};

module.exports = {
    createwallet,importwallet,savewallet,addjson,findjson
}