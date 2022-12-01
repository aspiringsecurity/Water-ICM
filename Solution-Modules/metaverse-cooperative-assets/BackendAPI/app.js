const message= require("./src/message.js")
const nft= require("./src/nft.js")
const wallet= require("./src/wallet.js")
const user= require("./src/user.js")

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const { parse } = require("dotenv");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require('twilio')(accountSid,authToken);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",router);

const PORT = process.env.PORT || 5000

router.post("/createcollection", (req,res)=>{
  res.send(nft.createcollection(req.body.collectionname,req.body.uri,req.body.walletaddress));
 
});
router.post("/sendmoney", async (req,res)=>{
  res.send(
  await wallet.sendmoneysamenetwork('polygon',req.body.receiveid,req.body.senderid,req.body.value));
});

router.post("/getcollection", async (req,res)=>{ 
  res.send( await nft.getcollection( req.body.walletaddress));

 
});
router.post("/mintnft",async (req,res)=>{
  const aa= user.findjson("./src/collections.json",req.body.walletaddress);
  res.send(nft.mintnft(req.body.asseturl,req.body.name,req.body.tokenId,req.body.description,req.body.metadata,aa));
 
});
router.post("/mintdynamicnft",async (req,res)=>{
  const aa= user.findjson("./src/collections.json",req.body.walletaddress);
  res.send(nft.mintnft(req.body.asseturl,req.body.name,req.body.tokenId,req.body.description,req.body.metadata,aa,res.body.api,res.body.propertytype,res.body.propertyvalue));
 
});
router.post("/revisenft",async (req,res)=>{
  res.send(nft.revisenft(req.body.nftid,req.body.property,req.body.value));
 
});
router.post("/viewnft", async (req,res)=>{
  console.log("abc")
   
  res.send(await nft.viewnft(req.body.nftid));
 
});
router.post("/getwalletbalance",async (req,res)=>{
  console.log(req.body.walletaddress);

  res.send(await wallet.getwalletbalance(req.body.walletaddress,req.body.chain));
 
});
router.post("/getprivatekey",async (req,res)=>{
  console.log(req.body);
  res.send(await wallet.getprivatekey(req.body.walletaddress));
 
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))