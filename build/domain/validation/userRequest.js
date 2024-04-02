"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UpdateUserSchema = exports.CreateUserSchema = void 0;
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
exports.CreateUserSchema = fluent_json_schema_1.default.object()
    .id('UserCreate')
    .prop('firstName', fluent_json_schema_1.default.string())
    .required()
    .prop('lastName', fluent_json_schema_1.default.string())
    .required()
    .prop('email', fluent_json_schema_1.default.string().format(fluent_json_schema_1.default.FORMATS.EMAIL))
    .required()
    .title('UserCreateTitle');
exports.UpdateUserSchema = fluent_json_schema_1.default.object()
    .id('UpdateUserSchema')
    .prop('firstName', fluent_json_schema_1.default.string())
    .required()
    .prop('lastName', fluent_json_schema_1.default.string())
    .required()
    .prop('email', fluent_json_schema_1.default.string().format(fluent_json_schema_1.default.FORMATS.EMAIL))
    .required()
    .title('UpdateUserSchemaTitle');
const UserSchema = (fastify) => {
    fastify.addSchema(exports.CreateUserSchema);
    fastify.addSchema(exports.UpdateUserSchema);
};
exports.UserSchema = UserSchema;
