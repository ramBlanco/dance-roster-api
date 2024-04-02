"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusController {
    static async checkStatus(_request, reply) {
        return reply.code(200).send(`It's alive on vercel`);
    }
}
exports.default = StatusController;
