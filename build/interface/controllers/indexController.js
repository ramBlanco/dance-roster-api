"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    static async index(_request, reply) {
        return reply.code(200).send(`hello world from fastify template `);
    }
}
exports.default = IndexController;
