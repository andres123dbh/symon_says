import { Request, Response } from "express";
import { render } from 'ejs';

interface iScore{
    name: string;
    score: string;
    difficulty: string;
}

interface iScoreContainer{
	scores: iScore[];
}


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

    postSaveScore(req: Request, res: Response) {
        let newscore: any = req.body;
        console.log(newscore)
    }
}

const serverController = new ServerController();
export default serverController;