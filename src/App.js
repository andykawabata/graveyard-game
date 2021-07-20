import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const TOTAL_QUESTIONS = 3;
  const EARLIEST = 1750;
  const LATEST = 1980

  const initialState = {
    questionNumber: 1,
    currentInput: "",
    questions: null,
    prevAnswer: null,
    gameOver: false,
    startScreen: null,
    finalScore: null
  }

  const [state, setState] = useState(initialState);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setState({...state, startScreen: true});
  }, []);

  async function startGame(){
    setState({...initialState, questions: await loadQuestions()})
    setStartTime(new Date().getTime());
  }

  async function loadQuestions(){
    let questions = []
    const lifespans = generateLifespans(TOTAL_QUESTIONS);
    const names = await generateNames(TOTAL_QUESTIONS);
    for(let i = 0; i < TOTAL_QUESTIONS; i++){
      let question = {
        start: lifespans[i].start, 
        end: lifespans[i].end,
        name: names[i]
      }
      questions.push(question);
    }
    return questions;
  }

  async function generateNames(numNames){
    let url =  'https://randomuser.me/api/?results=20'
    const response = await fetch(url)
    const json = await response.json();
    const users = json.results;
    let names = []
    for(let i = 0; i < numNames; i++){
      let name = users[i].name.first + " " + users[i].name.last;
      names.push(name);
    }
    return names;
  }

  function generateLifespans(numLifespans){
    let lifespans = []
    for(let i = 0; i<numLifespans; i++){
      const birthYear = randRange(EARLIEST, LATEST)
      let maxLifetime = 100
      let minLifetime = 30
      if(2021 - birthYear < maxLifetime){
        maxLifetime = 2021 - birthYear;
        minLifetime = Math.floor(maxLifetime / 2);
      }
      const lifetime = randRange(minLifetime, maxLifetime); 
      lifespans.push({start: birthYear, end: birthYear+lifetime});
    }
    
    return lifespans;
  }


  function randRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function checkGameOver(){
    if (state.questionNumber===TOTAL_QUESTIONS && answerIsCorrect(state.currentInput)){
      return true;
    }
    else{
      return false;
    }
  }

  function handleChange(e){
    setState({...state, currentInput: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    let newState = {}
    if(checkGameOver()){
      let stopTime = new Date().getTime();
      setState({...initialState, 
        gameOver: true,
        finalScore: (stopTime - startTime) / 1000
      });
      e.target.numberInput.value = ""; //clear input field
      return
    }
    else if(answerIsCorrect(state.currentInput)){
      newState = {
        prevAnswer: null,
        //currentQuestion: generateNewQuestion(),
        questionNumber: state.questionNumber + 1
      }
    }
    else{
      newState = {
        prevAnswer: state.currentInput
      }
    }
    newState = {...newState, currentInput: ""}
    setState({...state, ...newState})
    e.target.numberInput.value = ""; //clear input field
  }

  function answerIsCorrect(){
    let correctAnswer = state.questions[state.questionNumber-1].end - state.questions[state.questionNumber-1].start;
    console.log(correctAnswer);
    let attempt = parseInt(state.currentInput);   
    return attempt === correctAnswer ? true : false;
  }



  //let from = state.currentQuestion ? state.currentQuestion.start : null;
  //let to = state.currentQuestion ? state.currentQuestion.end : null;

  return (
    <div className="App">
      <div className="content-container">
        {
        !state.gameOver && !state.startScreen ?
        <div className="game-container">
          {state.questions ? <p>{state.questions[state.questionNumber-1].name}</p> : null }
          {state.questions ? <p>{state.questions[state.questionNumber-1].start} - {state.questions[state.questionNumber-1].end}</p> : null }
          <form onSubmit={handleSubmit} className="input-form">
            <input type="text" name="numberInput" onChange={handleChange}></input>
            <input type="submit"></input>
          </form>
          <p>Question {state.questionNumber} of {TOTAL_QUESTIONS}</p>
          <p className="alert-text">{ state.prevAnswer ? (state.prevAnswer+" is Incorrect. Try again.") : ""}</p>
        </div>
        : 
        state.startScreen ? 
        <div>
          <h1>Welcome</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
        : 
        <div>
          <h1>Finished</h1>
          <h2>{state.finalScore} seconds</h2>
          <button onClick={startGame}>New Game</button>
        </div>
        
        }
      </div>
    </div>
  );
}

export default App;
