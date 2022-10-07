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
        this.app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 0);
            // Pass to next layer of middleware
            next();
        });
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
