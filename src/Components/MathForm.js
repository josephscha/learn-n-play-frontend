import React from 'react';

const MathForm = props => {

    const {changeHandler, problem, answer, addToQuestions} = props;
        return (
            <form onChange={changeHandler}>
                <label htmlFor="problem">Problem:</label>
                <input autoFocus={true} type="text" name="problem" value={problem}/>
                <label htmlFor="answer">Description:</label>
                <input type="text" name="answer" value={answer}/>
                <input type="submit" onClick={(event)=> addToQuestions(event)}/>
            </form> 
        )
}
  
export default MathForm;