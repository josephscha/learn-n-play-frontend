import React from 'react';

const Solution = props => {
    
    console.log("Solution component" , props)
    return (
        <div className="container">
            {props.status === "CORRECT" ? 
            <h1>CORRECT!</h1>
            : 
            <h1>WRONG! TRY AGAIN</h1>
            }
        </div>
    )
}
  
export default Solution;
