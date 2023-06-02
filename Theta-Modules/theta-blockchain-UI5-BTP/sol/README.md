### Prereqs

npm install -g solc
npm install -g solc-import

// Docs 
https://github.com/ethereum/solc-js

### https://cryptozombies.io/en/course

[Lesson 1](https://cryptozombies.io/en/lesson/1/chapter/1)

solcjs --bin zombiefeeding.sol zombiefactory.sol
solcjs --abi zombiefeeding.sol zombiefactory.sol

solcjs --bin --base-path . ./zombiefeeding.sol
solcjs --output-dir outbin --bin --base-path . ./zombiefeeding.sol
solcjs --output-dir outbin --abi --base-path . ./zombiefeeding.sol
cat outbin/_zombiefactory_sol_ZombieFactory.abi
cat outbin/_zombiefactory_sol_ZombieFactory.bin

Linux Packages
Binary packages of Solidity are available at [solidity/releases](https://github.com/ethereum/solidity/releases).


solc --output-dir outbin --bin ./zombiefeeding.sol
solc --output-dir outbin --abi ./zombiefeeding.sol
cat outbin/ZombieFactory.abi
cat outbin/ZombieFactory.bin



thetacli call smart_contract --help

        [Deploy a smart contract (local only)]
        thetacli call smart_contract --from=2E833968E5bB786Ae419c4d13189fB081Cc43bab --value=1680 --gas_price=3 --gas_limit=50000 --data=600a600c600039600a6000f3600360135360016013f3

        [Call an API of a smart contract (local only)]
        thetacli call smart_contract --from=2E833968E5bB786Ae419c4d13189fB081Cc43bab --to=0x7ad6cea2bc3162e30a3c98d84f821b3233c22647 --gas_price=3 --gas_limit=50000

Flags:
      --chain string       Chain ID
      --data string        The data for the smart contract
      --from string        The caller address
      --gas_limit uint     The gas limit
      --gas_price string   The gas price (default "100000000wei")
  -h, --help               help for smart_contract
      --seq uint           Sequence number of the transaction
      --to string          The smart contract address
      --value uint         Value to be transferred
      --verbose

Smart contract feature not enabled until block height 8411427

solc --pretty-json --combined-json opcodes,srcmap ./zombiefactory.sol > outbin/out.json ; cat outbin/out.json | jq '.contracts | ."./zombiefactory.sol:ZombieFactory" '

solc --pretty-json --combined-json abi,bin,opcodes,srcmap ./zombiefeeding.sol > outbin/out.json ; cat outbin/out.json | jq '.contracts '

solc --pretty-json --combined-json abi,bin,opcodes,srcmap ./zombiefeeding.sol > outbin/out.json ; cat outbin/out.json | jq '.contracts | ."./zombiefeeding.sol:ZombieFeeding" '

solc --pretty-json --combined-json abi,bin,opcodes,srcmap ./zombiefeeding.sol > outbin/combined.json ; cat outbin/combined.json | jq '.contracts | ."./zombiefeeding.sol:ZombieFeeding" | .abi ' > outbin/abi.json ; cat outbin/combined.json | jq '.contracts | ."./zombiefeeding.sol:ZombieFeeding" | .srcmap ' > outbin/sourceMap.json ; cat outbin/combined.json | jq '.contracts | ."./zombiefeeding.sol:ZombieFeeding" | .opcodes ' > outbin/opcodes.json ; cat outbin/combined.json | jq '.contracts | ."./zombiefeeding.sol:ZombieFeeding" | .bin ' > outbin/object.json
