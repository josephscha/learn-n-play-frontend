import React, { Component } from 'react';
import CoursesContainer from './CoursesContainer'
import { Link } from 'react-router-dom';

class MyCourses extends Component {
state = {
    myCourses: [],
}

componentDidMount(){
    this.setMyCourses()
}

setMyCourses = () => {
    fetch("http://localhost:3000/user_courses")
    .then(resp => resp.json())
    .then(userCourses => this.setState({myCourses: userCourses.filter(course => course.user_id === this.props.currentUser.id).map(usercourse => this.props.courses.find(course => course.id === usercourse.course_id))}))
}

    render() {
        let {myCourses} = this.state
        console.log(this.state.myCourses)
        return(
            <>
            <center><h1>My courses page/Course selection page</h1></center>
                <div className="container acenter">
                    
                    <CoursesContainer myCourses={myCourses}/>
                </div>
                <Link to="/getcourses"><img className="image500 bluedino" src="./navigation/bluedino.png" alt="bluedino"/></Link>
            </>
        )
    }
}

export default MyCourses;   