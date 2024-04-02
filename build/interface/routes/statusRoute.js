"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../..//infrastructure/config/dependencyInjection/di");
const server_1 = require("../..//server");
const statusController_1 = __importDefault(require("../controllers/statusController"));
class StatusRoute {
    constructor() {
        this.prefixRoute = 'v1';
    }
    async routes(fastify, _options, _done) {
        const localeService = server_1.app.instance.diContainer.resolve(di_1.INJECTIONS.LOCALE_SERVICE);
        fastify.get('/status', {
            schema: {
                description: localeService.translate('routes.status.description'),
            },
        }, statusController_1.default.checkStatus);
    }
}
exports.default = StatusRoute;
