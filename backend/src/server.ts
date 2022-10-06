import express, { Application } from "express";
import dotenv from 'dotenv';

import serverRoute from "./route/serverRoute";


class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.route();
        dotenv.config();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 1802);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        const path = require('path');
        this.app.set('views', path.join(__dirname, 'view'));
        this.app.set('view engine', 'ejs');
    }

    route(): void {
        this.app.use('/', serverRoute.router);
        this.app.use('/api', serverRoute.router);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port:', this.app.get('port'));
        });
    }
} 

const server = new Server();
server.start();