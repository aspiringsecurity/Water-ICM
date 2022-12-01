
const { Revise } = require("revise-sdk");
const user= require("./user.js")
const app= require("../app.js")
require('dotenv').config();
const revise = new Revise({auth: process.env.R_AUTH_TOKEN});
const mintnft = async function (asset,assetname,tokenId,description,more,collectionid,walletaddress) { 
    try{
        const nft = await revise.addNFT(
            {
              image:
               asset,
              name: assetname,
              tokenId: tokenId,
              description: description,
            },
            more,
            collectionid!=null?collectionid:null
    
            
          );
        
          console.log(nft);

    user.addjson("./src/collections.json",{address:walletaddress,collectionid:nft})
          return nft;
       
    }
    catch(v){
        return v;

    }
    
    
};
const mintdynamicnft = async function (asset,assetname,tokenId,description,more,collectionid,walletaddress,api,propertytype,propertyvalue) { 
  try{
      const nft = await revise.addNFT(
          {
            image:
             asset,
            name: assetname,
            tokenId: tokenId,
            description: description,
          },
          more,
          collectionid!=null?collectionid:null
  
          
        );
const nftt = revise.nft(nft);
revise.every('3s').listenTo(api).start(apiData => {
	nft.setImage(apiData.newImage)
		.setProperty(propertytype, apiData.propertyvalue)
		.save();
});

  user.addjson("./src/collections.json",{address:walletaddress,collectionid:nft})
        return nft;
     
  }
  catch(v){
      return v;

  }
  
  
};


const createcollection = async function (col,uri,walletaddress) {
    try{
        const collection = await revise.addCollection({
            name: col,
            uri: uri,
          });
          console.log(collection);
          user.addjson("./src/collections.json",{address:walletaddress,key:collection.id})
          return collection.id;
    }catch(v){
        console.log("hello");
        return v;
    }   
};

//Revise
const getcollection = async function (walletaddress) {
   const id= await user.findjson("./src/collections.json",walletaddress);
   console.log(id);
   const nfts = await revise.fetchNFTs(id);
   console.log(nfts);
   return nfts;

    
};
//Revise
const viewnft = async function (id) {
  const nft = await revise.fetchNFT(id);
  console.log(nft);
  return nft;
   
    
};

const connectnft=async function(id,api){
  const nftObj = await revise.fetchNFT(id);
const nft = revise.nft(nftObj);

revise.every('3s').listenTo(api).start(apiData => {
	nft.setImage(apiData.newImage)
		.setProperty("property", apiData.property)
		.save();
});
}

//Komet
const sendnft = async function () {
   
    
};
const revisenft = async function (id,property,value) {
  
const nft = await revise.fetchNFT(id);
  const result = await revise.nft(nft)
                      .setProperty(property, value)
                      .save();

console.log(nft);
   
    
};
module.exports = {
    mintnft,createcollection,getcollection,viewnft,sendnft,connectnft,revisenft,mintdynamicnft
}



