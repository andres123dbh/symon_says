import { Request, Response } from "express";
import { render } from 'ejs';

class ServerController {

    constructor() {
    // TODO document why this constructor is empty    
    } 

    hello(req: Request, res: Response): Response {
    return res.json({ 'error': false, 'message': 'Hello API!' });
    }

    postHello(req: Request, res: Response): Response {
    console.log(req);    
    return res.json({ 'error': false, 'message': 'Hello POST!' });
    }

    index(req: Request, res: Response): void {
    const data = {
        text: 'Contenido dinámico HTML'
    }
    res.render('index.ejs', { data: data });
    }
}

const serverController = new ServerController();
export default serverController;