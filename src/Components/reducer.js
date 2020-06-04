let initialState = {
    courses: [],
    myCourses: [],
    problems: [],
    user: {},
    mathProblems: [],
    readingProblems: [],
    spellingProblems: [],
}


export const fetchCreator = (type,arg) => dispatch => {
    switch(type){
        case 'COURSES':
            fetch("http://localhost:3000/courses")
            .then(resp => resp.json())
            .then(courses => {
            dispatch({type: "FETCH_COURSES", payload: {courses}})})
        break;
        case 'MY_COURSES':
            fetch("http://localhost:3000/user_courses")
            .then(resp => resp.json())
            .then(courses => {
                let myCourses = courses.filter(course => course.user_id === initialState.user.id)
                console.log(courses, myCourses)
            dispatch({type: "MY_COURSES", payload: {myCourses}})})
        break;
        case 'USER':
            fetch('http://localhost:3000/users')
            .then(resp => resp.json())
            .then(users => {
                let user = users.find(user => user.username === arg)
                dispatch({type: "FETCH_USER", payload: {user}})
            })
        break;
        case 'PROBLEMS':
            fetch('http://localhost:3000/course_problems')
            .then(resp => resp.json())
            .then(problems => {
                let courseProblems = problems.filter(problem => problem.course_id === arg)
                dispatch({type: "PROBLEMS", payload: {courseProblems}})
            })
        break;
        case 'MATH_PROBLEMS':
            fetch("http://localhost:3000/math_problems")
            .then(resp => resp.json())
            .then(problems => {
                dispatch({type: "MATH_PROBLEMS", payload: {problems}})
            })
        break;
        case 'SPELLING_PROBLEMS':
            fetch("http://localhost:3000/spelling_problems")
            .then(resp => resp.json())
            .then(problems => {
                dispatch({type: "SPELLING_PROBLEMS", payload: {problems}})
            })
        break;
        case 'READING_PROBLEMS':
            fetch("http://localhost:3000/reading_problems")
            .then(resp => resp.json())
            .then(problems => {
                dispatch({type: "READING_PROBLEMS", payload: {problems}})
            })
        break;
    }
}

export let reducer = (prevState=initialState, action) => {
    switch(action.type){
        case 'FETCH_COURSES':
            return {...prevState, courses: action.payload.courses}
        case 'MY_COURSES':
            return {...prevState, myCourses: action.payload.myCourses}
        case 'FETCH_USER':
            return {...prevState, user: action.payload.user}
        case 'PROBLEMS':
            return {...prevState, problems: action.payload.courseProblems}
        case 'MATH_PROBLEMS':
            console.log("in math problems",action.payload.problems)
            return {...prevState, mathProblems: action.payload.problems}
        case 'READING_PROBLEMS':
            return {...prevState, readingProblems: action.payload.problems}
        case 'SPELLING_PROBLEMS':
            return {...prevState, spellingProblems: action.payload.problems}
        default:
            return prevState
    }
}

export const fetchCourses = () => ({type: 'FETCH_COURSES'})
export const fetchMyCourses = () => ({type: 'MY_COURSES'})
export const fetchUser = () => ({type: 'FETCH_USER'})
export const currentUser = () => ({type: 'CURRENT_USER'})

