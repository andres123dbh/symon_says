"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const serverRoute_1 = __importDefault(require("./route/serverRoute"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.route();
        dotenv_1.default.config();
    }
    config() {
        this.app.set('port', process.env.PORT || 1802);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        const path = require('path');
        this.app.set('views', path.join(__dirname, 'view'));
        this.app.set('view engine', 'ejs');
    }
    route() {
        this.app.use('/', serverRoute_1.default.router);
        this.app.use('/api', serverRoute_1.default.router);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port:', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
