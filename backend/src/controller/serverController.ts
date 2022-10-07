import { Request, Response } from "express";
import { render } from 'ejs';
import { iScore } from "../interfaces/IScore.js";
import { iScoreContainer } from "../interfaces/IScoreContainer.js";

class ServerController {

    constructor() {
    // TODO document why this constructor is empty    
    } 

    getTableScore(req: Request, res: Response): Response {
        try{
            const path = require('path'); 
            const fs = require('fs'); 
			let scorePath = path.join(__dirname, "../data/data.json");
			const data    = fs.readFileSync(scorePath, 'utf8');
			const scores  = <iScoreContainer>JSON.parse(data);

			console.log("Scores requested");
			return res.json({ 'error': false, 'scores': scores.scores});
		}
		catch(err){
			return res.json({ 'error': true });
		}
    }

    postSaveScore(req: Request, res: Response): Response {
        
        try{
			const path = require('path'); 
            const fs = require('fs'); 
		    let scorePath = path.join(__dirname, "../data/data.json");
            let newscore: any = req.body;

			// write
            let score = {"scores": newscore.score};
			fs.writeFileSync(scorePath, JSON.stringify(score), 'utf8');
			console.log(`Registered score`);
			return res.json({ 'error': false });
		}
		catch(err){
			return res.json({ 'error': true });
		}
    }
}

const serverController = new ServerController();
export default serverController;