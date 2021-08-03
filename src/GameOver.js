import db from './db/db';
import { useState, useEffect } from 'react';
import ScoreManager from './ScoreManager';
import LeaderBoard from './LeaderBoard';

function GameOver(props){

    const [newScore, setNewScore] = useState(props.finalScore);
    const [isNewHigh, setIsNewHigh] = useState(false);
    const [currentScores, setCurrentScores] = useState();
    const [name, setName] = useState("");

    useEffect(() => {
        async function handleLoad(){
            let sm = new ScoreManager();
            await sm.loadScoreObjects();
            sm.sortScores();
            await sm.deleteExcessScores();
            setCurrentScores(sm.currentScores);
            if(sm.isHighScore(newScore)){
                setIsNewHigh(newScore)
                sm.insertScore(newScore);// inserts new score with temp id of "newScore"
                setCurrentScores(sm.currentScores); //currentScores will have one extra score, but leaderboard takes care of not rendering it
            }
        }

        handleLoad()
        
    }, []);
    
    

    function handleChange(e){
        setName(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const sm = new ScoreManager();
        await sm.saveScoreToDb(newScore, name);
        updateName();
        setIsNewHigh(false);
      }

    function updateName(){
        let scoreObjects = currentScores;
        for(let i = 0; i < scoreObjects.length; i++){
            if(scoreObjects[i].id === "newScore"){
                scoreObjects[i].name = name;
                break;
            }
        }
        setCurrentScores(scoreObjects);
    }



    return(
            <div>
                {isNewHigh ?  
                <div>
                    <h1>New High Score!</h1>
                    <h2>{newScore} seconds</h2>
                    <p>Enter Your Name:</p>
                    <LeaderBoard scores={currentScores}/>
                    <form onSubmit={handleSubmit} className="input-form">
                        <input type="text" name="nameInput" onChange={handleChange}></input>
                        <input type="submit"></input>
                    </form>
                </div>
                :
                <div>
                    <h1>Finished</h1>
                    <h2>{newScore} seconds</h2>
                    <button onClick={props.startGame}>New Game</button>
                    <LeaderBoard scores={currentScores}/>
                </div>
                }
            </div>

            
        
    )
}

export default GameOver;