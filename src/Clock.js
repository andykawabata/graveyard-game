import { render } from "@testing-library/react";
import { useEffect, useState } from "react"

function Clock(props){


    const [elapsedTime, setElapsedTime] = useState("00:00")
    

    useEffect(()=>{
        const interval = setInterval(() => {
            tick(props.startTime)
        }, 1000);

        return function cleanup() {
            clearInterval(interval);
          };
    },[props.startTime])

    function calculateElapsedSeconds(startTime){
        const currentTime = new Date().getTime();
        return Math.floor((currentTime - startTime)/1000)
    }

    function tick(startTime){
        const elapsedSeconds = calculateElapsedSeconds(startTime);
        let min = Math.floor(elapsedSeconds/60);
        min = min.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
        let sec = elapsedSeconds%60;
        sec = sec.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
        setElapsedTime(min + ":" + sec);
    }


    
    return(
        <h5 id="clock">
           {elapsedTime}
        </h5>
    )

}

export default Clock