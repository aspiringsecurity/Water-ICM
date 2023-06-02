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
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const smart_contract_call_record_entity_1 = require("../smart-contract-call-record.entity");
const smart_contract_entity_1 = require("../smart-contract.entity");
const nft_balance_entity_1 = require("./nft-balance.entity");
const nft_transfer_record_entity_1 = require("./nft-transfer-record.entity");
const utils_service_1 = require("../../../common/utils.service");
const bignumber_js_1 = require("bignumber.js");
const const_1 = require("../../../const");
let NftService = class NftService {
    constructor(nftTransferRecordRepository, nftBalanceRepository, smartContractCallRecordRepository, smartContractRepository, utilsService) {
        this.nftTransferRecordRepository = nftTransferRecordRepository;
        this.nftBalanceRepository = nftBalanceRepository;
        this.smartContractCallRecordRepository = smartContractCallRecordRepository;
        this.smartContractRepository = smartContractRepository;
        this.utilsService = utilsService;
        this.logger = new common_1.Logger('nft service');
    }
    async parseRecordByContractAddress(contractAddress) {
        const contract = await this.smartContractRepository.findOne({
            where: { contract_address: contractAddress }
        });
        if (!this.utilsService.checkTnt721(JSON.parse(contract.abi))) {
            this.logger.debug('protocol not nft 721');
            return 0;
        }
        const nftRecord = await this.nftTransferRecordRepository.findOne({
            where: { smart_contract_address: contract.contract_address },
            order: { timestamp: 'DESC' }
        });
        this.logger.debug('nft record:' + JSON.stringify(nftRecord));
        const condition = {
            where: { contract_id: contract.id },
            order: { timestamp: 'ASC' }
        };
        if (nftRecord) {
            condition['where']['timestamp'] = (0, typeorm_2.MoreThan)(nftRecord.timestamp);
        }
        this.logger.debug(condition);
        const contractRecord = await this.smartContractCallRecordRepository.find(condition);
        let afftectedNum = 0;
        const connection = (0, typeorm_2.getConnection)('nft').createQueryRunner();
        const smartContractConnection = (0, typeorm_2.getConnection)('smart_contract').createQueryRunner();
        await connection.connect();
        await smartContractConnection.connect();
        await connection.startTransaction();
        await smartContractConnection.startTransaction();
        this.logger.debug('protocol is tnt 721');
        try {
            for (const record of contractRecord) {
                const res = await this.updateNftRecord(connection, smartContractConnection, record);
                if (res)
                    afftectedNum++;
            }
            await connection.commitTransaction();
            await smartContractConnection.commitTransaction();
        }
        catch (e) {
            console.error(e);
            this.logger.debug(e);
            await connection.rollbackTransaction();
            await smartContractConnection.rollbackTransaction();
        }
        finally {
            await connection.release();
            await smartContractConnection.release();
        }
        return afftectedNum;
    }
    async parseRecordByContractAddressWithConnection(nftConnection, smartContractConnection, contract) {
        this.logger.debug('start parese record');
        if (!contract.verified) {
            this.logger.debug(contract.contract_address + ' not verified');
            return 0;
        }
        let contractRecord = [];
        contractRecord = await smartContractConnection.manager.find(smart_contract_call_record_entity_1.SmartContractCallRecordEntity, {
            where: {
                contract_id: contract.id,
                height: (0, typeorm_2.MoreThanOrEqual)(contract.latest_record_parse_height)
            },
            take: 3000,
            order: { height: 'ASC' }
        });
        this.logger.debug('protocol is tnt 721');
        let afftectedNum = 0;
        for (const record of contractRecord) {
            const res = await this.updateNftRecord(nftConnection, smartContractConnection, record);
            if (res)
                afftectedNum++;
        }
        if (contractRecord.length > 0) {
            contract.latest_record_parse_height = contractRecord[contractRecord.length - 1].height;
            this.logger.debug(contract.contract_address +
                ' update set latest record height:' +
                contractRecord[contractRecord.length - 1].height);
            await smartContractConnection.manager.save(contract);
        }
        return afftectedNum;
    }
    async updateNftRecord(nftConnection, smartContractConnection, record) {
        const receipt = JSON.parse(record.receipt);
        if (receipt.Logs.length == 0) {
            this.logger.debug('receipt:' + JSON.stringify(receipt));
            return;
        }
        const contractList = {};
        for (const log of receipt.Logs) {
            if (log.data == '') {
                log.data = '0x';
            }
            else {
                log.data = this.utilsService.getHex(log.data);
            }
            if (contractList.hasOwnProperty(log.address)) {
                contractList[log.address].logs.push(log);
            }
            else {
                const tempContract = await smartContractConnection.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                    where: {
                        contract_address: log.address
                    }
                });
                if (!tempContract || !tempContract.verified)
                    continue;
                contractList[log.address] = {
                    contract: tempContract,
                    logs: [log]
                };
            }
        }
        const contractDecodeList = Object.values(contractList);
        for (const contract of contractDecodeList) {
            const logInfo = this.utilsService.decodeLogs(contract.logs, JSON.parse(contract.contract.abi));
            for (const log of logInfo) {
                let imgUri = '';
                let name = '';
                if (log.decode.eventName === 'Transfer' && log.decode.result.tokenId) {
                    this.logger.debug(JSON.stringify({
                        from: log.decode.result.from.toLowerCase(),
                        to: log.decode.result.to.toLowerCase(),
                        token_id: Number(log.decode.result.tokenId),
                        smart_contract_address: log.address,
                        transaction_hash: record.transaction_hash
                    }));
                    const logContract = await smartContractConnection.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                        where: { contract_address: log.address.toLowerCase() }
                    });
                    if (!logContract ||
                        !logContract.verified ||
                        logContract.protocol !== smart_contract_entity_1.SmartContractProtocolEnum.tnt721)
                        continue;
                    let detail = '';
                    let tokenUri = '';
                    let baseTokenUri = '';
                    let contractUri = logContract.contract_uri;
                    const balance = await nftConnection.manager.findOne(nft_balance_entity_1.NftBalanceEntity, {
                        where: {
                            smart_contract_address: log.address.toLowerCase(),
                            token_id: Number(log.decode.result.tokenId)
                        }
                    });
                    if (balance && balance.detail) {
                        const detailInfo = JSON.parse(balance.detail);
                        imgUri = await this.utilsService.downloadImage(detailInfo.image, const_1.config.get('NFT.STATIC_PATH'));
                        name = detailInfo.name;
                        detail = balance.detail;
                        tokenUri = balance.token_uri;
                        baseTokenUri = balance.base_token_uri;
                    }
                    else {
                        const abiInfo = JSON.parse(logContract.abi);
                        const hasTokenUri = abiInfo.find((v) => v.name == 'tokenURI');
                        name = logContract.name;
                        if (hasTokenUri) {
                            try {
                                tokenUri = await this.getTokenUri(logContract.contract_address, abiInfo, Number(log.decode.result.tokenId));
                                const res = await this.utilsService.getJsonRes(tokenUri);
                                name = res.name;
                                imgUri = res.image;
                                detail = JSON.stringify(res);
                            }
                            catch (e) {
                                this.logger.error(e);
                            }
                        }
                        const hasBaseTokenUri = abiInfo.find((v) => v.name == 'baseTokenURI');
                        if (hasBaseTokenUri) {
                            baseTokenUri = await this.getBaseTokenUri(logContract.contract_address, abiInfo);
                        }
                        imgUri = await this.utilsService.downloadImage(imgUri, const_1.config.get('NFT.STATIC_PATH'));
                    }
                    const transferRecord = await nftConnection.manager.findOne(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                        where: {
                            token_id: Number(log.decode.result.tokenId),
                            smart_contract_address: log.address.toLowerCase(),
                            timestamp: record.timestamp
                        }
                    });
                    if (!transferRecord) {
                        this.logger.debug('insert nft transfer record:' +
                            JSON.stringify({
                                from: log.decode.result.from.toLowerCase(),
                                to: log.decode.result.to.toLowerCase(),
                                token_id: Number(log.decode.result.tokenId),
                                smart_contract_address: log.address.toLowerCase(),
                                height: record.height,
                                name: contract.contract.name,
                                timestamp: record.timestamp
                            }));
                        await nftConnection.manager.insert(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                            from: log.decode.result.from.toLowerCase(),
                            to: log.decode.result.to.toLowerCase(),
                            token_id: Number(log.decode.result.tokenId),
                            smart_contract_address: log.address.toLowerCase(),
                            height: record.height,
                            name: name,
                            img_uri: imgUri,
                            transaction_hash: record.transaction_hash,
                            timestamp: record.timestamp
                        });
                    }
                    else {
                        transferRecord.img_uri = imgUri;
                        transferRecord.name = name;
                        await nftConnection.manager.save(transferRecord);
                    }
                    if (balance) {
                        if (balance.img_uri) {
                            imgUri = balance.img_uri;
                        }
                        const latestRecord = await nftConnection.manager.findOne(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                            where: {
                                smart_contract_address: log.address.toLowerCase(),
                                token_id: Number(log.decode.result.tokenId)
                            },
                            order: {
                                height: 'DESC'
                            }
                        });
                        await nftConnection.manager.update(nft_balance_entity_1.NftBalanceEntity, {
                            id: balance.id
                        }, {
                            owner: latestRecord.to,
                            from: latestRecord.from,
                            name: name,
                            img_uri: imgUri
                        });
                    }
                    else {
                        await nftConnection.manager.insert(nft_balance_entity_1.NftBalanceEntity, {
                            smart_contract_address: logContract.contract_address,
                            owner: log.decode.result.to.toLowerCase(),
                            from: log.decode.result.from.toLowerCase(),
                            token_id: Number(log.decode.result.tokenId),
                            name: name,
                            img_uri: imgUri,
                            detail: detail,
                            contract_uri: contractUri,
                            token_uri: tokenUri,
                            base_token_uri: baseTokenUri
                        });
                    }
                }
                if ((log.decode.eventName === 'NFTTraded' &&
                    log.decode.result.nftTokenID &&
                    log.decode.result.nftTokenAddress) ||
                    (log.decode.eventName === 'MarketItemSale' &&
                        log.decode.result.isSold == 'true' &&
                        log.decode.result.tokenId &&
                        log.decode.result.nftContract)) {
                    this.logger.debug('parse nft trade:' + record.transaction_hash);
                    this.logger.debug(JSON.stringify(log.decode.result));
                    const nftTokenId = log.decode.result.nftTokenID
                        ? Number(log.decode.result.nftTokenID)
                        : Number(log.decode.result.tokenId);
                    const nftContractAddress = log.decode.result.nftTokenAddress
                        ? log.decode.result.nftTokenAddress.toLowerCase()
                        : log.decode.result.nftContract.toLowerCase();
                    const paymentTokenAmount = log.decode.result.paymentTokenAmount
                        ? log.decode.result.paymentTokenAmount
                        : log.decode.result.price;
                    const tdropMined = log.decode.result.tdropMined ? Number(log.decode.result.tdropMined) : 0;
                    const buyer = log.decode.result.buyer
                        ? log.decode.result.buyer.toLowerCase()
                        : log.decode.result.owner.toLowerCase();
                    const seller = log.decode.result.seller.toLowerCase();
                    const logContract = await smartContractConnection.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                        where: { contract_address: nftContractAddress }
                    });
                    if (!logContract ||
                        !logContract.verified ||
                        logContract.protocol !== smart_contract_entity_1.SmartContractProtocolEnum.tnt721)
                        continue;
                    this.logger.debug('nft traded: ' + JSON.stringify(log.decode.result));
                    const searchCondition = {
                        token_id: nftTokenId,
                        smart_contract_address: nftContractAddress,
                        timestamp: record.timestamp
                    };
                    this.logger.debug('search condition: ' + JSON.stringify(searchCondition));
                    const tradeRecord = await nftConnection.manager.findOne(nft_transfer_record_entity_1.NftTransferRecordEntity, { where: searchCondition });
                    if (tradeRecord) {
                        this.logger.debug('get nft trade record:' + JSON.stringify(tradeRecord));
                        tradeRecord.payment_token_amount = Number(new bignumber_js_1.default(paymentTokenAmount).dividedBy('1e18').toFixed());
                        tradeRecord.tdrop_mined = Number(new bignumber_js_1.default(tdropMined).dividedBy('1e18').toFixed());
                        const res = await nftConnection.manager.save(nft_transfer_record_entity_1.NftTransferRecordEntity, tradeRecord);
                        this.logger.debug('nft traded updated: ' + JSON.stringify(res));
                    }
                    else {
                        this.logger.debug('no nft trade record:' + JSON.stringify(log.decode));
                        await nftConnection.manager.insert(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                            from: seller,
                            to: buyer,
                            token_id: nftTokenId,
                            smart_contract_address: nftContractAddress,
                            height: record.height,
                            name: logContract.name,
                            transaction_hash: record.transaction_hash,
                            timestamp: record.timestamp,
                            payment_token_amount: Number(new bignumber_js_1.default(paymentTokenAmount).dividedBy('1e18').toFixed()),
                            tdrop_mined: Number(new bignumber_js_1.default(tdropMined).dividedBy('1e18').toFixed())
                        });
                    }
                }
            }
        }
        return false;
    }
    async updateNftLog(nftConnection, smartContractConnection, logEntity) {
        const logDetail = JSON.parse(logEntity.data);
        if (logDetail.data == '') {
            logDetail.data = '0x';
        }
        else {
            logDetail.data = this.utilsService.getHex(logDetail.data);
        }
        const tempContract = await smartContractConnection.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
            where: {
                contract_address: logEntity.address
            }
        });
        if (!tempContract || !tempContract.verified)
            return false;
        const logInfo = this.utilsService.decodeLogs([logDetail], JSON.parse(tempContract.abi));
        for (const log of logInfo) {
            let imgUri = '';
            let name = '';
            if (log.decode.eventName === 'Transfer' && log.decode.result.tokenId) {
                this.logger.debug(JSON.stringify({
                    from: log.decode.result.from.toLowerCase(),
                    to: log.decode.result.to.toLowerCase(),
                    token_id: Number(log.decode.result.tokenId),
                    smart_contract_address: log.address,
                    transaction_hash: logEntity.transaction_hash
                }));
                let detail = '';
                let tokenUri = '';
                let baseTokenUri = '';
                let contractUri = tempContract.contract_uri;
                const balance = await nftConnection.manager.findOne(nft_balance_entity_1.NftBalanceEntity, {
                    where: {
                        smart_contract_address: log.address.toLowerCase(),
                        token_id: Number(log.decode.result.tokenId)
                    }
                });
                if (balance && balance.detail) {
                    const detailInfo = JSON.parse(balance.detail);
                    imgUri = await this.utilsService.downloadImage(detailInfo.image, const_1.config.get('NFT.STATIC_PATH'));
                    name = detailInfo.name;
                    detail = balance.detail;
                    tokenUri = balance.token_uri;
                    baseTokenUri = balance.base_token_uri;
                }
                else {
                    const abiInfo = JSON.parse(tempContract.abi);
                    const hasTokenUri = abiInfo.find((v) => v.name == 'tokenURI');
                    name = tempContract.name;
                    if (hasTokenUri) {
                        try {
                            tokenUri = await this.getTokenUri(tempContract.contract_address, abiInfo, Number(log.decode.result.tokenId));
                            const res = await this.utilsService.getJsonRes(tokenUri);
                            name = res.name;
                            imgUri = res.image;
                            detail = JSON.stringify(res);
                        }
                        catch (e) {
                            this.logger.error(e);
                        }
                    }
                    const hasBaseTokenUri = abiInfo.find((v) => v.name == 'baseTokenURI');
                    if (hasBaseTokenUri) {
                        baseTokenUri = await this.getBaseTokenUri(tempContract.contract_address, abiInfo);
                    }
                    imgUri = await this.utilsService.downloadImage(imgUri, const_1.config.get('NFT.STATIC_PATH'));
                }
                const transferRecord = await nftConnection.manager.findOne(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                    where: {
                        token_id: Number(log.decode.result.tokenId),
                        smart_contract_address: log.address.toLowerCase(),
                        timestamp: logEntity.timestamp
                    }
                });
                if (!transferRecord) {
                    this.logger.debug('insert nft transfer record:' +
                        JSON.stringify({
                            from: log.decode.result.from.toLowerCase(),
                            to: log.decode.result.to.toLowerCase(),
                            token_id: Number(log.decode.result.tokenId),
                            smart_contract_address: log.address.toLowerCase(),
                            height: logEntity.height,
                            name: tempContract.name,
                            timestamp: logEntity.timestamp
                        }));
                    await nftConnection.manager.insert(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                        from: log.decode.result.from.toLowerCase(),
                        to: log.decode.result.to.toLowerCase(),
                        token_id: Number(log.decode.result.tokenId),
                        smart_contract_address: log.address.toLowerCase(),
                        height: logEntity.height,
                        name: name,
                        img_uri: imgUri,
                        transaction_hash: logEntity.transaction_hash,
                        timestamp: logEntity.timestamp
                    });
                }
                else {
                    transferRecord.img_uri = imgUri;
                    transferRecord.name = name;
                    await nftConnection.manager.save(transferRecord);
                }
                if (balance) {
                    if (balance.img_uri) {
                        imgUri = balance.img_uri;
                    }
                    const latestRecord = await nftConnection.manager.findOne(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                        where: {
                            smart_contract_address: log.address.toLowerCase(),
                            token_id: Number(log.decode.result.tokenId)
                        },
                        order: {
                            height: 'DESC'
                        }
                    });
                    await nftConnection.manager.update(nft_balance_entity_1.NftBalanceEntity, {
                        id: balance.id
                    }, {
                        owner: latestRecord.to,
                        from: latestRecord.from,
                        name: name,
                        img_uri: imgUri
                    });
                }
                else {
                    await nftConnection.manager.insert(nft_balance_entity_1.NftBalanceEntity, {
                        smart_contract_address: tempContract.contract_address,
                        owner: log.decode.result.to.toLowerCase(),
                        from: log.decode.result.from.toLowerCase(),
                        token_id: Number(log.decode.result.tokenId),
                        name: name,
                        img_uri: imgUri,
                        detail: detail,
                        contract_uri: contractUri,
                        token_uri: tokenUri,
                        base_token_uri: baseTokenUri
                    });
                }
            }
            if ((log.decode.eventName === 'NFTTraded' &&
                log.decode.result.nftTokenID &&
                log.decode.result.nftTokenAddress) ||
                (log.decode.eventName === 'MarketItemSale' &&
                    log.decode.result.isSold == 'true' &&
                    log.decode.result.tokenId &&
                    log.decode.result.nftContract)) {
                this.logger.debug('parse nft trade:' + logEntity.transaction_hash);
                this.logger.debug(JSON.stringify(log.decode.result));
                const nftTokenId = log.decode.result.nftTokenID
                    ? Number(log.decode.result.nftTokenID)
                    : Number(log.decode.result.tokenId);
                const nftContractAddress = log.decode.result.nftTokenAddress
                    ? log.decode.result.nftTokenAddress.toLowerCase()
                    : log.decode.result.nftContract.toLowerCase();
                const paymentTokenAmount = log.decode.result.paymentTokenAmount
                    ? log.decode.result.paymentTokenAmount
                    : log.decode.result.price;
                const tdropMined = log.decode.result.tdropMined ? Number(log.decode.result.tdropMined) : 0;
                const buyer = log.decode.result.buyer
                    ? log.decode.result.buyer.toLowerCase()
                    : log.decode.result.owner.toLowerCase();
                const seller = log.decode.result.seller.toLowerCase();
                const logContract = await smartContractConnection.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                    where: { contract_address: nftContractAddress }
                });
                if (!logContract ||
                    !logContract.verified ||
                    logContract.protocol !== smart_contract_entity_1.SmartContractProtocolEnum.tnt721)
                    continue;
                this.logger.debug('nft traded: ' + JSON.stringify(log.decode.result));
                const searchCondition = {
                    token_id: nftTokenId,
                    smart_contract_address: nftContractAddress,
                    timestamp: logEntity.timestamp
                };
                this.logger.debug('search condition: ' + JSON.stringify(searchCondition));
                const tradeRecord = await nftConnection.manager.findOne(nft_transfer_record_entity_1.NftTransferRecordEntity, { where: searchCondition });
                if (tradeRecord) {
                    this.logger.debug('get nft trade record:' + JSON.stringify(tradeRecord));
                    tradeRecord.payment_token_amount = Number(new bignumber_js_1.default(paymentTokenAmount).dividedBy('1e18').toFixed());
                    tradeRecord.tdrop_mined = Number(new bignumber_js_1.default(tdropMined).dividedBy('1e18').toFixed());
                    const res = await nftConnection.manager.save(nft_transfer_record_entity_1.NftTransferRecordEntity, tradeRecord);
                    this.logger.debug('nft traded updated: ' + JSON.stringify(res));
                }
                else {
                    this.logger.debug('no nft trade record:' + JSON.stringify(log.decode));
                    await nftConnection.manager.insert(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                        from: seller,
                        to: buyer,
                        token_id: nftTokenId,
                        smart_contract_address: nftContractAddress,
                        height: logEntity.height,
                        name: logContract.name,
                        transaction_hash: logEntity.transaction_hash,
                        timestamp: logEntity.timestamp,
                        payment_token_amount: Number(new bignumber_js_1.default(paymentTokenAmount).dividedBy('1e18').toFixed()),
                        tdrop_mined: Number(new bignumber_js_1.default(tdropMined).dividedBy('1e18').toFixed())
                    });
                }
            }
        }
        return false;
    }
    async updateNftBalance(contract_address, from, to, tokenId) {
        await this.nftBalanceRepository.upsert({
            smart_contract_address: contract_address,
            owner: to.toLowerCase(),
            from: from.toLowerCase(),
            token_id: tokenId
        }, ['smart_contract_address', 'token_id']);
    }
    async getContractUri(address, abi) {
        const res = await this.utilsService.readSmartContract(address, address, abi, 'contractURI', [], [], ['string']);
        return res[0];
    }
    async getBaseTokenUri(address, abi) {
        const res = await this.utilsService.readSmartContract(address, address, abi, 'baseTokenURI', [], [], ['string']);
        return res[0];
    }
    async getTokenUri(address, abi, tokenId) {
        const res = await this.utilsService.readSmartContract(address, address, abi, 'tokenURI', ['uint256'], [tokenId], ['string']);
        return res[0];
    }
    async getNftByWalletAddress(address, take = 20, after, skip = 0, search = null) {
        this.logger.debug('address: ' + address);
        const condition = {
            where: {
                owner: address
            },
            take: take + 1,
            skip: skip,
            order: {
                id: 'DESC'
            }
        };
        if (search) {
            condition.where['name'] = (0, typeorm_2.Like)(`%${search}%`);
        }
        if (after) {
            const id = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + id);
            condition.where['id'] = (0, typeorm_2.LessThan)(id);
        }
        const totalCondition = {
            owner: address
        };
        if (search)
            totalCondition['name'] = (0, typeorm_2.Like)(`%${search}%`);
        this.logger.debug('total count condition', JSON.stringify(totalCondition));
        const totalNft = await this.nftBalanceRepository.count({
            where: totalCondition
        });
        let nftList = await this.nftBalanceRepository.find(condition);
        let hasNextPage = false;
        if (nftList.length > take) {
            hasNextPage = true;
            nftList = nftList.slice(0, take);
        }
        this.logger.debug('nft length  :' + nftList.length);
        return [hasNextPage, totalNft, await this.checkSources(nftList)];
    }
    async getNftsBySmartContractAddress(address, take = 20, after, skip = 0) {
        const condition = {
            where: {
                smart_contract_address: address,
                owner: (0, typeorm_2.Not)('0x0000000000000000000000000000000000000000')
            },
            skip: skip,
            take: take + 1,
            order: {
                id: 'ASC'
            }
        };
        if (after) {
            const id = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + id);
            condition.where['id'] = (0, typeorm_2.MoreThan)(id);
        }
        const totalNft = await this.nftBalanceRepository.count({
            where: {
                smart_contract_address: address,
                owner: (0, typeorm_2.Not)('0x0000000000000000000000000000000000000000')
            }
        });
        let nftList = await this.nftBalanceRepository.find(condition);
        let hasNextPage = false;
        if (nftList.length > take) {
            hasNextPage = true;
            nftList = nftList.slice(0, take);
        }
        return [hasNextPage, totalNft, await this.checkSources(nftList)];
    }
    async getNftTransfersForSmartContract(contractAddress, tokenId, take = 20, after, skip = 0) {
        const condition = {
            where: { smart_contract_address: contractAddress },
            take: take + 1,
            skip: skip,
            order: {
                timestamp: 'DESC'
            }
        };
        if (tokenId)
            condition.where['token_id'] = tokenId;
        this.logger.debug(JSON.stringify(condition));
        if (after) {
            const id = Buffer.from(after, 'base64').toString('ascii');
            this.logger.debug('decode from base64:' + id);
            condition.where['timestamp'] = (0, typeorm_2.LessThan)(id);
        }
        const countCondition = {
            where: {
                smart_contract_address: contractAddress
            }
        };
        if (tokenId)
            countCondition.where['token_id'] = tokenId;
        countCondition;
        const totalRecord = await this.nftTransferRecordRepository.count(countCondition);
        let recordList = await this.nftTransferRecordRepository.find(condition);
        let hasNextPage = false;
        if (recordList.length > take) {
            hasNextPage = true;
            recordList = recordList.slice(0, take);
        }
        return [hasNextPage, totalRecord, recordList];
    }
    async getNftTransfersByWallet(walletAddress, take = 20, after) {
        const condition = {
            where: [
                {
                    from: walletAddress
                },
                {
                    to: walletAddress
                }
            ],
            take: take + 1,
            order: {
                id: 'ASC'
            }
        };
        if (after) {
            const id = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + id);
            condition.where[0].id = (0, typeorm_2.MoreThan)(id);
            condition.where[1].id = (0, typeorm_2.MoreThan)(id);
        }
        const totalRecord = await this.nftTransferRecordRepository.count({
            where: [
                {
                    from: walletAddress
                },
                {
                    to: walletAddress
                }
            ]
        });
        let recordList = await this.nftTransferRecordRepository.find(condition);
        let hasNextPage = false;
        if (recordList.length > take) {
            hasNextPage = true;
            recordList = recordList.slice(0, take);
        }
        return [hasNextPage, totalRecord, recordList];
    }
    async getNftsForContract(walletAddress, contractAddress, take = 20, after) {
        const condition = {
            where: {
                smart_contract_address: contractAddress,
                owner: walletAddress
            },
            take: take + 1,
            order: {
                id: 'ASC'
            }
        };
        if (after) {
            const id = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + id);
            condition.where['id'] = (0, typeorm_2.MoreThan)(id);
        }
        const totalNft = await this.nftBalanceRepository.count({
            where: {
                smart_contract_address: contractAddress,
                owner: walletAddress
            }
        });
        let nftList = await this.nftBalanceRepository.find(condition);
        let hasNextPage = false;
        if (nftList.length > take) {
            hasNextPage = true;
            nftList = nftList.slice(0, take);
        }
        return [hasNextPage, totalNft, await this.checkSources(nftList)];
    }
    async getNftTransfersForBlockHeight(height) {
        return await this.nftTransferRecordRepository.find({
            where: { height: height }
        });
    }
    async getNftByTokenId(tokenId, contractAddress) {
        const searchCondition = {
            token_id: tokenId,
            smart_contract_address: contractAddress
        };
        this.logger.debug('search condtion get nft by token id', JSON.stringify(searchCondition));
        const nft = await this.nftBalanceRepository.findOne({
            where: searchCondition
        });
        this.logger.debug(JSON.stringify(nft));
        if (!nft)
            return undefined;
        return (await this.checkSources([nft]))[0];
    }
    async checkSources(nfts) {
        return nfts;
    }
    async uniqueHolders(contractAddress) {
        const list = await this.nftBalanceRepository
            .createQueryBuilder()
            .from(nft_balance_entity_1.NftBalanceEntity, 'nft')
            .select('nft.owner')
            .where('nft.smart_contract_address=:contractAddress', { contractAddress: contractAddress })
            .distinct(true)
            .getMany();
        return list.length;
    }
    async totalAmount(contractAddress) {
        const res = await this.nftBalanceRepository.find({
            where: { smart_contract_address: contractAddress }
        });
        const userObj = {};
        let uniqeuHolder = 0;
        for (const nft of res) {
            if (!userObj[nft.owner]) {
                uniqeuHolder++;
                userObj[nft.owner] = true;
            }
        }
        return [res.length, uniqeuHolder];
    }
    async findNftsByName(name, take = 20, after) {
        const condition = {
            where: {
                protocol: smart_contract_entity_1.SmartContractProtocolEnum.tnt721,
                name: (0, typeorm_2.Like)('%' + name + '%')
            },
            take: take + 1,
            order: {
                id: 'ASC'
            }
        };
        this.logger.debug(condition);
        if (after) {
            const id = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + id);
            condition.where['id'] = (0, typeorm_2.MoreThan)(id);
        }
        const totalNft = await this.smartContractRepository.count({
            where: { protocol: smart_contract_entity_1.SmartContractProtocolEnum.tnt721, name: (0, typeorm_2.Like)('%' + name + '%') }
        });
        let nftList = await this.smartContractRepository.find(condition);
        let hasNextPage = false;
        if (nftList.length > take) {
            hasNextPage = true;
            nftList = nftList.slice(0, take);
        }
        return [hasNextPage, totalNft, nftList];
    }
    async getNftTransferRecordsByTxHash(txHash) {
        return await this.nftTransferRecordRepository.find({
            where: { transaction_hash: txHash }
        });
    }
};
NftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nft_transfer_record_entity_1.NftTransferRecordEntity, 'nft')),
    __param(1, (0, typeorm_1.InjectRepository)(nft_balance_entity_1.NftBalanceEntity, 'nft')),
    __param(2, (0, typeorm_1.InjectRepository)(smart_contract_call_record_entity_1.SmartContractCallRecordEntity, 'smart_contract')),
    __param(3, (0, typeorm_1.InjectRepository)(smart_contract_entity_1.SmartContractEntity, 'smart_contract')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        utils_service_1.UtilsService])
], NftService);
exports.NftService = NftService;
//# sourceMappingURL=nft.service.js.map