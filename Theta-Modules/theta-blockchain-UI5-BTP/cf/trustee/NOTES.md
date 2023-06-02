Off-Chain on hold.


git/theta-js/dist/thetajs.cjs.js
```
class ReserveFundTransaction extends BaseTransaction{
    constructor(tx){
        super(tx);

        // ThetaCLI Go Implementation
        // https://github.com/thetatoken/theta-protocol-ledger/blob/master/cmd/thetacli/cmd/tx/reserve_fund.go
        // Line: 66

        // reserveFundTx := &types.ReserveFundTx{
        //     Fee: types.Coins{
        //         ThetaWei: new(big.Int).SetUint64(0),
        //         TFuelWei: fee,
        //     },
        //     Source:      input,
        //     ResourceIDs: resourceIDs,
        //     Collateral:  collateral,
        //     Duration:    durationFlag,
        // }
    
        // Theta-Protocol-Ledger
        // https://github.com/thetatoken/theta-protocol-ledger/blob/master/ledger/types/reserved_fund.go
        // https://github.com/thetatoken/theta-protocol-ledger/blob/master/ledger/execution/tx_reserve_fund.go

        // https://github.com/thetatoken/theta-protocol-ledger/blob/master/ledger/execution/tx_service_payment.go

        let {fee,source,resourceID,collateral,duration} = tx;


        if(_.isNil(sequence)){
            this.setSequence(1);
        }
    }

    setSequence(sequence){
        const input = this.source;
        input.sequence = sequence;
    }

    getSequence(){
        const input = this.source;
        return input.sequence;
    }

    setFrom(address){
        const input = this.source;
        input.address = address;
    }

    setSignature(signature){
        let input = this.source;
        input.setSignature(signature);
    }

    signBytes(chainID){
        // Detach the existing signature from the source if any, so that we don't sign the signature
        let sig = this.source.signature;

        this.source.signature = "";

        let encodedChainID = RLP.encode(Bytes.fromString(chainID));
        let encodedTxType = RLP.encode(Bytes.fromNumber(this.getType()));
        let encodedTx = RLP.encode(this.rlpInput());
        let payload = encodedChainID + encodedTxType.slice(2) + encodedTx.slice(2);

        // For ethereum tx compatibility, encode the tx as the payload
        let ethTxWrapper = new EthereumTx(payload);
        let signedBytes = RLP.encode(ethTxWrapper.rlpInput()); // the signBytes conforms to the Ethereum raw tx format

        // Attach the original signature back to the source
        this.source.signature = sig;

        return signedBytes;
    }

    getType(){
        return TxType.ReserveFund;
    }

    rlpInput(){
        let rlpInput = [
            this.fee.rlpInput(),
            this.source.rlpInput(),
            this.holder.rlpInput(),

            Bytes.fromNumber(this.purpose),
        ];

        return rlpInput;
    }
}
```
git tag v3.0 -a -m "Part 3"
git push origin v3.0
```


Might need to simulate a oauth token exchange for client 
https://www.npmjs.com/package/@sap/sbss

