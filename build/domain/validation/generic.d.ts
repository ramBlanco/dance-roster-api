import { FastifyInstance } from 'fastify';
import { ObjectSchema } from 'fluent-json-schema';
export declare const BadRequestSchemaResponse: ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare const ServerErrorSchemaResponse: ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare const GenericSchema: (fastify: FastifyInstance) => void;
export declare const getSchemasResponse: (schemaResponse: ObjectSchema) => {
    500: ObjectSchema<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
    }>;
    400: ObjectSchema<{
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
    }>;
    200: ObjectSchema<Record<string, any>>;
};
