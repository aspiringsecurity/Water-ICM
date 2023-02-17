# Pallet assets chain extension

The repository contains full implementation(`ink` and `substrate` parts) of the `pallet-assets`
chain extension.

The crate can be imported on the parachain side with `substrate` and `substrate-std` features:

```
...

# Contracts specific packages
pallet-contracts = { git = "https://github.com/paritytech/substrate", package = "pallet-contracts", default-features = false }
pallet-contracts-primitives = { git = "https://github.com/paritytech/substrate", package = "pallet-contracts-primitives", default-features = false }
pallet-contracts-rpc-runtime-api = { git = "https://github.com/paritytech/substrate", package = "pallet-contracts-rpc-runtime-api", default-features = false }

# Chain extension for `pallet-assets`
pallet-assets = { git = "https://github.com/paritytech/substrate", package = "pallet-assets", default-features = false }
pallet-assets-chain-extension = { git = "https://github.com/Supercolony-net/pallet-assets-chain-extension", default-features = false, features = ["substrate"]  }
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^
# Here imported with `substrate` feature

...


std = [
	...
	"pallet-assets/std",
	"pallet-assets-chain-extension/substrate-std", # <---- Here impoted with `substrate-std` feature
]

...
```



The crate can be imported on the smart contract side with `ink` and `ink-std` features:

```
...

# Ink deps
ink_primitives = { version = "~3.3.0", default-features = false }
ink_metadata = { version = "~3.3.0", default-features = false, features = ["derive"], optional = true }
ink_env = { version = "~3.3.0", default-features = false }
ink_storage = { version = "~3.3.0", default-features = false }
ink_lang = { version = "~3.3.0", default-features = false }
ink_prelude = { version = "~3.3.0", default-features = false }
ink_engine = { version = "~3.3.0", default-features = false, optional = true }

pallet-assets-chain-extension = { git = "https://github.com/Supercolony-net/pallet-assets-chain-extension", default-features = false, features = ["ink"]  }
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^
# Here imported with `ink` feature

...

std = [
	...
	"pallet-assets-chain-extension/ink-std", # <---- Here impoted with `ink-std` feature
]

...
```

