import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Course extends Component {

    addCourse = () => {
        const NewUserCourse = {user_id: this.props.currentUser.id, course_id: this.props.id};
        (this.props.userCourses.find(userCourse => this.props.id === userCourse.course_id))
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
        const id = this.props.userCourses.find(userCourse => userCourse.course_id === course_id).id
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
        <div>
            {this.props.title}
            <button onClick={this.addCourse}>Add course to my Courses</button>
        </div>
        )
    }

    renderRemoveCourse = () => {
        if (this.props.remove) {
        return(
        <div>
            {this.props.title}
            <Link to={{pathname:'coursestart', courseId: {id: this.props.id}}}>Start Course</Link>
            <button onClick={() => this.removeCourse(this.props.id)}>Remove from my Courses</button>
        </div>
        )
        }
        else {
            return (
                <div>
                    {this.props.title}
                    <Link to={{pathname:'coursestart', courseId: {id: this.props.id}}}>Start Course</Link>
                </div>
                )
        }
    }

    render() {
        const {getCourse} = this.props
        const {renderGetCourse, renderRemoveCourse} = this;
        console.log("mycourse", getCourse)
        return(
            getCourse ? 
            renderGetCourse()
            :  
            renderRemoveCourse()
        )
    }
}

export default Course;