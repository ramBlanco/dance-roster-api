"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../infrastructure/config/dependencyInjection/di");
const server_1 = require("../../server");
class AuthController {
    static async login(request, reply) {
        const loginUseCase = server_1.app.instance.diContainer.resolve(di_1.INJECTIONS.LOGIN_USE_CASE);
        const user = await loginUseCase.handler(request.body);
        return reply.send(user);
    }
}
exports.default = AuthController;
