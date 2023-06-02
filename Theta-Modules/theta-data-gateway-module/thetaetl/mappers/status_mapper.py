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


from thetaetl.domain.status import ThetaStatus

class ThetaStatusMapper(object):
    def json_dict_to_status(self, json_dict):
        status = ThetaStatus()
        status.latest_finalized_block_hash = json_dict.get('latest_finalized_block_hash')
        status.latest_finalized_block_height = json_dict.get('latest_finalized_block_height')
        status.latest_finalized_block_time = json_dict.get('latest_finalized_block_time')
        status.latest_finalized_block_epoch = json_dict.get('latest_finalized_block_epoch')
        status.current_epoch = json_dict.get('current_epoch')
        status.current_time = json_dict.get('current_time')
        status.syncing = json_dict.get('syncing')

        return status

    # def block_to_dict(self, block):
    #     transactions = [
    #         self.transaction_mapper.transaction_to_dict(tx)
    #             for tx in block.transactions
    #     ]
        
    #     guardian_votes = None
    #     if block.guardian_votes is not None:
    #         guardian_votes = self.guardian_votes_mapper.guardian_votes_to_dict(block.guardian_votes)

    #     return {
    #         'type': 'block',
    #         'chain_id': block.chain_id,
    #         'epoch': block.epoch,
    #         'height': block.height,
    #         'parent': block.parent,
    #         'transactions_hash': block.transactions_hash,
    #         'state_hash': block.state_hash,
    #         'timestamp': block.timestamp,
    #         'proposer': block.proposer,
    #         'hcc': self.hcc_mapper.hcc_to_dict(block.hcc),
    #         'guardian_votes': guardian_votes,
    #         'children': block.children,
    #         'status': block.status,
    #         'hash': block.hash,
    #         'transactions':  transactions,
    #     }
