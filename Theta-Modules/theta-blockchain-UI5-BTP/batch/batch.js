/*eslint no-console: 0*/
"use strict";
require('isomorphic-fetch');
const BigNumber = require('bignumber.js');
// node_modules/@thetalabs/theta-js/docs
const thetajs = require('@thetalabs/theta-js');
const Wallet = thetajs.Wallet;
const {HttpProvider} = thetajs.providers;
const SendTransaction = thetajs.transactions.SendTransaction;
const Contract = thetajs.Contract;
const ContractFactory = thetajs.ContractFactory;
const {ChainIds} = thetajs.networks;

const AddressAdmin = "<ADMIN_WALLET_ADDRESS>";
const AddressUser1 = "<USER1_WALLET_ADDRESS>";
const AddressUser2 = "<USER2_WALLET_ADDRESS>";
const PrivateKeyAdmin = "<ADMIN_PRIVATE_KEY>";
const PrivateKeyUser1 = "<USER1_PRIVATE_KEY>";
const PrivateKeyUser2 = "<USER2_PRIVATE_KEY>";

var port = process.env.PORT || 3000;

function resolveAfter1Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter1Seconds();
  console.log(result);
  // expected output: "resolved"
  return result;
}

//$ thetacli key list
//0x0d2fD67d573c8ecB4161510fc00754d64B401F86 +
//0x21cA457E6E34162654aDEe28bcf235ebE5eee5De -
//0x2E833968E5bB786Ae419c4d13189fB081Cc43bab +
//0x70f587259738cB626A1720Af7038B8DcDb6a42a0 -
//0xa5cdB2B0306518fb37b28bb63A1B2590FdE9b747 - 
//0xcd56123D0c5D6C1Ba4D39367b88cba61D93F5405 - 


