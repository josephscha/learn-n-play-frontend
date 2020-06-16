import React from 'react';
import CourseFormLevel1 from './CourseFormLevel1'
import CourseFormLevel2 from './CourseFormLevel2'

const CourseMasterForm = (props) => {

    const {course, questions, removeProblem,status, confirmCourse, changeHandler, type, addToQuestions, problem, answer, image, createCourse} = props;
    return (
        <div>
            {!status ?
            <CourseFormLevel1 confirmCourse={confirmCourse} changeHandler={changeHandler}/> //course create form
            :
            <>
            <h1> {course.title} </h1>
            <ol>
                {questions.map(question => 
                <>
                <li> Problem: {question.problem} Answer: {question.answer}</li>
                <button className="r-btn remove" onClick={() => removeProblem(question.problem)}>Remove Problem</button><br/>
                </>)}
            </ol>
            <CourseFormLevel2 addToQuestions={addToQuestions} 
            type={type} 
            changeHandler={changeHandler}
            createCourse={createCourse}
            problem={problem}
            answer={answer}
            image={image}/>  
            </>
            }
        </div>
    )
}
  
export default CourseMasterForm;

/*
1.Active storage + DONE 

DONE
2.FORM LEVEL 1 - CREATE COURSE 
-1st level - Create course - title-string, difficulty- string;dropdown(easy/medium/hard), 
description-string, points: integer
-Click confirm, brings up question form & sends post to courses. 

DONE
3.FORM LEVEL 2 - CREATE PROBLEMS 
Problem form LEVEL 1 
- drop down select; reading problem/ spelling problem/ math problem

DONE
4.PROBLEM FORM LEVEL 2 - Opens when problem type is confirmed (Combined with form level 1, chooses course type opposed to problem type)
math problem - problem / answer
reading problem - problem / answer / image file
spelling problem - problem / answer / image file
button - sends post to right problem url & sends post to course_problems.

5.SIDE DISPLAY - SHOWS THE COURSE NAME ON TOP, PROBLEMS INSIDE.  DONE
-some display on the side with course title on top, and a list of problem/problems underneath 
to show which has been added. 

EXTRA - 
1. Possibly a remove button that sends delete request to course_problems to remove a problem from a course. DONE
2. Dropdown with problems in that genre that are currently available to add (2nd level question form)
if nothing selected, than it'll render out the form. If something is selected, it'll close out the form 
and reset values to nothing. 
*/