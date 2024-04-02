"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDependencies = void 0;
const awilix_1 = require("@fastify/awilix");
const awilix_2 = require("awilix");
const localeService_1 = require("../../../application/services/localeService");
const userService_1 = require("../../../application/services/userService");
const loginUseCase_1 = require("../../../application/useCases/auth/loginUseCase");
const userRepository_1 = require("../../repositories/userRepository");
const di_1 = require("./di");
function registerDependencies() {
    // services
    awilix_1.diContainer.register({ [di_1.INJECTIONS.USER_SERVICE]: (0, awilix_2.asClass)(userService_1.UserService, { lifetime: awilix_2.Lifetime.SCOPED }) });
    awilix_1.diContainer.register({ [di_1.INJECTIONS.LOCALE_SERVICE]: (0, awilix_2.asClass)(localeService_1.LocaleService, { lifetime: awilix_2.Lifetime.SCOPED }) });
    // repositories
    awilix_1.diContainer.register({ [di_1.INJECTIONS.USER_REPOSITORY]: (0, awilix_2.asClass)(userRepository_1.UserRepository, { lifetime: awilix_2.Lifetime.SINGLETON }) });
    // use case
    awilix_1.diContainer.register({ [di_1.INJECTIONS.LOGIN_USE_CASE]: (0, awilix_2.asClass)(loginUseCase_1.LoginUseCase, { lifetime: awilix_2.Lifetime.SCOPED }) });
}
exports.registerDependencies = registerDependencies;
