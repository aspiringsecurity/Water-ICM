"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const smart_contract_entity_1 = require("./smart-contract.entity");
const typeorm_2 = require("typeorm");
const smart_contract_call_record_entity_1 = require("./smart-contract-call-record.entity");
const smart_contract_model_1 = require("./smart-contract.model");
const nft_service_1 = require("./nft/nft.service");
const solc_service_1 = require("../../common/solc.service");
const utils_service_1 = require("../../common/utils.service");
var requireFromString = require('require-from-string');
const moment = require('moment');
const solc = require('solc');
let SmartContractService = class SmartContractService {
    constructor(smartContractRepository, smartContractRecordRepository, nftService, solcService, utilsService) {
        this.smartContractRepository = smartContractRepository;
        this.smartContractRecordRepository = smartContractRecordRepository;
        this.nftService = nftService;
        this.solcService = solcService;
        this.utilsService = utilsService;
        this.logger = new common_1.Logger('smart contract service');
    }
    async getSmartContract(rankBy, max = 500) {
        switch (rankBy) {
            case smart_contract_model_1.RankByEnum.last_seven_days_call_times:
                return await this.smartContractRepository.find({
                    order: { last_seven_days_call_times: 'DESC' },
                    take: max
                });
            case smart_contract_model_1.RankByEnum.last_24h_call_times:
                return await this.smartContractRepository.find({
                    order: { last_24h_call_times: 'DESC' },
                    take: max
                });
            default:
                return await this.smartContractRepository.find({
                    order: { call_times: 'DESC' },
                    take: max
                });
        }
    }
    async searchSmartContract(protocol, name, rankBy, max = 500) {
        const condition = {
            where: {},
            take: max
        };
        switch (rankBy) {
            case smart_contract_model_1.RankByEnum.last_seven_days_call_times:
                condition.order = { last_seven_days_call_times: 'DESC' };
                break;
            case smart_contract_model_1.RankByEnum.last_24h_call_times:
                condition.order = { last_24h_call_times: 'DESC' };
                break;
            default:
                condition.order = { call_times: 'DESC' };
        }
        if (protocol) {
            condition.where['protocol'] = protocol;
        }
        if (name)
            condition.where['name'] = (0, typeorm_2.Like)('%' + name + '%');
        return await this.smartContractRepository.find(condition);
    }
    async getSmartContractNum() {
        return await this.smartContractRepository.count();
    }
    async getSmartContractRecord() {
        return await this.smartContractRecordRepository.find();
    }
    async getOrAddSmartContract(contractAddress, height) {
        await this.smartContractRepository.query(`INSERT INTO smart_contract_entity(contract_address,height) VALUES ('${contractAddress}',${height})  ON CONFLICT (contract_address) DO UPDATE set call_times=call_times+1;`);
        return await this.smartContractRepository.findOne({
            where: { contract_address: contractAddress }
        });
    }
    async updateCallTimesByPeriod() {
        let smartContractList = await this.smartContractRepository.find();
        for (const contract of smartContractList) {
            contract.last_24h_call_times = await this.smartContractRecordRepository.count({
                where: {
                    timestamp: (0, typeorm_2.MoreThan)(moment().subtract(24, 'hours').unix()),
                    contract_id: contract.id
                }
            });
            contract.last_seven_days_call_times = await this.smartContractRecordRepository.count({
                where: {
                    timestamp: (0, typeorm_2.MoreThan)(moment().subtract(7, 'days').unix()),
                    contract_id: contract.id
                }
            });
            await this.smartContractRepository.save(contract);
        }
    }
    async verifySmartContract(address, sourceCode, byteCode, version, versionFullName, optimizer, optimizerRuns) {
        let contract = await this.smartContractRepository.findOne({
            where: {
                contract_address: address
            }
        });
        if (!contract) {
            contract = new smart_contract_entity_1.SmartContractEntity();
            contract.contract_address = address;
            contract = await this.smartContractRepository.save(contract);
        }
        else {
            if (contract.verified)
                return contract;
        }
        const fs = require('fs');
        address = this.utilsService.normalize(address.toLowerCase());
        optimizerRuns = +optimizerRuns;
        if (Number.isNaN(optimizerRuns))
            optimizerRuns = 200;
        try {
            this.logger.debug('Verifing the source code and bytecode for address:', address);
            let start = +new Date();
            var input = {
                language: 'Solidity',
                settings: {
                    optimizer: {
                        enabled: optimizer,
                        runs: optimizerRuns
                    },
                    outputSelection: {
                        '*': {
                            '*': ['*']
                        }
                    }
                },
                sources: {
                    'test.sol': {
                        content: sourceCode
                    }
                }
            };
            var output = '';
            this.logger.debug(`Loading specific version starts.`);
            this.logger.debug(`version: ${version}`);
            const prefix = './libs';
            const fileName = prefix + '/' + versionFullName;
            if (!fs.existsSync(fileName)) {
                this.logger.debug(`file ${fileName} does not exsit, downloading`);
                await this.solcService.downloadByVersion(version, './libs');
            }
            else {
                this.logger.debug(`file ${fileName} exsits, skip download process`);
            }
            this.logger.debug(`Download solc-js file takes: ${(+new Date() - start) / 1000} seconds`);
            start = +new Date();
            const solcjs = solc.setupMethods(requireFromString(fs.readFileSync(fileName, 'utf8')));
            this.logger.debug(`load solc-js version takes: ${(+new Date() - start) / 1000} seconds`);
            start = +new Date();
            this.logger.debug('input', input);
            output = JSON.parse(solcjs.compile(JSON.stringify(input)));
            this.logger.debug(`compile takes ${(+new Date() - start) / 1000} seconds`);
            let check = {};
            if (output.errors) {
                check = output.errors.reduce((check, err) => {
                    if (err.severity === 'warning') {
                        if (!check.warnings)
                            check.warnings = [];
                        check.warnings.push(err.message);
                    }
                    if (err.severity === 'error') {
                        check.error = err.message;
                    }
                    return check;
                }, {});
            }
            let data = {};
            if (check.error) {
                this.logger.debug(check.error);
                data = { result: { verified: false }, err_msg: check.error };
            }
            else {
                if (output.contracts) {
                    let hexBytecode = this.utilsService.getHex(byteCode).substring(2);
                    for (var contractName in output.contracts['test.sol']) {
                        const byteCode = output.contracts['test.sol'][contractName].evm.bytecode.object;
                        const deployedBytecode = output.contracts['test.sol'][contractName].evm.deployedBytecode.object;
                        const processed_compiled_bytecode = this.utilsService.getBytecodeWithoutMetadata(deployedBytecode);
                        const constructor_arguments = hexBytecode.slice(byteCode.length);
                        if (hexBytecode.indexOf(processed_compiled_bytecode) > -1 &&
                            processed_compiled_bytecode.length > 0) {
                            let abi = output.contracts['test.sol'][contractName].abi;
                            const breifVersion = versionFullName.match(/^soljson-(.*).js$/)[1];
                            contract.verified = true;
                            contract.byte_code = byteCode;
                            if (this.utilsService.checkTnt721(abi)) {
                                contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.tnt721;
                            }
                            else if (this.utilsService.checkTnt20(abi)) {
                                contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.tnt20;
                            }
                            else {
                                contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.unknow;
                            }
                            contract.abi = JSON.stringify(abi);
                            contract.source_code = this.utilsService.stampDate(sourceCode);
                            contract.verification_date = moment().unix();
                            contract.compiler_version = breifVersion;
                            contract.optimizer = optimizer === true ? 'enabled' : 'disabled';
                            contract.optimizerRuns = optimizerRuns;
                            contract.name = contractName;
                            contract.function_hash = JSON.stringify(output.contracts['test.sol'][contractName].evm.methodIdentifiers);
                            contract.constructor_arguments = constructor_arguments;
                            await this.smartContractRepository.save(contract);
                            this.logger.debug('save smart contract');
                            break;
                        }
                        else {
                            this.logger.debug('contractName ' + contractName + ' bytecode not match');
                        }
                    }
                }
            }
            return contract;
        }
        catch (e) {
            this.logger.debug('Error in catch:', e);
            return contract;
        }
    }
    async directVerifySmartContract(address, sourceCode, byteCode, optimizer, optimizerRuns, verificationDate, compilerVersion, name, functionHash, constructorArguments, abi) {
        let contract = await this.smartContractRepository.findOne({
            where: { contract_address: address }
        });
        if (contract.verified)
            return contract;
        if (!contract) {
            contract = new smart_contract_entity_1.SmartContractEntity();
        }
        if (contract.contract_address == '0x7945e7e8b5ee315d19d65db3063b3d53fa1cc078') {
            contract.latest_record_parse_height = 13764000;
        }
        contract.contract_address = address;
        contract.abi = abi;
        contract.source_code = sourceCode;
        contract.byte_code = byteCode;
        contract.verification_date = verificationDate;
        contract.compiler_version = compilerVersion;
        contract.optimizer = optimizer;
        contract.optimizerRuns = optimizerRuns;
        contract.name = name;
        contract.function_hash = functionHash;
        contract.constructor_arguments = constructorArguments;
        contract.verified = true;
        if (this.utilsService.checkTnt721(JSON.parse(abi))) {
            contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.tnt721;
        }
        else if (this.utilsService.checkTnt20(JSON.parse(abi))) {
            contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.tnt20;
        }
        else {
            contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.unknow;
        }
        this.logger.debug('start to save');
        return await this.smartContractRepository.save(contract);
    }
    async getVerifyInfo(address, sourceCode, byteCode, version, versionFullName, optimizer, optimizerRuns) {
        const fs = require('fs');
        const solc = require('solc');
        address = this.utilsService.normalize(address.toLowerCase());
        optimizerRuns = +optimizerRuns;
        if (Number.isNaN(optimizerRuns))
            optimizerRuns = 200;
        let start = +new Date();
        var input = {
            language: 'Solidity',
            settings: {
                optimizer: {
                    enabled: optimizer,
                    runs: optimizerRuns
                },
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            },
            sources: {
                'test.sol': {
                    content: sourceCode
                }
            }
        };
        var output = '';
        const prefix = './libs';
        const fileName = prefix + '/' + versionFullName;
        if (!fs.existsSync(fileName)) {
            this.logger.debug(`file ${fileName} does not exsit, downloading`);
            await this.solcService.downloadByVersion(version, './libs');
            this.logger.debug(`Download solc-js file takes: ${(+new Date() - start) / 1000} seconds`);
        }
        else {
            this.logger.debug(`file ${fileName} exsits, skip download process`);
        }
        start = +new Date();
        const solcjs = solc.setupMethods(requireFromString(fs.readFileSync(fileName, 'utf8')));
        this.logger.debug(`load solc-js version takes: ${(+new Date() - start) / 1000} seconds`);
        start = +new Date();
        output = JSON.parse(solcjs.compile(JSON.stringify(input)));
        this.logger.debug(`compile takes ${(+new Date() - start) / 1000} seconds`);
        let check = {};
        if (output.errors) {
            check = output.errors.reduce((check, err) => {
                if (err.severity === 'warning') {
                    if (!check.warnings)
                        check.warnings = [];
                    check.warnings.push(err.message);
                }
                if (err.severity === 'error') {
                    check.error = err.message;
                }
                return check;
            }, {});
        }
        const contract = {};
        if (check.error) {
            this.logger.error(check.error);
            return false;
        }
        else {
            if (output.contracts) {
                let hexBytecode = this.utilsService.getHex(byteCode).substring(2);
                for (var contractName in output.contracts['test.sol']) {
                    const byteCode = output.contracts['test.sol'][contractName].evm.bytecode.object;
                    const deployedBytecode = output.contracts['test.sol'][contractName].evm.deployedBytecode.object;
                    const processed_compiled_bytecode = this.utilsService.getBytecodeWithoutMetadata(deployedBytecode);
                    const constructor_arguments = hexBytecode.slice(byteCode.length);
                    if (hexBytecode.indexOf(processed_compiled_bytecode) > -1 &&
                        processed_compiled_bytecode.length > 0) {
                        let abi = output.contracts['test.sol'][contractName].abi;
                        const breifVersion = versionFullName.match(/^soljson-(.*).js$/)[1];
                        contract.verified = true;
                        contract.byte_code = byteCode;
                        if (this.utilsService.checkTnt721(abi)) {
                            contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.tnt721;
                            this.logger.debug('read 721  contract uri,address:' + address);
                            const contractUri = abi.find((v) => v.name == 'contractURI');
                            if (contractUri) {
                                const res = await this.utilsService.readSmartContract(address, address, abi, 'contractURI', [], [], ['string']);
                                this.logger.debug('contract uri:' + res[0]);
                                contract.contract_uri = res[0];
                                if (res[0]) {
                                    try {
                                        const jsonRes = await this.utilsService.getJsonRes(res[0]);
                                        contract.contract_uri_detail = JSON.stringify(jsonRes);
                                        contract.name = jsonRes.name;
                                    }
                                    catch (e) {
                                        this.logger.error('Fetch contract uri: Bad response from server');
                                        contract.contract_uri_detail = '';
                                        contract.name = contractName;
                                    }
                                }
                            }
                            const name = abi.find((v) => v.name == 'name');
                            if (name) {
                                const res = await this.utilsService.readSmartContract(address, address, abi, 'name', [], [], ['string']);
                                this.logger.debug('get name:' + JSON.stringify(res));
                                if (res[0]) {
                                    contract.name = res[0];
                                }
                            }
                        }
                        else if (this.utilsService.checkTnt20(abi)) {
                            contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.tnt20;
                            contract.name = contractName;
                        }
                        else {
                            contract.protocol = smart_contract_entity_1.SmartContractProtocolEnum.unknow;
                            contract.name = contractName;
                        }
                        contract.abi = JSON.stringify(abi);
                        contract.source_code = this.utilsService.stampDate(sourceCode);
                        contract.verification_date = moment().unix();
                        contract.compiler_version = breifVersion;
                        contract.optimizer = optimizer === true ? 'enabled' : 'disabled';
                        contract.optimizerRuns = optimizerRuns;
                        contract.function_hash = JSON.stringify(output.contracts['test.sol'][contractName].evm.methodIdentifiers);
                        contract.constructor_arguments = constructor_arguments;
                        return contract;
                    }
                }
            }
        }
    }
    async getContractByAddress(address) {
        const contract = await this.smartContractRepository.findOne({
            where: {
                contract_address: address
            }
        });
        return contract;
    }
};
SmartContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(smart_contract_entity_1.SmartContractEntity, 'smart_contract')),
    __param(1, (0, typeorm_1.InjectRepository)(smart_contract_call_record_entity_1.SmartContractCallRecordEntity, 'smart_contract')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        nft_service_1.NftService,
        solc_service_1.SolcService,
        utils_service_1.UtilsService])
], SmartContractService);
exports.SmartContractService = SmartContractService;
//# sourceMappingURL=smart-contract.service.js.map