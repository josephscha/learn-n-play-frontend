import React from 'react';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

export default class Answer extends React.Component{
// check if user input === answer, if so, change state answer to CORRECT, if not, change to WRONG. 
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
    // this.setState({count: 3})
    this.startTimer()
    recognition.start();
    setTimeout(() => {
        // alert("recording stopped")
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
}

handleChange = (event) => {
    this.setState({input: event.target.value})
}

checkAnswer = (event) => {
    event.preventDefault()
    if (this.state.input !== "" && this.state.input !== this.props.answer && this.props.status !== "WRONG")
        {this.props.answerHandler("WRONG")}
    if (this.state.input !== "" && this.state.input === this.props.answer && this.props.status !== "CORRECT")
        {this.props.answerHandler("CORRECT")}
}
    render(){
        let type = this.props.type
        const {stopTimer, handleTimer, handleClick, handleChange, checkAnswer} = this;
        const { input,count } = this.state;
        const {answerHandler, status , answer} = this.props
        console.log("answer component", this.props)
        if (type === "ReadingProblem"){
        if (count <= 0){stopTimer()}
        if (input !== "" && input !== answer && status !== "WRONG")
        {answerHandler("WRONG")}
        if (input !== "" && input === answer && status !== "CORRECT")
        {answerHandler("CORRECT")}
        }
        return (
            <>
            {type === "ReadingProblem" ? 
                <div>
                    <button onClick={handleTimer}>START 3 SECOND TIMER</button>
                    <h1>Timer: {count}</h1>
                    <h3>Text comes out under here</h3>
                    <h2>{input}</h2>
                    {status === "CORRECT" ? <button onClick={handleClick}>Next Question</button> : null}
                </div>
            :
                <div>
                    <form>
                    <div className="form-control">
                    <input type="text" value={input} placeholder="Type your answer here" onChange={(event) => handleChange(event)}/>
                    </div>
                    <button className="button1" type="submit" onClick={event => checkAnswer(event)}>Check answer!</button>
                    </form>
                    <br></br>
                    {status === "CORRECT" ? <button onClick={handleClick}>Next Question</button> : null}
                </div>
            }
            </>
        )
    }
}