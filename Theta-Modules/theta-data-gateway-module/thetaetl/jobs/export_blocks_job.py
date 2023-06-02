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


import json

from thetaetl.executors.batch_work_executor import BatchWorkExecutor
from blockchainetl.jobs.base_job import BaseJob
from thetaetl.json_rpc_requests import generate_get_blocks_by_range_json_rpc
from thetaetl.mappers.block_mapper import ThetaBlockMapper
from thetaetl.mappers.transaction_mapper import ThetaTransactionMapper
from thetaetl.utils import rpc_response_batch_to_results, rpc_response_to_result, validate_range


# Exports blocks and transactions
class ExportBlocksJob(BaseJob):
    def __init__(
            self,
            start_block,
            end_block,
            batch_size,
            theta_provider,
            max_workers,
            item_exporter,
            export_blocks=True,
            export_transactions=True):
        validate_range(start_block, end_block)
        self.start_block = start_block
        self.end_block = end_block

        self.theta_provider = theta_provider

        self.batch_work_executor = BatchWorkExecutor(batch_size, max_workers)
        self.item_exporter = item_exporter

        self.export_blocks = export_blocks
        self.export_transactions = export_transactions
        if not self.export_blocks and not self.export_transactions:
            raise ValueError('At least one of export_blocks or export_transactions must be True')

        self.block_mapper = ThetaBlockMapper()
        self.transaction_mapper = ThetaTransactionMapper()

    def _start(self):
        self.item_exporter.open()

    def _export(self):
        self._export_batch(self.start_block, self.end_block)
        
        # self.batch_work_executor.execute(
        #     range(self.start_block, self.end_block + 1),
        #     self._export_batch,
        #     total_items=self.end_block - self.start_block + 1
        # )

    def _export_batch(self, start_block_height, end_block_height):
        blocks_rpc = generate_get_blocks_by_range_json_rpc(start_block_height, end_block_height, self.export_transactions)
        response = self.theta_provider.make_request(json.dumps(blocks_rpc))
        results = rpc_response_to_result(response)
        blocks = [self.block_mapper.json_dict_to_block(result) for result in results]

        for block in blocks:
            self._export_block(block)

    def _export_block(self, block):
        if self.export_blocks:
            self.item_exporter.export_item(self.block_mapper.block_to_dict(block))
        if self.export_transactions:
            for tx in block.transactions:
                self.item_exporter.export_item(self.transaction_mapper.transaction_to_dict(tx))

    def _end(self):
        self.batch_work_executor.shutdown()
        self.item_exporter.close()
