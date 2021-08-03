import FirebaseConnector from './db/FirebaseConnector';

class ScoreManager{

    static NUM_HIGH_SCORES = 10;
    static HS_KEY = "newScore";

    constructor() {
        this.CONNECTOR = FirebaseConnector;
        //this.currentScores ="thescores"
    } 



    async loadScoreObjects(){
        await this.CONNECTOR.readCollection("scores").then((scoreCollection)=>{
            this.currentScores = scoreCollection;
        })
    }

    sortScores(){    
        this.currentScores.sort((a, b) => (a.score > b.score) ? 1 : -1)
    }

    isHighScore(newScore){
        if(this.currentScores.length < ScoreManager.NUM_HIGH_SCORES){
            return true;
        }
        const slowestScore = this.currentScores[this.currentScores.length-1];
        if(newScore < slowestScore.score){
            return true;
        }
        return false
    }

    async deleteExcessScores(){
        if(this.currentScores.length > ScoreManager.NUM_HIGH_SCORES){
            let excess = this.currentScores.length - ScoreManager.NUM_HIGH_SCORES;
            //delete from database
            for(let i = ScoreManager.NUM_HIGH_SCORES; i < this.currentScores.length; i++){
                let id = this.currentScores[i].id
                await this.CONNECTOR.deleteDocument("scores", id);
            }
            //delete from class variable
            this.currentScores.splice(ScoreManager.NUM_HIGH_SCORES)
        }
    }

    insertScore(newScore){
        // inserts new score with temp id of "newScore"
        const newScoreObject = {
            id: ScoreManager.HS_KEY,
            score: newScore,
            name : ""
        }
        let indexToInsert = null;
        for(let i = 0; i < this.currentScores.length; i++){
            if(newScore < this.currentScores[i].score){
                indexToInsert = i;
                break;
            }
        }
        if(indexToInsert === null && this.currentScores.length < ScoreManager.NUM_HIGH_SCORES){
            indexToInsert = this.currentScores.length;
        }
        this.currentScores.splice(indexToInsert, 0, newScoreObject);
    }

    async saveScoreToDb(newScore, newName){     
        let newScoreObject = {
            score: newScore,
            name: newName
        }
        await this.CONNECTOR.addDocument("scores", newScoreObject)
    }

}

export default ScoreManager