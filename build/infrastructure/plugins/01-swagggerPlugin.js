"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __importDefault(require("@fastify/swagger"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
function swaggerPlugin(fastifyInstance, _opts, done) {
    fastifyInstance.register(swagger_1.default, {
        prefix: '/v1/documentation',
        openapi: {
            info: {
                title: 'NunkyFinance Api',
                description: '',
                version: '0.0.1',
            },
            servers: [
                { url: 'http://localhost:4000', description: 'Local' },
                { url: 'https://nunky.com', description: 'Production' },
            ],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'apiKey',
                        in: 'header',
                    },
                },
            },
        },
    });
    fastifyInstance.route({
        method: 'GET',
        url: '/docs/swagger',
        handler: (_req, res) => {
            res.send(fastifyInstance.swagger());
        },
    });
    done();
}
exports.default = (0, fastify_plugin_1.default)(swaggerPlugin);
