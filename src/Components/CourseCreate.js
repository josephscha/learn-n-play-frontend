import React, { Component } from 'react';
import { DirectUpload } from 'activestorage';
import CourseMasterForm from './CourseMasterForm'
const header = {
    accept: 'application/json',
    'content-type': 'application/json'
}

class CourseCreate extends Component {

    state = {
        status: false, // when true, it'll render the 2nd layer to the form. 
        course: {}, // Holds the course object that is returned after it is created via fetch post
        difficulty: "", // used with title,description and points to create course object
        title: "",
        description: "",
        points: 0,
        questions: [], // where questions get added to after fetch post to course_problems is made so it's rendered for user to see
        type: "",
        problem: "", // used with answer & image to create problem object via fetch post 
        answer: "", 
        image: {},
        courseId: 0,
        problemIds: []
    }
    
    uploadFile = (file, problem) => {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        if (this.state.type === "ReadingProblem"){
            fetch("http://localhost:3000/reading_problems",)
        }
        if (this.state.type === "MathProblem"){
            fetch("http://localhost:3000/math_problems",)
        }
        if (this.state.typ === "SpellingProblem"){
            fetch("http://localhost:3000/spelling_problems",)
        }
    }
    
    changeHandler = (event) => {
        event.preventDefault()
        if (event.target.name === "image"){
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
            console.log(event.target.name, event.target.value)
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    confirmCourse = (event) => {
        event.preventDefault()
        const courseObj = {difficulty: this.state.difficulty, title: this.state.title, description: this.state.description, points: this.state.points}
        this.setState({course: courseObj, status: true})
    }

    addToQuestions = (event) => {
        event.preventDefault()
        const questionObj = (this.state.type === "MathProblem") ? {problem: this.state.problem, answer: this.state.answer} : {problem: this.state.problem, answer: this.state.answer, image: this.state.image}
        this.setState({questions: this.state.questions.concat(questionObj), problem: "", answer: "", image: {}})
    }

    removeProblem = (problem) => {
        this.setState({questions: this.state.questions.filter(question => question.problem !== problem)})
    }

    createCourse = () => {
        fetch("http://localhost:3000/courses", {
        method: 'POST',
        headers: header,
        body: JSON.stringify(this.state.course)
        }).then(resp => resp.json()).then(data => {return data.id}).then(id => {
            if (this.state.type === "ReadingProblem") {
                this.state.questions.map(question => 
                fetch("http://localhost:3000/reading_problems", {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(question)
                    }).then(resp => resp.json()).then(data => this.createCourseProblems(id, data.id)))
                }
            if (this.state.type === "MathProblem") {
                this.state.questions.map(question => 
                fetch("http://localhost:3000/math_problems", {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(question)
                    }).then(resp => resp.json()).then(data => this.createCourseProblems(id, data.id)))
                }
            if (this.state.type === "SpellingProblem") {
                this.state.questions.map(question => 
                fetch("http://localhost:3000/spelling_problems", {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(question)
                    }).then(resp => resp.json()).then(data => this.createCourseProblems(id, data.id)))
                }
            }
        )
    }

    createCourseProblems = (course_id, problem_id) => {
        fetch("http://localhost:3000/course_problems", {
        method: 'POST',
        headers: header,
        body: JSON.stringify({course_id: course_id, problemable_type: this.state.type, problemable_id: problem_id})
        }).then(resp => resp.json()).then(data => console.log("created course problem", data) )
    }

    render() {
        const {changeHandler, confirmCourse, addToQuestions, removeProblem, createCourse} = this;
        const {status,questions,type,problem,answer,image, course} = this.state;
        console.log("Create Course state", this.state)
        return(
            <div className="container acenter">
                <h1> {course.title} </h1>
                    <ol>
                        {questions.map(question => 
                        <>
                        <li> Problem: {question.problem} Answer: {question.answer}</li>
                        <button onClick={() => removeProblem(question.problem)}>Remove Problem</button>
                        </>)}
                    </ol>
                <CourseMasterForm type={type} 
                addToQuestions={addToQuestions}
                confirmCourse={confirmCourse} 
                changeHandler={changeHandler} 
                createCourse={createCourse}
                status={status}
                problem={problem}
                answer={answer}
                image={image}
                />
            </div>
        )
    }
}

export default CourseCreate;

//TO-DO
//Work on image upload when creating reading/spelling problem. 