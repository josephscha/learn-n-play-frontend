import React from 'react';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

export default class Answer extends React.Component{

state = {
    myTimer: null,
    count: 3,
    input: ""
}

countdown = () => {
    this.setState({count: this.state.count - 1})
}

startTimer = () => {
    this.setState({myTimer: setInterval(this.countdown,1000)})
}

stopTimer = () => {
    clearInterval(this.state.myTimer)
}

handleTimer = () => {
    this.startTimer()
    recognition.start();
    setTimeout(() => {
        recognition.stop();
        this.setState({count: 3})
    }, 3000);
    recognition.onresult = (event) => {
    this.setState({input: event.results[0][0].transcript.toLowerCase()})
    }
}

handleClick = () => {
    this.props.nextQuestion()
    this.setState({input: ""})
    document.getElementsByClassName("right")[0].style.opacity="0"
    document.getElementsByClassName("wrong")[0].style.opacity="0"
}

handleChange = (event) => {
    this.setState({input: event.target.value})
}

checkAnswer = (event) => {
    event.preventDefault()
    if (this.state.input !== "" && this.state.input !== this.props.answer.toLowerCase() && this.props.status !== "WRONG")
        this.props.answerHandler("WRONG")
        if (this.state.input !== "" && this.state.input !== this.props.answer.toLowerCase() && this.props.status !== "WRONG")
        document.getElementsByClassName("wrong")[0].style.opacity="1"
        if (this.state.input !== "" && this.state.input !== this.props.answer.toLowerCase() && this.props.status !== "WRONG")
        document.getElementsByClassName("right")[0].style.opacity="0"
        if(this.state.input !== "" && this.state.input === this.props.answer.toLowerCase() && this.props.status !== "CORRECT")
        document.getElementsByClassName("right")[0].style.opacity="1"
        if(this.state.input !== "" && this.state.input === this.props.answer.toLowerCase() && this.props.status !== "CORRECT")
        document.getElementsByClassName("wrong")[0].style.opacity="0"
    if (this.state.input !== "" && this.state.input === this.props.answer.toLowerCase() && this.props.status !== "CORRECT")
        this.props.answerHandler("CORRECT")
}

    render(){
        let type = this.props.type
        const {stopTimer, handleTimer, handleClick, handleChange, checkAnswer} = this;
        const { input,count } = this.state;
        const {answerHandler, status , answer} = this.props
        // console.log("answer component", this.props)
        if (type === "ReadingProblem"){
        if (count <= 0){stopTimer()}
        if (input !== "" && input !== answer.toLowerCase() && status !== "WRONG")
        {answerHandler("WRONG")}
        if (input !== "" && input !== answer.toLowerCase() && status !== "WRONG")
        document.getElementsByClassName("wrong")[0].style.opacity="1"

        if (input !== "" && input !== answer.toLowerCase() && status !== "WRONG")
        document.getElementsByClassName("right")[0].style.opacity="0"

        if (input !== "" && input === answer.toLowerCase() && status !== "CORRECT")
        {answerHandler("CORRECT")}

        if (input !== "" && input === answer.toLowerCase() && status !== "CORRECT")
        document.getElementsByClassName("wrong")[0].style.opacity="0"

        if (input !== "" && input === answer.toLowerCase() && status !== "CORRECT")
        document.getElementsByClassName("right")[0].style.opacity="1"

        }
        return (
            <>
            {/* {   this.state.input !== "" && this.state.input !== this.props.answer.toLowerCase() && this.props.status !== "WRONG"? */}
            <img className="wrong" src={require("../images/wrong.png")}/>
            {/* : */}
            {/* this.state.input !== "" && this.state.input === this.props.answer.toLowerCase() && this.props.status !== "CORRECT"? */}
            <img className="right" src={require("../images/correct.png")}/>
            {/* } */}
            
            
            {type === "ReadingProblem" ? 
                <div>
                    <button className="s-btn" onClick={handleTimer}>START 3 SECOND TIMER</button>
                    <h1>Timer: {count}</h1>
                    <h3>You said:</h3>
                    <h2>{input}</h2>
                    {status === "CORRECT" ?  <button className="next" onClick={handleClick}>Next Question</button> : null}
                </div>
            :
                <div>
                    <form>
                    <div className="form-control">
                    <input autoFocus={true} type="text" value={input} placeholder="Type your answer here" onChange={(event) => handleChange(event)}/>
                    </div>
                    <button className="button1" type="submit" onClick={event => checkAnswer(event)}>Check answer!</button>
                    </form>
                    <br></br>
                    {status === "CORRECT" ? <button className="next"  onClick={handleClick}>Next Question</button> : null}
                </div>
            }
            </>
        )
    }
}