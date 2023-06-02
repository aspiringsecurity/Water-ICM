import json
import logging

from blockchainetl.jobs.exporters.console_item_exporter import ConsoleItemExporter
from blockchainetl.jobs.exporters.in_memory_item_exporter import InMemoryItemExporter
from thetaetl.enumeration.entity_type import EntityType
from thetaetl.jobs.export_blocks_job import ExportBlocksJob
from thetaetl.jobs.extract_contracts_job import ExtractContractsJob
from thetaetl.streaming.enrich import enrich_transactions, enrich_logs, enrich_contracts
from thetaetl.streaming.theta_item_id_calculator import ThetaItemIdCalculator
from thetaetl.streaming.theta_item_timestamp_calculator import ThetaItemTimestampCalculator
from thetaetl.thread_local_proxy import ThreadLocalProxy
from thetaetl.json_rpc_requests import generate_get_status_json_rpc, generate_get_blocks_by_range_json_rpc
from thetaetl.utils import rpc_response_batch_to_results, rpc_response_to_result, validate_range
from thetaetl.mappers.status_mapper import ThetaStatusMapper


class ThetaStreamerAdapter:
    def __init__(
            self,
            theta_provider,
            item_exporter=ConsoleItemExporter(),
            batch_size=100,
            max_workers=5,
            entity_types=tuple(EntityType.ALL_FOR_STREAMING)):
        self.theta_provider = theta_provider
        self.item_exporter = item_exporter
        self.batch_size = batch_size
        self.max_workers = max_workers
        self.entity_types = entity_types
        self.theta_item_id_calculator = ThetaItemIdCalculator()
        self.theta_item_timestamp_calculator = ThetaItemTimestampCalculator()
        self.status_mapper = ThetaStatusMapper()

    def open(self):
        self.item_exporter.open()

    def get_current_block_height(self):
        status_rpc = generate_get_status_json_rpc()
        response = self.theta_provider.make_request(json.dumps(status_rpc))
        result = rpc_response_to_result(response)
        status = self.status_mapper.json_dict_to_status(result)
        return int(status.latest_finalized_block_height)

    def export_all(self, start_block, end_block):
        # Export blocks and transactions
        blocks, transactions = [], []
        if self._should_export(EntityType.BLOCK) or self._should_export(EntityType.TRANSACTION):
            blocks, transactions = self._export_blocks_and_transactions(start_block, end_block)

        # # Export receipts and logs
        # receipts, logs = [], []
        # if self._should_export(EntityType.RECEIPT) or self._should_export(EntityType.LOG):
        #     receipts, logs = self._export_receipts_and_logs(transactions)

        # # Extract token transfers
        # token_transfers = []
        # if self._should_export(EntityType.TOKEN_TRANSFER):
        #     token_transfers = self._extract_token_transfers(logs)

        # # Export traces
        # traces = []
        # if self._should_export(EntityType.TRACE):
        #     traces = self._export_traces(start_block, end_block)

        # # Export contracts
        # contracts = []
        # if self._should_export(EntityType.CONTRACT):
        #     contracts = self._export_contracts(traces)

        enriched_blocks = blocks \
            if EntityType.BLOCK in self.entity_types else []
        # enriched_transactions = enrich_transactions(transactions, receipts) \
        #     if EntityType.TRANSACTION in self.entity_types else []
        # enriched_contracts = enrich_contracts(blocks, contracts) \
        #     if EntityType.CONTRACT in self.entity_types else []

        logging.info('Exporting with ' + type(self.item_exporter).__name__)

        all_items = enriched_blocks
        # all_items = enriched_blocks + \
        #     enriched_transactions + \
        #     enriched_contracts

        # self.calculate_item_ids(all_items)
        # self.calculate_item_timestamps(all_items)

        self.item_exporter.export_items(all_items)

    def _export_blocks_and_transactions(self, start_block, end_block):
        blocks_and_transactions_item_exporter = InMemoryItemExporter(item_types=['block', 'transaction'])
        blocks_and_transactions_job = ExportBlocksJob(
            start_block=start_block,
            end_block=end_block,
            batch_size=self.batch_size,
            theta_provider=self.theta_provider,
            max_workers=self.max_workers,
            item_exporter=blocks_and_transactions_item_exporter,
            export_blocks=self._should_export(EntityType.BLOCK),
            export_transactions=self._should_export(EntityType.TRANSACTION)
        )
        blocks_and_transactions_job.run()
        blocks = blocks_and_transactions_item_exporter.get_items('block')
        transactions = blocks_and_transactions_item_exporter.get_items('transaction')
        return blocks, transactions

    # def _export_contracts(self, traces):
    #     exporter = InMemoryItemExporter(item_types=['contract'])
    #     job = ExtractContractsJob(
    #         traces_iterable=traces,
    #         batch_size=self.batch_size,
    #         max_workers=self.max_workers,
    #         item_exporter=exporter
    #     )
    #     job.run()
    #     contracts = exporter.get_items('contract')
    #     return contracts

    def _should_export(self, entity_type):
        if entity_type == EntityType.BLOCK:
            return True

        if entity_type == EntityType.TRANSACTION:
            return EntityType.TRANSACTION in self.entity_types

        # if entity_type == EntityType.CONTRACT:
        #     return EntityType.CONTRACT in self.entity_types or self._should_export(EntityType.TOKEN)

        raise ValueError('Unexpected entity type ' + entity_type)

    def calculate_item_ids(self, items):
        for item in items:
            item['item_id'] = self.theta_item_id_calculator.calculate(item)

    def calculate_item_timestamps(self, items):
        for item in items:
            item['item_timestamp'] = self.theta_item_timestamp_calculator.calculate(item)

    def close(self):
        self.item_exporter.close()
