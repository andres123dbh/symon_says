import { Router } from "express";

import serverController from "../controller/serverController";

class ServerRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/getTableScore', serverController.getTableScore);
        this.router.post('/postSaveScore', serverController.postSaveScore);
    }
}

const serverRoute = new ServerRoute();
export default serverRoute;