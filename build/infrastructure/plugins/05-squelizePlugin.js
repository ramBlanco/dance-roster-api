"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const sequelize_1 = require("sequelize");
const postgresql_1 = require("../database/postgresql");
const sequelizePlugin = (fastifyInstance, _opts, done) => {
    const connectionString = `postgres://${postgresql_1.sequelizeOptions.username}:${postgresql_1.sequelizeOptions.password}@${postgresql_1.sequelizeOptions.host}/${postgresql_1.sequelizeOptions.database}`;
    const sequelize = new sequelize_1.Sequelize(connectionString);
    fastifyInstance.addHook('onClose', () => sequelize.close().finally());
    fastifyInstance.decorate('db', sequelize);
    // fastifyInstance.ready(async () => {
    //   try {
    //     await sequelize.authenticate()
    //     fastifyInstance.log.info('Database connection is successfully established.')
    //   } catch (err) {
    //     fastifyInstance.log.fatal(`Connection could not be established: ${err}`)
    //   }
    // })
    done();
};
exports.default = (0, fastify_plugin_1.default)(sequelizePlugin);
