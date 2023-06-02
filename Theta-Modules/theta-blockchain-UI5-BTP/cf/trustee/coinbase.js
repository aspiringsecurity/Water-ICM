var CoinbasePro = require('coinbase-pro-node').CoinbasePro;
// API Keys can be generated here:
// https://pro.coinbase.com/profile/api
// https://public.sandbox.pro.coinbase.com/profile/api
var auth = {
    apiKey: 'd02b2d6c559546cad924208896bcc892',
    apiSecret: 'gGSJV+g1gTZ7Sccs0aN+Ni/U7MB6YqQWUMqYtfu6Kqe/auU0E9hoTFHwWEb6q7kzRLzG518g2jDmsGY2arwj6Q==',
    passphrase: 'fpy6n4mmlmb',
    // The Sandbox is for testing only and offers a subset of the products/assets:
    // https://docs.pro.coinbase.com/#sandbox
    useSandbox: true
};
var client = new CoinbasePro(auth);
client.rest.account.listAccounts().then(function (accounts) {
    var message = "You can trade \"" + accounts.length + "\" different pairs.";
    console.log(message);
});
