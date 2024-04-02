"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoPrefix = void 0;
const di_1 = require("../../infrastructure/config/dependencyInjection/di");
const controller = async (instance, _opts) => {
    instance.get('/hello', async (request, reply) => {
        const userService = request.diScope.resolve(di_1.INJECTIONS.USER_SERVICE);
        reply.send(await userService.sayHello());
    });
};
exports.default = controller;
exports.autoPrefix = '/v1';
