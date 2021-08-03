import { useEffect } from "react";

function LeaderBoard(props){

    useEffect(()=>{
    })

    const scoreTable = props.scores ? props.scores.map((scoreObj, index) => {
        <div>
            <span>{index+1} </span>
            <span>{scoreObj.name} </span>
            <span>{scoreObj.score}</span>
        </div>
    }) : null;
    console.log(scoreTable)
    return(
        <div>
            {props.scores ?
                scoreTable
                :
                null
            }
        </div>
    )
}

export default LeaderBoard;