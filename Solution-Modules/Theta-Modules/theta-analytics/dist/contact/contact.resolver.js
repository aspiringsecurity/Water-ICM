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
exports.ContactResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const contact_entity_1 = require("./contact.entity");
const contact_model_1 = require("./contact.model");
const contact_service_1 = require("./contact.service");
let ContactResolver = class ContactResolver {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async newMsg(fName, lName, email, content) {
        return await this.contactService.addMsg(fName, lName, content, email);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => contact_entity_1.ContactEntity),
    __param(0, (0, graphql_1.Args)({
        name: 'first_name'
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'last_name'
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'email'
    })),
    __param(3, (0, graphql_1.Args)({
        name: 'content'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ContactResolver.prototype, "newMsg", null);
ContactResolver = __decorate([
    (0, graphql_1.Resolver)(() => contact_model_1.ContactType),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactResolver);
exports.ContactResolver = ContactResolver;
//# sourceMappingURL=contact.resolver.js.map