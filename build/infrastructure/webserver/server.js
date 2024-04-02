"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const fastify_1 = __importDefault(require("fastify"));
const morgan_1 = __importDefault(require("morgan"));
const validation_1 = require("../../domain/validation");
const config_1 = __importDefault(require("../config/config"));
const dependencyInjection_1 = require("../config/dependencyInjection");
const logger_1 = require("../config/logger");
morgan_1.default.token('remote-addr', (req, _res) => {
    return req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.socket.remoteAddress;
});
class App {
    constructor(appConfig) {
        this.app_domain = config_1.default.api.domainName;
        this.app_port = config_1.default.api.port;
        (0, dependencyInjection_1.registerDependencies)();
        this.instance = (0, fastify_1.default)({ logger: logger_1.envToLogger[config_1.default.api.logger] });
        // schemas for request
        (0, validation_1.registerSchemas)(this.instance);
        this.instance.register(autoload_1.default, { dir: (0, path_1.join)(__dirname, '../', 'plugins') });
        appConfig.routes.forEach((route) => this.instance.register(route.routes, { prefix: route.prefixRoute }));
    }
    listen() {
        this.instance
            .listen({
            port: this.app_port,
            host: this.app_domain,
        })
            .catch((err) => {
            this.instance.log.fatal({ msg: `Application startup error`, err });
        })
            .then(() => {
            console.log(`App listening on the http://${this.app_domain}:${this.app_port} 🚀`);
        });
    }
}
exports.default = App;
