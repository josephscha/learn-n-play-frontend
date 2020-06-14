import React from 'react';

const Question = props => {
    
    console.log("question component" , props)
    const {image, type, problem} = props
    const mathQuestion = {
        fontSize: 150
    }
    return (
        <div className="center">
            {type !== "MathProblem" ? 
            <>
            <img src={image} className="image200" alt="question image"/> 
            <h1 className="question">{problem}</h1>
            </>
            : 
            <h1 style={mathQuestion}>{problem}</h1>}
        </div>
    )
}
  
export default Question;