const url = require('url')
const urlPath = 'http://api.thetadrop.com/pack/pack_p356vgqy520jw6dpb3bkqd89ri1.json'
// var parsed = url.parse(urlPath)
var parsed = url.parse(urlPath)
console.log(parsed.host)
console.log(parsed.protocol)
if (!parsed.pathname.replace(/\//g, '')) {
  console.log(1)
  console.log(parsed.pathname)
} else {
  console.log(2)
}
if (null) {
  console.log(3)
}
