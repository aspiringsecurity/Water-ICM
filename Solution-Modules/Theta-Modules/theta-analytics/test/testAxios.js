// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`)

const axios = require('axios')

// const url =
//   'https://api.thetadrop.com/type/type_q6kexwknrap7xzdhk8x2t9b5447.json?nft_id=nft_iiepzyvy3i5803ywnb59h8cuu0pv'

async function main() {
  const option = {
    url: 'https://explorer.thetatoken.org:8443/api/smartcontract/0xc9eca1e66cd16e6177536d31b565923f0afbaa9c',
    timeout: 3000,
    method: 'get'
    // responseType: 'json'
    // responseEncoding: 'utf8',
  }

  try {
    const res = await axios(option)
    console.log(res)
    console.log(res.data)
  } catch (e) {
    console.log('error')
    console.log(e)
  }
}
main()
