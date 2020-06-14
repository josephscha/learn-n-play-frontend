import React from 'react';

const Solution = props => {
    
    // console.log("Solution component" , props)
    return (
        <div>
            {props.status === "CORRECT" ? 
            <center><h2>CORRECT! GOOD JOB!</h2></center>
            : 
            <center><h2>LETS TRY AGAIN</h2></center>
            }
        </div>
    )
}
  
export default Solution;
