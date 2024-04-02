"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
function rateLimitPlugin(fastifyInstance, _opts, done) {
    fastifyInstance.register(rate_limit_1.default, { global: true, max: 3, timeWindow: '1 minute' });
    done();
}
exports.default = (0, fastify_plugin_1.default)(rateLimitPlugin);
