import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Course extends Component {

    addCourse = () => {
        const NewUserCourse = {user_id: this.props.currentUser.id, course_id: this.props.id};
        (this.props.userCourses.find(userCourse => this.props.id === userCourse.course_id && this.props.currentUser.id === userCourse.user_id))
        ?
        alert("You already have this course")
        :
        fetch("http://localhost:3000/user_courses", {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(NewUserCourse)
            }).then(resp => resp.json()).then(json => this.props.addToMyCourses(json))
    }

    removeCourse = (course_id) => {
        const id = this.props.userCourses.find(userCourse => userCourse.course_id === course_id && userCourse.user_id === this.props.currentUser.id).id
        fetch("http://localhost:3000/user_courses/"+id, {
            method: 'DELETE',
            headers: {
                accept: 'application/json', 
                'content-type': 'application/json'
            },
        }).then(this.props.removeFromMyCourses(course_id))
    }

    renderGetCourse = () => {
        return(
<div className="my-courses-container">
     <div className="course ">
		<div className="course-preview my-course">
             {this.props.title}
        </div>
           
          </div>
            <button className="btn-c"  onClick={this.addCourse}>Add Course</button>
        
          </div>
        )
    }

    renderRemoveCourse = () => {
        if (this.props.remove) {
        return(
<div className="remove-courses-container">
 <div className="course">
	<div className="course-preview">
             {this.props.title}
        </div>
        </div>
           
            <button className="btn-c" onClick={() => this.removeCourse(this.props.id)}>Remove</button>
        </div>

        )
        }
        else {
            return (
        <div className="courses-container">
         <div className="course">
		<div className="course-preview">
                    {this.props.title} 
            </div>        
                    <Link className="link" to={{pathname:'coursestart', courseId: {id: this.props.id}}}>Start Course</Link>
                    Status: {this.isCompleted(this.props.id) ? "Completed" : "Not complete"}
                </div>
                </div>
                )
        }
    }

    isCompleted = (course_id) => {
        return this.props.userCourses.find(userCourse => userCourse.course_id === course_id).completed
    }

    render() {
        // console.log("completed?", this.isCompleted(this.props.id))
        const {getCourse} = this.props
        const {renderGetCourse, renderRemoveCourse} = this;
        // console.log("mycourse", getCourse)
        return(
            getCourse ? 
            renderGetCourse()
            :  
            renderRemoveCourse()
        )
    }
}

export default Course;