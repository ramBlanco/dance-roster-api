"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const server_1 = __importDefault(require("./infrastructure/webserver/server"));
const authRoute_1 = __importDefault(require("./interface/routes/authRoute"));
const indexRoute_1 = __importDefault(require("./interface/routes/indexRoute"));
const statusRoute_1 = __importDefault(require("./interface/routes/statusRoute"));
exports.app = new server_1.default({
    routes: [new statusRoute_1.default(), new authRoute_1.default(), new indexRoute_1.default()],
});
exports.app.listen();
