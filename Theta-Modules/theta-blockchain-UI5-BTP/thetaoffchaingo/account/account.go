package account

import (
	"encoding/json"
	"fmt"

	"github.com/thetatoken/theta/cmd/thetacli/cmd/utils"
	"github.com/thetatoken/theta/common"
	"github.com/thetatoken/theta/rpc"

	rpcc "github.com/ybbus/jsonrpc"
)

func getAccount(endpoint string, address string) {
	client := rpcc.NewRPCClient(endpoint)

	res, err := client.Call("theta.GetAccount", rpc.GetAccountArgs{
		Address: address,
		Height:  common.JSONUint64(uint64(0)),
		Preview: false})
	if err != nil {
		utils.Error("Failed to get account details: %v\n", err)
	}
	if res.Error != nil {
		utils.Error("Failed to get account details: %v\n", res.Error)
	}
	json, err := json.MarshalIndent(res.Result, "", "    ")
	if err != nil {
		utils.Error("Failed to parse server response: %v\n%v\n", err, string(json))
	}
	fmt.Println(string(json))
}

func Ping() string {
	var output string
	output = "Pong"
	return output
}
