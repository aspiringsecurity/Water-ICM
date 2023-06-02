launch.json
```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  "version": "0.2.0",
  "configurations": [
  {
    "name": "Launch Trustee",
    "program": "${workspaceFolder}/btp-blockchain-theta/cf/trustee/server.js",
    "request": "launch",
    "envFile": "${workspaceFolder}/btp-blockchain-theta/cf/trustee/.env",
    "cwd": "${workspaceFolder}/btp-blockchain-theta/cf/trustee",
    "skipFiles": [
      "<node_internals>/**"
    ],
    "type": "pwa-node"
  }
  ]
}
```
  {
    "name": "Launch Trustee",
    "program": "${workspaceFolder}/cf/trustee/server.js",
    "request": "launch",
    "envFile": "${workspaceFolder}/cf/trustee/.env",
    "skipFiles": [
      "<node_internals>/**"
    ],
    "type": "pwa-node"
  },

// This is in default2dot now
echo "PORT=8080" > .env
echo -n "destinations=" >> .env
cat default-env.json | jq -c .destinations | sed 's/\\n//g' | sed 's/\\"/"/g' | sed 's/"/'"'"'/' | rev | sed 's/"/'"'"'/' | rev >> .env
echo -n "VCAP_SERVICES='" >> .env
cat default-env.json | jq -c .VCAP_SERVICES | tr -d '\n' >> .env
echo "'" >> .env


cd cf/trustee
npm install
cf de theta-trustee
./default2dot
