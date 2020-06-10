import React, {useState} from 'react';
import { Redirect  } from 'react-router-dom';

const CourseEnd = props => {
    const [click,setClick] = useState(false)
    let currentCourse = props.courses.find(course => course.id === props.location.state.courseId.id)
    
    const addPoints = () => {
        let newScore = props.currentUser.score + currentCourse.points
        fetch("http://localhost:3000/users/"+props.currentUser.id, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({score: newScore})
            }).then(resp => resp.json()).then(json => props.setCurrentUser(json))
        setClick(true)
    }

    console.log("Course end component" , props)
    return (
        click ? <Redirect to="/profile"/> :
        <div className="container acenter">
            <h1> Good job! </h1>
            <h1> You finished {currentCourse.title}</h1>
            <h1>You got {currentCourse.points} points!</h1>
            <button className="button1" onClick={ () => addPoints() } >Click here to collect your points!</button>
        </div>
    )
}
  
export default CourseEnd;
