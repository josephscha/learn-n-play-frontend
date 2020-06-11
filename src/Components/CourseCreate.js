import React, { Component } from 'react';
import { DirectUpload } from 'activestorage';

class CourseCreate extends Component {
    state = {
        courseStatus: false, // when true, it'll render the 2nd layer to the form. 
        course: {}, // Holds the course object that is returned after it is created via fetch post
        difficulty: "", // used with title,description and points to create course object
        title: "",
        description: "",
        points: 0,
        questions: [], // where questions get added to after fetch post to course_problems is made so it's rendered for user to see
        question: "", // used with answer & image to create problem object via fetch post 
        answer: "", 
        image: ""
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

    render() {
        return(
            <div className="container acenter">
                <div>
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
                </form>
            </div>
        )
    }
}

export default CourseCreate;

/*
1.Active storage + DONE DONE DONE DONE DONE MOTHERFUCKERS DONE FONFEGKJNDLGKJDSGDSLKJGDSLKDGSLKDGSLK WOOOOOOOO

2.FORM LEVEL 1 - CREATE COURSE
-1st level - Create course - title-string, difficulty- string;dropdown(easy/medium/hard), 
description-string, points: integer
-Click confirm, brings up question form & sends post to courses. 

3.FORM LEVEL 2 - CREATE PROBLEMS
Problem form LEVEL 1 
- drop down select; reading problem/ spelling problem/ math problem

4.PROBLEM FORM LEVEL 2 - Opens when problem type is confirmed
math problem - problem / answer
reading problem - problem / answer / image file
spelling problem - problem / answer / image file
button - sends post to right problem url & sends post to course_problems.

5.SIDE DISPLAY - SHOWS THE COURSE NAME ON TOP, PROBLEMS INSIDE. 
-some display on the side with course title on top, and a list of problem/problems underneath 
to show which has been added. 

EXTRA - 
1. Possibly a remove button that sends delete request to course_problems to remove a problem from a course. 
2. Dropdown with problems in that genre that are currently available to add (2nd level question form)
if nothing selected, than it'll render out the form. If something is selected, it'll close out the form 
and reset values to nothing. 
*/