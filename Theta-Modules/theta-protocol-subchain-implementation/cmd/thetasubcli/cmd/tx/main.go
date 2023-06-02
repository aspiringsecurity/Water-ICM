package tx

import (
	"github.com/spf13/cobra"
)

// Common flags used in Tx sub commands.
var (
	chainIDFlag                  string
	fromFlag                     string
	toFlag                       string
	pathFlag                     string
	seqFlag                      uint64
	thetaAmountFlag              string
	tfuelAmountFlag              string
	gasAmountFlag                uint64
	feeFlag                      string
	resourceIDsFlag              []string
	resourceIDFlag               string
	durationFlag                 uint64
	reserveFundInTFuelFlag       string
	reserveCollateralInTFuelFlag string
	reserveSeqFlag               uint64
	addressesFlag                []string
	percentagesFlag              []string
	valueFlag                    string
	gasPriceFlag                 string
	gasLimitFlag                 uint64
	dataFlag                     string
	walletFlag                   string
	stakeInThetaFlag             string
	purposeFlag                  uint8
	sourceFlag                   string
	holderFlag                   string
	asyncFlag                    bool
	beneficiaryFlag              string
	splitBasisPointFlag          uint64
	passwordFlag                 string
)

// TxCmd represents the Tx command
var TxCmd = &cobra.Command{
	Use:   "tx",
	Short: "Manage transactions",
	Long:  `Manage transactions.`,
}

func init() {
	TxCmd.AddCommand(sendCmd)
	TxCmd.AddCommand(smartContractCmd)
}
