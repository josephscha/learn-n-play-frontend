import React, { Component } from 'react';
import { DirectUpload } from 'activestorage';

class CourseCreate extends Component {
    state = {
        course: {},
        questions: [],
        problem: {},
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
                <h1>Course Create Component Under Construction</h1>
                <form>
                    <label>Upload image file:</label>
                    <input type="file" name="image" onChange={this.changeHandler}></input>
                </form>
            </div>
        )
    }
}

export default CourseCreate;

/*
Active storage +
create a course form 
-1st level - Create course - title-string, difficulty- string;dropdown(easy/medium/hard), 
description-string, points: integer
-Click confirm, brings up question form & sends post to courses. 

- question form top level - drop down select; reading problem/ spelling problem/ math problem
opens 2nd level form depending on type of problem
math problem - problem / answer
reading problem - problem / answer / image file
spelling problem - problem / answer / image file
button - sends post to right problem url & sends post to course_problems.

-some display on the side with course title on top, and a list of problem/problems underneath 
to show which has been added. 

EXTRA - 
1. Possibly a remove button that sends delete request to course_problems to remove a problem from a course. 
2. Dropdown with problems in that genre that are currently available to add (2nd level question form)
if nothing selected, than it'll render out the form. If something is selected, it'll close out the form 
and reset values to nothing. 
*/