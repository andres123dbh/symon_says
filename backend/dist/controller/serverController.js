"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerController {
    constructor() {
        // TODO document why this constructor is empty    
    }
    getTableScore(req, res) {
        try {
            const path = require('path');
            const fs = require('fs');
            let scorePath = path.join(__dirname, "../data/data.json");
            const data = fs.readFileSync(scorePath, 'utf8');
            const scores = JSON.parse(data);
            console.log("Scores requested");
            return res.json({ 'error': false, 'scores': scores.scores });
        }
        catch (err) {
            return res.json({ 'error': true });
        }
    }
    postSaveScore(req, res) {
        let newscore = req.body;
        console.log(newscore);
    }
}
const serverController = new ServerController();
exports.default = serverController;
