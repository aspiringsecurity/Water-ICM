```
$ solc --help
solc, the Solidity commandline compiler.

This program comes with ABSOLUTELY NO WARRANTY. This is free software, and you
are welcome to redistribute it under certain conditions. See 'solc --license'
for details.

Usage: solc [options] [input_file...]
Compiles the given Solidity input files (or the standard input if none given or
"-" is used as a file name) and outputs the components specified in the options
at standard output or in files in the output directory, if specified.
Imports are automatically read from the filesystem, but it is also possible to
remap paths using the context:prefix=path syntax.
Example:
    solc --bin -o /tmp/solcoutput dapp-bin=/usr/local/lib/dapp-bin contract.sol

Allowed options:
  --help               Show help message and exit.
  --version            Show version and exit.
  --license            Show licensing information and exit.
  --evm-version version
                       Select desired EVM version. Either homestead, 
                       tangerineWhistle, spuriousDragon, byzantium (default) or
                       constantinople.
  --optimize           Enable bytecode optimizer.
  --optimize-runs n (=200)
                       Set for how many contract runs to optimize.Lower values 
                       will optimize more for initial deployment cost, higher 
                       values will optimize more for high-frequency usage.
  --pretty-json        Output JSON in pretty format. Currently it only works 
                       with the combined JSON output.
  --libraries libs     Direct string or file containing library addresses. 
                       Syntax: <libraryName>:<address> [, or whitespace] ...
                       Address is interpreted as a hex string optionally 
                       prefixed by 0x.
  -o [ --output-dir ] path
                       If given, creates one file per component and 
                       contract/file at the specified directory.
  --overwrite          Overwrite existing files (used together with -o).
  --combined-json abi,asm,ast,bin,bin-runtime,compact-format,devdoc,hashes,interface,metadata,opcodes,srcmap,srcmap-runtime,userdoc
                       Output a single json document containing the specified 
                       information.
  --gas                Print an estimate of the maximal gas usage for each 
                       function.
  --standard-json      Switch to Standard JSON input / output mode, ignoring 
                       all options. It reads from standard input and provides 
                       the result on the standard output.
  --assemble           Switch to assembly mode, ignoring all options except 
                       --machine and assumes input is assembly.
  --yul                Switch to Yul mode, ignoring all options except 
                       --machine and assumes input is Yul.
  --strict-assembly    Switch to strict assembly mode, ignoring all options 
                       except --machine and assumes input is strict assembly.
  --machine evm,evm15,ewasm
                       Target machine in assembly or Yul mode.
  --link               Switch to linker mode, ignoring all options apart from 
                       --libraries and modify binaries in place.
  --metadata-literal   Store referenced sources are literal data in the 
                       metadata output.
  --allow-paths path(s)
                       Allow a given path for imports. A list of paths can be 
                       supplied by separating them with a comma.
  --ignore-missing     Ignore missing files.

Output Components:
  --ast                AST of all source files.
  --ast-json           AST of all source files in JSON format.
  --ast-compact-json   AST of all source files in a compact JSON format.
  --asm                EVM assembly of the contracts.
  --asm-json           EVM assembly of the contracts in JSON format.
  --opcodes            Opcodes of the contracts.
  --bin                Binary of the contracts in hex.
  --bin-runtime        Binary of the runtime part of the contracts in hex.
  --abi                ABI specification of the contracts.
  --hashes             Function signature hashes of the contracts.
  --userdoc            Natspec user documentation of all contracts.
  --devdoc             Natspec developer documentation of all contracts.
  --metadata           Combined Metadata JSON whose Swarm hash is stored 
                       on-chain.

https://docs.soliditylang.org/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description

solc --pretty-json --combined-json abi ./zombiefactory.sol | jq '.contracts | ."./zombiefactory.sol:ZombieFactory".abi'

```