"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = exports.LoginResponseSchema = exports.LoginSchema = void 0;
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
exports.LoginSchema = fluent_json_schema_1.default.object()
    .id('Login')
    .prop('email', fluent_json_schema_1.default.string().format(fluent_json_schema_1.default.FORMATS.EMAIL))
    .required()
    .prop('password', fluent_json_schema_1.default.string().minLength(5))
    .required()
    .title('LoginTitle');
exports.LoginResponseSchema = fluent_json_schema_1.default.object()
    .id('LoginResponse')
    .prop('email', fluent_json_schema_1.default.string().format(fluent_json_schema_1.default.FORMATS.EMAIL))
    .required()
    .title('LoginResponseTitle');
const AuthSchema = (fastify) => {
    fastify.addSchema(exports.LoginSchema);
    fastify.addSchema(exports.LoginResponseSchema);
};
exports.AuthSchema = AuthSchema;
