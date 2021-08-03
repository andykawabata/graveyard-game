import FirebaseConnector from './db/FirebaseConnector';

class ScoreManager{

    static NUM_HIGH_SCORES = 10;

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
        const slowestScore = this.currentScores[this.currentScores.length-1];
        return newScore < slowestScore.score ? true : false;
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
            id: "newScore",
            score: newScore,
            name : ""
        }
        let indexToInsert;
        for(let i = 0; i < this.currentScores.length; i++){
            if(newScore < this.currentScores[i].score){
                indexToInsert = i;
                break;
            }
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