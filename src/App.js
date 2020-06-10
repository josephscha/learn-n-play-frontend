import React from 'react';
import './App.css';
// import {connect} from 'react-redux'
// import {fetchCreator} from './Components/reducer'
import { Route, Switch, Redirect  } from 'react-router-dom';
import {Navbar, Login, MyCourses, GetCourses, Profile, Welcome, CourseStart, CourseEnd, CourseCreate} from './Components'

export default class App extends React.Component  {

  state = {
    currentUser: null,
    users: [],
    courses: []
  }
  componentDidMount() {
    // this.props.fetchCourses()
    // this.props.fetchUser("Joseph")
    // this.props.fetchMyCourses()
    // this.props.fetchCourseProblems(1)
    // this.props.fetchReadingProblems()
    // this.props.fetchMathProblems()
    // this.props.fetchSpellingProblems()
    this.fetchUsers()
    this.fetchCourses()
  }

  setCurrentUser = (user) => {
    this.setState({currentUser: user})
  }

  // fetchQuestions = (type) => {
  //   let search = ""
  //   switch(type){
  //     case "ReadingProblem": 
  //       search = "reading_problems"
  //     break;
  //     case "MathProblem":
  //       search = "math_problems"
  //     break;
  //     case "SpellingProblem":
  //       search = "spelling_problems"
  //     break;
  //   }

  // }

  fetchUsers = () => {
    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(users => this.setState({users}))
  }

  fetchCourses = () => {
    fetch(`http://localhost:3000/courses`)
    .then(resp => resp.json())
    .then(courses => this.setState({courses}))
  }

  render() {
    console.log("app state", this.state, "currentUser", this.state.currentUser)
    const {users, currentUser, courses} = this.state;
    const {setCurrentUser} = this;
    return (
      <div>
        {/* <img id="background" src="https://i.ya-webdesign.com/images/green-chalkboard-png-2.png" alt="background img"/> */}
      {this.state.currentUser ? <Navbar setCurrentUser={setCurrentUser}/> : null}
      {this.state.currentUser !== null ? <Redirect to="/welcome"/> : <Redirect to="/"/>}
         <Switch>
           <Route path ="/profile" render={(props) => <Profile {...props} setCurrentUser={setCurrentUser} currentUser={currentUser} courses={courses}/> }/>
           <Route path ="/mycourses" render={(props) => <MyCourses {...props} currentUser={currentUser} courses={courses}/> }/>
           <Route path ="/getcourses" render={(props) => <GetCourses {...props} currentUser={currentUser} courses={courses}/> }/>
           <Route path ="/welcome" render={(props) => <Welcome {...props} currentUser={currentUser}/> }/>
           <Route path ="/coursestart" render={(props => <CourseStart {...props} />)}/>
           <Route path ="/courseend" render={(props => <CourseEnd {...props} />)}/>
           <Route path ="/coursecreate" render={(props => <CourseCreate {...props} />)}/>
           <Route path ="/" render={(props) => <Login {...props} setCurrentUser={setCurrentUser} currentUser={currentUser} users={users}/> }/>
         </Switch>
      </div>
    );
  }
}

 
// const msp = (state) => {
//   return {
//     courses: state.courses,
//     myCourses: state.myCourses,
//     user: state.user,
//     problems: state.problems,
//     mathProblems: [],
//     readingProblems: [],
//     spellingProblems: [],
//   }
// }

// const mdp = (dispatch) => {
//   return {
//     fetchCourses: () => dispatch(fetchCreator('COURSES')),
//     fetchMyCourses: () => dispatch(fetchCreator('MY_COURSES')),
//     fetchUser: (username) => dispatch(fetchCreator('USER',username)),
//     fetchCourseProblems: (courseId) => dispatch(fetchCreator('PROBLEMS',courseId)),
//     fetchReadingProblems: () => dispatch(fetchCreator('READING_PROBLEMS')),
//     fetchMathProblems: () => dispatch(fetchCreator('MATH_PROBLEMS')),
//     fetchSpellingProblems:() => dispatch(fetchCreator('SPELLING_PROBLEMS')),
//   }
// }

// export default connect(msp,mdp)(App);