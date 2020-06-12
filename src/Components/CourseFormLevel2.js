import React, {useState} from 'react';
import CourseFormLevel3 from './CourseFormLevel3';

const CourseFormLevel2 = props => {

    return (
        (props.type === "") ? 
        <div>
            Form Level 2
        </div>
        :
        <CourseFormLevel3/> 
    )
}
  
export default CourseFormLevel2;

// 3.FORM LEVEL 2 - CREATE PROBLEMS
// Problem form LEVEL 1 
// - drop down select; reading problem/ spelling problem/ math problem