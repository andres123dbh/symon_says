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