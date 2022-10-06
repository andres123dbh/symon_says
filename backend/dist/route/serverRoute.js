"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serverController_1 = __importDefault(require("../controller/serverController"));
class ServerRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', serverController_1.default.index);
        this.router.get('/hello', serverController_1.default.hello);
        this.router.post('/post-hello', serverController_1.default.postHello);
    }
}
const serverRoute = new ServerRoute();
exports.default = serverRoute;
