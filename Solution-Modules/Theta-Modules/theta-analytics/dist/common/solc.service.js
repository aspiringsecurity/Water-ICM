"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolcService = void 0;
const common_1 = require("@nestjs/common");
const https = require('https');
const MemoryStream = require('memorystream');
const keccak256 = require('js-sha3').keccak256;
const fs = require('fs');
let SolcService = class SolcService {
    async getVersionList() {
        return new Promise((resolve, reject) => {
            var mem = new MemoryStream(null, { readable: false });
            https.get('https://solc-bin.ethereum.org/bin/list.json', function (response) {
                if (response.statusCode !== 200) {
                    reject('Error downloading list: ' + response.statusCode);
                    return;
                }
                response.pipe(mem);
                response.on('end', function () {
                    resolve(JSON.parse(mem.toString()));
                });
            });
        });
    }
    async downloadBinary(outputName, version, expectedHash) {
        return new Promise((resolve, reject) => {
            const prefix = outputName.slice(0, outputName.lastIndexOf('/'));
            if (!fs.existsSync(prefix)) {
                fs.mkdirSync(prefix);
            }
            if (fs.existsSync(outputName)) {
                console.log(`file ${outputName} exists, return.`);
                resolve({ result: 'Done', fileName: outputName });
                return;
            }
            console.log('Downloading version', version);
            const handleInt = () => {
                console.log(`\nInterrupted before download, removing file: ${version}.`);
                fs.unlinkSync(outputName);
                process.exit(1);
            };
            process.on('SIGINT', handleInt);
            var file = fs.createWriteStream(outputName, { encoding: 'binary' });
            https.get('https://solc-bin.ethereum.org/bin/' + version, function (response) {
                if (response.statusCode !== 200) {
                    reject('Error downloading file: ' + response.statusCode);
                    return;
                }
                response.pipe(file);
                file.on('finish', function () {
                    file.close(function () {
                        var hash = '0x' + keccak256(fs.readFileSync(outputName, { encoding: 'binary' }));
                        if (expectedHash !== hash) {
                            reject('Hash mismatch: ' + expectedHash + ' vs ' + hash);
                            return;
                        }
                        console.log('Downloaded version', version);
                        process.removeListener('SIGINT', handleInt);
                        resolve({ result: 'Done', fileName: outputName });
                    });
                });
            });
        });
    }
    async downloadAll(prefix) {
        const list = await this.getVersionList();
        for (const version in list.releases) {
            const releaseFileName = list.releases[version];
            const expectedFile = list.builds.filter(function (entry) {
                return entry.path === releaseFileName;
            })[0];
            if (!expectedFile) {
                console.log('Version list is invalid or corrupted?');
                return;
            }
            const expectedHash = expectedFile.keccak256;
            await this.downloadBinary(`${prefix}/${releaseFileName}`, releaseFileName, expectedHash);
        }
    }
    async downloadByVersion(version, prefix) {
        try {
            const list = await this.getVersionList();
            var releaseFileName = list.releases[version];
            var expectedFile = list.builds.filter(function (entry) {
                return entry.path === releaseFileName;
            })[0];
            if (!expectedFile) {
                return;
            }
            var expectedHash = expectedFile.keccak256;
            const result = await this.downloadBinary(`${prefix}/${releaseFileName}`, releaseFileName, expectedHash);
            console.log('result in downloadByVersion:', result);
            return result;
        }
        catch (e) {
            console.log('Error in downloadByVersion catch :', e);
        }
    }
};
SolcService = __decorate([
    (0, common_1.Injectable)()
], SolcService);
exports.SolcService = SolcService;
//# sourceMappingURL=solc.service.js.map