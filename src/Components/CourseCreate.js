import React, { Component } from 'react';
import { DirectUpload } from 'activestorage';
import CourseMasterForm from './CourseMasterForm'
const header = {
    accept: 'application/json',
    'content-type': 'application/json'
}

class CourseCreate extends Component {

    state = {
        form: false,
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
        upload.create((error,blob) => {
            if (error) {
                console.log(error)
            } else {
                if (this.state.type === "ReadingProblem"){
                    fetch(`http://localhost:3000/reading_problems/${problem.id}`,{
                        method: 'PUT',
                        headers: header,
                        body: JSON.stringify({image: blob.signed_id})
                    }).then(resp => resp.json()).then(data => console.log(data))
                }
                if (this.state.type === "MathProblem"){
                    fetch(`http://localhost:3000/math_problems/${problem.id}`,{
                        method: 'PUT',
                        headers: header,
                        body: JSON.stringify({image: blob.signed_id})
                    }).then(resp => resp.json()).then(data => console.log(data))
                }
                if (this.state.type === "SpellingProblem"){
                    fetch(`http://localhost:3000/spelling_problems/${problem.id}`,{
                        method: 'PUT',
                        headers: header,
                        body: JSON.stringify({image: blob.signed_id})
                    }).then(resp => resp.json()).then(data => console.log(data))
                }
            }
        })
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
        const questionObj = (this.state.type === "MathProblem") ? {problem: this.state.problem, answer: this.state.answer} :  {problem: this.state.problem, answer: this.state.answer, image: this.state.image}
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
                    body: JSON.stringify({problem: question.problem, answer: question.answer})
                    }).then(resp => resp.json()).then(data => {
                        this.uploadFile(question.image, data)
                            this.createCourseProblems(id, data.id)
                    }).then(this.props.fetchCourses()))
                }
            if (this.state.type === "MathProblem") {
                this.state.questions.map(question => 
                fetch("http://localhost:3000/math_problems", {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(question)
                    }).then(resp => resp.json()).then(data => this.createCourseProblems(id, data.id))
                    .then(this.props.fetchCourses()))
                }
            if (this.state.type === "SpellingProblem") {
                this.state.questions.map(question => 
                fetch("http://localhost:3000/spelling_problems", {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify({problem: question.problem, answer: question.answer})
                    }).then(resp => resp.json()).then(data => {
                        this.uploadFile(question.image, data)
                            this.createCourseProblems(id, data.id)
                        }).then(this.props.fetchCourses()))
                }
            }
        )
        this.setState({status:false, form:false})
    }

    createCourseProblems = (course_id, problem_id) => {
        fetch("http://localhost:3000/course_problems", {
        method: 'POST',
        headers: header,
        body: JSON.stringify({course_id: course_id, problemable_type: this.state.type, problemable_id: problem_id})
        }).then(resp => resp.json()).then(data => console.log("created course problem", data) )
    }

    toggleForm = () => {
        this.setState({form: !this.state.form})
    }

    render() {
        const {changeHandler, confirmCourse, addToQuestions, removeProblem, createCourse, toggleForm} = this;
        const {status,questions,type,problem,answer,image, course, form} = this.state;
        console.log("Create Course state", this.state)
        return(
            <>
                {!form ?
                <>
                    <div className="container acenter">
                        <h1> Click to create a course!</h1>    
                        <img onClick={toggleForm} className="book" src={require("../images/book.png")}/>
                    </div>
                    <img className="thankyou" src="./navigation/thankyou.gif" alt="thankyou cat"/>
                </>
                :
                <div>
                    <CourseMasterForm 
                    questions={questions}
                    removeProblem={removeProblem}
                    course={course}
                    type={type} 
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
                }
            </>
        )
    }
}

export default CourseCreate;
