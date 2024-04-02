"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const useCaseInterface_1 = require("../../../domain/interfaces/useCaseInterface");
const di_1 = require("../../../infrastructure/config/dependencyInjection/di");
const server_1 = require("../../../server");
class LoginUseCase extends useCaseInterface_1.UseCaseBase {
    constructor() {
        super(...arguments);
        this.userService = server_1.app.instance.diContainer.resolve(di_1.INJECTIONS.USER_SERVICE);
    }
    async handler(user) {
        return this.userService.getUserByEmail(user.email);
    }
}
exports.LoginUseCase = LoginUseCase;
