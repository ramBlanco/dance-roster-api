"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../src/server");
// import Fastify from "fastify";
// Instantiate Fastify with some config
//const serverlessApp = Fastify({
//  logger: false,
//});
//
//serverlessApp.get('/', (_, reply) => {
//  return reply.status(200).send('this is a new message')
//})
exports.default = async (req, res) => {
    await server_1.app.instance.ready();
    server_1.app.instance.server.emit("request", req, res);
};
