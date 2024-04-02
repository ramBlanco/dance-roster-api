"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const morgan_1 = __importDefault(require("morgan"));
const validation_1 = require("../../domain/validation");
const config_1 = __importDefault(require("../config/config"));
const dependencyInjection_1 = require("../config/dependencyInjection");
const logger_1 = require("../config/logger");
const _00_genericPlugin_1 = __importDefault(require("../plugins/00-genericPlugin"));
const _01_swagggerPlugin_1 = __importDefault(require("../plugins/01-swagggerPlugin"));
const _02_reateLimitPlugin_1 = __importDefault(require("../plugins/02-reateLimitPlugin"));
const _03_diPlugin_1 = __importDefault(require("../plugins/03-diPlugin"));
const _04_jwtPlugin_1 = __importDefault(require("../plugins/04-jwtPlugin"));
const _05_squelizePlugin_1 = __importDefault(require("../plugins/05-squelizePlugin"));
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
        // this.instance.register(autoLoad, { dir: join(__dirname, '../', 'plugins') })
        this.instance.register(_00_genericPlugin_1.default);
        this.instance.register(_01_swagggerPlugin_1.default);
        this.instance.register(_02_reateLimitPlugin_1.default);
        this.instance.register(_03_diPlugin_1.default);
        this.instance.register(_04_jwtPlugin_1.default);
        this.instance.register(_05_squelizePlugin_1.default);
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
