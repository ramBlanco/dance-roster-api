"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemasResponse = exports.GenericSchema = exports.ServerErrorSchemaResponse = exports.BadRequestSchemaResponse = void 0;
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
exports.BadRequestSchemaResponse = fluent_json_schema_1.default.object()
    .id('BadRequestSchemaResponse')
    .prop('statusCode', fluent_json_schema_1.default.integer())
    .prop('error', fluent_json_schema_1.default.string())
    .prop('message', fluent_json_schema_1.default.string())
    .title('BadRequestSchemaResponseTitle');
exports.ServerErrorSchemaResponse = fluent_json_schema_1.default.object()
    .id('ServerErrorSchemaResponse')
    .prop('error', fluent_json_schema_1.default.string())
    .prop('message', fluent_json_schema_1.default.string())
    .title('ServerErrorSchemaResponseTitle');
const BadRequestResponse = {
    400: exports.BadRequestSchemaResponse,
};
const ServerErrorResponse = {
    500: exports.ServerErrorSchemaResponse,
};
const GenericSchema = (fastify) => {
    fastify.addSchema(exports.BadRequestSchemaResponse);
    fastify.addSchema(exports.ServerErrorSchemaResponse);
};
exports.GenericSchema = GenericSchema;
const getSchemasResponse = (schemaResponse) => {
    return {
        200: schemaResponse,
        ...BadRequestResponse,
        ...ServerErrorResponse,
    };
};
exports.getSchemasResponse = getSchemasResponse;
