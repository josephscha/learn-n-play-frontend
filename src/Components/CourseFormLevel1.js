import React from 'react';

class CourseFormLevel1 extends React.Component {

    render() {
        return (
            <div>
                <center><h1>Create a Course!</h1></center>
                <form className="group-form" onChange={this.props.changeHandler}>
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
                    <label className="type-label"htmlFor="type">Select Course type:</label>
                    <select className="type" name="type">
                        <option selected="true" disabled="disabled" value="">Select a course Type</option>   
                        <option value="ReadingProblem">Reading</option>
                        <option value="SpellingProblem">Spelling</option>
                        <option value="MathProblem">Math</option>
                    </select>
                    <input className="s-btn" type="submit" value="Submit" onClick={(event)=> this.props.confirmCourse(event)}/>
                </form> 
            </div>
        )
    }
}
  
export default CourseFormLevel1;

