module github.com/sap-samples/btp-blockchain-theta/thetaoffchaingo

go 1.16

require (
	//	github.com/andrewlunde/thetaoffchaingo v0.0.0-20210721173506-b9d779faa08d
	github.com/herumi/bls-eth-go-binary v0.0.0-20210520070601-31246bfa8ac4 // indirect
	github.com/mattn/go-sqlite3 v1.14.8 // indirect
	github.com/spf13/viper v1.8.1
	github.com/thetatoken/theta/query v0.2.0
	github.com/thetatoken/theta/tx v0.2.0
)

replace (
	github.com/thetatoken/theta v0.0.0 => github.com/andrewlunde/theta-protocol-ledger v0.1.0
	github.com/thetatoken/theta/common v0.0.0 => github.com/andrewlunde/thetaoffchaingo_common v0.2.1
	github.com/thetatoken/theta/query v0.2.0 => github.com/andrewlunde/thetaoffchaingo_query v0.2.1
	//github.com/thetatoken/theta/query v0.2.0 => ../thetaoffchaingo_query
	github.com/thetatoken/theta/rpc/lib/rpc-codec/jsonrpc2 v0.0.0 => github.com/andrewlunde/thetaoffchaingo_rpc v0.2.1
	github.com/thetatoken/theta/tx v0.2.0 => github.com/andrewlunde/thetaoffchaingo_tx v0.2.1
	//github.com/thetatoken/theta/tx v0.2.0 => ../thetaoffchaingo_tx
	github.com/thetatoken/theta/utils v0.0.0 => github.com/andrewlunde/thetaoffchaingo_utils v0.2.1
)
