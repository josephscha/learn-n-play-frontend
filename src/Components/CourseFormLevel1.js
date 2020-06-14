import React from 'react';

class CourseFormLevel1 extends React.Component {

    render() {
        return (
            <div>
                <h1> Create a Course!</h1>
                <form onChange={this.props.changeHandler}>
                    <label htmlFor="title">Course Title:</label>
                    <input autoFocus={true} type="text" name="title" value={this.props.title}/>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" value={this.props.description}/>
                    <label htmlFor="points">Points:</label>
                    <input type="number" name="points" value={this.props.points}/>
                    <label htmlFor="difficulty">Difficulty:</label>
                    <select onChange={this.props.changeHandler} name="difficulty">
                        <option selected="true" disabled="disabled" value="">Select a difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <label htmlFor="type">Select Course type:</label>
                    <select name="type">
                        <option selected="true" disabled="disabled" value="">Select a course Type</option>   
                        <option value="ReadingProblem">Reading</option>
                        <option value="SpellingProblem">Spelling</option>
                        <option value="MathProblem">Math</option>
                    </select>
                    <input type="submit" value="Submit" onClick={(event)=> this.props.confirmCourse(event)}/>
                </form> 
            </div>
        )
    }
}
  
export default CourseFormLevel1;

// 2.FORM LEVEL 1 - CREATE COURSE
// -1st level - Create course - title-string, difficulty- string;dropdown(easy/medium/hard), 
// description-string, points: integer
// -Click confirm, brings up question form & sends post to courses. 
// 3.FORM LEVEL 2 - CREATE PROBLEMS
// Problem form LEVEL 1 
// - drop down select; reading problem/ spelling problem/ math problem