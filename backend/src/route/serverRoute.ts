import { Router } from "express";

import serverController from "../controller/serverController";

class ServerRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', serverController.index);
        this.router.get('/hello', serverController.hello);
        this.router.post('/post-hello', serverController.postHello);
    }
}

const serverRoute = new ServerRoute();
export default serverRoute;