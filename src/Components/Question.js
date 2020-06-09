import React from 'react';

const Question = props => {
    
    console.log("question component" , props)
    const {image, type, problem} = props
    
    return (
        <div className="center">
            {type !== "MathProblem" ? <img src={image} className="image200" alt="question image"/> : null}
            <h1>{problem}</h1>
        </div>
    )
}
  
export default Question;
