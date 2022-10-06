"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerController {
    constructor() {
        // TODO document why this constructor is empty    
    }
    hello(req, res) {
        return res.json({ 'error': false, 'message': 'Hello API!' });
    }
    postHello(req, res) {
        console.log(req);
        return res.json({ 'error': false, 'message': 'Hello POST!' });
    }
    index(req, res) {
        const data = {
            text: 'Contenido dinámico HTML'
        };
        res.render('index.ejs', { data: data });
    }
}
const serverController = new ServerController();
exports.default = serverController;