async function doMain() {
    console.log("Batch Started.");
    console.info("Port: " + port);
    //https://docs.thetatoken.org/docs/theta-js-sdk-providers
    //var provider = new HttpProvider(ChainIds.Privatenet); // Not working?
    const provider = new thetajs.providers.HttpProvider('privatenet', 'http://localhost:16888/rpc'); // Works

    try {
        const darez = await asyncCall();
        console.log("after :" + darez);

        const blockHeight = await provider.getBlockNumber();
        console.log("bH :" + blockHeight);

        // thetacli query account --address=2E833968E5bB786Ae419c4d13189fB081Cc43bab | jq .coins
        const address = "0x2E833968E5bB786Ae419c4d13189fB081Cc43bab";
        var account = await provider.getAccount(address);
        console.log("account :" + JSON.stringify(account.coins,null,2));
        const acc_theta = account.coins.thetawei;
    
        const count = await provider.getTransactionCount(address);
        console.log("count :" + count);

        // cat ~/.thetacli/keys/plain/2E833968E5bB786Ae419c4d13189fB081Cc43bab
        const privateKey = "0x93a90ea508331dfdf27fb79757d4250b4e84954927ba0073cd67454ac432c737";
        // cat ~/.thetacli/keys/encrypted/2E833968E5bB786Ae419c4d13189fB081Cc43bab
        //const privateKey = '{"address":"2e833968e5bb786ae419c4d13189fb081cc43bab","crypto":{"cipher":"aes-128-ctr","ciphertext":"2dad160420b1e9b6fc152cd691a686a7080a0cee41b98754597a2ce57cc5dab1","cipherparams":{"iv":"7b3c44bc23961e32e277ac01ddb84505"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"7afcf25c66f0205a5eaac94bf789f46dd6def4262d793e3b417d1a6ae8ea5056"},"mac":"4cbfaf270b3ba1ae5dab7c873b31159e1ed75add4d1e16206f9bb4bc3c6f9fdb"},"id":"046d2f92-8e6a-4e91-9785-248c9345b07f","version":3}';

        // thetacli query account --address=0d2fD67d573c8ecB4161510fc00754d64B401F86 | jq .coins
        const address2 = "0x0d2fD67d573c8ecB4161510fc00754d64B401F86";
        var account2 = await provider.getAccount(address2);
        console.log("account2 :" + JSON.stringify(account2.coins,null,2));
        const acc2_theta = account2.coins.thetawei;
 
        const count2 = await provider.getTransactionCount(address);
        console.log("count2 :" + count2);

        // cat ~/.thetacli/keys/plain/0d2fD67d573c8ecB4161510fc00754d64B401F86
        const privateKey2 = "0x931f84b1891be0b745875ecc9f929d5252c3fdbfbaa4a40810089b44158b02c1";

        const wallet = new Wallet(privateKey);
        const connectedWallet = wallet.connect(provider);

        const ten18 = (new BigNumber(10)).pow(18); // 10^18, 1 Theta = 10^18 ThetaWei, 1 Gamma = 10^ TFuelWei
        const thetaWeiToSend = (new BigNumber(1)).multipliedBy(ten18);
        const tfuelWeiToSend = (new BigNumber(0.0001)).multipliedBy(ten18);
        const from = address;
        const to = address2;
        const txData = {
            from: from,
            outputs: [
                {
                    address: to,
                    thetaWei: thetaWeiToSend,
                    tfuelWei: tfuelWeiToSend,
                    sequence: count + 1
                }
            ]
        }
        
        const transaction = new SendTransaction(txData);
        console.log("transaction :" + JSON.stringify(transaction,null,2));
        
        
        if (false) {
            const txresult = await connectedWallet.sendTransaction(transaction);
            console.log("txresult :" + JSON.stringify(txresult,null,2));

            const blockHash = txresult.hash;
            console.log("blockHash :" + JSON.stringify(blockHash,null,2));
            const block = await provider.getTransaction(blockHash);
            console.log("block :" + JSON.stringify(block,null,2));
        }
        
        // Log before and after Theta balances
        console.log("before account  :" + acc_theta);

        account = await provider.getAccount(address);
        console.log("after  account :" + JSON.stringify(account.coins.thetawei,null,2));

        console.log("before account2 :" + acc2_theta);

        account2 = await provider.getAccount(address2);
        console.log("after  account2:" + JSON.stringify(account2.coins.thetawei,null,2));

        //const rwallet = Wallet.createRandom();
        //console.log("rwallet" + JSON.stringify(rwallet,null,2));

        //Test Wallet created at https://wallet.thetatoken.org/create
        // Details in the wallet folder (tar xzvf wallet.tgz)
        
        // https://docs.thetatoken.org/docs/theta-js-sdk-signers#create-a-wallet-from-a-mnemonic-phrase  
        //const phrase = 'push drip galaxy range bullet rug update airport buzz october bubble stem';
        //const nmwallet = thetajs.Wallet.fromMnemonic(phrase);
        //console.log("nmwallet" + JSON.stringify(nmwallet,null,2));

        // https://docs.thetatoken.org/docs/theta-js-sdk-signers#create-a-wallet-from-a-private-key
        //const privKey = '0x784ddc9e534dc0a954784efb3540e521f9663f78910791622f78b1ee72ae3fae';
        //const pkwallet = new Wallet(privKey);
        //console.log("pkwallet" + JSON.stringify(pkwallet,null,2));

        // https://docs.thetatoken.org/docs/theta-js-sdk-signers#create-a-wallet-from-an-encrypted-json-file
        //const json = '{"version":3,"id":"0e9c100a-10e6-4c82-8203-e1d887e77b26","address":"94284c201b6dff344e086b2878b8fd0cf8b9ed28","crypto":{"ciphertext":"8a38b6b0c5261b5cadca023d2e99d3313e764c8605ab2d555808bb0f79b5991c","cipherparams":{"iv":"9500790f98a261a3c29d75f3104a0855"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"712c8365f76d0ac0547b2b9d8174d40ca8b88799b4cbe8d9e647b70ed2acf1b2","n":8192,"r":8,"p":1},"mac":"94133b1d449dd16e08e6098086392b30195734299bc0c8c773042b2b8ed9c952"}}';
        //const ssapword = "qwertyuiop";
        //const kswallet = Wallet.fromEncryptedJson(json, ssapword);
        //console.log("kswallet" + JSON.stringify(kswallet,null,2));

        return console.log("Batch Finished.");
    } catch(e) {
        console.error(e);
    }

}

doMain();

