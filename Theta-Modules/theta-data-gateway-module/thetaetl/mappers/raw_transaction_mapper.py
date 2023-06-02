# MIT License
#
# Copyright (c) 2018 Evgeny Medvedev, evge.medvedev@gmail.com
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

from thetaetl.domain.raw_transaction.coinbase_tx import ThetaCoinbaseTx
from thetaetl.domain.raw_transaction.slash_tx import ThetaSlashTx
from thetaetl.domain.raw_transaction.send_tx import ThetaSendTx
from thetaetl.domain.raw_transaction.reserve_fund_tx import ThetaReserveFundTx
from thetaetl.domain.raw_transaction.release_fund_tx import ThetaReleaseFundTx
from thetaetl.domain.raw_transaction.service_payment_tx import ThetaServicePaymentTx
from thetaetl.domain.raw_transaction.split_rule_tx import ThetaSplitRuleTx
from thetaetl.domain.raw_transaction.smart_contract_tx import ThetaSmartContractTx
from thetaetl.domain.raw_transaction.staking_tx import ThetaStakingTx
from thetaetl.domain.raw_transaction.split import ThetaSplit
from thetaetl.mappers.coins_mapper import ThetaCoinsMapper
from thetaetl.mappers.coins_input_mapper import ThetaCoinsInputMapper
from thetaetl.mappers.coins_output_mapper import ThetaCoinsOutputMapper
from thetaetl.mappers.split_mapper import ThetaSplitMapper

TxCoinbase = 0
TxSlash = 1
TxSend = 2
TxReserveFund = 3
TxReleaseFund = 4
TxServicePayment = 5
TxSplitRule = 6
TxSmartContract = 7
TxDepositStake = 8
TxWithdrawStake = 9
TxDepositStakeV2 = 10

