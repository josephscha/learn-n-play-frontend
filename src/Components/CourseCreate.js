import React, { Component } from 'react';
import { DirectUpload } from 'activestorage';
import CourseMasterForm from './CourseMasterForm'

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
        question: "", // used with answer & image to create problem object via fetch post 
        answer: "", 
        image: {}
    }
    
    uploadFile = (file, problem) => {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
    }
    
    changeHandler = (event) => {
        if (event.target.name === "image"){
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }
    
    confirmCourse = (courseObj) => {
        this.setState({course: courseObj})
    }

    addToQuestions = (questionObj) => {
        this.setState({questions: this.state.questions.concat(questionObj)})
    }

    render() {
        return(
            <div className="container acenter">
                <CourseMasterForm status={this.state.status}/>
                {/* <div>
                    <h1> Course Name here</h1>
                    <ul>
                        <li> Problem 1</li>
                        <li> Problem 2</li>
                    </ul>
                </div>
                <form>
                    <h1>Form for creating course</h1>
                    <h1>{!this.courseStatus ? "Form level 1" : "Form Level 2"}</h1>
                    <label>Upload image file:</label>
                    <input type="file" name="image" onChange={this.changeHandler}></input>
                </form> */}
            </div>
        )
    }
}

export default CourseCreate;
