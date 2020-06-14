import React from 'react';

const Question = props => {
    
    // console.log("question component" , props)
    const {image, type, problem} = props
    const mathQuestion = {
        fontSize: 150
    }
    return (
        <div className="center">
            {type !== "MathProblem" ? 
            <>
            <img src={image} className="image200" alt="question image"/> 
            <h2 className="question">{problem}</h2>
            </>
            : 
            <h2 style={mathQuestion}>{problem}</h2>}
        </div>
    )
}
  
export default Question;