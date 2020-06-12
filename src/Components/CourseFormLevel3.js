import React from 'react';

const CourseFormLevel3 = props => {

        return (
            <div>
                {props.type === "MathProblem" ? 
                "Math Form" : "Reading/Spelling Form"}
            </div>
        )
}
  
export default CourseFormLevel3;