class ThetaRawTransactionMapper(object):
    def __init__(self, coins_mapper=None, coins_input_mapper=None, coins_output_mapper=None, split_mapper=None):
        if coins_mapper is None:
            self.coins_mapper = ThetaCoinsMapper()
        else:
            self.coins_mapper = coins_mapper

        if coins_input_mapper is None:
            self.coins_input_mapper = ThetaCoinsInputMapper()
        else:
            self.coins_input_mapper = coins_input_mapper

        if coins_output_mapper is None:
            self.coins_output_mapper = ThetaCoinsOutputMapper()
        else:
            self.coins_output_mapper = coins_output_mapper

        if split_mapper is None:
            self.split_mapper = ThetaSplitMapper()
        else:
            self.split_mapper = split_mapper

    def json_dict_to_raw_transaction(self, json_dict, tx_type):
        raw_transaction = None

        if tx_type == TxCoinbase:
            raw_transaction = ThetaCoinbaseTx()
            raw_transaction.block_height = json_dict['block_height']
            raw_transaction.proposer = self.coins_input_mapper.json_dict_to_coins_input(json_dict['proposer'])
            raw_transaction.outputs = [
                self.coins_output_mapper.json_dict_to_coins_output(output)
                for output in json_dict['outputs']
                if isinstance(output, dict)
            ]
        elif tx_type == TxSlash:
            raw_transaction = ThetaSlashTx()
            raw_transaction.proposer = self.coins_input_mapper.json_dict_to_coins_input(json_dict['proposer'])
            raw_transaction.slashed_address = json_dict['slashed_address']
            raw_transaction.reserved_sequence = json_dict['reserved_sequence']
            raw_transaction.slash_proof = json_dict['slash_proof']
        elif tx_type == TxSend:
            raw_transaction = ThetaSendTx()
            raw_transaction.fee = self.coins_mapper.json_dict_to_coins(json_dict.get('fee'))
            raw_transaction.inputs = [
                self.coins_input_mapper.json_dict_to_coins_input(iput)
                for iput in json_dict['inputs']
                if isinstance(iput, dict)
            ]
            raw_transaction.outputs = [
                self.coins_output_mapper.json_dict_to_coins_output(output)
                for output in json_dict['outputs']
                if isinstance(output, dict)
            ]
        elif tx_type == TxReserveFund:
            raw_transaction = ThetaReserveFundTx()
            raw_transaction.fee = self.coins_mapper.json_dict_to_coins(json_dict.get('fee'))
            raw_transaction.source = self.coins_input_mapper.json_dict_to_coins_input(json_dict['source'])
            raw_transaction.collateral = self.coins_mapper.json_dict_to_coins(json_dict.get('collateral'))
            raw_transaction.resource_ids = json_dict['resource_ids']
            raw_transaction.duration = json_dict['duration']
        elif tx_type == TxReleaseFund:
            raw_transaction = ThetaReleaseFundTx()
            raw_transaction.fee = self.coins_mapper.json_dict_to_coins(json_dict.get('fee'))
            raw_transaction.source = self.coins_input_mapper.json_dict_to_coins_input(json_dict['source'])
            raw_transaction.reserve_sequence = json_dict['reserve_sequence']
        elif tx_type == TxServicePayment:
            raw_transaction = ThetaServicePaymentTx()
            raw_transaction.fee = self.coins_mapper.json_dict_to_coins(json_dict.get('fee'))
            raw_transaction.source = self.coins_input_mapper.json_dict_to_coins_input(json_dict['source'])
            raw_transaction.target = self.coins_input_mapper.json_dict_to_coins_input(json_dict['target'])
            raw_transaction.payment_sequence = json_dict['payment_sequence']
            raw_transaction.reserve_sequence = json_dict['reserve_sequence']
            raw_transaction.resource_id = json_dict['resource_id']
        elif tx_type == TxSplitRule:
            raw_transaction = ThetaSplitRuleTx()
            raw_transaction.fee = self.coins_mapper.json_dict_to_coins(json_dict.get('fee'))
            raw_transaction.resource_id = json_dict['resource_id']
            raw_transaction.initiator = self.coins_input_mapper.json_dict_to_coins_input(json_dict['initiator'])
            raw_transaction.duration = json_dict['duration']
            raw_transaction.splits = [
                self.split_mapper.json_dict_to_split(split)
                for split in json_dict['splits']
                if isinstance(split, dict)
            ]
        elif tx_type == TxSmartContract:
            raw_transaction = ThetaSmartContractTx()
            raw_transaction.from_ = self.coins_input_mapper.json_dict_to_coins_input(json_dict['from'])
            raw_transaction.to = self.coins_output_mapper.json_dict_to_coins_output(json_dict['to'])
            raw_transaction.gas_limit = json_dict['gas_limit']
            raw_transaction.gas_price = json_dict['gas_price']
            raw_transaction.data = json_dict['data']
        elif tx_type == TxDepositStake or tx_type == TxWithdrawStake or tx_type == TxDepositStakeV2:
            raw_transaction = ThetaStakingTx()
            raw_transaction.fee = self.coins_mapper.json_dict_to_coins(json_dict.get('fee'))
            raw_transaction.source = self.coins_input_mapper.json_dict_to_coins_input(json_dict['source'])
            raw_transaction.holder = self.coins_output_mapper.json_dict_to_coins_output(json_dict['holder'])
            raw_transaction.purpose = json_dict['purpose']

        return raw_transaction

    def raw_transaction_to_dict(self, raw_transaction, tx_type):
        if tx_type == TxCoinbase:
            outputs = [
                self.coins_output_mapper.coins_output_to_dict(output)
                for output in raw_transaction.outputs
            ]
            return {
                'type': 'raw_transaction',
                'outputs': outputs,
                'block_height': raw_transaction.block_height,
                'proposer': self.coins_input_mapper.coins_input_to_dict(raw_transaction.proposer),
            }
        elif tx_type == TxSlash:
            return {
                'type': 'raw_transaction',
                'proposer': self.coins_input_mapper.coins_input_to_dict(raw_transaction.proposer),
                'slashed_address': raw_transaction.slashed_address,
                'reserved_sequence': raw_transaction.reserved_sequence,
                'slash_proof': raw_transaction.slash_proof,
            }
        elif tx_type == TxSend:
            fee = self.coins_mapper.coins_to_dict(raw_transaction.fee)
            inputs = [
                self.coins_input_mapper.coins_input_to_dict(iput)
                for iput in raw_transaction.inputs
            ]
            outputs = [
                self.coins_output_mapper.coins_output_to_dict(oput)
                for oput in raw_transaction.outputs
            ]
            return {
                'type': 'raw_transaction',
                'fee': fee,
                'inputs': inputs,
                'outputs': outputs,
            }
        elif tx_type == TxReserveFund:
            return {
                'type': 'raw_transaction',
                'fee': self.coins_mapper.coins_to_dict(raw_transaction.fee),
                'source': self.coins_input_mapper.coins_input_to_dict(raw_transaction.source),
                'collateral': self.coins_mapper.coins_to_dict(raw_transaction.collateral),
                'resource_ids': raw_transaction.resource_ids,
                'duration': raw_transaction.duration,
            }
        elif tx_type == TxReleaseFund:
            return {
                'type': 'raw_transaction',
                'fee': self.coins_mapper.coins_to_dict(raw_transaction.fee),
                'source': self.coins_input_mapper.coins_input_to_dict(raw_transaction.source),
                'reserve_sequence': raw_transaction.reserve_sequence,
            }
        elif tx_type == TxServicePayment:
            return {
                'type': 'raw_transaction',
                'fee': self.coins_mapper.coins_to_dict(raw_transaction.fee),
                'source': self.coins_input_mapper.coins_input_to_dict(raw_transaction.source),
                'target': self.coins_input_mapper.coins_input_to_dict(raw_transaction.target),
                'payment_sequence': raw_transaction.payment_sequence,
                'reserve_sequence': raw_transaction.reserve_sequence,
                'resource_id': raw_transaction.resource_id,
            }
        elif tx_type == TxSplitRule:
            splits = [
                self.split_mapper.split_to_dict(split)
                for split in raw_transaction.splits
            ]
            return {
                'type': 'raw_transaction',
                'fee': self.coins_mapper.coins_to_dict(raw_transaction.fee),
                'resource_id': raw_transaction.resource_id,
                'initiator': self.coins_input_mapper.coins_input_to_dict(raw_transaction.initiator),
                'duration': raw_transaction.duration,
                'splits': splits,
            }
        elif tx_type == TxSmartContract:
            return {
                'type': 'raw_transaction',
                'from': self.coins_input_mapper.coins_input_to_dict(raw_transaction.from_),
                'to': self.coins_output_mapper.coins_output_to_dict(raw_transaction.to),
                'gas_limit': raw_transaction.gas_limit,
                'gas_price': raw_transaction.gas_price,
                'data': raw_transaction.data,
            }
        elif tx_type == TxDepositStake or tx_type == TxWithdrawStake or tx_type == TxDepositStakeV2:
            return {
                'type': 'raw_transaction',
                'fee': self.coins_mapper.coins_to_dict(raw_transaction.fee),
                'source': self.coins_input_mapper.coins_input_to_dict(raw_transaction.source),
                'holder': self.coins_output_mapper.coins_output_to_dict(raw_transaction.holder),
                'purpose': raw_transaction.purpose,
            }
        
        return None

        
