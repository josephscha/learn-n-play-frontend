import React, { Component } from 'react';
import Course from './Course'

class CoursesContainer extends Component {

    render() {
        const { userCourses, currentUser, removeFromMyCourses, remove} = this.props;
        console.log("user courses", userCourses)
        return(
            <>
                 {this.props.myCourses.map(course => 
                 <Course  key={course.id} {...course} 
                 userCourses={userCourses}
                 currentUser={currentUser}
                 removeFromMyCourses={removeFromMyCourses}
                 remove={remove}
                 />)}
            </>
        )
    }
}

export default CoursesContainer;