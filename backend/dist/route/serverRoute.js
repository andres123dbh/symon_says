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
        this.router.get('/getTableScore', serverController_1.default.getTableScore);
        this.router.post('/postSaveScore', serverController_1.default.postSaveScore);
    }
}
const serverRoute = new ServerRoute();
exports.default = serverRoute;
