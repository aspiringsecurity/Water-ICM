"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const throttler_1 = require("@nestjs/throttler");
let GqlThrottlerGuard = class GqlThrottlerGuard extends throttler_1.ThrottlerGuard {
    getRequestResponse(context) {
        const gqlCtx = graphql_1.GqlExecutionContext.create(context);
        const ctx = gqlCtx.getContext();
        return { req: ctx.req, res: ctx.res };
    }
};
GqlThrottlerGuard = __decorate([
    (0, common_1.Injectable)()
], GqlThrottlerGuard);
exports.GqlThrottlerGuard = GqlThrottlerGuard;
//# sourceMappingURL=guard.js.map