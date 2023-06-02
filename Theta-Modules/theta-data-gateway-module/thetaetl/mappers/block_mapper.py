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


from thetaetl.domain.block import ThetaBlock
from thetaetl.mappers.transaction_mapper import ThetaTransactionMapper
from thetaetl.mappers.hcc_mapper import ThetaHCCMapper
from thetaetl.mappers.guardian_votes_mapper import ThetaGuardianVotesMapper
from thetaetl.utils import hex_to_dec, to_normalized_address


class ThetaBlockMapper(object):
    def __init__(self, transaction_mapper=None, hcc_mapper=None, guardian_votes_mapper=None):
        if transaction_mapper is None:
            self.transaction_mapper = ThetaTransactionMapper()
        else:
            self.transaction_mapper = transaction_mapper

        if hcc_mapper is None:
            self.hcc_mapper = ThetaHCCMapper()
        else:
            self.hcc_mapper = hcc_mapper

        if guardian_votes_mapper is None:
            self.guardian_votes_mapper = ThetaGuardianVotesMapper()
        else:
            self.guardian_votes_mapper = guardian_votes_mapper

    def json_dict_to_block(self, json_dict):
        block = ThetaBlock()
        block.chain_id = json_dict.get('chain_id')
        block.epoch = json_dict.get('epoch')
        block.height = json_dict.get('height')
        block.parent = to_normalized_address(json_dict.get('parent'))
        block.transactions_hash = to_normalized_address(json_dict.get('transactions_hash'))
        block.state_hash = to_normalized_address(json_dict.get('state_hash'))
        block.timestamp = json_dict.get('timestamp')
        block.proposer = to_normalized_address(json_dict.get('proposer'))
        block.hcc = self.hcc_mapper.json_dict_to_hcc(json_dict.get('hcc'))
        if json_dict.get('guardian_votes') is not None:
            block.guardian_votes = self.guardian_votes_mapper.json_dict_to_guardian_votes(json_dict.get('guardian_votes'))
        block.children = json_dict.get('children')
        block.status = json_dict.get('status')
        block.hash = to_normalized_address(json_dict.get('hash'))

        if 'transactions' in json_dict:
            block.transactions = [
                self.transaction_mapper.json_dict_to_transaction(tx)
                for tx in json_dict['transactions']
                if isinstance(tx, dict)
            ]

        return block

    def block_to_dict(self, block):
        transactions = [
            self.transaction_mapper.transaction_to_dict(tx)
                for tx in block.transactions
        ]
        
        guardian_votes = None
        if block.guardian_votes is not None:
            guardian_votes = self.guardian_votes_mapper.guardian_votes_to_dict(block.guardian_votes)

        return {
            'type': 'block',
            'chain_id': block.chain_id,
            'epoch': block.epoch,
            'height': block.height,
            'parent': block.parent,
            'transactions_hash': block.transactions_hash,
            'state_hash': block.state_hash,
            'timestamp': block.timestamp,
            'proposer': block.proposer,
            'hcc': self.hcc_mapper.hcc_to_dict(block.hcc),
            # 'guardian_votes': guardian_votes,
            'children': block.children,
            'status': block.status,
            'hash': block.hash,
            'transactions':  transactions,
        }
