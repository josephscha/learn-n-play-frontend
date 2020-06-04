import React from 'react';
import './App.css';
// import {connect} from 'react-redux'
// import {fetchCreator} from './Components/reducer'
import { Route, Switch  } from 'react-router-dom';
import {Navbar, Login, MyCourses, GetCourses, Profile, Welcome} from './Components'

export default class App extends React.Component  {

  state = {
    currentUser: null,
    users: [],
    courses: [],
    myCourses: [],

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
  }

  setCurrentUser = (user) => {
    this.setState({currentUser: user})
  }

  fetchUsers = () => {
    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(users => this.setState({users}))
  }

  render() {
    console.log(this.state)
    const {users, currentUser} = this.state;
    const {setCurrentUser} = this;
    return (
      <div className="App">
         {this.state.currentUser ? <Navbar setCurrentUser={setCurrentUser}/> : null}
         <Switch>
           <Route path ="/profile" render={(props) => <Profile {...props} currentUser={currentUser} /> }/>
           <Route path ="/mycourses" render={(props) => <MyCourses {...props} /> }/>
           <Route path ="/getcourses" render={(props) => <GetCourses {...props} /> }/>
           <Route path ="/welcome" render={(props) => <Welcome {...props} currentUser={currentUser}/> }/>
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