"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
// Instantiate Fastify with some config
const serverlessApp = (0, fastify_1.default)({
    logger: false,
});
serverlessApp.get('/', (_, reply) => {
    return reply.status(200).send('this is a new message');
});
exports.default = async (req, res) => {
    await serverlessApp.ready();
    serverlessApp.server.emit("request", req, res);
};
