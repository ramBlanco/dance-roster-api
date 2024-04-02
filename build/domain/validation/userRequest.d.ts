import { FastifyInstance } from 'fastify';
export declare const CreateUserSchema: import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare const UpdateUserSchema: import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare const UserSchema: (fastify: FastifyInstance) => void;
