import React, {useState} from 'react';
import { Redirect  } from 'react-router-dom';

class CourseEnd extends React.Component{
    state ={
        click: false,
    }
  
    fetchUserCourses = () => {
        fetch("http://localhost:3000/user_courses")
        .then(resp => resp.json())
    }

    addPoints = () => {
        const currentCourse = this.props.courses.find(course => course.id === this.props.location.state.courseId.id)
        const newScore = this.props.currentUser.score + currentCourse.points
        fetch("http://localhost:3000/users/"+this.props.currentUser.id, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({score: newScore})
        }).then(resp => resp.json()).then(json => this.props.setCurrentUser(json))
        this.setState({click: true})
        this.completeCourse()
    }
    
    completeCourse = () => {
        fetch("http://localhost:3000/user_courses")
        .then(resp => resp.json())
        .then(data => {return data.find(userCourse => userCourse.course_id === this.props.location.state.courseId.id)})
        .then(userCourse => 
            fetch("http://localhost:3000/user_courses/"+userCourse.id, {
                method: 'PATCH',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({completed: true})
            }).then(resp => resp.json()).then(this.props.fetchCourses())
        )
    }
    
    // console.log("Course end component" , this.props)
    render () {
        const currentCourse = this.props.courses.find(course => course.id === this.props.location.state.courseId.id)
        return (
            this.state.click ? <Redirect to="/profile"/> :
            <>
                <div className="container acenter">
                    <h1> Good job! </h1>
                    <h1> You finished {currentCourse.title}</h1>
                    <h1>You got {currentCourse.points} points!</h1>
                    <button className="button1" onClick={ () => this.addPoints() } >Click here to collect your points!</button>
                </div>
                <img className="dance" src="./navigation/ohyeah.gif" alt="dancing cat"/>
                <img className="okay" src="./navigation/okay.gif" alt="okay cat"/>
            </>
        )
    }
}
  
export default CourseEnd;
