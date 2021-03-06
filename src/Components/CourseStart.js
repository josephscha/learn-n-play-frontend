import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import Answer from './Answer'
import Question from './Question'
import Solution from './Solution'

class CourseStart extends Component {

state = {
    questions: [],
    startIndex: 0,
    finished: false,
    status: "NA",
    type: ""
}

componentDidMount(){
    this.getQuestions()
}

getQuestions = () => {
    fetch("http://localhost:3000/course_problems")
    .then(resp => resp.json())
    .then(json => {
       let questionIds = json.filter(question => question.course_id === this.props.location.courseId.id);
       return questionIds
    }).then(questionIds => {
        questionIds.forEach(questionId => 
            {if (questionId.problemable_type === "MathProblem"){
                fetch("http://localhost:3000/math_problems")
                .then(resp => resp.json())
                .then(json => this.setState({questions: this.state.questions.concat(json.find(json => json.id === questionId.problemable_id)), type: questionId.problemable_type}))
            }if (questionId.problemable_type === "ReadingProblem"){
                fetch("http://localhost:3000/reading_problems")
                .then(resp => resp.json())
                .then(json => this.setState({questions: this.state.questions.concat(json.find(json => json.id === questionId.problemable_id)), type: questionId.problemable_type}))
            }if (questionId.problemable_type === "SpellingProblem"){
                fetch("http://localhost:3000/spelling_problems")
                .then(resp => resp.json())
                .then(json => this.setState({questions: this.state.questions.concat(json.find(json => json.id === questionId.problemable_id)), type: questionId.problemable_type}))
            }
        })
    })
}

nextQuestion = () => {
    let newIndex = this.state.startIndex + 1;
    if(newIndex >= this.state.questions.length) {
      newIndex = 0; 
      this.setState({finished: true})
    }
    this.setState({startIndex: newIndex, status:"NA"})
    this.changeImage1()
}

answerHandler = (answer) => {
    this.setState({status: answer})
}

changeImage1 = () => {
    const images = ["./navigation/seaotter.png","./navigation/robot.png", "./navigation/piggy.png","./navigation/tiger.png",]
        document.querySelector("#img1").src = images[Math.floor(Math.random() * images.length)];
}

    render() {
        let pencils=require("../images/pencils.png")
        let div=[
            'one','two','three','four','five','six','seven','eight','nine','ten',"eleven",
        ]

        const {startIndex, finished, questions, status, type} = this.state;
        const {answerHandler, nextQuestion} = this;
        let currentQuestion = questions[startIndex];

        return(
            <div>  
                 {div.map(function(name, index){
                        return  <img  className={name}src={pencils}/>
                        ;
                      })}
               

            <div className="questioncontainer acenter">
                {finished ? <Redirect to={{
                                        pathname: "/courseend",
                                        state: { courseId: this.props.location.courseId}
                                        }}
                                /> :
                <div>
                    <Question type={type} {...currentQuestion}/>
                    <Answer {...currentQuestion} answerHandler={answerHandler} type={type} status={status} nextQuestion={nextQuestion}/>
                </div>
            }
                {status === "NA" ? null : <Solution status={status}/>}
            </div>
            <img src="./navigation/robot.png" id="img1"/> 
            </div>
        )
    }
}

export default CourseStart;