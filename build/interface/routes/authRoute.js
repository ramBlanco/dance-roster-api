"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRequest_1 = require("../../domain/validation/authRequest");
const generic_1 = require("../../domain/validation/generic");
const di_1 = require("../../infrastructure/config/dependencyInjection/di");
const server_1 = require("../../server");
const authController_1 = __importDefault(require("../controllers/authController"));
class AuthRoute {
    constructor() {
        this.prefixRoute = 'v1/auth';
    }
    async routes(fastify, _options, _done) {
        const localeService = server_1.app.instance.diContainer.resolve(di_1.INJECTIONS.LOCALE_SERVICE);
        fastify.post('/login', {
            schema: {
                description: localeService.translate('routes.login.description'),
                body: authRequest_1.LoginSchema,
                response: (0, generic_1.getSchemasResponse)(authRequest_1.LoginResponseSchema),
            },
        }, authController_1.default.login);
    }
}
exports.default = AuthRoute;
