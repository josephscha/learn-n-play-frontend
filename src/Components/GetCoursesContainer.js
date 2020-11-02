import React, { Component } from 'react';
import Course from './Course'

class GetCoursesContainer extends Component {
    render() {
        const {currentUser, addToMyCourses, myCourses, userCourses} = this.props;
        return(
            <div>
                

                 {this.props.courses.map(course => 
                 <Course key={course.id} {...course} myCourses={myCourses} userCourses={userCourses}
                 addToMyCourses={addToMyCourses} getCourse={true} currentUser={currentUser}/>)}
                 
</div>
        )
    }
}

export default GetCoursesContainer;