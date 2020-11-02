import React from 'react';
import CourseFormLevel1 from './CourseFormLevel1'
import CourseFormLevel2 from './CourseFormLevel2'

const CourseMasterForm = (props) => {

    const {course, questions, removeProblem, status, confirmCourse, changeHandler, type, addToQuestions, problem, answer, image, createCourse} = props;
    return (
        <>
            {!status ?
            <CourseFormLevel1 confirmCourse={confirmCourse} changeHandler={changeHandler}/> //course create form
            :
            <>
            <ol className="container7">
                <h1>Course Title: {course.title} </h1>
                {questions.map(question => 
                <div>
                {/* <button className="r-btn remove" onClick={() => removeProblem(question.problem)}>Remove Problem</button><br/> */}
                <li> <button className="r-btn remove" onClick={() => removeProblem(question.problem)}>Remove Problem</button> Problem: {question.problem} Answer: {question.answer} <br/></li>
                </div>)}
            </ol>
                <button className="f-btn" onClick={createCourse}>FINISHED!</button>
            <div className="container6">
            <CourseFormLevel2 addToQuestions={addToQuestions} 
            type={type} 
            changeHandler={changeHandler}
            createCourse={createCourse}
            problem={problem}
            answer={answer}
            image={image}/>  
            </div>
            </>
            }
        </>
    )
}
  
export default CourseMasterForm;
