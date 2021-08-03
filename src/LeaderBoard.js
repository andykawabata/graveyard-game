import { useEffect } from "react";
import ScoreManager from "./ScoreManager";

function LeaderBoard(props){

    const scoreTable = props.scores.map((scoreObj, index) => {
        if(index < ScoreManager.NUM_HIGH_SCORES){
            let className = scoreObj.id === ScoreManager.HS_KEY ? "highlight" : null;
            return (
                <tr className={className} key={scoreObj.id}>
                    <td>{index+1}</td>
                    <td>{scoreObj.name}</td>
                    <td>{scoreObj.score.toFixed(2)} s</td>
                </tr>
                )
        }
    }) ;

    return(
        <table id="leaderboard" border="1" cellpadding="0" cellspacing="0">
            <caption style={{paddingBottom: "2px"}}><b>Leaderboard</b></caption>
            <tbody>
                {scoreTable}
            </tbody>
        </table>
    )
}

export default LeaderBoard;