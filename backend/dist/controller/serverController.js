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
        try {
            const path = require('path');
            const fs = require('fs');
            let scorePath = path.join(__dirname, "../data/data.json");
            let newscore = req.body;
            // write
            let score = { "scores": newscore.score };
            fs.writeFileSync(scorePath, JSON.stringify(score), 'utf8');
            console.log(`Registered score`);
            return res.json({ 'error': false });
        }
        catch (err) {
            return res.json({ 'error': true });
        }
    }
}
const serverController = new ServerController();
exports.default = serverController;
