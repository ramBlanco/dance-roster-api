"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
function genericPlugin(fastifyInstance, _opts, done) {
    // hook for log request
    fastifyInstance.addHook('preHandler', (req, _reply, done) => {
        if (req.query)
            fastifyInstance.log.info({ query: req.query }, 'parsed query');
        if (req.body)
            fastifyInstance.log.info({ body: req.body }, 'parsed body');
        done();
    });
    fastifyInstance.setErrorHandler((err, _req, reply) => {
        if (err.statusCode === 429) {
            reply.code(429);
            err.message = 'You hit the rate limit!';
        }
        reply.send(err);
    });
    done();
}
exports.default = (0, fastify_plugin_1.default)(genericPlugin);
