import React from 'react';
import MathForm from './MathForm'
import ReadingSpellingForm from './ReadingSpellingForm'

const CourseFormLevel2 = props => {

    const {addToQuestions, changeHandler, problem, answer, image, createCourse, type} = props;
        return (
            <div>
                <h1>Create your problems!</h1>
                {type === "MathProblem" ? 
                <>
                <MathForm changeHandler={changeHandler} 
                addToQuestions={addToQuestions} 
                problem={problem}
                answer={answer}
                /> 
                <button onClick={createCourse}>FINISHED!</button>
                </>
                : 
                <>
                <ReadingSpellingForm 
                addToQuestions={addToQuestions} 
                changeHandler={changeHandler} 
                problem={problem}
                answer={answer}
                image={image}
                type={type}
                />
                <button onClick={createCourse}>FINISHED!</button>
                </>}
            </div>
        )
}
  
export default CourseFormLevel2;