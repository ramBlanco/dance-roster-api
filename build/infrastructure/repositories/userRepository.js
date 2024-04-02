"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const server_1 = require("../../server");
class UserRepository {
    name() {
        server_1.app.instance.log.info('Something important happened!');
        return 'my name is...';
    }
}
exports.UserRepository = UserRepository;
