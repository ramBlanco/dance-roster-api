"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchemas = void 0;
const authRequest_1 = require("./authRequest");
const userRequest_1 = require("./userRequest");
const registerSchemas = (instance) => {
    (0, userRequest_1.UserSchema)(instance);
    (0, authRequest_1.AuthSchema)(instance);
};
exports.registerSchemas = registerSchemas;
