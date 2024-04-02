import { FastifyInstance } from 'fastify';
export declare const LoginSchema: import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare const LoginResponseSchema: import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare const AuthSchema: (fastify: FastifyInstance) => void;
