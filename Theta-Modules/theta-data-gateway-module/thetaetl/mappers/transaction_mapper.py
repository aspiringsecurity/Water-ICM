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


from thetaetl.domain.transaction import ThetaTransaction
from thetaetl.mappers.raw_transaction_mapper import ThetaRawTransactionMapper
from thetaetl.utils import hex_to_dec, to_normalized_address



class ThetaTransactionMapper(object):
    def __init__(self, raw_transaction_mapper=None):
        if raw_transaction_mapper is None:
            self.raw_transaction_mapper = ThetaRawTransactionMapper()
        else:
            self.raw_transaction_mapper = raw_transaction_mapper

    def json_dict_to_transaction(self, json_dict):
        transaction = ThetaTransaction()
        transaction.hash = json_dict.get('hash')
        transaction.type = json_dict.get('type')

        transaction.raw = self.raw_transaction_mapper.json_dict_to_raw_transaction(json_dict.get('raw'), transaction.type)

        return transaction

    def transaction_to_dict(self, transaction):
        raw_transactions = self.raw_transaction_mapper.raw_transaction_to_dict(transaction.raw, transaction.type)
        return {
            'type': 'transaction',
            'raw': raw_transactions,
            'tx_type': transaction.type,
            'hash': transaction.hash,
        }
