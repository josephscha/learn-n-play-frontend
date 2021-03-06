import React, { Component } from 'react';
import GetCoursesContainer from './GetCoursesContainer';
import CoursesContainer from './CoursesContainer'
import { Link } from 'react-router-dom';

class GetCourses extends Component {

state = {
    userCourses: [],
    myCourses: [],
    input: "",
    confirm: false,
    password_check: "",
    password_digest: this.props.currentUser.password_digest
}

componentDidMount(){
    this.setMyCourses()
}


changeHandler = (event) => {
    let name = event.target.name
    this.setState({[name]: event.target.value})
}

renderConfirmPage = () => {
        return (
            <form className="group-form" onChange={this.changeHandler}>
                <input className="confirm"type="password" name="password_check" value={this.state.password_check} placeholder="Confirm password"/>
                <button className="s-btn" onClick={event => this.clickConfirm(event)}>Confirm</button>
            </form>
        )
}

clickConfirm = (event) => {
    event.preventDefault()
    this.state.password_check === this.state.password_digest ? 
    this.setState({confirm: true}) 
    : 
    alert("Password incorrect. Please try again.")
    this.setState({password_check: ""})
}

setMyCourses = () => {
    fetch("http://localhost:3000/user_courses")
    .then(resp => resp.json())
    .then(userCourses => this.setState({userCourses: userCourses, myCourses: userCourses.filter(course => course.user_id === this.props.currentUser.id).map(usercourse => this.props.courses.find(course => course.id === usercourse.course_id))}))
}

addToMyCourses = (user_course) => {
    this.setState({userCourses: this.state.userCourses.concat(user_course), myCourses: this.state.myCourses.concat(this.props.courses.find(course => course.id === user_course.course_id))})
}

removeFromMyCourses = (course_id) => {
    const newCourses = this.state.myCourses.filter(course => course.id !== course_id)
    const newUserCourses = this.state.userCourses.filter(course => course.course_id !== course_id) 
    this.setState({myCourses: newCourses, userCourses: newUserCourses})
} 

searchHandler = (event) => {
    this.setState({input: event.target.value})
}

    render() {
        const {courses, currentUser} = this.props;
        const {myCourses, userCourses, input, confirm} = this.state;
        const {addToMyCourses, removeFromMyCourses, searchHandler} = this;
        let filteredCourses = courses.filter(course => course.title.toLowerCase().includes(this.state.input.toLowerCase()))
        // console.log("getCourses", this.state)
        return(
            <div>
            {confirm ? 
            <div>
                <center>
                <div className="container4">
                    <h1 className="my-c">My Courses</h1>
                    <CoursesContainer remove={true} removeFromMyCourses={removeFromMyCourses} userCourses={userCourses} myCourses={myCourses} currentUser={currentUser}/>
                </div>
                <div className="container5">
                <center>
                </center>
                    <h1 className="a-c">Available Courses</h1>
                    <input className="search" type="text" placeholder="Search available courses"value={input} onChange={(event) => searchHandler(event)}/>
                    <GetCoursesContainer userCourses={userCourses} myCourses={myCourses} addToMyCourses={addToMyCourses} courses={filteredCourses} currentUser={currentUser}/>
                </div>
                </center>
                <Link to="/coursecreate"><img className="image500 createcourse" src="./navigation/createcourse.png" alt="createcourse"/></Link>
            </div>
            :
            <center>
                <h1>Please confirm your password</h1>
                {this.renderConfirmPage()}
                <Link to="/mycourses"><img className="image500 greendino" src="./navigation/greendino.png" alt="greendino"/></Link>
                </center>}
            </div>
        )
    }
}

export default GetCourses;