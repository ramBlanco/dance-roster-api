"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeOptions = void 0;
const config_1 = __importDefault(require("../config/config"));
exports.sequelizeOptions = {
    host: config_1.default.database.postgresHost,
    database: config_1.default.database.postgresDb,
    username: config_1.default.database.postgresUser,
    password: config_1.default.database.postgresPassword,
    dialect: 'postgres',
};
