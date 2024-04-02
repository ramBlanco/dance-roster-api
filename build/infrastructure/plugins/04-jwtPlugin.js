"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@fastify/jwt"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const config_1 = __importDefault(require("../config/config"));
const whitelist_1 = __importDefault(require("../config/whitelist"));
function jwtPlugin(fastifyInstance, _opts, done) {
    fastifyInstance.register(jwt_1.default, {
        secret: config_1.default.security.jwtSecret,
        sign: {
            expiresIn: '5m',
        },
    });
    fastifyInstance.addHook('onRequest', async (request, reply) => {
        try {
            const isWhiteListed = whitelist_1.default.some((trustedUrl) => request.url.includes(trustedUrl));
            if (!isWhiteListed) {
                await request.jwtVerify();
            }
        }
        catch (err) {
            reply.send(err);
        }
    });
    done();
}
exports.default = (0, fastify_plugin_1.default)(jwtPlugin);
