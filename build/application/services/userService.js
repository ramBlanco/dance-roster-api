"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const di_1 = require("../../infrastructure/config/dependencyInjection/di");
const server_1 = require("../../server");
class UserService {
    constructor() {
        this.userRepository = server_1.app.instance.diContainer.resolve(di_1.INJECTIONS.USER_REPOSITORY);
    }
    async sayHello() {
        return this.userRepository.name();
    }
    async getUserByEmail(email) {
        return {
            email: email,
            username: email,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
exports.UserService = UserService;
