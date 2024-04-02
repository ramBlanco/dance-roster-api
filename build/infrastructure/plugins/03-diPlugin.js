"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("@fastify/awilix");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
function diPlugin(fastifyInstance, _opts, done) {
    // load injection dependency
    fastifyInstance.register(awilix_1.fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true });
    done();
}
exports.default = (0, fastify_plugin_1.default)(diPlugin);
